export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex justify-center items-center min-h-screen'>
      {children}
    </div>
  );
}