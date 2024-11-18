import AccountInfo from "@/components/forms/AccountInfo"
import UserProfileWrapper from "@/components/forms/UserProfile"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"

import { redirect } from "next/navigation"

const Page = async () => {
  const user = await currentUser();
  console.log({ user })
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  console.log({ userInfo })
  if (userInfo?.onboarded) redirect('/')

  const userData = {
    id: user?.id,
    //objectID: JSON.parse(JSON.stringify(userInfo?._id)),
    userName: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user?.imageUrl
  }
  console.log({ userData })
  return (
    <>
      <main className="mx-auto flex flex-col justify-start px-10 py-20">
        <div className="text-center">
          <h1 className="head-text">Welcome to Social Media</h1>
          <p className="mt-3 text-base-regular text-light-2">
            Complete your profile now to use Social Media</p>
        </div>
        <div className="mt-10">
          <UserProfileWrapper />                    
        </div>
        <AccountInfo
          userData={userData}
        />
      </main>
    </>
  )
}

export default Page