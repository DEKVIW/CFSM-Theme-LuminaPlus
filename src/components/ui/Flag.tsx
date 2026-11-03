import { Globe2 } from "lucide-react";
import { t } from "@/i18n";
import { getDisplayRegionCode } from "@/utils/geo";

interface FlagProps {
  region?: string | null;
  size?: number;
}

export function Flag({ region, size = 14 }: FlagProps) {
  const value = region?.trim() ?? "";

  if (!value) {
    return (
      <span className="region-marker" aria-hidden style={{ width: size + 8, height: size }}>
        <Globe2 size={size - 1} strokeWidth={2.1} />
      </span>
    );
  }

  const flagCode = getDisplayRegionCode(value);
  const alt = t("flag.alt", { code: flagCode });

  return (
    <span
      role="img"
      aria-label={alt}
      title={alt}
      className="region-marker"
      data-region-code={flagCode}
      style={{ width: size + 8, height: size }}
    >
      {flagCode === "UN" ? <Globe2 size={size - 1} strokeWidth={2.1} /> : flagCode}
    </span>
  );
}
