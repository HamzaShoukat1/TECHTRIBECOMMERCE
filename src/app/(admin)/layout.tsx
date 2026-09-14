'use client';

import "../../admin/styles/index.css";
import { DirectionProvider } from "../../admin/context/direction-provider";
import { FontProvider } from "../../admin/context/font-provider";
import { ThemeProvider } from "../../admin/context/theme-provider";

const themeScript = `
  (function() {
    try {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('vite-ui-theme='));
      const stored = cookie ? decodeURIComponent(cookie.split('=')[1]) : 'system';
      const resolved = stored === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : stored;
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch (e) {}
  })();
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <script dangerouslySetInnerHTML={{ __html: themeScript }} /> */}
      <ThemeProvider>
        <FontProvider>
          <DirectionProvider>{children}</DirectionProvider>
        </FontProvider>
      </ThemeProvider>
    </>
  );
}