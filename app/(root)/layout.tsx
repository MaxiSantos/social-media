import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import TopBar from "@/components/shared/TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <main className='flex'>
        <LeftSideBar />
        <section className='main-container'>
          <div className='w-full max-w-4xl'>
            {children}
          </div>
        </section>
        <RightSideBar />
      </main>
      <BottomBar />
    </>
  );
}