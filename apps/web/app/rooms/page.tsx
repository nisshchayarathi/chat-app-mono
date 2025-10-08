"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Rooms() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: "20px",
      }}
    >
      <h1>Join a Chat Room</h1>
      <input
        style={{ padding: 10, width: 300 }}
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        type="text"
        placeholder="Enter room name"
      />

      <button
        style={{ padding: 10, width: 300 }}
        onClick={() => {
          if (roomId.trim()) {
            router.push(`/room/${roomId}`);
          }
        }}
      >
        Join Room
      </button>
    </div>
  );
}
