import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
  try {
    // First try to get existing room
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    if (response.data.room) {
      return response.data.room.id.toString();
    }
  } catch (error) {
    // Room doesn't exist, use slug as temporary ID
    console.log("Room not found, using slug as room identifier");
  }
  
  // Use slug as room identifier if room doesn't exist
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
