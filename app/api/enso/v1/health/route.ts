import { NextResponse as res } from "next/server";

export const GET = () => {
    return res.json({
        ok: true,
        msg: "Hello from enso team"
    });
}