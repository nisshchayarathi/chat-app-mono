import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend_common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  CreateRoomSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Email already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "User does not exist!",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const userId = req.userId;
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    
    // Check if roomId is a valid number
    if (isNaN(roomId)) {
      console.log(`Invalid roomId: ${req.params.roomId}`);
      return res.json({
        messages: [],
      });
    }
    
    console.log(`Fetching chats for room: ${roomId}`);
    
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "asc",
      },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log(`Found ${messages.length} messages for room ${roomId}`);
    res.json({
      messages,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({
      messages: [],
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(`Looking for room with slug: ${slug}`);
    
    let room = await prismaClient.room.findFirst({
      where: {
        slug,
      },
    });
    
    // If room doesn't exist, create it automatically
    if (!room) {
      console.log(`Room not found, creating new room: ${slug}`);
      try {
        // Get the first user to be admin, or create a system user
        const firstUser = await prismaClient.user.findFirst();
        const adminId = firstUser?.id || "system";
        
        room = await prismaClient.room.create({
          data: {
            slug,
            adminId,
          },
        });
        console.log(`Created room: ${room.id}`);
      } catch (createError) {
        console.error("Error creating room:", createError);
        // If creation fails (e.g., concurrent creation), try to find it again
        room = await prismaClient.room.findFirst({
          where: {
            slug,
          },
        });
      }
    }
    
    if (!room) {
      return res.status(404).json({
        message: "Room not found and could not be created",
        room: null,
      });
    }
    
    console.log(`Room found/created: ${room.id}`);
    res.json({
      room,
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "HTTP Backend is running" });
});

app.get("/health", async (req, res) => {
  try {
    // Test database connection
    await prismaClient.$queryRaw`SELECT 1`;
    res.json({ 
      status: "healthy", 
      database: "connected",
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ 
      status: "unhealthy", 
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`HTTP backend listening on port ${PORT}`);
});
