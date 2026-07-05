import { useState } from "react";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon } from "./icons/LucideIcons";

const softwareTools = [
  {
    label: "Illustrator",
    src: "/Assets/software/illustrator.svg",
  },
  {
    label: "Photoshop",
    src: "/Assets/software/photoshop.svg",
  },
  {
    label: "InDesign",
    src: "/Assets/software/indesign.svg",
  },
  {
    label: "After Effects",
    src: "/Assets/software/after-effects.svg",
  },
  {
    label: "Premiere",
    src: "/Assets/software/premiere.svg",
  },
  {
    label: "Blender",
    src: "/Assets/software/blender.svg",
  },
];

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="identity-lockup">
        <img
          className="identity-portrait"
          src="/Assets/images/portrait.webp"
          alt="Achim Benzel Portrait"
        />
        <div className="identity-copy">
          <Link className="logo-link" to="/" aria-label="Zur Projektuebersicht">
            <img src="/Assets/Logo/logo_wide_dark.svg" alt="Achim Benzel" />
          </Link>
          <div className="identity-meta" aria-label="Kurzprofil">
            <span>25 Jahre</span>
            <span>Bachelor of Arts</span>
          </div>
        </div>
      </div>

      <div className="software-stack" aria-label="Programme">
        <div className="software-list">
          {softwareTools.map((tool) => (
            <span className="software-item" key={tool.label} title={tool.label}>
              <img src={tool.src} alt="" aria-hidden="true" />
              <span>{tool.label}</span>
            </span>
          ))}
        </div>
      </div>

      <section className={isAboutOpen ? "about-section open" : "about-section"}>
        <div className="about-section-head">
          <span>About me</span>
          <button
            className="about-toggle"
            type="button"
            aria-expanded={isAboutOpen}
            aria-controls="about-panel"
            onClick={() => setIsAboutOpen((isOpen) => !isOpen)}
          >
            {isAboutOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        <div className="about-panel-wrap" id="about-panel" aria-hidden={!isAboutOpen}>
          <div className="about-panel-shell">
            <div className="about-panel">
              <p>
                Ich bin Achim, 25, und Gestaltung kam früh in meinen Alltag. Mit 12
                habe ich in der Minecraft-Szene angefangen: Banner für YouTuber,
                erste 3D-Intros und viel Ausprobieren mit Photoshop und Cinema 4D.
              </p>
              <p>
                Danach kamen Designs für die Schule dazu, kleine Aufträge und immer
                mehr Routine. Später folgten das Studium der zeitbasierten Medien in
                Mainz, die Selbstständigkeit und mein Bachelor.
              </p>
              <p>
                Technik interessiert mich bis heute stark. Als Ausgleich brauche ich
                Natur und Sport, weil beides den Kopf frei macht und neue Ideen sortiert.
              </p>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
