import React from "react";
import { Button } from "@heroui/react";

const CATS = [
  { id: 1, link: "/ame-short.webp" },
  { id: 2, link: "/sco-long.webp" },
  { id: 3, link: "/british-short.webp" },
  { id: 4, link: "/british-short2.webp" },
  { id: 5, link: "/ragdoll-long.webp" },
  { id: 6, link: "/russia-short.webp" },
  { id: 7, link: "/sai-long.webp" },
  { id: 8, link: "/sco-long.webp" },
  { id: 9, link: "/sco-long2.webp" },
  { id: 10, link: "/sco-short2.webp" },
];
const SIZE = "110px";

const Home = () => {
  return (
    <div className="space-x-2 space-y-8 flex flex-col items-center justify-center border rounded-lg w-full h-full px-2 py-4">
      <h1 className="text-xl text-gray-600">
        可愛いと思う方を選択してください。
      </h1>
      <div className="">
        <ul className="flex flex-row items-center justify-center space-x-4">
          <li className="flex flex-row items-center justify-center rounded-lg overflow-hidden shadow-sm">
            <Button
              className="w-full h-full px-0"
              startContent={<img src="/ame-short.webp" alt="" />}
            />
          </li>
          <li className="flex flex-row items-center justify-center rounded-lg overflow-hidden shadow-sm">
            <Button
              className="w-full h-full px-0"
              startContent={<img src="/sco-long.webp" alt="" />}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
