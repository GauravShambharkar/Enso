// import Idea_Vault_Model from "@/app/api/Models/idea-vault-Modles/idea-vault-Modle";
import { NextRequest, NextResponse as res } from "next/server";
// import { DB_Connect } from "@/app/api/dbConnect/DB_Connect";

export const GET = () => {
    return res.json({
        ok: true,
        msg: "Vault will be created here"
    });
}

export const POST = async (req: NextRequest) => {
    // Legacy MongoDB logic commented out to resolve Turbopack compilation bottlenecks on Windows
    // await DB_Connect();

    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
        return res.json({
            ok: false,
            errMsg: "title and description are required"
        }, {
            status: 400
        });
    }

    return res.json({
        ok: true,
        msg: "Legacy endpoint - database operations are now handled securely via Firestore Server Actions.",
        title,
        description
    });
}