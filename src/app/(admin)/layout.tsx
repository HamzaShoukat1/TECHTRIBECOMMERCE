'use client';

import "../../admin/styles/index.css";
import { DirectionProvider } from "../../admin/context/direction-provider";
import { FontProvider } from "../../admin/context/font-provider";
import { ThemeProvider } from "../../admin/context/theme-provider";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <FontProvider>
          <DirectionProvider>{children}</DirectionProvider>
        </FontProvider>
      </ThemeProvider>
    </>
  );
}