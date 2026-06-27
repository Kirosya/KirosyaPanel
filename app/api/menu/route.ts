import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'menu.json');

export async function GET() {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const menuData = JSON.parse(fileContent);
        return NextResponse.json(menuData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read menu data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const auth = cookieStore.get('admin_auth');
    if (!auth || auth.value !== 'true') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const newMenuData = await request.json();
        fs.writeFileSync(dataFilePath, JSON.stringify(newMenuData, null, 2), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to write menu data' }, { status: 500 });
    }
}
