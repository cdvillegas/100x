import { toPublic } from "@/lib/engine";
import { getSession } from "@/lib/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getSession(id);
  if (!session) {
    return Response.json({ error: "Game not found" }, { status: 404 });
  }
  return Response.json(toPublic(session));
}
