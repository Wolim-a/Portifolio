import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  tagline: string;
  featured?: boolean;
  tags: string[];
  status: "Em desenvolvimento" | "Concluído" | "Em pausa";
  repoUrl?: string;
  problem: string;
  solution: string;
  tech: string[];
  impact?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "entreredes",
    title: "EntreRedes",
    tagline: "Conectando pescadores locais a compradores em São Luís/MA",
    featured: true,
    tags: ["Startup", "Impacto Social", "SEBRAE Supernova"],
    status: "Em desenvolvimento",
    problem:
      "Pescadores artesanais de São Luís/MA enfrentam baixa margem de lucro por depender de intermediários ineficientes. Parte significativa da produção é desperdiçada por falta de canais diretos de venda para restaurantes e supermercados.",
    solution:
      "Plataforma digital que conecta diretamente pescadores a compradores institucionais (restaurantes e supermercados), eliminando atravessadores. A EntreRedes opera com uma taxa de intermediação transparente, aumentando a margem de lucro dos produtores e reduzindo o desperdício na cadeia.",
    tech: ["Plataforma Digital", "Marketplace", "Gestão de Cadeia de Suprimentos"],
    impact:
      "Desenvolvido para o programa SEBRAE Supernova, com foco em impacto econômico e social para comunidades pesqueiras do Maranhão.",
  },
  {
    id: "trilha-frontend",
    title: "Trilha Front-end",
    tagline: "Registro dos estudos e exercícios da trilha de front-end do CEUMA",
    tags: ["HTML", "CSS", "JavaScript", "Front-end"],
    status: "Em desenvolvimento",
    repoUrl: "https://github.com/Wolim-a/Trilha-Front-end",
    problem:
      "Documentar e consolidar o aprendizado ao longo da trilha de desenvolvimento front-end oferecida pelo Centro Universitário do Maranhão (CEUMA).",
    solution:
      "Repositório organizado com exercícios, projetos e experimentos desenvolvidos durante a trilha, servindo tanto como portfólio de aprendizado quanto como referência de evolução técnica.",
    tech: ["HTML5", "CSS3", "JavaScript", "Git"],
  },
];

const skills = {
  consolidated: [
    { name: "Python", icon: "🐍", desc: "Automação, scripts, prototipagem rápida" },
    { name: "Rust", icon: "⚙️", desc: "Sistemas embarcados, performance, segurança de memória" },
    { name: "Java", icon: "☕", desc: "Orientação a objetos, aplicações backend" },
  ],
  learning: [
    { name: "HTML5", icon: "📄", desc: "Estrutura semântica de páginas web" },
    { name: "CSS3", icon: "🎨", desc: "Estilização, layouts, animações" },
    { name: "JavaScript", icon: "⚡", desc: "Interatividade e lógica no cliente" },
  ],
  domains: [
    { name: "IoT", icon: "📡", desc: "Internet das Coisas" },
    { name: "Sistemas Embarcados", icon: "🔌", desc: "Hardware + Software" },
    { name: "Git & GitHub", icon: "🔀", desc: "Controle de versão" },
  ],
};

// ─── Subcomponents ────────────────────────────────────────────────────────────

function TypedText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="cursor-blink" style={{ color: "#00e5ff", fontWeight: 700 }}>
          |
        </span>
      )}
    </span>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    "Em desenvolvimento": "#00e5ff",
    "Concluído": "#10b981",
    "Em pausa": "#f59e0b",
  };
  const color = colors[status];
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color,
        border: `1px solid ${color}44`,
        background: `${color}11`,
        borderRadius: "4px",
        padding: "2px 8px",
      }}
    >
      ● {status}
    </span>
  );
}

function SkillBadge({
  name,
  icon,
  desc,
  level,
}: {
  name: string;
  icon: string;
  desc: string;
  level: "consolidated" | "learning" | "domain";
}) {
  const styles = {
    consolidated: {
      border: "1px solid #00e5ff44",
      background: "#00e5ff08",
      accent: "#00e5ff",
      label: "Domínio",
    },
    learning: {
      border: "1px solid #f59e0b33",
      background: "#f59e0b08",
      accent: "#f59e0b",
      label: "Aprendendo",
    },
    domain: {
      border: "1px solid #8b5cf633",
      background: "#8b5cf608",
      accent: "#8b5cf6",
      label: "Área",
    },
  };
  const s = styles[level];

  return (
    <div
      style={{
        border: s.border,
        background: s.background,
        borderRadius: "8px",
        padding: "14px 16px",
        transition: "all 0.2s",
      }}
      className="group cursor-default"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${s.accent}22`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "";
        (e.currentTarget as HTMLElement).style.transform = "";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            color: "#e2e8f0",
            fontSize: "0.95rem",
          }}
        >
          {name}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: s.accent,
            border: `1px solid ${s.accent}44`,
            borderRadius: "3px",
            padding: "1px 5px",
          }}
        >
          {s.label}
        </span>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#4a5580", margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}

function Nav({
  current,
  onNav,
}: {
  current: string;
  onNav: (section: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "about", label: "Sobre" },
    { id: "skills", label: "Stacks" },
    { id: "projects", label: "Projetos" },
    { id: "contact", label: "Contato" },
  ];

  const handleNav = (id: string) => {
    setMobileOpen(false);
    if (current !== "home") {
      onNav("home");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 clamp(1rem, 4vw, 3rem)",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,11,18,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1e2540" : "1px solid transparent",
        transition: "all 0.3s",
      }}
    >
      <button
        onClick={() => { setMobileOpen(false); onNav("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "#00e5ff",
          background: "none",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.1em",
          padding: 0,
        }}
      >
        <span style={{ color: "#4a5580" }}>~/</span>wesley
      </button>

      {/* Desktop nav */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden-mobile">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className="nav-link"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            {item.label}
          </button>
        ))}
        <a
          href="https://github.com/Wolim-a"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "#e2e8f0",
            background: "#1e2540",
            border: "1px solid #2a3460",
            borderRadius: "6px",
            padding: "6px 14px",
            textDecoration: "none",
            transition: "all 0.2s",
            letterSpacing: "0.05em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#00e5ff44";
            (e.currentTarget as HTMLElement).style.color = "#00e5ff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2a3460";
            (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
          }}
        >
          GitHub ↗
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#4a5580",
          fontSize: "1.2rem",
          display: "none",
        }}
        className="show-mobile"
        aria-label="Menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            background: "rgba(8,11,18,0.98)",
            borderBottom: "1px solid #1e2540",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "#8892b0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ onProject }: { onProject: (id: string) => void }) {
  return (
    <section
      id="about"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px clamp(1rem, 6vw, 6rem) 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #00e5ff08 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "900px", position: "relative" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="section-label">Apresentação</span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
            color: "#4a5580",
            marginBottom: "1rem",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "#00e5ff" }}>$</span> whoami
        </div>

        <h1
          className="display-heading"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", marginBottom: "1rem", color: "#e2e8f0" }}
        >
          Wesley
          <span style={{ color: "#00e5ff" }}>.</span>
        </h1>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            color: "#8892b0",
            marginBottom: "2rem",
            lineHeight: 1.4,
          }}
        >
          <TypedText text="Estudante de Engenharia da Computação" />
        </h2>

        <div
          style={{
            maxWidth: "600px",
            color: "#8892b0",
            lineHeight: 1.8,
            fontSize: "0.95rem",
            marginBottom: "2.5rem",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            Cursando Engenharia da Computação no{" "}
            <span style={{ color: "#e2e8f0" }}>Centro Universitário do Maranhão (CEUMA)</span>, com interesse
            em IoT e Sistemas Embarcados. Trabalho principalmente com{" "}
            <span style={{ color: "#00e5ff" }}>Python</span>,{" "}
            <span style={{ color: "#00e5ff" }}>Rust</span> e{" "}
            <span style={{ color: "#00e5ff" }}>Java</span>.
          </p>
          <p>
            Atualmente expandindo meu repertório com a trilha de{" "}
            <span style={{ color: "#f59e0b" }}>Front-end</span> no CEUMA — aprendendo a construir
            interfaces que comunicam além do terminal.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#080b12",
              background: "#00e5ff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 28px",
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#33ecff";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px #00e5ff66";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#00e5ff";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            Ver Projetos
          </button>
          <button
            onClick={() => onProject("entreredes")}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "0.9rem",
              color: "#e2e8f0",
              background: "transparent",
              border: "1px solid #1e2540",
              borderRadius: "8px",
              padding: "12px 28px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#00e5ff44";
              (e.currentTarget as HTMLElement).style.color = "#00e5ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e2540";
              (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
            }}
          >
            Destaque: EntreRedes ↗
          </button>
        </div>

        {/* Quick stats */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid #1e2540",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "3", label: "Linguagens principais" },
            { val: "2", label: "Projetos ativos" },
            { val: "CEUMA", label: "Universidade" },
            { val: "MA", label: "São Luís, Maranhão" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: "#00e5ff",
                }}
              >
                {val}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#4a5580", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ padding: "6rem clamp(1rem, 6vw, 6rem)", position: "relative" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <span className="section-label">02 — Stacks & Habilidades</span>
        </div>
        <h2
          className="display-heading"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "0.75rem" }}
        >
          Tecnologias
        </h2>
        <p style={{ color: "#4a5580", fontSize: "0.9rem", marginBottom: "3rem", fontFamily: "var(--font-mono)" }}>
          <span style={{ color: "#00e5ff" }}>Domínio</span> consolidado vs.{" "}
          <span style={{ color: "#f59e0b" }}>em desenvolvimento</span>
        </p>

        <div style={{ display: "grid", gap: "2.5rem" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#00e5ff",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "#00e5ff" }} />
              Linguagens com domínio consolidado
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {skills.consolidated.map((s) => (
                <SkillBadge key={s.name} {...s} level="consolidated" />
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f59e0b",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "#f59e0b" }} />
              Front-end em desenvolvimento (trilha CEUMA)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {skills.learning.map((s) => (
                <SkillBadge key={s.name} {...s} level="learning" />
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#8b5cf6",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "#8b5cf6" }} />
              Áreas de interesse & ferramentas
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {skills.domains.map((s) => (
                <SkillBadge key={s.name} {...s} level="domain" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (id: string) => void;
}) {
  return (
    <article
      className="tech-card"
      style={{
        borderRadius: "12px",
        padding: "2rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => onOpen(project.id)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project.id)}
      role="button"
      aria-label={`Ver detalhes do projeto ${project.title}`}
    >
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #00e5ff, #8b5cf6)",
          }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#4a5580",
                background: "#161b2e",
                border: "1px solid #1e2540",
                borderRadius: "4px",
                padding: "2px 8px",
                letterSpacing: "0.08em",
              }}
            >
              {tag}
            </span>
          ))}
          {project.featured && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#00e5ff",
                background: "#00e5ff11",
                border: "1px solid #00e5ff44",
                borderRadius: "4px",
                padding: "2px 8px",
                letterSpacing: "0.08em",
              }}
            >
              ★ Destaque
            </span>
          )}
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.4rem",
          color: "#e2e8f0",
          marginBottom: "0.5rem",
        }}
      >
        {project.title}
      </h3>
      <p style={{ color: "#4a5580", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
        {project.tagline}
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#8892b0",
              background: "#0f1320",
              borderRadius: "4px",
              padding: "3px 8px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "#00e5ff",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        Ver detalhes <span>→</span>
      </div>
    </article>
  );
}

function ProjectsSection({ onProject }: { onProject: (id: string) => void }) {
  return (
    <section
      id="projects"
      style={{
        padding: "6rem clamp(1rem, 6vw, 6rem)",
        background: "#0a0d18",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <span className="section-label">03 — Projetos</span>
        </div>
        <h2
          className="display-heading"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "0.5rem" }}
        >
          O que eu construo
        </h2>
        <p style={{ color: "#4a5580", fontSize: "0.875rem", marginBottom: "3rem", maxWidth: "480px", lineHeight: 1.7 }}>
          Desde plataformas de impacto social até registros de aprendizado — cada projeto conta uma parte da jornada.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={onProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: "6rem clamp(1rem, 6vw, 6rem)",
        position: "relative",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #00e5ff06 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
        <span className="section-label">04 — Contato</span>
        <h2
          className="display-heading"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginTop: "1rem", marginBottom: "1rem" }}
        >
          Vamos conversar
        </h2>
        <p style={{ color: "#4a5580", marginBottom: "2.5rem", lineHeight: 1.7, fontSize: "0.9rem" }}>
          Aberto a colaborações, oportunidades e conversas sobre tecnologia, IoT e empreendedorismo.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <a
            href="mailto:wesley.ol@proton.me"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "#8892b0",
              background: "#0f1320",
              border: "1px solid #1e2540",
              borderRadius: "8px",
              padding: "12px 28px",
              textDecoration: "none",
              transition: "all 0.2s",
              display: "inline-block",
              width: "280px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#00e5ff44";
              (e.currentTarget as HTMLElement).style.color = "#00e5ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e2540";
              (e.currentTarget as HTMLElement).style.color = "#8892b0";
            }}
          >
            📧 wesley.ol@proton.me
          </a>
          <a
            href="https://github.com/Wolim-a"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "#8892b0",
              background: "#0f1320",
              border: "1px solid #1e2540",
              borderRadius: "8px",
              padding: "12px 28px",
              textDecoration: "none",
              transition: "all 0.2s",
              display: "inline-block",
              width: "280px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#00e5ff44";
              (e.currentTarget as HTMLElement).style.color = "#00e5ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e2540";
              (e.currentTarget as HTMLElement).style.color = "#8892b0";
            }}
          >
            🐙 github.com/Wolim-a
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ onHome }: { onHome: () => void }) {
  return (
    <footer
      style={{
        padding: "2rem clamp(1rem, 6vw, 6rem)",
        borderTop: "1px solid #1e2540",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <button
        onClick={onHome}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "#4a5580",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span style={{ color: "#00e5ff" }}>~/</span>wesley — Engenharia da Computação · CEUMA
      </button>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a
          href="https://github.com/Wolim-a"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#4a5580", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#00e5ff")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5580")}
        >
          GitHub
        </a>
        <span style={{ color: "#1e2540" }}>·</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#2a3460" }}>
          São Luís, MA · 2026
        </span>
      </div>
    </footer>
  );
}

// ─── Project Detail Page ───────────────────────────────────────────────────────

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main style={{ minHeight: "100vh", paddingTop: "80px" }}>
      {/* Hero */}
      <div
        className="grid-bg"
        style={{
          padding: "4rem clamp(1rem, 6vw, 6rem) 3rem",
          borderBottom: "1px solid #1e2540",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, #00e5ff, #8b5cf6)",
            }}
          />
        )}
        <div style={{ maxWidth: "800px" }}>
          <button
            onClick={onBack}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#4a5580",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#00e5ff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a5580")}
          >
            ← Voltar aos projetos
          </button>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "#4a5580",
                  background: "#161b2e",
                  border: "1px solid #1e2540",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  letterSpacing: "0.08em",
                }}
              >
                {tag}
              </span>
            ))}
            {project.featured && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "#00e5ff",
                  background: "#00e5ff11",
                  border: "1px solid #00e5ff44",
                  borderRadius: "4px",
                  padding: "2px 8px",
                }}
              >
                ★ Projeto em Destaque
              </span>
            )}
          </div>

          <h1
            className="display-heading"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", marginBottom: "0.75rem" }}
          >
            {project.title}
          </h1>
          <p style={{ color: "#8892b0", fontSize: "1.1rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            {project.tagline}
          </p>
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "3rem clamp(1rem, 6vw, 6rem)", maxWidth: "calc(800px + clamp(1rem, 6vw, 6rem) * 2)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>

          {/* Problem */}
          <div className="tech-card" style={{ borderRadius: "12px", padding: "2rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#f59e0b",
                marginBottom: "1rem",
              }}
            >
              // problema que resolve
            </div>
            <p style={{ color: "#8892b0", lineHeight: 1.8, fontSize: "0.95rem" }}>{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="tech-card" style={{ borderRadius: "12px", padding: "2rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00e5ff",
                marginBottom: "1rem",
              }}
            >
              // solução desenvolvida
            </div>
            <p style={{ color: "#8892b0", lineHeight: 1.8, fontSize: "0.95rem" }}>{project.solution}</p>
          </div>

          {/* Impact */}
          {project.impact && (
            <div
              style={{
                background: "#00e5ff08",
                border: "1px solid #00e5ff22",
                borderRadius: "12px",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8b5cf6",
                  marginBottom: "1rem",
                }}
              >
                // impacto & reconhecimento
              </div>
              <p style={{ color: "#8892b0", lineHeight: 1.8, fontSize: "0.95rem" }}>{project.impact}</p>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#4a5580",
                marginBottom: "1rem",
              }}
            >
              // tecnologias utilizadas
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "#e2e8f0",
                    background: "#0f1320",
                    border: "1px solid #1e2540",
                    borderRadius: "6px",
                    padding: "6px 14px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.repoUrl && (
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#4a5580",
                  marginBottom: "1rem",
                }}
              >
                // repositório
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "#00e5ff",
                  background: "#00e5ff11",
                  border: "1px solid #00e5ff33",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#00e5ff22";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px #00e5ff22";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#00e5ff11";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                🐙 Ver no GitHub ↗
              </a>
            </div>
          )}

          {!project.repoUrl && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "#2a3460",
                border: "1px dashed #1e2540",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              // repositório privado ou em fase de estruturação
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({ onProject }: { onProject: (id: string) => void }) {
  return (
    <main>
      <HeroSection onProject={onProject} />
      <SkillsSection />
      <ProjectsSection onProject={onProject} />
      <ContactSection />
    </main>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<{ type: "home" } | { type: "project"; id: string }>({
    type: "home",
  });

  const handleProject = (id: string) => setView({ type: "project", id });
  const handleBack = () => {
    setView({ type: "home" });
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleHome = () => {
    setView({ type: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentProject =
    view.type === "project" ? projects.find((p) => p.id === view.id) : null;

  return (
    <div style={{ minHeight: "100%", background: "#080b12" }}>
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #00e5ff;
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>

      <Nav
        current={view.type}
        onNav={(section) => {
          if (section === "home") handleHome();
        }}
      />

      {view.type === "home" && <HomePage onProject={handleProject} />}

      {view.type === "project" && currentProject && (
        <ProjectDetail project={currentProject} onBack={handleBack} />
      )}

      <Footer onHome={handleHome} />
    </div>
  );
}
