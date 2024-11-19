import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import TopBar from "@/components/shared/TopBar";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  return (
    <>
      <TopBar />
      <main className='flex'>
        <LeftSideBar userId={userId} />
        <section className='main-container'>
          <div className='w-full max-w-4xl'>
            {children}
          </div>
        </section>
        <RightSideBar />
      </main>
      <BottomBar userId={userId} />
    </>
  );
}