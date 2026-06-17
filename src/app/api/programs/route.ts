import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const candidateId = searchParams.get("candidateId");

  const filePath = path.join(process.cwd(), "src", "data", "collected", "programs-scraped.json");

  try {
    await fs.access(filePath);
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);

    if (candidateId && data[candidateId]) {
      return NextResponse.json(data[candidateId]);
    }
    if (candidateId && !data[candidateId]) {
      return NextResponse.json({ url: "", proposals: [] });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({});
  }
}
