'use server'
import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../db";
import Group from "../models/group.model";

interface TweetParams {
  text: string;
  author: string;
  path: string;
  retweetOf?: string;
  groupId: string | null;
}
export const createTweet = async ({
  text,
  author,
  path,
  retweetOf,
  groupId
}: TweetParams) => {
  try {
    connectToDB();
    const groupIdObject = await Group.findOne({ id: groupId }, { _id: 1 });
    const createdTweet = await Tweet.create({
      text,
      author,
      path,
      retweetOf,
      group: groupIdObject
    })
    await User.findByIdAndUpdate(author, {
      $push: { tweets: createdTweet._id },
    });
    if (retweetOf) {
      await User.findByIdAndUpdate(author, {
        $push: { retweets: createdTweet._id },
      });
    }
    if (groupIdObject) {
      await Group.findByIdAndUpdate(groupIdObject, {
        $push: { tweets: createdTweet._id },
      });
    }
    revalidatePath(path)
  } catch (err: any) {
    throw new Error(`Failed to create tweet ${err.message}`)
  }
}

export const fetchTweets = async (pageNumber = 1, pageSize = 20) => {
  connectToDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const TweetsQuery = Tweet.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'author',
      model: User,
    })
    .populate({
      path: 'group',
      model: Group,
    })
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: User,
        select: '_id name parentId image',
      },
    })
    .populate({
      path: 'retweetOf', // Populate the retweetOf field
      populate: {
        path: 'author',
        model: User,
        select: '_id name image',
      },
    });

  const totalPostsCount = await Tweet.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await TweetsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
};

export async function likeOrDislikeTweet(userId: string, tweetId: string, path: string) {
  try {
    connectToDB();

    // Find the user and check if they have already liked the tweet
    const user = await User.findOne({ id: userId });
    if (!user) throw new Error("User not found");

    let tweet;

    if (user.likedTweets.includes(tweetId)) {
      // If the tweet is already liked, decrement its likes and remove it from the user's likedTweets
      tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $inc: { likes: -1 } },
        { new: true } // Return the updated document
      );

      // Remove the tweet from the user's likedTweets array
      user.likedTweets = user.likedTweets.filter((id: any) => id.toString() !== tweetId);
    
    } else {
      // If the tweet is not liked, increment its likes and add it to the user's likedTweets
      tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $inc: { likes: 1 } },
        { new: true } // Return the updated document
      );
      
      // Add the tweet to the user's likedTweets array
      user.likedTweets.push(tweetId);
    }
    if (!tweet) {
      throw new Error("Tweet not found");
    }

    await user.save();
    revalidatePath(path)

  } catch (error: any) {
    throw new Error(`Failed to like or dislike tweet: ${error.message}`);
  }
}