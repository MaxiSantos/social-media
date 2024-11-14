'use server'
import User from "../models/user.model"
import { connectToDB } from "../db";

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