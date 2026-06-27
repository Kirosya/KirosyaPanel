import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'tables.json');

function generateUUID() {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

export async function POST(request: Request) {
    try {
        const { tableId, sessionId } = await request.json();
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        if (!db.tables[tableId]) {
            return NextResponse.json({ error: 'Masa bulunamadı' }, { status: 404 });
        }

        // Eğer masa boşsa: İstemciden gelen session'ı veya yeni bir UUID'yi ata
        if (!db.tables[tableId].sessionId) {
            const newSession = sessionId || generateUUID();
            db.tables[tableId].sessionId = newSession;
            db.tables[tableId].orders = [];
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            return NextResponse.json({ success: true, joinedSessionId: newSession });
        }

        // Eğer masa doluysa ve gelen kişinin çerezi (cookie) eşleşiyorsa (masayı açan kişiyse):
        if (db.tables[tableId].sessionId === sessionId) {
            return NextResponse.json({ success: true, joinedSessionId: db.tables[tableId].sessionId });
        }

        // Eğer masa doluysa ama gelen kişinin çerezi farklıysa/yoksa (troll veya başka bir telefon):
        return NextResponse.json({ error: 'Bu masa şu an dolu. Lütfen siparişi masayı ilk okutan telefondan veriniz.' }, { status: 403 });

    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
