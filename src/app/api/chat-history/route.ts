import openDatabase from "../db";
import { Message } from "@/types";

export async function GET() {

    const db = await openDatabase();

    const messages = await db.all<Message[] | undefined>(`SELECT * FROM messages`);

    console.log(messages)
    
    return Response.json({
        messages: messages
    });
};