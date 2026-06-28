"use client";

import { ThemeResponseDto } from "@/lib/types/admin/theme/theme.types";
import { EditThemeDialog } from "./editThemeDialog";
import { DeleteThemeDialog } from "./deleteThemeDialog";

interface Props {
  category: ThemeResponseDto;
}

export function ThemeActionsCell({ category }: Props) {
  return (
    <div className="flex items-center justify-center gap-1">
      <EditThemeDialog category={category} />
      <DeleteThemeDialog category={category} />
    </div>
  );
}