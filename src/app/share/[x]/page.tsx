import type { Metadata } from "next";
import { headers } from "next/headers";
import GameApp from "@/components/GameApp";
import { formatMultiplier } from "@/lib/format";
import { parseMultiplierValue } from "@/lib/share";

type Props = {
  params: Promise<{ x: string }>;
};

async function metadataBaseFromRequest() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!host) return undefined;
  const proto =
    requestHeaders.get("x-forwarded-proto") ??
    (/^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host) ? "http" : "https");
  return new URL(`${proto}://${host}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { x } = await params;
  const multiplier = parseMultiplierValue(x);
  const result = multiplier ? formatMultiplier(multiplier) : "100X";
  const title = `I scored ${result} on 100X`;
  const description = "Could you turn $10K into $1M?";
  return {
    metadataBase: await metadataBaseFromRequest(),
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function SharePage() {
  return <GameApp />;
}
