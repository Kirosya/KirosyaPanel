import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'tables.json');

export async function GET() {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    if (!auth || auth.value !== 'true') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        return NextResponse.json(db);
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    if (!auth || auth.value !== 'true') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { action, tableId, orderId } = await request.json();
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        if (action === 'close_table' && tableId) {
            db.tables[tableId].sessionId = null;
            db.tables[tableId].orders = [];
            // Remove pending orders for this table
            db.pendingOrders = db.pendingOrders.filter((o: any) => o.tableId !== tableId);
        } else if (action === 'approve_order' && orderId) {
            const po = db.pendingOrders.find((o: any) => o.id === orderId);
            if (po) po.status = 'onaylandi';
            
            // Also update in table orders
            for (const tId in db.tables) {
                const to = db.tables[tId].orders.find((o: any) => o.id === orderId);
                if (to) to.status = 'onaylandi';
            }
            // Remove from pending
            db.pendingOrders = db.pendingOrders.filter((o: any) => o.id !== orderId);
        } else if (action === 'cancel_order' && orderId) {
            const po = db.pendingOrders.find((o: any) => o.id === orderId);
            if (po) po.status = 'iptal';
            
            for (const tId in db.tables) {
                const to = db.tables[tId].orders.find((o: any) => o.id === orderId);
                if (to) to.status = 'iptal';
            }
            db.pendingOrders = db.pendingOrders.filter((o: any) => o.id !== orderId);
        }

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
