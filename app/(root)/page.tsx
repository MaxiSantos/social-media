import TweetCard from "@/components/cards/TweetCard";
import Pagination from "@/components/shared/Pagination";
import { fetchTweets, isTweetByUser } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "components/sections/LandingPage";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const user = await currentUser();

  if (!user) {
    return <LandingPage />
  }

  const userInfo = await fetchUser(user.id)
  const result = await fetchTweets(
    searchParams.page ? +searchParams.page : 1,
    3
  );
  return (
    <>
      <section className='mt-10 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result text-light-1'>No tweets found</p>
        ) : (
          <div>
            {result.posts.map(async (tweet) => {
              const isOwner = await isTweetByUser(userInfo?._id, tweet?._id)
              return (
                <div className="mt-10">
                  <TweetCard
                    key={tweet._id}
                    id={tweet._id}
                    currentUserId={user.id}
                    owner={isOwner}
                    DB_userID={userInfo._id}
                    retweetOf={tweet.retweetOf}
                    parentId={tweet.parentId}
                    content={tweet.text}
                    author={tweet.author}
                    group={tweet.group}
                    createdAt={tweet.createdAt}
                    comments={tweet.children}
                    likes={tweet.likes}
                    liked={userInfo.likedTweets.includes(tweet._id)}
                  />
                </div>
              )
            }
            )}
            <Pagination
              path='/'
              pageNumber={searchParams?.page ? +searchParams.page : 1}
              isNext={result.isNext}
            />
          </div>
        )}
      </section>     
    </>
  )
}
