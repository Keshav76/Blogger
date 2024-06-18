import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function AuthBox({ children }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full items-center md:px-40 p-4">
      {children}
    </div>
  );
}
export default AuthBox;
