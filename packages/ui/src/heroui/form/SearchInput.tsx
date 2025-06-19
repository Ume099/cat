import { Input } from "@heroui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
} & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

type SearchInputProps = {
  register: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  register,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <Input
      {...register}
      isClearable
      className={`${className} `}
      classNames={{
        mainWrapper: ["rounded-lg", "border-black"],
        label: "text-black/50",
        input: [
          "bg-transparent",
          "text-black/70",
          "placeholder:text-default-700/50",
          "px-2",
          "focus:outline-0",
        ],
        innerWrapper: ["bg-transparent"],
        inputWrapper: [
          "border",
          "border-gray-400",
          "rounded-full",
          "bg-default-200/50",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "group-data-[focus=true]:bg-default-200/50",
          "!cursor-text",
        ],
      }}
      placeholder={placeholder}
      radius="lg"
      startContent={
        <SearchIcon className="text-black/50 mb-0.5 text-slate-400 pointer-events-none flex-shrink-0 mr-2" />
      }
    />
  );
}
