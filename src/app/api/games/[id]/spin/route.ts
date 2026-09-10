import { spin } from "@/lib/engine";
import { getSession, saveSession } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) {
    return Response.json({ error: "Game not found" }, { status: 404 });
  }
  const body = (await request.json().catch(() => ({}))) as {
    requestId?: string;
  };
  try {
    const next = spin(session, body.requestId);
    await saveSession(session);
    return Response.json(next);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Spin failed" },
      { status: 400 },
    );
  }
}
