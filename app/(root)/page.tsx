import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "components/sections/LandingPage";

export default async function Home() {
  const user = await currentUser();
  
  if(!user){
    return <LandingPage />
  }
  return (
    <main>
      <h1 className="text-center">Social media</h1>
    </main>
  );
}
