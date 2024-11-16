import PostTweet from "@/components/forms/PostTweet"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
    
  console.log({userInfo})
  const serializedUserId = JSON.stringify(userInfo._id);
  return (
    <>
      <h1 className="head-text">Create Tweet</h1>
      <PostTweet userId={serializedUserId} />
    </>
  )
}
export default Page