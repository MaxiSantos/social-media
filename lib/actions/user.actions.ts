'use server'
import User from "../models/user.model"
import { connectToDB } from "../db";

interface CreateUserParams {
    userId: string;
    email?: string;
    username: string;
    name?: string;
    image?: string
}
export const createUser = async ({
    userId,
    email,
    name,
    username,
    image
}: CreateUserParams): Promise<void> => {
    try{
        connectToDB()
        await User.create({
            id: userId,
            username: username?.toLowerCase()
        })
    } catch(err: any) {
        throw new Error(`Failed to create user: ${err.message}`)
    }
}