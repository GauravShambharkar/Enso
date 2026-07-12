"use server";

import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/firebase";

// Helper to check user auth and get firestore db instance
async function getDbAndUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const db = await getDb();
  if (!db) {
    return { db: null, userId: null };
  }
  return { db, userId };
}

// ==========================================
// 1. Idea Vault Actions
// ==========================================
export async function getIdeas() {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true, data: [] };

  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("ideas")
      .orderBy("id", "desc")
      .get();
    const ideas = snapshot.docs.map((doc: any) => doc.data());
    return { success: true, data: ideas };
  } catch (error) {
    console.error("Error fetching ideas from Firestore:", error);
    return { success: false, error: String(error) };
  }
}

export async function saveIdea(idea: { id: string; text: string; createdOn: string }) {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true };

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("ideas")
      .doc(idea.id)
      .set(idea);
    return { success: true };
  } catch (error) {
    console.error("Error saving idea to Firestore:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteIdea(id: string) {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true };

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("ideas")
      .doc(id)
      .delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting idea from Firestore:", error);
    return { success: false, error: String(error) };
  }
}

// ==========================================
// 2. Ikigai Workspace Actions
// ==========================================
export async function getIkigaiProfiles() {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true, data: [] };

  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("ikigai")
      .orderBy("id", "desc")
      .get();
    const profiles = snapshot.docs.map((doc: any) => doc.data());
    return { success: true, data: profiles };
  } catch (error) {
    console.error("Error fetching Ikigai profiles from Firestore:", error);
    return { success: false, error: String(error) };
  }
}

export async function saveIkigaiProfile(profile: any) {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true };

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("ikigai")
      .doc(profile.id)
      .set(profile);
    return { success: true };
  } catch (error) {
    console.error("Error saving Ikigai profile to Firestore:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteIkigaiProfile(id: string) {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true };

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("ikigai")
      .doc(id)
      .delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting Ikigai profile from Firestore:", error);
    return { success: false, error: String(error) };
  }
}

// ==========================================
// 3. Eisen Eisenhower Matrix Actions
// ==========================================
export async function getEisenProjects() {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true, data: [] };

  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("eisen")
      .orderBy("id", "desc")
      .get();
    const projects = snapshot.docs.map((doc: any) => doc.data());
    return { success: true, data: projects };
  } catch (error) {
    console.error("Error fetching Eisen projects from Firestore:", error);
    return { success: false, error: String(error) };
  }
}

export async function saveEisenProject(project: any) {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true };

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("eisen")
      .doc(project.id)
      .set(project);
    return { success: true };
  } catch (error) {
    console.error("Error saving Eisen project to Firestore:", error);
    return { success: false, error: String(error) };
  }
}

export async function deleteEisenProject(id: string) {
  const { db, userId } = await getDbAndUser();
  if (!db) return { success: false, fallback: true };

  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("eisen")
      .doc(id)
      .delete();
    return { success: true };
  } catch (error) {
    console.error("Error deleting Eisen project from Firestore:", error);
    return { success: false, error: String(error) };
  }
}
