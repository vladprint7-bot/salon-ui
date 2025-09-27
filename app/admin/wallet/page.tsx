"use client";
import { useMemo, useState } from "react";
import { apiGet, apiPost } from "../../../lib/api"; // relativno iz app/admin/wallet

type WalletRes = {
  ok: boolean;
  salonId: string;
  email: string;
  points: number;
  threshold: number;
};

export default function WalletPage() {
  const defaultSalon = process.env.NEXT_PUBLIC_SALON_ID || "demo-salon";
  const [salonId, setSalonId] = useState(defaultSalon);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"get" | "redeem" | null>(null);
  const [err, setErr] = useState<string>("");
  const [res, setRes] = useState<WalletRes | null>(null);

  const canRedeem = useMemo(() => !!res && res.points >= res.threshold, [res]);

  async function onLookup() {
    setLoading("get"); setErr(""); setRes(null);
    try {
      const out = await apiGet<WalletRes>("/api/wallet", { salonId, email: email.trim() });
      setRes(out);
    } catch (e: any) { setErr(e.message || "Greška"); }
    finally { setLoading(null); }
  }

  async function onRedeem() {
    setLoading("redeem"); setErr("");
    try {
      const out = await apiPost<WalletRes>("/api/redeem", { salonId, email: email.trim() });
      setRes(out);
    } catch (e: any) { setErr(e.message || "Greška"); }
    finally { setLoading(null); }
  }

  return (
    <main style={{ padding: 24, maxWidth: 680, margin: "0 auto" }}>
      <h1>Admin – Wallet (kasa)</h1>
      <p>Unesi email klijenta i proveri stanje poena. Ako ima dovoljno, iskoristi nagradu (Redeem).</p>

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
        <label>
          Salon ID
          <input value={salonId} onChange={(e) => setSalonId(e.target.value)}
                 style={{ display: "block", padding: 10, width: "100%", border: "1px solid #ccc", marginTop: 6 }} />
        </label>
        <label>
          Email klijenta
          <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" autoComplete="email"
                 style={{ display: "block", padding: 10, width: "100%", border: "1px solid #ccc", marginTop: 6 }} />
        </label>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button onClick={onLookup} disabled={loading !== null || !salonId || !email.trim()}
                style={{ padding: "10px 16px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading === "get" ? "Tražim…" : "Proveri poene"}
        </button>
        <button onClick={onRedeem} disabled={loading !== null || !canRedeem}
                style={{ padding: "10px 16px", cursor: loading || !canRedeem ? "not-allowed" : "pointer" }}>
          {loading === "redeem" ? "Skidam…" : "Redeem (iskoristi nagradu)"}
        </button>
      </div>

      {err && <p style={{ color: "crimson", marginTop: 12 }}>❌ {err}</p>}

      {res && (
        <div style={{ marginTop: 16, padding: 12, background: "#fff", border: "1px solid #eee" }}>
          <p style={{ margin: 0 }}>📧 <b>{res.email}</b> — Salon: <b>{res.salonId}</b></p>
          <p style={{ margin: "6px 0 0" }}>
            Poeni: <b>{res.points}</b> / prag: <b>{res.threshold}</b>{" "}
            {res.points >= res.threshold ? "— ✅ može Redeem" : "— ⏳ nije dovoljno poena"}
          </p>
        </div>
      )}
    </main>
  );
}
