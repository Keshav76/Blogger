import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onclick: () => void;
}
function Button({ children, onclick }: Props) {
  return (
    <div
      className="bg-gray-900 w-full text-white py-2 text-center rounded-lg cursor-pointer"
      onClick={onclick}
    >
      {children}
    </div>
  );
}
export default Button;
