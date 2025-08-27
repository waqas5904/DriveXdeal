import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/footer/footer";


export const metadata = {
  title: "My App",
  description: "Car Collection Project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
 
        <main>{children}</main>
      </body>
    </html>
  );
}
