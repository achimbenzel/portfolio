import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">404</span>
      <h1>Diese Seite wurde nicht gefunden.</h1>
      <p>Der Link fuehrt zu keinem vorhandenen Projekt oder keiner vorhandenen Seite.</p>
      <Link className="text-link" to="/">
        Zurueck zur Uebersicht
      </Link>
    </main>
  );
}
