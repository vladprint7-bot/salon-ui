"use client";
import { useState } from "react";

export default function AdminLogin({ searchParams }: { searchParams: { next?: string } }) {
  const [pin, setPin] = useState("");
  const next = searchParams.next || "/admin";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ne oslanjamo se na document.cookie – prosleđujemo pin u URL,
    // middleware će postaviti kolačić i očistiti URL.
    window.location.href = `${next}${next.includes("?") ? "&" : "?"}pin=${encodeURIComponent(pin)}`;
  }

  return (
    <main style={{ padding: 24, maxWidth: 420, margin: "0 auto" }}>
      <h1>Admin PIN</h1>
      <p>Unesi PIN za pristup adminu.</p>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{ padding: 10, width: "100%", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ marginTop: 12, padding: "10px 16px" }}>
          Prijavi se
        </button>
      </form>
      <p style={{ marginTop: 12, fontSize: 12, color: "#555" }}>
        PIN se čita iz <code>NEXT_ADMIN_PIN</code> u <code>.env.local</code>.
      </p>
    </main>
  );
}
