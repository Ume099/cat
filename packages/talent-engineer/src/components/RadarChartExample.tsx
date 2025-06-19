import { Select, SelectItem } from "@heroui/react";
import React, { useState, useMemo } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Text,
} from "recharts";

export type CustomizedLabelProps = {
  x: number;
  y: number;
  payload: { value: string };
  angle: number;
};

const CustomizedLabel = (props: CustomizedLabelProps) => {
  const { x, y, payload, angle } = props;
  return (
    <Text
      x={x}
      y={y}
      textAnchor="middle"
      verticalAnchor="middle"
      transform={`rotate(${angle}, ${x}, ${y})`}
      fontSize={11}
      fill="#222"
    >
      {payload.value}
    </Text>
  );
};

type DataItem = {
  subject: string;
  Before: number;
  After: number;
  fullMark: number;
};

// データの定義（全34項目）
const data: DataItem[] = [
  { subject: "戦略立案", Before: 4, After: 3, fullMark: 5 },
  { subject: "情報戦略策定", Before: 4, After: 3, fullMark: 5 },
  { subject: "ビジネスモデル定義", Before: 3, After: 4, fullMark: 5 },
  { subject: "市場・自社・競合の分析", Before: 4, After: 5, fullMark: 5 },
  { subject: "ビジネス策略策定", Before: 4, After: 5, fullMark: 5 },
  { subject: "ビジネス企画・提案策定", Before: 4, After: 5, fullMark: 5 },
  // { subject: "要件定義・計画策定", Before: 4, After: 5, fullMark: 5 },
  { subject: "要件定義", Before: 4, After: 5, fullMark: 5 },
  { subject: "情報システム計画策定", Before: 4, After: 5, fullMark: 5 },
  { subject: "ITプロセス管理", Before: 4, After: 5, fullMark: 5 },
  { subject: "プロジェクト進捗コントロール", Before: 4, After: 5, fullMark: 5 },
  { subject: "要員・スキル管理", Before: 4, After: 5, fullMark: 5 },
  { subject: "協力会社管理", Before: 2, After: 3, fullMark: 5 },
  { subject: "仕様変更管理", Before: 4, After: 5, fullMark: 5 },
  { subject: "システム設計", Before: 1, After: 2, fullMark: 5 },
  { subject: "システム分析", Before: 4, After: 5, fullMark: 5 },
  { subject: "アーキテクチャ定義", Before: 2, After: 1, fullMark: 5 },
  { subject: "インフラ設計", Before: 3, After: 2, fullMark: 5 },
  { subject: "管理・開発標準作成", Before: 4, After: 5, fullMark: 5 },
  { subject: "システム開発", Before: 4, After: 3, fullMark: 5 },
  { subject: "構築", Before: 4, After: 3, fullMark: 5 },
  { subject: "テスト計画", Before: 4, After: 3, fullMark: 5 },
  { subject: "単体・結合テスト", Before: 4, After: 5, fullMark: 5 },
  { subject: "システムテスト", Before: 4, After: 5, fullMark: 5 },
  { subject: "システム移行", Before: 4, After: 5, fullMark: 5 },
  { subject: "移行計画", Before: 5, After: 4, fullMark: 5 },
  { subject: "インフラ導入", Before: 4, After: 5, fullMark: 5 },
  { subject: "システム運用", Before: 4, After: 5, fullMark: 5 },
  { subject: "ヘルプデスク", Before: 4, After: 5, fullMark: 5 },
  { subject: "運用・保守", Before: 4, After: 5, fullMark: 5 },
  { subject: "運用計画", Before: 3, After: 2, fullMark: 5 },
  { subject: "調整・評価", Before: 4, After: 5, fullMark: 5 },
  { subject: "プロジェクト評価", Before: 4, After: 5, fullMark: 5 },
  { subject: "宣伝・広告・イベント企画", Before: 4, After: 5, fullMark: 5 },
  { subject: "催促・折衝・調整", Before: 4, After: 5, fullMark: 5 },
];

// プリセットの定義
type Preset = {
  name: string;
  label: string;
  subjects: string[];
};

const presets: Preset[] = [
  {
    name: "strategy",
    label: "戦略と要件定義",
    subjects: [
      "戦略立案",
      "情報戦略策定",
      "ビジネスモデル定義",
      "市場・自社・競合の分析",
      "ビジネス策略策定",
      "ビジネス企画・提案策定",
      // "要件定義・計画策定",
      "要件定義",
      "情報システム計画策定",
      "ITプロセス管理",
      "プロジェクト進捗コントロール",
      "要員・スキル管理",
      "協力会社管理",
      "仕様変更管理",
    ],
  },
  {
    name: "design",
    label: "設計から移行まで",
    subjects: [
      "システム設計",
      "システム分析",
      "アーキテクチャ定義",
      "インフラ設計",
      "管理・開発標準作成",
      "システム開発",
      "構築",
      "テスト計画",
      "単体・結合テスト",
      "システムテスト",
      "システム移行",
      "移行計画",
      "インフラ導入",
    ],
  },
  {
    name: "operation",
    label: "運用と最適化",
    subjects: [
      "運用・保守",
      "システム運用",
      "ヘルプデスク",
      "運用計画",
      "調整・評価",
      "プロジェクト評価",
      "宣伝・広告・イベント企画",
      "催促・折衝・調整",
    ],
  },
];

type RadarChartExampleProps = {
  title: string;
};

const RadarChartExample: React.FC<RadarChartExampleProps> = ({ title }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(
    presets[0]!.label
  );

  const selectedSubjects = useMemo(() => {
    const preset = presets.find((preset) => preset.label === selectedPreset);
    return preset ? preset.subjects : [];
  }, [selectedPreset]);

  const filteredData = useMemo(() => {
    return data.filter((item) => selectedSubjects.includes(item.subject));
  }, [selectedSubjects]);

  const handleSelectionChange = (
    keys: "all" | (Set<React.Key> & { anchorKey?: string; currentKey?: string })
  ) => {
    if (keys === "all") {
      setSelectedPreset(presets[0]!.label);
    } else if (keys instanceof Set) {
      const selectedArray = Array.from(keys as Set<string>);
      if (selectedArray.length > 0) {
        setSelectedPreset(selectedArray[0]!);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "-9px",
          marginBottom: "-10px",
        }}
      >
        <h1 className="text-2xl font-bold text-left">{title}</h1>

        <Select
          className="max-w-xs"
          label="スキルプリセットを選択"
          selectedKeys={new Set([selectedPreset])}
          onSelectionChange={handleSelectionChange}
        >
          {presets.map((preset) => (
            <SelectItem key={preset.label}>{preset.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div style={{ flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="78%" data={filteredData}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={
                <CustomizedLabel
                  x={0}
                  y={0}
                  payload={{
                    value: "",
                  }}
                  angle={0}
                />
              }
            />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar
              name="実施前評価"
              dataKey="Before"
              stroke="#8884d8"
              strokeOpacity={0.6}
              fill="#8884d8"
              fillOpacity={0.35}
            />
            <Radar
              name="実施後評価"
              dataKey="After"
              stroke="#ff7300"
              strokeOpacity={0.6}
              fill="#ff7300"
              fillOpacity={0.35}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartExample;
