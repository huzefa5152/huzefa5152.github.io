// ============================================================
// commands.js — Resume data & command registry
// All content lives here. Update this file to change resume data.
// ============================================================

const RESUME_DATA = {
  name: "Huzefa Hussain",
  title: "Software Developer",
  ascii_banner: `
 ██╗  ██╗██╗   ██╗███████╗███████╗███████╗ █████╗
 ██║  ██║██║   ██║╚══███╔╝██╔════╝██╔════╝██╔══██╗
 ███████║██║   ██║  ███╔╝ █████╗  █████╗  ███████║
 ██╔══██║██║   ██║ ███╔╝  ██╔══╝  ██╔══╝  ██╔══██║
 ██║  ██║╚██████╔╝███████╗███████╗██║     ██║  ██║
 ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝
  `,

  about: {
    summary: "Software Developer with 4+ years of experience building enterprise web applications using ASP.NET MVC, C#, JavaScript, and SQL Server. Currently at Contour Software (Kinetic Solutions), delivering SaaS products for the international hospitality industry. Comfortable working independently in distributed teams with async workflows.",
    location: "Karachi, Pakistan",
    email: "huzefa.hussain1111@gmail.com",
    linkedin: "linkedin.com/in/huzefa-hussain-8a5156193",
    github: "github.com/huzefa5152",
    website: "huzefa5152.github.io"
  },

  skills: {
    "Languages": ["C#", "JavaScript", "TypeScript", "Java", "Python", "PHP", "SQL", "HTML/CSS"],
    "Frameworks": ["ASP.NET MVC", ".NET Core", "React", "React Native", "Node.js", "Express.js", "Laravel", "Entity Framework", "SignalR"],
    "Databases": ["SQL Server", "MongoDB", "MySQL", "Firebase"],
    "Tools & DevOps": ["Docker", "Git", "Azure DevOps", "CI/CD Pipelines", "JIRA", "Power BI", "Xamarin"],
    "Protocols": ["REST", "SOAP", "XML", "JSON", "JWT", "Web API"]
  },

  experience: [
    {
      role: "Software Developer",
      company: "Contour Software — Kinetic Solutions Division",
      period: "Jul 2022 — Present",
      bullets: [
        "Architect & maintain 4 enterprise SaaS modules (KxB&B, KxRegistration, Web Catering, KxInspections) using ASP.NET MVC, Razor Pages, and SQL Server",
        "Integrated microservices & third-party APIs (SOAP, REST), automating booking workflows and boosting data exchange efficiency by 25%",
        "Led CI/CD pipeline improvements — reduced deployment time by 40%, increased dev productivity by 15%",
        "Built Xamarin mobile app for on-site property inspections with real-time data sync to web portal",
        "Deliver scalable apps handling 10,000+ daily API requests with minimal downtime"
      ]
    },
    {
      role: "Junior Software Developer",
      company: "SibiSoft Pvt Ltd",
      period: "Apr 2021 — Jun 2022",
      bullets: [
        "Developed Java EE, EJB, and Apache Struts apps for a club management platform in Agile sprints",
        "Optimized SQL queries and app code, improving performance by 15%",
        "Built Power BI dashboards for data-driven stakeholder decisions"
      ]
    },
    {
      role: "Software Engineer",
      company: "Wavetec Pvt Ltd",
      period: "Sep 2020 — Mar 2021",
      bullets: [
        "Developed Financial ERP with PHP (Laravel) + React, designed REST APIs powering an HR management Android app",
        "Translated customer requirements into technical specifications and project plans"
      ]
    },
    {
      role: "Software Developer",
      company: "Bilal Associates",
      period: "Mar 2020 — Aug 2020",
      bullets: [
        "Built CRM components for ERP using ASP.NET Core, Razor Pages, and Entity Framework",
        "Collaborated across full SDLC from requirements to production release"
      ]
    }
  ],

  education: {
    degree: "BS Computer Science",
    institution: "FAST-NUCES, Karachi",
    period: "2016 — 2020"
  },

  projects: [
    {
      name: "MyApp.Api — Delivery Challan System",
      tech: "ASP.NET Core 9, React 19, EF Core, SQL Server, Bootstrap 5",
      description: "Full-stack delivery challan management system with company/client CRUD, auto-numbered challans, dynamic line items, and autocomplete lookups",
      link: "github.com/huzefa5152/MyApp.Api"
    },
    {
      name: "dotnet-microservices-starter",
      tech: "ASP.NET Core, Docker, Ocelot, SQL Server, JWT",
      description: "Production-ready microservices architecture with API Gateway, service discovery, and containerized deployment",
      link: "github.com/huzefa5152/dotnet-microservices-starter"
    },
    {
      name: "react-dashboard-kit",
      tech: "React, TypeScript, Node.js, MongoDB, Chart.js",
      description: "Full-stack admin dashboard with charts, data tables, auth, and dark/light theme support",
      link: "github.com/huzefa5152/react-dashboard-kit"
    },
    {
      name: "ai-crop-disease-detector",
      tech: "Python, FastAPI, TensorFlow, React Native",
      description: "ML-powered API that predicts crop diseases from uploaded images with 92% accuracy",
      link: "github.com/huzefa5152/ai-crop-disease-detector"
    },
    {
      name: "devops-pipeline-toolkit",
      tech: "GitHub Actions, Docker, Terraform, Bash",
      description: "CI/CD templates, Docker configs, and infrastructure-as-code scripts for rapid project setup",
      link: "github.com/huzefa5152/devops-pipeline-toolkit"
    }
  ],

  contact: {
    email: "huzefa.hussain1111@gmail.com",
    linkedin: "https://linkedin.com/in/huzefa-hussain-8a5156193",
    github: "https://github.com/huzefa5152",
    website: "https://huzefa5152.github.io"
  }
};

// ============================================================
// Command Registry
// ============================================================

const COMMANDS = {
  help: {
    description: "List all available commands",
    execute: () => {
      const cmds = Object.entries(COMMANDS)
        .filter(([_, v]) => !v.hidden)
        .map(([name, cmd]) => {
          const padded = name.padEnd(16);
          return `  <span class="cmd-name">${padded}</span> <span class="muted">${cmd.description}</span>`;
        })
        .join("\n");
      return `<span class="section-header">Available Commands:</span>\n\n${cmds}\n\n<span class="muted">Tip: Use Tab for autocomplete, ↑↓ for history</span>`;
    }
  },

  about: {
    description: "Who am I?",
    execute: () => {
      return `<span class="section-header">About Me</span>

  ${RESUME_DATA.about.summary}

  <span class="label">Location:</span>  ${RESUME_DATA.about.location}
  <span class="label">Email:</span>     ${RESUME_DATA.about.email}
  <span class="label">LinkedIn:</span>  <a href="https://${RESUME_DATA.about.linkedin}" target="_blank">${RESUME_DATA.about.linkedin}</a>
  <span class="label">GitHub:</span>    <a href="https://${RESUME_DATA.about.github}" target="_blank">${RESUME_DATA.about.github}</a>`;
    }
  },

  skills: {
    description: "Technical skills breakdown",
    execute: () => {
      let output = `<span class="section-header">Technical Skills</span>\n`;
      for (const [category, skills] of Object.entries(RESUME_DATA.skills)) {
        output += `\n  <span class="label">${category}:</span>\n    ${skills.join(", ")}`;
      }
      return output;
    }
  },

  experience: {
    description: "Work history",
    execute: () => {
      let output = `<span class="section-header">Professional Experience</span>\n`;
      for (const job of RESUME_DATA.experience) {
        output += `\n  <span class="highlight">${job.role}</span> @ <span class="company-name">${job.company}</span>`;
        output += `\n  <span class="muted">${job.period}</span>\n`;
        for (const bullet of job.bullets) {
          output += `    • ${bullet}\n`;
        }
      }
      return output;
    }
  },

  education: {
    description: "Academic background",
    execute: () => {
      const edu = RESUME_DATA.education;
      return `<span class="section-header">Education</span>

  <span class="highlight">${edu.degree}</span>
  ${edu.institution}
  <span class="muted">${edu.period}</span>`;
    }
  },

  projects: {
    description: "Featured projects",
    execute: () => {
      let output = `<span class="section-header">Featured Projects</span>\n`;
      for (const proj of RESUME_DATA.projects) {
        output += `\n  <span class="highlight">${proj.name}</span>`;
        output += `\n  <span class="muted">${proj.tech}</span>`;
        output += `\n  ${proj.description}`;
        output += `\n  <a href="https://${proj.link}" target="_blank">${proj.link}</a>\n`;
      }
      return output;
    }
  },

  contact: {
    description: "Get in touch",
    execute: () => {
      const c = RESUME_DATA.contact;
      return `<span class="section-header">Contact</span>

  <span class="label">Email:</span>    <a href="mailto:${c.email}">${c.email}</a>
  <span class="label">LinkedIn:</span> <a href="${c.linkedin}" target="_blank">${c.linkedin.replace("https://", "")}</a>
  <span class="label">GitHub:</span>   <a href="${c.github}" target="_blank">${c.github.replace("https://", "")}</a>
  <span class="label">Website:</span>  <a href="${c.website}" target="_blank">${c.website.replace("https://", "")}</a>

  <span class="muted">Feel free to reach out — I'm always open to interesting conversations!</span>`;
    }
  },

  whoami: {
    description: "Current user info",
    execute: () => `visitor@huzefa-portfolio`
  },

  date: {
    description: "Show current date",
    execute: () => new Date().toString()
  },

  clear: {
    description: "Clear terminal",
    execute: () => "__CLEAR__"
  },

  ls: {
    description: "List directory contents",
    execute: () => {
      return `<span class="cmd-name">about.txt</span>    <span class="cmd-name">skills.txt</span>    <span class="cmd-name">experience.txt</span>
<span class="cmd-name">education.txt</span> <span class="cmd-name">projects.txt</span>  <span class="cmd-name">contact.txt</span>`;
    }
  },

  cat: {
    description: "Read a file (e.g., cat about.txt)",
    execute: (args) => {
      if (!args || args.length === 0) {
        return `<span class="error">cat: missing operand</span>\nUsage: cat &lt;filename&gt;`;
      }
      const file = args[0].replace(".txt", "");
      if (COMMANDS[file] && file !== "cat" && file !== "ls") {
        return COMMANDS[file].execute();
      }
      return `<span class="error">cat: ${args[0]}: No such file or directory</span>`;
    }
  },

  history: {
    description: "Show command history",
    execute: () => "__HISTORY__"
  },

  theme: {
    description: "Change theme (green/amber/cyan/dracula/nord/retro/matrix/solarized)",
    execute: (args) => {
      const themes = {
        green:     { text: "#00ff41", glow: "rgba(0,255,65,0.4)", bg: "#0a0a0a", bgTerminal: "#0d0d0d", prompt: "#ffb000", promptUser: "#bd93f9", highlight: "#50fa7b", link: "#00bfff", border: "#333333", titlebar: "#1e1e1e", muted: "#666666" },
        amber:     { text: "#ffb000", glow: "rgba(255,176,0,0.3)", bg: "#0a0a0a", bgTerminal: "#0d0d0d", prompt: "#ff8c00", promptUser: "#ffd700", highlight: "#ffe066", link: "#ffcc00", border: "#3a3000", titlebar: "#1e1e1e", muted: "#806000" },
        cyan:      { text: "#00ffff", glow: "rgba(0,255,255,0.3)", bg: "#0a0a0a", bgTerminal: "#0d0d0d", prompt: "#ff79c6", promptUser: "#8be9fd", highlight: "#50fa7b", link: "#bd93f9", border: "#333333", titlebar: "#1e1e1e", muted: "#666666" },
        dracula:   { text: "#f8f8f2", glow: "rgba(248,248,242,0.15)", bg: "#282a36", bgTerminal: "#1e1f29", prompt: "#ff79c6", promptUser: "#bd93f9", highlight: "#50fa7b", link: "#8be9fd", border: "#44475a", titlebar: "#21222c", muted: "#6272a4" },
        nord:      { text: "#d8dee9", glow: "rgba(216,222,233,0.1)", bg: "#2e3440", bgTerminal: "#272c36", prompt: "#88c0d0", promptUser: "#81a1c1", highlight: "#a3be8c", link: "#5e81ac", border: "#3b4252", titlebar: "#242933", muted: "#4c566a" },
        retro:     { text: "#ff6ac1", glow: "rgba(255,106,193,0.4)", bg: "#0a0012", bgTerminal: "#0d0018", prompt: "#ffe66d", promptUser: "#ff6ac1", highlight: "#7efdd0", link: "#c991e1", border: "#2a1440", titlebar: "#140020", muted: "#6a3080" },
        matrix:    { text: "#00ff41", glow: "rgba(0,255,65,0.6)", bg: "#000000", bgTerminal: "#000a00", prompt: "#33ff33", promptUser: "#00cc00", highlight: "#66ff66", link: "#00ff41", border: "#003300", titlebar: "#001100", muted: "#005500" },
        solarized: { text: "#839496", glow: "rgba(131,148,150,0.1)", bg: "#002b36", bgTerminal: "#002028", prompt: "#b58900", promptUser: "#268bd2", highlight: "#859900", link: "#2aa198", border: "#073642", titlebar: "#001f28", muted: "#586e75" }
      };
      const name = args && args[0] ? args[0].toLowerCase() : "";
      if (!themes[name]) {
        const list = Object.keys(themes).map(t => `<span class="cmd-name">${t}</span>`).join("  ");
        return `<span class="section-header">Available Themes:</span>\n\n  ${list}\n\n<span class="muted">Usage: theme &lt;name&gt;</span>`;
      }
      const t = themes[name];
      const root = document.documentElement;
      root.style.setProperty("--text", t.text);
      root.style.setProperty("--glow", t.glow);
      root.style.setProperty("--bg", t.bg);
      root.style.setProperty("--bg-terminal", t.bgTerminal);
      root.style.setProperty("--prompt", t.prompt);
      root.style.setProperty("--prompt-user", t.promptUser);
      root.style.setProperty("--highlight", t.highlight);
      root.style.setProperty("--link", t.link);
      root.style.setProperty("--border", t.border);
      root.style.setProperty("--titlebar", t.titlebar);
      root.style.setProperty("--muted", t.muted);

      // Update chip button colors
      document.querySelectorAll('.mobile-suggestions button').forEach(btn => {
        btn.style.borderColor = t.border;
        btn.style.color = t.text;
      });

      return `<span class="highlight">✓</span> Theme changed to <span class="highlight">${name}</span>`;
    }
  },

  neofetch: {
    description: "System information",
    execute: () => {
      return `<span class="highlight">huzefa@portfolio</span>
  ──────────────────────
  <span class="label">OS:</span>        Web Browser
  <span class="label">Host:</span>      GitHub Pages
  <span class="label">Shell:</span>     terminal.js v1.0
  <span class="label">Terminal:</span>  huzefa-portfolio
  <span class="label">CPU:</span>       JavaScript Engine
  <span class="label">Memory:</span>    ${(performance.memory ? (performance.memory.usedJSHeapSize / 1048576).toFixed(1) : "N/A")} MB
  <span class="label">Uptime:</span>    ${Math.floor(performance.now() / 1000)}s
  <span class="label">Packages:</span>  0 (vanilla JS, no deps)

  <span style="color:#ff5555">███</span><span style="color:#ffb000">███</span><span style="color:#00ff41">███</span><span style="color:#00bfff">███</span><span style="color:#bd93f9">███</span><span style="color:#e0e0e0">███</span>`;
    }
  },

  resume: {
    description: "Download my resume & cover letter",
    execute: () => {
      return `<span class="section-header">Downloads</span>

  <span class="label">Resume:</span>       <a href="resume/index.html" target="_blank">View Resume</a>  <span class="muted">(open in browser → Print to PDF)</span>
  <span class="label">Cover Letter:</span>  <a href="cover-letter/index.html" target="_blank">View Cover Letter</a>  <span class="muted">(open in browser → Print to PDF)</span>

  <span class="muted">Tip: Open the link, then press Ctrl+P (or Cmd+P) to save as PDF</span>
  <span class="muted">Or run specific commands: about, skills, experience, education, projects</span>`;
    }
  },

  "sudo": {
    description: "Superuser command",
    hidden: true,
    execute: (args) => {
      if (args && args.join(" ").toLowerCase() === "hire me") {
        return `<span class="highlight">[sudo] password for visitor: ********</span>
<span style="color:#00ff41">
  ✓ Permission granted!
  ✓ Sending offer letter to huzefa.hussain1111@gmail.com...
  ✓ Booking onboarding call...
  ✓ Setting up workstation...

  Just kidding! But I appreciate the enthusiasm 😄
  Reach out at huzefa.hussain1111@gmail.com — let's talk!
</span>`;
      }
      return `<span class="error">[sudo] This incident will be reported.</span>\n<span class="muted">Try: sudo hire me</span>`;
    }
  },

  pwd: {
    description: "Print working directory",
    hidden: true,
    execute: () => `/home/visitor/huzefa-portfolio`
  },

  echo: {
    description: "Echo text",
    hidden: true,
    execute: (args) => args ? args.join(" ") : ""
  },

  uname: {
    description: "System name",
    hidden: true,
    execute: () => `HuzefaOS 4.0.0-portfolio x86_64 GNU/Linux`
  }
};
