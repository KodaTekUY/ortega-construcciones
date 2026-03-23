import { Noto_Serif_Georgian } from "next/font/google";

export const notoSerifGeorgian = Noto_Serif_Georgian({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "900"],
  display: "swap",
});