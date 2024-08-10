type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
};

const Heading = ({ children, className, as = "h1" }: Props) => {
  const HeadingTag = as;
  let style;

  if (as === "h1")
    style = `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`;
  if (as === "h2")
    style = `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`;
  if (as === "h3") style = `scroll-m-20 text-2xl font-semibold tracking-tight`;
  if (as === "h4") style = `scroll-m-20 text-xl font-semibold tracking-tight`;

  style += ` text-stone-800 dark:text-stone-100 ${className}`;
  return <HeadingTag className={style}>{children}</HeadingTag>;
};

export default Heading;
