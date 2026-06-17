import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const candidateId = searchParams.get("candidateId");

  const dir = path.join(process.cwd(), "src", "data", "collected");

  try {
    const files = await fs.readdir(dir);
    const jsonFiles = files
      .filter((f) => f.startsWith("agenda-hints-") && f.endsWith(".json"))
      .sort()
      .reverse();

    if (jsonFiles.length === 0) {
      return NextResponse.json({ hints: [] });
    }

    const latest = path.join(dir, jsonFiles[0]);
    const content = await fs.readFile(latest, "utf-8");
    const data = JSON.parse(content);

    let hints = data.hints ?? [];
    if (candidateId) {
      hints = hints.filter((h: { candidateId: string }) => h.candidateId === candidateId);
    }

    return NextResponse.json({ hints });
  } catch {
    return NextResponse.json({ hints: [] });
  }
}
