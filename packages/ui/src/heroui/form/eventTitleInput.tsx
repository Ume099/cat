import { Input } from "@heroui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id?: string;
  type?: string;
  placeholder?: string;
  className?: string;
} & UseFormRegisterReturn;

export default function EventTitleInput({
  id = "title",
  type = "text",
  placeholder = "タイトルを追加",
  name,
  onBlur,
  onChange,
  ref,
  className = "",
}: Props) {
  return (
    <Input
      variant="bordered"
      size="lg"
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      className={className}
    />
  );
}
