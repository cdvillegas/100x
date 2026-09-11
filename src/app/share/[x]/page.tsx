import type { Metadata } from "next";
import GameApp from "@/components/GameApp";
import { formatMultiplier } from "@/lib/format";
import { parseMultiplierValue } from "@/lib/share";

type Props = {
  params: Promise<{ x: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { x } = await params;
  const multiplier = parseMultiplierValue(x);
  const result = multiplier ? formatMultiplier(multiplier) : "100X";
  const title = `I got ${result} on 100X`;
  const description = "Could you turn $10K into $1M?";
  return {
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
