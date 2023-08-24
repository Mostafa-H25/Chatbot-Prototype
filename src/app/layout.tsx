import "./globals.css";
import type { Metadata } from "next";
import { Provider } from 'react-redux'
import Store from "@/services/Store"
import WrapRedux from "./WrapRedux";
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
      <WrapRedux>
        <div id="modal-root"></div>
        {children}
      </WrapRedux>
      </body>
    </html>
  );
}
