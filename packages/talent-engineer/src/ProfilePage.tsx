import { useParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import EngineerProfile from "./components/EngineerProfile.js";

// プロファイルデータの型定義
interface Profile {
  id: string;
  name: string;
  username: string;
  title: string;
  yearsOfExperience: number;
  language: string;
  hoursPerWeek: number;
  hourlyRate: string | number;
}

const profiles: Record<string, Profile> = {
  "1": {
    id: "1",
    name: "trouni",
    username: "trouni",
    title: "ソフトウェアエンジニア",
    yearsOfExperience: 5,
    language: "日本語",
    hoursPerWeek: 20,
    hourlyRate: "非公開",
  },
  "2": {
    id: "2",
    name: "caven",
    username: "caven",
    title: "プロダクトマネージャー",
    yearsOfExperience: 19,
    language: "日本語",
    hoursPerWeek: 40,
    hourlyRate: 10000,
  },
  "3": {
    id: "3",
    name: "kubojin9",
    username: "kubojin9",
    title: "データベースアーキテクト",
    yearsOfExperience: 18,
    language: "日本語",
    hoursPerWeek: 40,
    hourlyRate: 8000,
  },
};

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (typeof id === "string" && profiles[id]) {
      setProfile(profiles[id]);
    } else {
      setProfile(null); // プロファイルが見つからない場合
    }
  }, [id]);

  if (!profile) return <div>プロフィールが見つかりません</div>;

  return <EngineerProfile {...profile} />;
}
