import type { Metadata } from "next";
import { Anton, Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { PostponedPathnameNormalizer } from "next/dist/server/future/normalizers/request/postponed";
import { getServerSession } from "next-auth";
import SessionWrapper from "@/components/SessionWraper";

const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })

const roboto = Roboto(
  {weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: "--font-roboto"
}
)

const anton = Anton({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  variable: "--font-anton"
})


export const metadata: Metadata = {
  title: "EduClicker",
  description: "Soluções inovadoras para educação",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <SessionWrapper>
    <html lang="pt-br">
      <body className={`${roboto.variable} ${inter.variable}`} >
        {children}
      </body>
    </html>
    </SessionWrapper>
  );
}
