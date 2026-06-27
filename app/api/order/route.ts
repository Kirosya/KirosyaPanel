import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'tables.json');

export async function POST(request: Request) {
    try {
        const { tableId, sessionId, items } = await request.json();
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        if (!db.tables[tableId] || db.tables[tableId].sessionId !== sessionId) {
            return NextResponse.json({ error: 'Yetkisiz erişim veya masa kapanmış' }, { status: 403 });
        }

        const newOrder = {
            id: Date.now().toString(),
            tableId,
            items,
            status: 'bekliyor', // bekliyor, onaylandi, iptal
            timestamp: new Date().toISOString()
        };

        db.tables[tableId].orders.push(newOrder);
        db.pendingOrders.push(newOrder);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        return NextResponse.json({ success: true, orderId: newOrder.id });

    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
