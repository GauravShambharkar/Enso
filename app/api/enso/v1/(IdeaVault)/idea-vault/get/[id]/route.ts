import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { id } = await req.json();

    return NextResponse.json({ id });
}