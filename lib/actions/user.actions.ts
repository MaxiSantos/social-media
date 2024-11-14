'use server'
import User from "../models/user.model"
import { connectToDB } from "../db";
import { revalidatePath } from "next/cache";

interface CreateUserParams {
  userId: string;
  email: string;
  username: string;
  name: string;
  image: string
}
export const createUser = async ({
  userId,
  email,
  name,
  username,
  image
}: CreateUserParams): Promise<void> => {
  try {
    await connectToDB()
    await User.create({
      id: userId,
      username: username?.toLowerCase(),
      email,
      name,
      image
    })
  } catch (err: any) {
    throw new Error(`Failed to create user: ${err.message}`)
  }
}

export const fetchUser = async (userId: string) => {
  try {
    connectToDB()
    return await User.findOne({
      id: userId
    })
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}

interface updateUserParams {
  userId: string;
  email?: string;
  username?: string;
  name?: string;
  bio?: string;
  image?: string;
  path?: string;
}

export const updateUser = async ({
  userId,
  name,
  email,
  username,
  bio,
  path,
  image
}: updateUserParams): Promise<void> => {
  try {
    await connectToDB()
    await User.findOneAndUpdate(
      { id: userId },
      {
        name,
        email,
        username,
        bio,
        path,
        image,
        onboarded: true
      }
    )
    if (path === '/profile/edit') revalidatePath(path)
  } catch (err: any) {
    throw new Error(`Failed to update user info: ${err.message}`)
  }
}