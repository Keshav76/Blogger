import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useRef } from "react";
import axios from "axios";
import { CreateType } from "@keshav-banka/validation";
import { userTokenAtom } from "../state";
import { useRecoilValue } from "recoil";
// import { useCreate } from "../hooks";

function NewBlog() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const token = useRecoilValue(userTokenAtom);

  const handleCreate = () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!title || !content) return alert("Enter title and story.");
    const blogData: CreateType = {
      content,
      title,
      published: true,
    };
    axios
      .post(
        "https://week-13-backend.lollolipop6969.workers.dev/api/v1/blog",
        blogData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Posted!");
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nav = useNavigate();
  return (
    <div className="grid grid-rows-12">
      <Appbar>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white rounded-full px-5 py-2"
        >
          Publish
        </button>
      </Appbar>
      <div className="row-span-10 grid grid-cols-8 mt-16">
        <div className="flex items-center pr-2 justify-end border-r-2 h-20  fill-gray-400">
          <svg className="size-10" viewBox="0 0 490 490">
            <g id="SVGRepo_iconCarrier">
              <path d="M227.8,174.1v53.7h-53.7c-9.5,0-17.2,7.7-17.2,17.2s7.7,17.2,17.2,17.2h53.7v53.7c0,9.5,7.7,17.2,17.2,17.2 s17.1-7.7,17.1-17.2v-53.7h53.7c9.5,0,17.2-7.7,17.2-17.2s-7.7-17.2-17.2-17.2h-53.7v-53.7c0-9.5-7.7-17.2-17.1-17.2 S227.8,164.6,227.8,174.1z"></path>
              <path d="M71.7,71.7C25.5,118,0,179.5,0,245s25.5,127,71.8,173.3C118,464.5,179.6,490,245,490s127-25.5,173.3-71.8 C464.5,372,490,310.4,490,245s-25.5-127-71.8-173.3C372,25.5,310.5,0,245,0C179.6,0,118,25.5,71.7,71.7z M455.7,245 c0,56.3-21.9,109.2-61.7,149s-92.7,61.7-149,61.7S135.8,433.8,96,394s-61.7-92.7-61.7-149S56.2,135.8,96,96s92.7-61.7,149-61.7 S354.2,56.2,394,96S455.7,188.7,455.7,245z"></path>
            </g>
          </svg>
        </div>
        <div>
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            className="outline-none text-6xl ml-2"
          />
          <textarea
            ref={contentRef}
            rows={20}
            cols={100}
            className="outline-none ml-2 mt-4"
            placeholder="Tell your story..."
          />
        </div>
      </div>
    </div>
  );
}
export default NewBlog;
