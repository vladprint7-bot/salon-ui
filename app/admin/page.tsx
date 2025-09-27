"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

export default function AdminPage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;
  const [scanUrl, setScanUrl] = useState<string>("");
  const pathOnly = `/scan?salonId=${encodeURIComponent(salonId)}`;

  useEffect(() => {
    setScanUrl(`${window.location.origin}${pathOnly}`);
  }, [pathOnly]);

  return (
    <main style={{ padding: 24, maxWidth: 780, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>QR kod — {salonId}</h1>
      <p style={{ marginBottom: 16 }}>
        Odštampaj i postavi na pult. Klijent skenira kod posle tretmana da doda bod i dobije link za recenziju.
      </p>

      <div style={{ background: "#fff", padding: 16, display: "inline-block", border: "1px solid #eee" }}>
        <QRCode value={scanUrl || pathOnly} size={240} />
      </div>

      {/* Tekst – samo path da nema hydration razlike */}
      <p style={{ marginTop: 12, fontFamily: "monospace", wordBreak: "break-all" }}>{pathOnly}</p>

      <div style={{ marginTop: 12 }}>
        ➡️ Idi na{" "}
        <a href="/admin/wallet" style={{ fontWeight: 600 }}>
          /admin/wallet
        </a>{" "}
        za proveru poena i Redeem na kasi.
      </div>

      <hr style={{ margin: "24px 0" }} />
      <h2>Poster za štampu (A4)</h2>
      <div style={{ width: 794, height: 1123, padding: 40, background: "#fff", boxShadow: "0 0 0 1px #eee" }}>
        <h1 style={{ margin: 0 }}>Skeniraj &amp; osvoji bod</h1>
        <p>Svaka poseta = 1 bod. Na 5 bodova – nagrada!</p>
        <div style={{ marginTop: 40 }}>
          <QRCode value={scanUrl || pathOnly} size={320} />
        </div>
        <p style={{ marginTop: 24, fontFamily: "monospace", wordBreak: "break-all" }}>{pathOnly}</p>
      </div>
    </main>
  );
}
