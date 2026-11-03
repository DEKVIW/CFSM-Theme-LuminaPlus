import {
  siAlmalinux,
  siAlpinelinux,
  siArchlinux,
  siCentos,
  siDebian,
  siFedora,
  siFreebsd,
  siGentoo,
  siHuawei,
  siKalilinux,
  siLinux,
  siLinuxmint,
  siMacos,
  siManjaro,
  siNixos,
  siOpensuse,
  siOpenwrt,
  siProxmox,
  siQnap,
  siRedhat,
  siRockylinux,
  siSynology,
  siUbuntu,
  siUnraid,
  siAlibabacloud,
  type SimpleIcon,
} from "simple-icons";
import { HardDrive, Monitor, Server, Terminal } from "lucide-react";
import { memo, type CSSProperties, type ReactNode } from "react";

interface OsConfig {
  name: string;
  image: string;
  keywords: string[];
}

const OS_NAME_SPLIT_REGEX = /[\s/]+/;

const OS_CONFIGS: OsConfig[] = [
  {
    name: "AlmaLinux",
    image: "os-alma.svg",
    keywords: ["alma", "almalinux"],
  },
  {
    name: "Alpine Linux",
    image: "os-alpine.webp",
    keywords: ["alpine", "alpine linux"],
  },
  {
    name: "Armbian",
    image: "os-armbian.png",
    keywords: ["armbian"],
  },
  {
    name: "CentOS",
    image: "os-centos.svg",
    keywords: ["centos", "cent os"],
  },
  {
    name: "Debian",
    image: "os-debian.svg",
    keywords: ["debian", "deb"],
  },
  {
    name: "FreeBSD",
    image: "os-unknown.svg",
    keywords: ["freebsd", "bsd"],
  },
  {
    name: "Ubuntu",
    image: "os-ubuntu.svg",
    keywords: ["ubuntu", "elementary"],
  },
  {
    name: "Windows",
    image: "os-windows.svg",
    keywords: ["windows", "win", "microsoft", "ms"],
  },
  {
    name: "Arch Linux",
    image: "os-arch.svg",
    keywords: ["arch", "archlinux", "arch linux"],
  },
  {
    name: "Kali Linux",
    image: "os-kail.svg",
    keywords: ["kail", "kali", "kali linux"],
  },
  {
    name: "iStoreOS",
    image: "os-istore.png",
    keywords: ["istore", "istoreos", "istore os"],
  },
  {
    name: "OpenWrt",
    image: "os-openwrt.svg",
    keywords: ["openwrt", "open wrt", "open-wrt", "qwrt"],
  },
  {
    name: "ImmortalWrt",
    image: "os-openwrt.svg",
    keywords: ["immortalwrt", "immortal", "emmortal"],
  },
  {
    name: "NixOS",
    image: "os-nix.svg",
    keywords: ["nixos", "nix os", "nix"],
  },
  {
    name: "Rocky Linux",
    image: "os-rocky.svg",
    keywords: ["rocky", "rocky linux"],
  },
  {
    name: "Fedora",
    image: "os-fedora.svg",
    keywords: ["fedora"],
  },
  {
    name: "openSUSE",
    image: "os-openSUSE.svg",
    keywords: ["opensuse", "suse"],
  },
  {
    name: "Gentoo",
    image: "os-gentoo.svg",
    keywords: ["gentoo"],
  },
  {
    name: "Red Hat",
    image: "os-redhat.svg",
    keywords: ["redhat", "rhel", "red hat"],
  },
  {
    name: "Linux Mint",
    image: "os-mint.svg",
    keywords: ["mint", "linux mint"],
  },
  {
    name: "Manjaro",
    image: "os-manjaro-.svg",
    keywords: ["manjaro"],
  },
  {
    name: "Synology DSM",
    image: "os-synology.ico",
    keywords: ["synology", "dsm", "synology dsm"],
  },
  {
    name: "fnOS",
    image: "os-unknown.svg",
    keywords: ["fnos", "fnnas"],
  },
  {
    name: "Proxmox VE",
    image: "os-proxmox.ico",
    keywords: ["proxmox", "proxmox ve"],
  },
  {
    name: "macOS",
    image: "os-macos.svg",
    keywords: ["macos", "mac os", "mac os x", "osx", "darwin"],
  },
  {
    name: "QTS",
    image: "os-unknown.svg",
    keywords: ["qts", "quts hero", "qes", "qutscloud"],
  },
  {
    name: "Astra Linux",
    image: "os-unknown.svg",
    keywords: ["astra", "astra linux"],
  },
  {
    name: "Orange Pi",
    image: "os-unknown.svg",
    keywords: ["orange pi", "orangepi"],
  },
  {
    name: "Huawei",
    image: "os-unknown.svg",
    keywords: ["huawei", "euleros", "euler os"],
  },
  {
    name: "Aliyun",
    image: "os-alibaba.svg",
    keywords: ["aliyun", "alibaba"],
  },
  {
    name: "OpenCloudOS",
    image: "os-opencloud.svg",
    keywords: ["opencloud"],
  },
  {
    name: "Unraid",
    image: "os-unknown.svg",
    keywords: ["unraid"],
  },
];

const DEFAULT_OS_CONFIG: OsConfig = {
  name: "Linux",
  image: "os-unknown.svg",
  keywords: ["unknown"],
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const OS_MATCHERS = OS_CONFIGS.map((config) => ({
  config,
  matcher: new RegExp(`\\b(?:${config.keywords.map(escapeRegExp).join("|")})\\b`),
}));

function findOsConfig(osString?: string | null): OsConfig {
  if (!osString) {
    return DEFAULT_OS_CONFIG;
  }

  const normalizedInput = osString.toLowerCase().trim();
  for (const { config, matcher } of OS_MATCHERS) {
    if (matcher.test(normalizedInput)) {
      return config;
    }
  }

  return DEFAULT_OS_CONFIG;
}

const OS_BRAND_ICONS: Partial<Record<string, SimpleIcon>> = {
  AlmaLinux: siAlmalinux,
  "Alpine Linux": siAlpinelinux,
  Armbian: siLinux,
  CentOS: siCentos,
  Debian: siDebian,
  FreeBSD: siFreebsd,
  Ubuntu: siUbuntu,
  "Arch Linux": siArchlinux,
  "Kali Linux": siKalilinux,
  iStoreOS: siLinux,
  OpenWrt: siOpenwrt,
  ImmortalWrt: siOpenwrt,
  NixOS: siNixos,
  "Rocky Linux": siRockylinux,
  Fedora: siFedora,
  openSUSE: siOpensuse,
  Gentoo: siGentoo,
  "Red Hat": siRedhat,
  "Linux Mint": siLinuxmint,
  Manjaro: siManjaro,
  "Synology DSM": siSynology,
  "Proxmox VE": siProxmox,
  macOS: siMacos,
  QTS: siQnap,
  Huawei: siHuawei,
  Aliyun: siAlibabacloud,
  Unraid: siUnraid,
  Linux: siLinux,
};

function BrandGlyph({ icon, size }: { icon: SimpleIcon; size: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}

function osGlyph(name: string, size: number): ReactNode {
  if (name === "Windows" || name === "macOS") {
    return <Monitor size={size} strokeWidth={2} />;
  }
  if (name === "Linux") {
    return <HardDrive size={size} strokeWidth={2} />;
  }
  if (name.endsWith("Linux") || name === "FreeBSD") {
    return <Terminal size={size} strokeWidth={2} />;
  }
  return <Server size={size} strokeWidth={2} />;
}

export function resolveOsInfo(value?: string | null) {
  const config = findOsConfig(value);
  if (config !== DEFAULT_OS_CONFIG) {
    return config;
  }

  const name = value?.trim().split(OS_NAME_SPLIT_REGEX)[0] || DEFAULT_OS_CONFIG.name;
  return {
    ...DEFAULT_OS_CONFIG,
    name,
  };
}

export const OsLogo = memo(function OsLogo({
  value,
  size = 18,
}: {
  value?: string | null;
  size?: number;
}) {
  const os = resolveOsInfo(value);
  const brandIcon = OS_BRAND_ICONS[os.name];

  return (
    <span
      className="os-logo"
      role="img"
      aria-label={os.name}
      title={os.name}
      data-os={os.name}
      style={
        {
          "--os-logo-size": `${size}px`,
          "--os-logo-color": brandIcon ? `#${brandIcon.hex}` : undefined,
        } as CSSProperties
      }
    >
      {brandIcon ? <BrandGlyph icon={brandIcon} size={size} /> : osGlyph(os.name, size)}
    </span>
  );
});
