import { atom } from "recoil";

export const userTokenAtom = atom({
  key: "userTokenAtom",
  default: "",
});

export const userNameAtom = atom({
  key: "userNameAtom",
  default: "Anonymus",
});
