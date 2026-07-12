import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/firebase";

async function checkAuth() {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized", status: 401, userId: null, db: null };
  }
  const db = await getDb();
  if (!db) {
    return { error: "Database not configured", status: 503, userId: null, db: null };
  }
  return { userId, error: null, status: 200, db };
}

export async function GET() {
  const { userId, error, status, db } = await checkAuth();
  if (error) return NextResponse.json({ success: false, error }, { status });

  try {
    const snapshot = await db
      .collection("users")
      .doc(userId!)
      .collection("ideas")
      .orderBy("id", "desc")
      .get();
    const ideas = snapshot.docs.map((doc: any) => doc.data());
    return NextResponse.json({ success: true, data: ideas });
  } catch (err) {
    console.error("API GET ideas error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, error, status, db } = await checkAuth();
  if (error) return NextResponse.json({ success: false, error }, { status });

  try {
    const body = await req.json();
    const { id, text, createdOn } = body;
    if (!id || !text) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const idea = { id, text, createdOn };
    await db
      .collection("users")
      .doc(userId!)
      .collection("ideas")
      .doc(id)
      .set(idea);

    return NextResponse.json({ success: true, data: idea });
  } catch (err) {
    console.error("API POST ideas error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId, error, status, db } = await checkAuth();
  if (error) return NextResponse.json({ success: false, error }, { status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing idea ID" }, { status: 400 });
    }

    await db
      .collection("users")
      .doc(userId!)
      .collection("ideas")
      .doc(id)
      .delete();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API DELETE ideas error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
