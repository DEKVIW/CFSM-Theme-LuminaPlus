import { Globe2 } from "lucide-react";
import { t } from "@/i18n";
import { getDisplayRegionCode } from "@/utils/geo";

interface FlagProps {
  region?: string | null;
  size?: number;
}

function countryFlagEmoji(code: string): string | null {
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized) || normalized === "UN") return null;
  return Array.from(normalized)
    .map((character) => String.fromCodePoint(0x1f1e6 + character.charCodeAt(0) - 65))
    .join("");
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
  const emoji = countryFlagEmoji(flagCode);

  return (
    <span
      role="img"
      aria-label={alt}
      title={alt}
      className="region-marker"
      data-region-code={flagCode}
      style={{ width: size + 8, height: size, fontSize: size }}
    >
      {emoji ? emoji : <Globe2 size={size - 1} strokeWidth={2.1} />}
    </span>
  );
}
