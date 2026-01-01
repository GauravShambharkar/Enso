import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const param = req.nextUrl.searchParams
    const id = param.get("id");
    const idea = param.get("idea");

    return NextResponse.json({
        ok: true,
        msg: "Vault will be fetched from here",
        id,
        idea,
    });
}
