
import { NextRequest, NextResponse as res } from "next/server";

export const GET = () => {
    return res.json({
        ok: true,
        msg: "Vault will be created here"
    });
}

export const POST = (req: NextRequest) => {
    const body = req.json()

    return res.json({
        ok: true,
        msg: "Vault will be created here"
    });
}
