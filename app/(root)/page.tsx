import { fetchTweets } from "@/lib/actions/tweet.actions";
import { currentUser } from "@clerk/nextjs/server";
import LandingPage from "components/sections/LandingPage";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
export default async function Home(props: {  
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const user = await currentUser();
  
  if(!user){
    return <LandingPage />
  }

  const result = await fetchTweets( 
    searchParams.page ? +searchParams.page : 1,
    3
  );
  return (
    <main>
      <h1 className="text-center">Social media</h1>
    </main>
  );
}
