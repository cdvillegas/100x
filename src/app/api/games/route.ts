import { createSession, toPublic } from "@/lib/engine";
import { saveSession } from "@/lib/store";

export async function POST() {
  try {
    const session = createSession();
    await saveSession(session);
    return Response.json(toPublic(session));
  } catch {
    return Response.json(
      { error: "Game storage is unavailable." },
      { status: 503 },
    );
  }
}
