import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import {Footer, Header} from "./components/Index";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Fun with Flex NextJs",
  description: "NextJs Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased p-8 md:px-16 lg:px-24`}
      >
        <Header />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
