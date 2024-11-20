import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import MainSection from "@/components/shared/MainSection";
import RightSideBar from "@/components/shared/RightSideBar";
import TopBar from "@/components/shared/TopBar";
import { auth } from "@clerk/nextjs/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  return (
    <>
      <TopBar />
      <main className='flex'>
        <LeftSideBar userId={userId} />
        <MainSection>
          {children}
        </MainSection>
        <RightSideBar />
      </main>
      <BottomBar userId={userId} />
    </>
  );
}