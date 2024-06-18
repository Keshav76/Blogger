import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import AuthBox from "../components/AuthBox";
import Button from "../components/Button";
import Input from "../components/Input";
import Quotation from "../components/Quotation";
import { SignupType } from "@keshav-banka/validation";
import { useSetRecoilState } from "recoil";
import { userNameAtom, userTokenAtom } from "../state";
import axios from "axios";

function Signup() {
  const nav = useNavigate();
  const setUserToken = useSetRecoilState(userTokenAtom);
  const setUserName = useSetRecoilState(userNameAtom);

  const signupHandler = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    if (!email || !password) {
      return alert("Enter email and password");
    }
    const userData: SignupType = {
      email,
      password,
      name,
    };
    axios
      .post<{
        token: string;
        name: string;
      }>(
        "https://week-13-backend.lollolipop6969.workers.dev/api/v1/signup",
        userData
      )
      .then((res) => {
        setUserToken(res.data.token);
        setUserName(res.data.name);
        nav("/");
      })
      .catch(console.log);
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid grid-cols-2 items-center h-full w-full gap-3">
      <AuthBox>
        <h1 className="font-black tracking-tight text-3xl">
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mb-5">
          Already have an account?
          <span
            className="underline ml-2 cursor-pointer"
            onClick={() => nav("/signin")}
          >
            Signin
          </span>
        </p>
        <Input
          refer={nameRef}
          title="Username"
          type="text"
          id="username"
          placeholder="Username"
        />
        <Input
          refer={emailRef}
          title="Email"
          type="email"
          id="email"
          placeholder="Email"
        />
        <Input
          refer={passwordRef}
          title="Password"
          type="password"
          id="password"
          placeholder="Password"
        />
        <Button onclick={signupHandler}>Signup</Button>
      </AuthBox>
      <Quotation
        content="The customer service I recieved was exceptional. The support team went above and beyond to address my concerns."
        author="James Clerk"
        designation="CEO, McKinsey"
      />
    </div>
  );
}
export default Signup;
