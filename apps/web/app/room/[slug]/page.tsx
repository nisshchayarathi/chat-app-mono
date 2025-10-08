import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
  try {
    // Try to get existing room with timeout
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`, {
      timeout: 3000 // 3 second timeout
    });
    if (response.data.room) {
      return response.data.room.id.toString();
    }
  } catch (error) {
    // Room doesn't exist or backend timeout, use slug as room ID
    console.log("Room not found or backend unavailable, using slug as room identifier");
  }

  // Use slug as room identifier
  return slug;
}

export default async function ChatRoom1({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);

  return <ChatRoom id={roomId}></ChatRoom>;
}
