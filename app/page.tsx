export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Salon QR Wallet</h1>
      <ul>
        <li>
          QR poster: <a href="/admin">/admin</a>
        </li>
        <li>
          Kasa (lookup + redeem): <a href="/admin/wallet">/admin/wallet</a>
        </li>
        <li>
          Test skeniranja: <a href="/scan?salonId=demo-salon">/scan?salonId=demo-salon</a>
        </li>
      </ul>
    </main>
  );
}
