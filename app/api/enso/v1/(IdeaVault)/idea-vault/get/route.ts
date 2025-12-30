import { NextRequest, NextResponse as res } from "next/server";

export const GET = () => {
    return res.json({
        ok: true,
        msg: "Vault will be fetched from here"
    });
}
