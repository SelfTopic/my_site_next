import { Message } from "@/types";
import openDatabase from "../db";


export async function POST(
    req: Request
) {
    const message: Message = await req.json();
    console.log(message);

    const db = await openDatabase();

    await db.run(`
        INSERT INTO messages (
            content,
            username
        ) VALUES (?, ?)
    `,  
        message.content, 
        message.username
    );
    return Response.json({
        ok: true,
        statusCode: 200
    })
} 