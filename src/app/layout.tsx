import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalContext from "@/app/services/context/GlobalContext";
import ModalContext from "./services/context/ModalContext";

const inter = Inter({ subsets: ["latin"] });

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
        <GlobalContext>
          <ModalContext>
            <div id="modal-root"></div>
            {children}
          </ModalContext>
        </GlobalContext>
      </body>
    </html>
  );
}
