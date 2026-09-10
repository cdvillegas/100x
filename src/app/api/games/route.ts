import { createSession, toPublic } from "@/lib/engine";
import { saveSession } from "@/lib/store";

export async function POST() {
  const session = createSession();
  await saveSession(session);
  return Response.json(toPublic(session));
}
