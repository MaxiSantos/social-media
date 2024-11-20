interface Props {
  children: React.ReactNode;
};

const MainSection = (props: Props) => {
  const { children } = props;
  return <section className='main-container'>
  <div className='w-full max-w-4xl'>
    {children}
  </div>
</section>
}

export default MainSection;