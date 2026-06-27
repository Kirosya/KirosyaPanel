import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export const cleanInactiveTables = (db: any) => {
    if (!db || !db.tables) return false;
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
    const now = Date.now();
    let changed = false;
    
    for (const tId in db.tables) {
        const table = db.tables[tId];
        if (table.sessionId) {
            if (!table.lastActivity) {
                // Mevcut masaların kapanmaması için şu anki zamanı ata
                table.lastActivity = now;
                changed = true;
            } else if (now - table.lastActivity > TWO_HOURS_MS) {
                table.sessionId = null;
                table.orders = [];
                table.lastActivity = null;
                if (db.pendingOrders) {
                    db.pendingOrders = db.pendingOrders.filter((o: any) => o.tableId !== tId);
                }
                changed = true;
            }
        }
    }
    return changed;
};
