import { useNavigate } from "react-router-dom";
import AuthBox from "../components/AuthBox";
import Button from "../components/Button";
import Input from "../components/Input";
import Quotation from "../components/Quotation";
import { useRef } from "react";
// import { signin } from "../hooks";
import { userNameAtom, userTokenAtom } from "../state";
import { useSetRecoilState } from "recoil";
import { SigninType } from "@keshav-banka/validation";
import axios from "axios";

function Signin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const setUserToken = useSetRecoilState(userTokenAtom);
  const setUserName = useSetRecoilState(userNameAtom);

  const signinHandler = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(emailRef.current);
    console.log(passwordRef.current);

    if (!email || !password) {
      return alert("Enter email and password");
    }

    const userData: SigninType = {
      email,
      password,
    };
    axios
      .post<{
        token: string;
        name: string;
      }>(
        "https://week-13-backend.lollolipop6969.workers.dev/api/v1/signin",
        userData
      )
      .then((res) => {
        setUserToken(res.data.token);
        setUserName(res.data.name);
      })
      .catch(console.log);

    nav("/");
  };

  return (
    <div className="grid grid-cols-2 items-center h-full w-full gap-3">
      <AuthBox>
        <h1 className="font-black tracking-tight text-3xl">
          Sign In to your account
        </h1>
        <p className="text-gray-500 text-sm mb-5">
          Dont't have an account?
          <span
            className="underline ml-2 cursor-pointer"
            onClick={() => nav("/signup")}
          >
            Signup
          </span>
        </p>
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
        <Button onclick={signinHandler}>Signin</Button>
      </AuthBox>
      <Quotation
        content="The customer service I recieved was exceptional. The support team went above and beyond to address my concerns."
        author="James Clerk"
        designation="CEO, McKinsey"
      />
    </div>
  );
}
export default Signin;
