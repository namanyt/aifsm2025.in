import { pb, listNews } from "@/lib/db/pb";

export async function GET() {
  try {
    const news = await listNews();
    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response("Error fetching news", { status: 500 });
  }
}
