"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function ScanPage({ searchParams }: { searchParams: { salonId?: string } }) {
  const salonId = searchParams.salonId || process.env.NEXT_PUBLIC_SALON_ID!;
  const reviewUrl = process.env.NEXT_PUBLIC_REVIEW_URL || "";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);
  const [err, setErr] = useState<string>("");

  async function onCheckin() {
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(`${API_BASE}/api/checkin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ salonId, email: email.trim() || undefined }),
      });
      const json = await r.json().catch(() => ({}));
      if (!r.ok || json?.ok === false) throw new Error(json?.error || `HTTP ${r.status}`);
      setOut(json);
    } catch (e: any) {
      setErr(e.message || "Greška");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
      <h1>Hvala na poseti!</h1>
      <p>Tapni dugme da dodaš bod. (Email je opciono — ako želiš da pratimo tvoje poene.)</p>

      <input
        placeholder="Email (opciono)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, width: "100%", marginTop: 12, border: "1px solid #ccc" }}
        inputMode="email"
        autoComplete="email"
      />

      <button
        onClick={onCheckin}
        disabled={loading || !salonId}
        style={{ marginTop: 12, padding: "12px 18px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Sačekaj…" : "Dodaj bod"}
      </button>

      {err && <p style={{ color: "crimson", marginTop: 12 }}>❌ {err}</p>}

      {out && (
        <div style={{ marginTop: 20 }}>
          {out.ok ? (
            <>
              <p>✅ Poeni: <b>{out.points}</b> (nagrada na {out.threshold}).</p>
              {reviewUrl && (
                <p>
                  Ostavi recenziju:{" "}
                  <a href={reviewUrl} target="_blank" rel="noreferrer">Google Reviews</a>
                </p>
              )}
              {out.rewardReady && <p>🎉 Spreman si za besplatnu uslugu! (recite na kasi)</p>}
              {"visitsToday" in out && <p>📈 Poseta (anonimno): {out.visitsToday}</p>}
            </>
          ) : (
            <p>❌ Greška: {out.error}</p>
          )}
        </div>
      )}
    </main>
  );
}
