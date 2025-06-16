import { JokeResponse } from "@/types"

export async function GET() {

    const res = await fetch(process.env.JOKE_API_URL!, {
        headers: {"Content-Type": "applications/json"}
    })
    .catch( (err) => {
        console.log(`Error api joke: ${err}`)
        return Response.error();
    });

    const data: JokeResponse = await res.json();
    console.log(data);

    return Response.json({
        joke: data.content
    });
}