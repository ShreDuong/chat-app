import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const body = await req.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    // get data from db
    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;
    if (!idToAdd) {
      return new Response("This user doesn't exist", {
        status: 400,
      });
    }

    if (!idToAdd) {
      return new Response("This user doesn't exist", {
        status: 400,
      });
    }
    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    //check if user is already added
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;
    if (isAlreadyAdded) {
      return new Response("Already added this user", {
        status: 400,
      });
    }
    //check if user is already friend
    const isAlreadyFriend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      isAlreadyAdded
    )) as 0 | 1;
    if (isAlreadyFriend) {
      return new Response("Already friend", {
        status: 400,
      });
    }
    //valid request
    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    return new Response("OK", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", {
        status: 422,
      });
    }
    return new Response("Invalid request", {
      status: 400,
    });
  }
};
