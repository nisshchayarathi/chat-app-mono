import { useEffect, useMemo, useState } from "react";
import { WS_URL } from "../app/config";

// Helper to decode JWT and get userId
export function getCurrentUserId(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("chat-token");
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload.userId || null;
  } catch {
    return null;
  }
}

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("chat-token");
  }, []); //fetching the token from localStorage

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSocket(undefined);
      return;
    } // if no token close the ws server

    const url = `${WS_URL}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };

    ws.onclose = () => {
      setLoading(true);
      setSocket(undefined);
    };

    return () => {
      ws.close();
    };
  }, [token]);

  return { socket, loading };
}
