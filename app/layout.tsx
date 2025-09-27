export const metadata = {
  title: "Salon QR Wallet",
  description: "QR check-in, poeni i nagrade",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body style={{ fontFamily: "system-ui, Arial, sans-serif", background: "#f7f7f8", color: "#0b0b0c" }}>
        {children}
      </body>
    </html>
  );
}
