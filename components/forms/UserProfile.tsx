'use client'

import { UserProfile, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes"

const UserProfileWrapper = () => {
  const { isLoaded } = useUser();
  return isLoaded ? <UserProfile
    appearance={{
      baseTheme: dark,
    }}
    routing="hash"
  /> : null
}

export default UserProfileWrapper