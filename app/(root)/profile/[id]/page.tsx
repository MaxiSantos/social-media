import ProfileHeader from "@/components/shared/ProfileHeaders"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"

type SearchParams = Promise<{ [key: string]: string | undefined }>
type Params = Promise<{ id: string }>

export default async function Profile(props: {
  searchParams: SearchParams
  params: Params
}) {
  const params = await props.params;
  const user = await currentUser();
  if (!user) return <p className="text-light-1"> no user </p>;
  console.log({params})
  if(!params.id){
    return <p className="text-light-1"> no id param </p>;
  }
  const userInfo = await fetchUser(params.id)  
  return (
    <>
      <section>
        <ProfileHeader
          accountId={userInfo.id}
          authUserId={user.id}
          name={userInfo.name}
          username={userInfo.username}
          imgUrl={userInfo.image}
          bio={userInfo.bio}
          type='User'
        />

      </section>
    </>
  )
}