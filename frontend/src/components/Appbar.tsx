import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userTokenAtom } from "../state";

interface Props {
  children: ReactNode;
}
function Appbar({ children }: Props) {
  const nav = useNavigate();
  const setUserToken = useSetRecoilState(userTokenAtom);
  return (
    <div className="flex justify-between px-16 py-2 items-center w-full overflow-hidden">
      <div onClick={() => nav("/")} className="flex gap-3 items-center">
        <svg
          viewBox="0 -55 256 256"
          version="1.1"
          className="size-10"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path
              d="M72.2009141,1.42108547e-14 C112.076502,1.42108547e-14 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,1.42108547e-14 72.2009141,1.42108547e-14 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 L223.603538,72.6964154 C223.603538,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"
              fill="#000000"
            ></path>
          </g>
        </svg>
        <div className="text-lg  tracking-tighter">Medium</div>
      </div>
      <div className="flex items-center gap-5">
        {children && children}
        <div
          onClick={() => {
            setUserToken("");
            nav("/signin");
          }}
          className="size-8 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default Appbar;
