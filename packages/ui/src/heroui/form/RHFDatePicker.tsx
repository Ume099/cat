import {
  DatePicker,
  type DatePickerProps,
  type DateValue,
} from "@heroui/react";
import { forwardRef, useState } from "react";

/* -------------------- register が渡すシグネチャを許容 -------------------- */
type RegisterLike = {
  name: string;
  onBlur: (e?: unknown) => void; // ← event 付きでも無しでも受け取れる
  onChange: (e: unknown) => void; // ← string / ChangeEvent など
};

/* 外から追加コールバックを受けるなら別名で */
type RHFDatePickerProps = Omit<
  DatePickerProps<DateValue>,
  "value" | "onChange" | "onBlur"
> &
  RegisterLike & {
    onValueChange?: (v: DateValue | null) => void; // 任意
  };

export const RHFDatePicker = forwardRef<HTMLInputElement, RHFDatePickerProps>(
  ({ name, onBlur, onChange, onValueChange, ...rest }, inputRef) => {
    const [value, setValue] = useState<DateValue | null>(null);

    const toIso = (v: DateValue | null) =>
      v
        ? `${v.year}-${String(v.month).padStart(2, "0")}-${String(
            v.day,
          ).padStart(2, "0")}`
        : "";

    return (
      <>
        {/* RHF が監視する hidden input */}
        <input
          type="hidden"
          name={name}
          ref={inputRef}
          value={toIso(value)}
          onChange={() => {}}
        />

        {/* 表示用 DatePicker */}
        <DatePicker
          {...rest}
          value={value ?? undefined}
          onBlur={onBlur}
          onChange={(v) => {
            setValue(v);
            onChange({
              target: { name, value: toIso(v) },
            });
            onValueChange?.(v);
          }}
        />
      </>
    );
  },
);

RHFDatePicker.displayName = "RHFDatePicker";
