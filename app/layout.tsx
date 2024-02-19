import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { PostponedPathnameNormalizer } from "next/dist/server/future/normalizers/request/postponed";

const inter = Inter({ subsets: ['latin'] })

const poppins = Roboto(
  {weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin']
}
)


export const metadata: Metadata = {
  title: "EduClicker",
  description: "Soluções inovadoras para educação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-bg_default {roboto.className}">{children}</body>
    </html>
  );
}
