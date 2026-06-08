import "./globals.css";

export const metadata = {
  title: {
    default: "Crew Legal",
    template: "%s"
  },
  description: "Legal documents for Crew, a social event game app for in-person meetups.",
  metadataBase: new URL("https://crew.app"),
  openGraph: {
    title: "Crew Legal",
    description: "Legal documents for Crew, a social event game app for in-person meetups.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
