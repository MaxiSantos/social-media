'use server'
import User from "../models/user.model"
import { connectToDB } from "../db";
import { revalidatePath } from "next/cache";
import { FilterQuery, SortOrder } from "mongoose";

type CreateUserParams = {
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

type FetchUsersParams = {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number
  sortBy?: SortOrder
}
export const fetchUsers = async ({
  userId,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc'
}: FetchUsersParams) => {
  try {
    await connectToDB()
    const skipAmount = (pageNumber - 1) * pageSize
    const regex = new RegExp(searchString, 'i')
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }
    }
    if (searchString.trim() !== '') {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } }
      ]
    }
    const sortOptions = { createdAt: sortBy }
    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
    const totalUserCount = await User.countDocuments(query)
    const users = await userQuery.exec()
    const isNext = totalUserCount > skipAmount + users.length;
    console.log({ users })
    return { users, isNext }
  } catch (err: any) {
    throw new Error(`Failed to fetch users: ${err.message}`)
  }
}
type updateUserParams = {
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