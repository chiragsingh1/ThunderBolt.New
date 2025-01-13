import { GenAICode } from "@/config/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt } = await req.json();

    try {
        const result = await GenAICode.sendMessage(prompt);
        const resp = result.response.text();
        return NextResponse.json(JSON.parse(resp));
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
