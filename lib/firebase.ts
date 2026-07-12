let cachedDb: any = null;

export async function getDb(): Promise<any> {
  if (cachedDb) return cachedDb;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    // Return null so we can cleanly fallback to local state if db is not configured
    return null;
  }

  try {
    // Dynamically load firebase-admin using native ESM imports inside eval to bypass Turbopack.
    // This stops Turbopack from attempting to compile, package, or symlink the native library.
    const { initializeApp, getApps, cert } = await eval('import("firebase-admin/app")');
    const { getFirestore } = await eval('import("firebase-admin/firestore")');

    const apps = getApps();
    let app;
    if (!apps.length) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    } else {
      app = apps[0];
    }
    cachedDb = getFirestore(app);
    return cachedDb;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    return null;
  }
}
