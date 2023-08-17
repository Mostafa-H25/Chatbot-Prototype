import GlobalContext from "@/services/context/GlobalContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Platform",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalContext>{children}</GlobalContext>
      </body>
    </html>
  );
}
