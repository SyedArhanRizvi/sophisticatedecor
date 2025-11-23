import "./globals.css";
import { PopupProvider } from "./context/PopupContext";

export const metadata = {
  title: "Sophisticated Decor | Luxury Sofa Repair & Manufacturing | Interior Design Noida, Gurugram, Delhi",
  description: "Premium luxury furniture craftsmanship and interior design in Delhi-NCR. Expert sofa repair, custom manufacturing, beds, chairs, and 10+ major interior projects. Serving Noida, Gurugram, Greater Noida, and Delhi with amazing furniture solutions.",
  keywords: [
    "Luxury Sofa Repair Noida",
    "Custom Sofa Manufacturing Gurugram",
    "Interior Design Delhi",
    "Furniture Upholstery Greater Noida",
    "Premium Sofa Repair",
    "Luxury Furniture Noida",
    "Bed Manufacturing Gurugram",
    "Chair Design Delhi",
    "Interior Design Projects",
    "Sophisticated Decor",
  ],
  authors: [{ name: "Sophisticated Decor" }],
  openGraph: {
    title: "Sophisticated Decor - Luxury Furniture & Interior Design in Delhi-NCR",
    description: "Premium luxury furniture craftsmanship, sofa repair, custom manufacturing, and interior design services across Noida, Gurugram, Greater Noida, and Delhi.",
    type: "website",
    locale: "en_IN",
    url: "https://sophisticatedecor.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PopupProvider>
          {children}
        </PopupProvider>
      </body>
    </html>
  );
}

