import { chatSession } from "@/config/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const { prompt } = await req.json();

    try {
        const response = await chatSession.sendMessage(prompt);

        const AIResponse = response.response.text();

        return NextResponse.json({ result: AIResponse });
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}
