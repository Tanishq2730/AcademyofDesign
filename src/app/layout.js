import { Inter, Bebas_Neue } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import FixedCTA from "@/components/Home/FixedCTA";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata = {
  title: "Nuvosid Academy of Design",
  description: "A premium design academy shaping the creative leaders of tomorrow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${bebas.variable} min-h-screen flex flex-col bg-black text-white antialiased`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <FixedCTA />
        </Providers>
      </body>
    </html>
  );
}
