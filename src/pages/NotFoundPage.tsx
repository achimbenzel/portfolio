import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "../components/icons/LucideIcons";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">404</span>
      <h1>Diese Seite wurde nicht gefunden.</h1>
      <p>Der Link führt zu keinem vorhandenen Projekt oder keiner vorhandenen Seite.</p>
      <Link className="text-link" to="/">
        <ChevronLeftIcon />
        Zurück zur Übersicht
      </Link>
    </main>
  );
}
