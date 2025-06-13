import { useEffect } from 'react';

export default function GlobalStylesAndFonts() {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      :root {
        --mau-cam: #f97316;
        --mau-nen: #fff7ed;
        --mau-text-chinh: #1e293b;
        --mau-text-phu: #475569;
        --mau-nen-toi: #1e293b;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'Be Vietnam Pro', sans-serif;
        background-color: #fff;
        color: var(--mau-text-chinh);
        line-height: 1.6;
      }
      .nav-link {
        color: #475569;
        background-color: transparent;
        text-decoration: none;
        font-weight: 500;
        white-space: nowrap;
        padding: 8px 16px;
        border-radius: 9999px;
        transition: all 0.2s ease-in-out;
      }
      .nav-link:hover {
        color: white;
        background-color: #f97316;
      }
    `;
    document.head.appendChild(styleTag);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(styleTag);
      document.head.removeChild(fontLink);
    };
  }, []);

  return null;
}
