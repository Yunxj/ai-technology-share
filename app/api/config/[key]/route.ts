import { NextRequest } from "next/server";
import { getConfig, saveConfig, isValidConfigKey } from "@/lib/config";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { key: string } }
) {
  const key = params.key;
  if (!isValidConfigKey(key)) {
    return Response.json({ error: "Invalid config key" }, { status: 400 });
  }
  const config = await getConfig(key);
  return Response.json(config);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return Response.json(
      { error: auth.message ?? "Unauthorized" },
      { status: 401 }
    );
  }

  const key = params.key;
  if (!isValidConfigKey(key)) {
    return Response.json({ error: "Invalid config key" }, { status: 400 });
  }

  let body: object;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  await saveConfig(key, body);
  return Response.json(body);
}
