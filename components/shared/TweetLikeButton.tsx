'use client'
import Image from "next/image";
import { usePathname } from "next/navigation";
import { likeOrDislikeTweet } from "@/lib/actions/tweet.actions";
import { deserialize } from "@/lib/utils";

interface Props {
  tweetId: string;
  currentUserId: string;
  likes: number;
  liked: boolean
}
const TweetLikeButton = ({
  tweetId,
  currentUserId,
  likes,
  liked
}: Props) => {
  const path = usePathname() // Get the current path
  const deserializedTweetId = deserialize<string>(tweetId)
  const handleLike = async () => {
    try {
      await likeOrDislikeTweet(currentUserId, deserializedTweetId, path);
    } catch (error: any) {
      console.error("Failed to like or dislike tweet:", error);
    }
  }
  return (
    <>
      <Image
        src={liked ? '/assets/heart-red.svg' : '/assets/heart.svg'} // Change the icon based on liked state
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={handleLike}
      />
      {likes > 0 && (
        <p className='ml-[-15px] rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2 '>
          {likes}
        </p>
      )}
    </>
  )
}
export default TweetLikeButton