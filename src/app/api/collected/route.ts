import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const dir = path.join(process.cwd(), "src", "data", "collected");

  try {
    const files = await fs.readdir(dir);
    const jsonFiles = files
      .filter((f) => f.startsWith("collection-") && f.endsWith(".json"))
      .sort()
      .reverse();

    if (jsonFiles.length === 0) {
      return NextResponse.json({ collectedAt: null, total: 0, articles: [] });
    }

    const latest = path.join(dir, jsonFiles[0]);
    const content = await fs.readFile(latest, "utf-8");
    const data = JSON.parse(content);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ collectedAt: null, total: 0, articles: [] });
  }
}
