import { ToggleSwitchProps } from "../../model/type";

export default function ToggleSwitch({
  label,
  description,
  ...inputProps
}: ToggleSwitchProps) {
  return (
    <label className="flex items-center space-x-4 cursor-pointer justify-between">
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{label}</span>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </div>

      <div className="relative">
        <input type="checkbox" className="sr-only peer" {...inputProps} />
        <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all peer-focus:ring-2 peer-focus:ring-blue-500" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full" />
      </div>
    </label>
  );
}
