import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="#inicio">
        <span className="brand-mark">BS</span>
        <span>
          <strong>BioSeq Analyzer</strong>
        </span>
      </a>
      <nav aria-label="Secciones principales" className="header__nav">
        <a href="#inicio">Inicio</a>
        <a href="#analizador">Herramientas</a>
      </nav>
      <ThemeToggle />
    </header>
  )
}
