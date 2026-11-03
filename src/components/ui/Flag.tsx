import { Globe2 } from "lucide-react";
import * as FlagIcons from "country-flag-icons/react/3x2";
import type { ComponentType, SVGProps } from "react";
import { t } from "@/i18n";
import { getDisplayRegionCode } from "@/utils/geo";

interface FlagProps {
  region?: string | null;
  size?: number;
}

type CountryFlag = ComponentType<SVGProps<SVGSVGElement>>;

function countryFlag(code: string): CountryFlag | null {
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized) || normalized === "UN") return null;

  // Do not use Unicode regional indicators here: Windows commonly renders them
  // as the literal country code (for example, "US") instead of a flag.
  return (FlagIcons as Record<string, CountryFlag | undefined>)[normalized] ?? null;
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
  const FlagIcon = countryFlag(flagCode);

  return (
    <span
      role="img"
      aria-label={alt}
      title={alt}
      className="region-marker"
      data-region-code={flagCode}
      style={{ width: size + 8, height: size, fontSize: size }}
    >
      {FlagIcon ? (
        <FlagIcon aria-hidden focusable="false" width={size + 8} height={size} />
      ) : (
        <Globe2 size={size - 1} strokeWidth={2.1} />
      )}
    </span>
  );
}
