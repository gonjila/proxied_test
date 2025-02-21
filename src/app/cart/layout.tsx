import { Header } from "./components";

type Props = { children: React.ReactNode };

function layout({ children }: Props) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}

export default layout;
