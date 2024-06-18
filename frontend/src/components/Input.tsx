import { HTMLInputTypeAttribute, RefObject } from "react";

interface Props {
  refer: RefObject<HTMLInputElement> | undefined;
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  title: string;
}
function Input({ refer, type, id, placeholder, title }: Props) {
  return (
    <div className="flex flex-col gap-1  w-full">
      <label className="text-sm font-medium" htmlFor={id}>
        {title}
      </label>
      <input
        ref={refer}
        className="outline-none border-gray-500 border-[1px] focus:border-2 focus:border-gray-900 rounded-lg px-3 py-1"
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}
export default Input;
