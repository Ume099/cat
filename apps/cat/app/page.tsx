"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import classNames from "classnames";
import { addToast, Button } from "@heroui/react";
import axios from "axios";

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
  const [winnerCat, setWinnerCat] = useState<{
    id: number;
    link: string;
  }>(CATS[0]!);
  const [prevWinnerCat, setPrevWinnerCat] = useState<{
    id: number;
    link: string;
  }>(CATS[1]!);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [pressed, setPressed] = useState<"left" | "right" | null>(null);

  // 👇 MouseEvent でクリック座標を取得できるようにする
  const handleVote = (
    selected: "left" | "right",
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPressed(selected);

    // クリック位置を取得
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
      });

      const challenger = CATS[currentIndex]!;
      const nextIndex = currentIndex + 1;

      // 👇 負けた猫を保存
      if (selected === "left") {
        setPrevWinnerCat(challenger); // 右を選ばなかった＝右が負けた
      } else {
        setPrevWinnerCat(winnerCat); // 左を選ばなかった＝左が負けた
        setWinnerCat(challenger); // 勝者入れ替え
      }

      if (nextIndex >= CATS.length) {
        setIsFinished(true);
      } else {
        setCurrentIndex(nextIndex);
      }

      setPressed(null);
    }, 100);
  };

  const sendMail = (winnerCatName: string, preWinnerCatName: string) => {
    try {
      const res = axios.post("/api/send-mail", {
        no1: winnerCatName,
        no2: preWinnerCatName,
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "HTTP通信に失敗しました。",
      });
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-2xl text-orange-600 font-bold">
          🎊 おすすめの猫ちゃん 🎊
        </h1>
        <img
          src={winnerCat.link}
          alt="勝者のねこ"
          className="rounded-lg shadow-md"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
        <Button onPress={() => sendMail(winnerCat.link, prevWinnerCat.link)} />
      </div>
    );
  }

  const challenger = CATS[currentIndex];

  return (
    <div className="space-y-8 flex flex-col items-center justify-center w-full h-full px-2 py-4">
      <h1 className="text-xl text-gray-600">
        可愛いと思う方を選んでください。
      </h1>
      <div className="flex space-x-8">
        <button
          onClick={(e) => handleVote("left", e)} // 👈 event 渡す
          className={classNames(
            "transition transform duration-100 ease-in-out focus:outline-none",
            pressed === "left" ? "scale-90" : "scale-100"
          )}
        >
          <img
            src={winnerCat.link}
            alt="左のねこ"
            style={{ width: SIZE, height: SIZE, objectFit: "cover" }}
            className="rounded-lg shadow"
          />
        </button>
        <button
          onClick={(e) => handleVote("right", e)}
          className={classNames(
            "transition transform duration-100 ease-in-out focus:outline-none",
            pressed === "right" ? "scale-90" : "scale-100"
          )}
        >
          <img
            src={challenger!.link}
            alt="右のねこ"
            style={{ width: SIZE, height: SIZE, objectFit: "cover" }}
            className="rounded-lg shadow"
          />
        </button>
      </div>

      <Button onPress={() => sendMail("a", "b")} aria-label="aaa">
        aa
      </Button>
    </div>
  );
};

export default Home;
