'use client';

import "../../admin/styles/index.css";
import { DirectionProvider } from "../../admin/context/direction-provider";
import { FontProvider } from "../../admin/context/font-provider";
import { ThemeProvider } from "../../admin/context/theme-provider";
import OfflineGuard from "../Components/OfflineGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <OfflineGuard>
      <ThemeProvider>
        <FontProvider>
          <DirectionProvider>{children}</DirectionProvider>
        </FontProvider>
      </ThemeProvider>
    </OfflineGuard>
  );
}