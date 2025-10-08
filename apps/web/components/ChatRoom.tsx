import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
      timeout: 3000, // 3 second timeout
    });
    return response.data.messages || [];
  } catch (error) {
    console.log("Could not fetch messages, starting with empty chat:", error);
    return [];
  }
}

export async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);

  return <ChatRoomClient id={id} messages={messages} />;
}
