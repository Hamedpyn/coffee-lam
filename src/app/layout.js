import "./globals.css";
import Aos from "@/utils/AOS";
import ScrollToTop from "@/utils/ScrollToTop";

export const metadata = {
  title: "SET Coffee | فروشگاه اینترنتی قهوه ست",
  description: "Welcome to Set Coffee main page,we sell coffee here🖤☕",
  icons: {
    icon: "/images/icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <Aos />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
