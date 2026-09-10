import { respin } from "@/lib/engine";
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
    type?: "year" | "rank";
    requestId?: string;
  };
  if (body.type !== "year" && body.type !== "rank") {
    return Response.json({ error: "type must be year or rank" }, { status: 400 });
  }
  try {
    const next = respin(session, body.type, body.requestId);
    await saveSession(session);
    return Response.json(next);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Respin failed" },
      { status: 400 },
    );
  }
}
