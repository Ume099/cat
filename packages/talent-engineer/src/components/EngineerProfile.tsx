import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LEVEL_LIST_OBJ } from "../consts/profile";
import {
  AcademicBg,
  EngineerProfileProps,
  JobHistory,
  Skill,
} from "../model/type";
import RadarChartExample from "./RadarChartExample";

export default function EngineerProfile({
  name,
  username,
  title,
  yearsOfExperience,
  language,
  hoursPerWeek,
  hourlyRate, // 文字列または数値として受け取る
}: EngineerProfileProps) {
  /** =========================================================
   * 職歴（jobHistories）
   * ========================================================= */
  const [jobHistories, setJobHistories] = useState<JobHistory[]>([
    { company: "", position: "", duration: "", client: "" },
  ]);

  /** =========================================================
   *  スキル / 推奨技術
   * ========================================================= */
  const [skills, setSkills] = useState<Skill[]>([{ name: "", level: 1 }]);

  /** =========================================================
   * 職歴セクションのハンドラー
   * ========================================================= */
  const handleJobChange = (
    index: number,
    field: keyof JobHistory,
    value: string
  ) => {
    const updated = [...jobHistories];
    updated[index]![field] = value;
    setJobHistories(updated);
  };

  const addJobHistory = () => {
    setJobHistories([
      ...jobHistories,
      { company: "", position: "", duration: "", client: "" },
    ]);
  };

  const removeJobHistory = (index: number) => {
    const updated = jobHistories.filter((_, i) => i !== index);
    setJobHistories(updated);
  };

  /** =========================================================
   * スキル
   * ========================================================= */
  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string | number
  ) => {
    if (index < 0 || index >= skills.length) {
      throw new Error("Invalid index");
    }
    const updated = [...skills];
    if (field === "name" && typeof value === "string") {
      updated[index]!.name = value;
    } else if (field === "level" && typeof value === "number") {
      updated[index]!.level = value;
    } else {
      throw new Error("Field and value type mismatch");
    }
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 1 }]);
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  /** =========================================================
   * 学歴
   * ========================================================= */

  const [academicBackgrounds, setAcademicBackground] = useState<AcademicBg[]>([
    { name: "", school: "", major: "", duration: "" },
  ]);
  const addAcademicBackground = () => {
    setAcademicBackground([
      ...academicBackgrounds,
      { name: "", school: "", major: "", duration: "" },
    ]);
  };

  const removeAcademicBackground = (index: number) => {
    setAcademicBackground((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAcademicBgChange = (
    index: number,
    field: keyof AcademicBg,
    value: string
  ) => {
    const newAcademicBg = [...academicBackgrounds];
    if (newAcademicBg[index] === undefined) {
      return;
    }

    newAcademicBg[index][field] = value;
    setAcademicBackground(newAcademicBg);
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================== 左カラム ========================== */}
        <div>
          {/* ----------- プロフィールセクション ----------- */}
          <div className="bg-white shadow rounded-lg mb-8 p-4">
            <div className="flex items-start space-x-4 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/6.x/initials/svg?seed=trouni"
                alt="Profile picture"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-xl">@{username}</p>
                <p className="text-lg font-semibold mt-2">{title}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 text-center">
              <div>
                <p className="font-bold">{yearsOfExperience} 年</p>
                <p className="text-sm">経験年数</p>
              </div>
              <div>
                <p className="font-bold">{language}</p>
                <p className="text-sm">言語</p>
              </div>
              <div>
                <p className="font-bold">{hoursPerWeek} 時間/週</p>
                <p className="text-sm">フルタイム</p>
              </div>
              <div>
                <p className="font-bold">{hourlyRate} 円</p>
                <p className="text-sm">大まかな時間単価</p>
              </div>
            </div>
          </div>

          {/* ----------- レーダーチャートセクション ----------- */}
          <div className="bg-white shadow rounded-lg mb-8 p-4">
            <RadarChartExample title="ビジネススキル" />
          </div>

          {/* ----------- スキルセクション ----------- */}
          <div className="bg-white shadow rounded-lg mb-8 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">スキル</h2>
              <Button
                onPress={addSkill}
                className="bg-primary text-white font-bold py-2 px-4 rounded"
                startContent={
                  <Icon icon="dashicons:plus" className="font-bold" />
                }
              >
                スキルを追加
              </Button>
            </div>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded mb-4 relative"
              >
                <div className="flex justify-end">
                  <Button
                    onPress={() => removeSkill(index)}
                    isIconOnly
                    className="text-red-500 bg-transparent text-xl"
                    title="削除"
                  >
                    &times;
                  </Button>
                </div>
                <div className="space-y-4">
                  <Input
                    label="スキル名"
                    variant="bordered"
                    placeholder="スキル名を入力"
                    value={skill.name}
                    onValueChange={(val) =>
                      handleSkillChange(index, "name", val)
                    }
                    classNames={{ inputWrapper: "bg-white" }}
                  />
                  <Select
                    variant="bordered"
                    label="スキルレベルを選択"
                    placeholder="レベル"
                    classNames={{ trigger: "bg-white" }}
                  >
                    {LEVEL_LIST_OBJ.map((level) => (
                      <SelectItem key={level.key}>{level.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            ))}
            <Button
              className="bg-primary text-white rounded ml-5"
              onPress={addSkill}
              startContent={
                <Icon icon="dashicons:plus" className="font-bold" />
              }
            >
              スキルを追加
            </Button>
          </div>
        </div>

        {/* ========================== 右カラム ========================== */}
        <div>
          {/* ----------- ビジョンセクション ----------- */}
          <div className="bg-white shadow rounded-lg mb-8 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">ビジョン</h2>
              <Button className="bg-primary text-white rounded font-bold">
                ビジョンを編集
              </Button>
            </div>
            <div className="space-y-2">
              <p>ビジョン申請</p>
              <p className="text-gray-400">
                ビジョンに合ったレコメンドが表示されます
              </p>
              <p>課題（前向き）申請</p>
              <p>悩み（後ろ向き）申請</p>
            </div>
          </div>

          {/* ----------- 職歴セクション ----------- */}
          <div className="bg-white shadow rounded-lg mb-8 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">職歴</h2>
              <Button
                onPress={addJobHistory}
                className="bg-primary text-white rounded font-bold"
              >
                職歴を追加
              </Button>
            </div>
            {jobHistories.map((job, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-xl space-y-4 mb-4 relative"
              >
                <div className="flex justify-end">
                  <Button
                    isIconOnly
                    size="sm"
                    className="text-red-500 font-bold bg-transparent text-lg rounded"
                    onPress={() => removeJobHistory(index)}
                    title="削除"
                  >
                    &times;
                  </Button>
                </div>

                {/* 会社名 */}
                <Input
                  label="会社名"
                  variant="bordered"
                  placeholder="会社名を入力"
                  value={job.company}
                  onValueChange={(val) =>
                    handleJobChange(index, "company", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />

                {/* 役職 */}
                <Input
                  label="役職"
                  variant="bordered"
                  placeholder="役職を入力"
                  value={job.position}
                  onValueChange={(val) =>
                    handleJobChange(index, "position", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />

                {/* 期間 */}
                <Input
                  label="期間"
                  variant="bordered"
                  placeholder="例: 2020年4月 - 2023年3月"
                  value={job.duration}
                  onValueChange={(val) =>
                    handleJobChange(index, "duration", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />

                {/* クライアント */}
                <Input
                  label="クライアント"
                  variant="bordered"
                  placeholder="クライアント名を入力（任意）"
                  value={job.client || ""}
                  onValueChange={(val) => handleJobChange(index, "client", val)}
                  classNames={{ inputWrapper: "bg-white" }}
                />
              </div>
            ))}
            <Button
              className="bg-primary text-white font-bold rounded ml-5"
              onPress={addJobHistory}
              startContent={
                <Icon icon="dashicons:plus" className="font-bold" />
              }
            >
              職歴を追加
            </Button>
          </div>

          {/* 学歴・資格 */}
          <div className="bg-white shadow rounded-xl mb-8 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">学歴</h2>
              <Button
                onPress={addAcademicBackground}
                className="bg-primary hover:bg-primary-dark text-white font-bold rounded"
                startContent={
                  <Icon icon="dashicons:plus" className="font-bold" />
                }
              >
                学歴の追加をリクエスト
              </Button>
            </div>
            {academicBackgrounds.map((academicBg, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-xl mb-4 relative space-y-2"
              >
                <div className="flex justify-end">
                  <Button
                    isIconOnly
                    size="sm"
                    className="text-red-500 font-bold bg-transparent text-lg rounded"
                    onPress={() => removeAcademicBackground(index)}
                    title="削除"
                  >
                    &times;
                  </Button>
                </div>

                {/* 学校名 */}
                <Input
                  label="学校名"
                  variant="bordered"
                  placeholder="学校名を入力"
                  value={academicBg.name}
                  onValueChange={(val) =>
                    handleAcademicBgChange(index, "name", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />

                {/* 学科 */}
                <Input
                  label="学部・学科"
                  variant="bordered"
                  placeholder="学部・学科を入力（任意）"
                  value={academicBg.school ?? ""}
                  onValueChange={(val) =>
                    handleAcademicBgChange(index, "school", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />

                {/* 専攻 */}
                <Input
                  label="専攻"
                  variant="bordered"
                  placeholder="専攻を入力（任意）"
                  value={academicBg.major ?? ""}
                  onValueChange={(val) =>
                    handleAcademicBgChange(index, "major", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />

                {/* 期間 */}
                <Input
                  label="期間"
                  variant="bordered"
                  placeholder="例: 2016年4月 - 2020年3月"
                  value={academicBg.duration}
                  onValueChange={(val) =>
                    handleAcademicBgChange(index, "duration", val)
                  }
                  classNames={{ inputWrapper: "bg-white" }}
                />
              </div>
            ))}
            {academicBackgrounds.length > 0 && (
              <Button
                onPress={addAcademicBackground}
                className="bg-primary hover:bg-primary-dark text-white font-bold rounded ml-5"
                startContent={
                  <Icon icon="dashicons:plus" className="font-bold" />
                }
              >
                学歴の追加をリクエスト
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
