import { fetchTweetById } from "@/lib/actions/tweet.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

type Params = Promise<{ id: string }>

export default async function Page(props: {
  params: Params
}) {
    const user = await currentUser();
    const params = await props.params;

    if(!user) return null
    
    const tweet = await fetchTweetById(params.id)
}
