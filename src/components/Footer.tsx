import BrandLogo from "./BrandLogo";

const baseUrl = "https://achimbenzel.com";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/achim-benzel-9a1890279/",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/achimbenzel",
  },
  {
    label: "Behance",
    href: "https://behance.net/achimbenzel",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/achimbenzel/_created/",
  },
];

const legalLinks = [
  {
    label: "Impressum",
    href: `${baseUrl}/de/imprint`,
  },
  {
    label: "Datenschutzerklärung",
    href: `${baseUrl}/de/privacy`,
  },
  {
    label: "AGB",
    href: `${baseUrl}/de/tos`,
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <BrandLogo />
          <p>Freie Projektanfragen &amp; Kollaborationen jederzeit willkommen.</p>
        </div>
        <a className="footer-cta" href="mailto:benzelachim@gmail.com">
          Kontakt aufnehmen
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <nav className="footer-social" aria-label="Social Links">
        {socialLinks.map((link) => (
          <a key={link.href} href={link.href} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="footer-bottom">
        <span>&copy; 2026 Design by Achim Benzel. Alle Rechte vorbehalten.</span>
        <nav className="footer-legal" aria-label="Rechtliches">
          {legalLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
