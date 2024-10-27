interface TypographyProps {
  children: React.ReactNode;
}

export const H1 = (props: TypographyProps) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  );
};
