import { reveal, toPublic } from "@/lib/engine";
import { getSession, saveSession } from "@/lib/store";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) {
    return Response.json({ error: "Game not found" }, { status: 404 });
  }
  try {
    const payload = reveal(session);
    await saveSession(session);
    return Response.json({ ...toPublic(session), reveal: payload });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Reveal failed" },
      { status: 400 },
    );
  }
}
