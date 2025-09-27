"use client";
import QRCode from "qrcode.react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID || "demo-salon";

  // URL kreiramo tek na klijentu
  const [scanUrl, setScanUrl] = useState<string>("");

  useEffect(() => {
    const base = window.location.origin;
    setScanUrl(`${base}/scan?salonId=${encodeURIComponent(salonId)}`);
  }, [salonId]);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>QR kod — {salonId} ✅</h1>
      <p>Odštampaj i postavi na pult. Klijent skenira posle tretmana.</p>

      {/* Dok se ne izračuna scanUrl na klijentu, ne renderujemo QR ni tekst URL-a */}
      {scanUrl ? (
        <>
          <div style={{ background: "#fff", padding: 16, display: "inline-block" }}>
            <QRCode value={scanUrl} size={260} />
          </div>
          <div style={{ marginTop: 8, fontFamily: "monospace" }}>{scanUrl}</div>
        </>
      ) : (
        <div style={{ height: 280, display: "flex", alignItems: "center" }}>Pripremam QR…</div>
      )}

      <div style={{ marginTop: 16 }}>
        <Link href="/admin/wallet" style={{ padding: "10px 14px", border: "1px solid #ccc" }}>
          Kasa / Wallet
        </Link>
      </div>
    </main>
  );
}
