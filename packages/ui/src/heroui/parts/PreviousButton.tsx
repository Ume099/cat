import { Button } from "@heroui/react";

import { Icon } from "@iconify/react";

type SearchInputProps = {
  onPress: () => void;
  className?: string;
  labelSrOnly: string;
};

export default function PreviousButton({
  onPress,
  labelSrOnly = "Previous",
  className = "",
}: SearchInputProps) {
  return (
    <Button
      onPress={onPress}
      type="button"
      className={`rounded-full border-gray-300 text-gray-400 hover:text-gray-500 focus:relative md:hover:bg-gray-50 ${className}`}
    >
      <span className="sr-only">{labelSrOnly}</span>
      <Icon
        icon="heroicons-outline:chevron-left"
        className="h-4 w-4"
        aria-hidden="true"
      />
    </Button>
  );
}
