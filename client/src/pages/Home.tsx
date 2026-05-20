import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CURSOS_LIST } from "../../../shared/cursos";

// ===================== DATA =====================
const areas = [
  { id: "frontend",  icon: "🎨", name: "Front-end",              desc: "Visual e interatividade da web",        color: "#6c63ff" },
  { id: "backend",   icon: "⚙️",  name: "Back-end",               desc: "Lógica e servidores",                   color: "#00d4aa" },
  { id: "fullstack", icon: "🚀", name: "Full Stack",              desc: "Front + Back completo",                 color: "#ff9500" },
  { id: "ia",        icon: "🤖", name: "Inteligência Artificial", desc: "Machine Learning e IA",                color: "#ff6b6b" },
  { id: "dados",     icon: "📊", name: "Ciência de Dados",        desc: "Análise e visualização",                color: "#4ecdc4" },
  { id: "mobile",    icon: "📱", name: "Mobile",                  desc: "Apps iOS e Android",                    color: "#a29bfe" },
  { id: "cyber",     icon: "🔐", name: "Cibersegurança",          desc: "Proteção e segurança digital",          color: "#fd79a8" },
  { id: "devops",    icon: "🛠️", name: "DevOps",                  desc: "Infraestrutura e automação",            color: "#fdcb6e" },
  { id: "uxui",      icon: "✏️", name: "UX/UI Design",            desc: "Design de experiência",                 color: "#e17055" },
  { id: "ads",       icon: "💼", name: "ADS",                     desc: "Análise e Desenvolvimento de Sistemas", color: "#74b9ff" },
  { id: "banco",     icon: "🗄️", name: "Banco de Dados",          desc: "SQL, NoSQL e modelagem",                color: "#55efc4" },
  { id: "qa",        icon: "🔍", name: "QA / Testes",             desc: "Qualidade de software",                 color: "#b2bec3" },
];

const trilhas: Record<string, { name: string; icon: string; desc: string; fases: { label: string; cor: string; cursos: { plat: string; name: string; by: string; free: boolean; url: string }[] }[] }> = {
  frontend: { name: "Front-end", icon: "🎨", desc: "Você vai aprender a criar interfaces bonitas e interativas para a web.", fases: [
    { label: "Base", cor: "#6c63ff", cursos: [
      { plat: "📺", name: "HTML5 Completo", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/html5/" },
      { plat: "📺", name: "CSS3 do Zero", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/css3/" },
      { plat: "📚", name: "MDN Web Docs — HTML", by: "Mozilla", free: true, url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
    ]},
    { label: "Lógica & JS", cor: "#00d4aa", cursos: [
      { plat: "📺", name: "Lógica de Programação", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/algoritmos/" },
      { plat: "📺", name: "JavaScript ES6+", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/javascript/" },
      { plat: "🌐", name: "JS.info", by: "javascript.info", free: true, url: "https://javascript.info" },
    ]},
    { label: "Versionamento", cor: "#ff9500", cursos: [
      { plat: "📺", name: "Git e GitHub", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/git/" },
      { plat: "🌐", name: "Git Documentation", by: "git-scm.com", free: true, url: "https://git-scm.com/book/pt-br/v2" },
    ]},
    { label: "Framework", cor: "#ff6b6b", cursos: [
      { plat: "🌐", name: "Documentação React", by: "react.dev", free: true, url: "https://react.dev/learn" },
      { plat: "📺", name: "React do Zero ao Pro", by: "freeCodeCamp", free: true, url: "https://www.youtube.com/c/freeCodeCamp" },
    ]},
    { label: "Roadmap", cor: "#a29bfe", cursos: [
      { plat: "🗺️", name: "Frontend Roadmap 2024", by: "roadmap.sh", free: true, url: "https://roadmap.sh/frontend" },
      { plat: "🎓", name: "CS50 Web", by: "Harvard (edX)", free: true, url: "https://cs50.harvard.edu/web/" },
    ]},
  ]},
  backend: { name: "Back-end", icon: "⚙️", desc: "Você vai construir a lógica por trás das aplicações: servidores, APIs e bancos de dados.", fases: [
    { label: "Lógica Base", cor: "#00d4aa", cursos: [
      { plat: "📺", name: "Lógica de Programação", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/algoritmos/" },
      { plat: "📺", name: "Python do Zero", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/python3/" },
    ]},
    { label: "Node.js", cor: "#6c63ff", cursos: [
      { plat: "🌐", name: "Node.js Docs", by: "nodejs.org", free: true, url: "https://nodejs.org/pt-br/docs" },
      { plat: "📺", name: "Node.js Crash Course", by: "Traversy Media (YouTube)", free: true, url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" },
    ]},
    { label: "Banco de Dados", cor: "#ff9500", cursos: [
      { plat: "📺", name: "MySQL Completo", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/mysql/" },
      { plat: "🌐", name: "PostgreSQL Tutorial", by: "postgresqltutorial.com", free: true, url: "https://www.postgresqltutorial.com/" },
    ]},
    { label: "APIs & REST", cor: "#ff6b6b", cursos: [
      { plat: "📚", name: "REST API Design", by: "MDN Web Docs", free: true, url: "https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs" },
      { plat: "🌐", name: "Backend Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/backend" },
    ]},
    { label: "Git & Deploy", cor: "#a29bfe", cursos: [
      { plat: "📺", name: "Git e GitHub", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/git/" },
      { plat: "🌐", name: "Deploy no Render", by: "render.com/docs", free: true, url: "https://render.com/docs" },
    ]},
  ]},
  fullstack: { name: "Full Stack", icon: "🚀", desc: "Você vai dominar tanto o front quanto o back-end e construir aplicações completas.", fases: [
    { label: "HTML/CSS/JS", cor: "#ff9500", cursos: [
      { plat: "📺", name: "HTML5 + CSS3", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/html5/" },
      { plat: "📺", name: "JavaScript", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/javascript/" },
    ]},
    { label: "Back-end", cor: "#6c63ff", cursos: [
      { plat: "📺", name: "Python do Zero", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/python3/" },
      { plat: "📺", name: "MySQL Completo", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/mysql/" },
    ]},
    { label: "React & Node", cor: "#00d4aa", cursos: [
      { plat: "🌐", name: "React Docs", by: "react.dev", free: true, url: "https://react.dev/learn" },
      { plat: "🌐", name: "Node.js Docs", by: "nodejs.org", free: true, url: "https://nodejs.org/pt-br/docs" },
    ]},
    { label: "Git & Deploy", cor: "#ff6b6b", cursos: [
      { plat: "📺", name: "Git e GitHub", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/git/" },
      { plat: "🌐", name: "Vercel Docs", by: "vercel.com/docs", free: true, url: "https://vercel.com/docs" },
    ]},
    { label: "Roadmap", cor: "#a29bfe", cursos: [
      { plat: "🌐", name: "Full Stack Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/full-stack" },
      { plat: "🎓", name: "CS50 Web", by: "Harvard (edX)", free: true, url: "https://cs50.harvard.edu/web/" },
    ]},
  ]},
  ia: { name: "Inteligência Artificial", icon: "🤖", desc: "Você vai aprender a construir e treinar modelos de IA e Machine Learning.", fases: [
    { label: "Matemática & Python", cor: "#ff6b6b", cursos: [
      { plat: "🎓", name: "Álgebra Linear", by: "Khan Academy", free: true, url: "https://pt.khanacademy.org/math/linear-algebra" },
      { plat: "📺", name: "Python para Iniciantes", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/python3/" },
    ]},
    { label: "Python para Dados", cor: "#6c63ff", cursos: [
      { plat: "📺", name: "Python para Dados", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/python3/" },
      { plat: "🌐", name: "Numpy & Pandas", by: "docs.scipy.org", free: true, url: "https://numpy.org/doc/stable/user/quickstart.html" },
    ]},
    { label: "Machine Learning", cor: "#00d4aa", cursos: [
      { plat: "🎓", name: "Machine Learning (Andrew Ng)", by: "Coursera (audit gratuito)", free: true, url: "https://www.coursera.org/learn/machine-learning" },
      { plat: "📺", name: "ML com Scikit-learn", by: "freeCodeCamp", free: true, url: "https://www.youtube.com/watch?v=pqNCD_5r0IU" },
    ]},
    { label: "Deep Learning", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "fast.ai Practical DL", by: "fast.ai", free: true, url: "https://course.fast.ai/" },
      { plat: "🌐", name: "TensorFlow Tutorials", by: "tensorflow.org", free: true, url: "https://www.tensorflow.org/tutorials?hl=pt-br" },
    ]},
    { label: "LLMs & IA Generativa", cor: "#a29bfe", cursos: [
      { plat: "🌐", name: "Hugging Face Course", by: "huggingface.co", free: true, url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
      { plat: "🌐", name: "AI Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/ai-data-scientist" },
    ]},
  ]},
  dados: { name: "Ciência de Dados", icon: "📊", desc: "Você vai aprender a coletar, analisar e transformar dados em insights e decisões.", fases: [
    { label: "Fundamentos", cor: "#4ecdc4", cursos: [
      { plat: "📺", name: "Python para Dados", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/python3/" },
      { plat: "🎓", name: "Fundamentos de Estatística", by: "Khan Academy", free: true, url: "https://pt.khanacademy.org/math/statistics-probability" },
    ]},
    { label: "Análise de Dados", cor: "#6c63ff", cursos: [
      { plat: "🌐", name: "Pandas Docs", by: "pandas.pydata.org", free: true, url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html" },
      { plat: "📺", name: "Data Analysis com Python", by: "freeCodeCamp", free: true, url: "https://www.freecodecamp.org/learn/data-analysis-with-python/" },
    ]},
    { label: "Visualização", cor: "#ff9500", cursos: [
      { plat: "📺", name: "Matplotlib & Seaborn", by: "freeCodeCamp (YouTube)", free: true, url: "https://www.youtube.com/watch?v=3Xc3CA655Y4" },
      { plat: "🌐", name: "Tableau Public", by: "tableau.com", free: true, url: "https://public.tableau.com/en-us/s/resources" },
    ]},
    { label: "SQL & Bancos", cor: "#00d4aa", cursos: [
      { plat: "📺", name: "MySQL Completo", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/mysql/" },
      { plat: "🌐", name: "Mode SQL Tutorial", by: "mode.com", free: true, url: "https://mode.com/sql-tutorial/" },
    ]},
    { label: "ML & Projetos", cor: "#ff6b6b", cursos: [
      { plat: "🌐", name: "Kaggle Courses", by: "kaggle.com", free: true, url: "https://www.kaggle.com/learn" },
      { plat: "🌐", name: "Data Science Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/data-analyst" },
    ]},
  ]},
  mobile: { name: "Desenvolvimento Mobile", icon: "📱", desc: "Você vai criar aplicativos para iOS e Android.", fases: [
    { label: "Lógica & Base", cor: "#a29bfe", cursos: [
      { plat: "📺", name: "Lógica de Programação", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/algoritmos/" },
      { plat: "📺", name: "JavaScript Fundamentos", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/javascript/" },
    ]},
    { label: "React Native", cor: "#6c63ff", cursos: [
      { plat: "🌐", name: "React Native Docs", by: "reactnative.dev", free: true, url: "https://reactnative.dev/docs/getting-started" },
      { plat: "📺", name: "React Native Crash Course", by: "Traversy Media (YouTube)", free: true, url: "https://www.youtube.com/watch?v=Hf4MJH0jDb4" },
    ]},
    { label: "Flutter (opcional)", cor: "#00d4aa", cursos: [
      { plat: "🌐", name: "Flutter Docs", by: "flutter.dev", free: true, url: "https://docs.flutter.dev/get-started/codelab" },
      { plat: "📺", name: "Flutter Crash Course", by: "freeCodeCamp (YouTube)", free: true, url: "https://www.youtube.com/watch?v=VPvVD8t02U8" },
    ]},
    { label: "Publicação", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "Mobile Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/react-native" },
      { plat: "🌐", name: "Expo Docs", by: "expo.dev", free: true, url: "https://docs.expo.dev/" },
    ]},
  ]},
  cyber: { name: "Cibersegurança", icon: "🔐", desc: "Você vai proteger sistemas, redes e dados contra ameaças digitais.", fases: [
    { label: "Fundamentos", cor: "#fd79a8", cursos: [
      { plat: "🎓", name: "Google Cybersecurity Certificate", by: "Coursera (audit gratuito)", free: true, url: "https://www.coursera.org/professional-certificates/google-cybersecurity" },
      { plat: "📺", name: "Redes de Computadores", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/redes-de-computadores/" },
    ]},
    { label: "Linux & Terminal", cor: "#6c63ff", cursos: [
      { plat: "🎓", name: "Linux para Iniciantes", by: "freeCodeCamp", free: true, url: "https://www.freecodecamp.org/news/linux-basics/" },
      { plat: "🌐", name: "OverTheWire: Bandit", by: "overthewire.org", free: true, url: "https://overthewire.org/wargames/bandit/" },
    ]},
    { label: "Ethical Hacking", cor: "#ff6b6b", cursos: [
      { plat: "🌐", name: "TryHackMe", by: "tryhackme.com", free: true, url: "https://tryhackme.com/" },
      { plat: "🌐", name: "Hack The Box", by: "hackthebox.com", free: true, url: "https://www.hackthebox.com/" },
    ]},
    { label: "Roadmap", cor: "#00d4aa", cursos: [
      { plat: "🌐", name: "Cybersecurity Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/cyber-security" },
      { plat: "🌐", name: "OWASP Top 10", by: "owasp.org", free: true, url: "https://owasp.org/www-project-top-ten/" },
    ]},
  ]},
  devops: { name: "DevOps", icon: "🛠️", desc: "Você vai automatizar pipelines, gerenciar infraestrutura e escalar sistemas.", fases: [
    { label: "Linux & Shell", cor: "#fdcb6e", cursos: [
      { plat: "📺", name: "Linux Basics", by: "freeCodeCamp (YouTube)", free: true, url: "https://www.youtube.com/watch?v=ROjZy1WbCIA" },
      { plat: "🌐", name: "Shell Script Guide", by: "gnu.org", free: true, url: "https://www.gnu.org/software/bash/manual/bash.html" },
    ]},
    { label: "Git & CI/CD", cor: "#6c63ff", cursos: [
      { plat: "📺", name: "Git e GitHub", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/git/" },
      { plat: "🌐", name: "GitHub Actions Docs", by: "GitHub", free: true, url: "https://docs.github.com/pt/actions" },
    ]},
    { label: "Docker & Containers", cor: "#00d4aa", cursos: [
      { plat: "🌐", name: "Docker Getting Started", by: "docs.docker.com", free: true, url: "https://docs.docker.com/get-started/" },
      { plat: "📺", name: "Docker Tutorial", by: "TechWorld with Nana (YouTube)", free: true, url: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
    ]},
    { label: "Cloud & Kubernetes", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "AWS Free Tier", by: "aws.amazon.com", free: true, url: "https://aws.amazon.com/pt/free/" },
      { plat: "🌐", name: "DevOps Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/devops" },
    ]},
  ]},
  uxui: { name: "UX/UI Design", icon: "✏️", desc: "Você vai criar experiências digitais centradas no usuário, bonitas e funcionais.", fases: [
    { label: "Fundamentos", cor: "#e17055", cursos: [
      { plat: "🎓", name: "Google UX Design Certificate", by: "Coursera (audit gratuito)", free: true, url: "https://www.coursera.org/professional-certificates/google-ux-design" },
      { plat: "📺", name: "UX Design para Iniciantes", by: "Nielsen Norman (YouTube)", free: true, url: "https://www.youtube.com/@NNgroup" },
    ]},
    { label: "Ferramentas", cor: "#6c63ff", cursos: [
      { plat: "🌐", name: "Figma Learn", by: "figma.com", free: true, url: "https://www.figma.com/resources/learn-design/" },
      { plat: "📺", name: "Figma do Zero", by: "Irmão Dev (YouTube)", free: true, url: "https://www.youtube.com/results?search_query=figma+tutorial+pt+br" },
    ]},
    { label: "Design System", cor: "#00d4aa", cursos: [
      { plat: "🌐", name: "Material Design", by: "material.io", free: true, url: "https://m3.material.io/" },
      { plat: "🌐", name: "Human Interface Guidelines", by: "Apple Developer", free: true, url: "https://developer.apple.com/design/human-interface-guidelines/" },
    ]},
    { label: "Portfólio", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "Behance Portfolio", by: "behance.net", free: true, url: "https://www.behance.net/" },
      { plat: "🌐", name: "UX Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/ux-design" },
    ]},
  ]},
  ads: { name: "ADS — Análise e Desenvolvimento de Sistemas", icon: "💼", desc: "Formação completa em sistemas: análise, desenvolvimento, banco de dados e processos.", fases: [
    { label: "Lógica & Algoritmos", cor: "#74b9ff", cursos: [
      { plat: "📺", name: "Algoritmos e Lógica", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/algoritmos/" },
      { plat: "📺", name: "Python 3", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/python3/" },
    ]},
    { label: "Web (HTML/CSS/JS)", cor: "#6c63ff", cursos: [
      { plat: "📺", name: "HTML5 + CSS3", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/html5/" },
      { plat: "📺", name: "JavaScript", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/javascript/" },
    ]},
    { label: "Banco de Dados", cor: "#00d4aa", cursos: [
      { plat: "📺", name: "MySQL Completo", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/mysql/" },
      { plat: "🌐", name: "SQL Tutorial", by: "w3schools.com", free: true, url: "https://www.w3schools.com/sql/" },
    ]},
    { label: "Análise & UML", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "Astah Community (UML)", by: "astah.net", free: true, url: "https://astah.net/products/astah-community/" },
      { plat: "📺", name: "Análise de Sistemas", by: "Pesquisa no YouTube", free: true, url: "https://www.youtube.com/results?search_query=analise+de+sistemas+uml+br" },
    ]},
    { label: "Práticas & Roadmap", cor: "#a29bfe", cursos: [
      { plat: "🎓", name: "CS50 — Intro to CS", by: "Harvard (edX)", free: true, url: "https://cs50.harvard.edu/x/" },
      { plat: "🌐", name: "Full Stack Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/full-stack" },
    ]},
  ]},
  banco: { name: "Banco de Dados", icon: "🗄️", desc: "Você vai modelar, administrar e otimizar bancos de dados relacionais e não-relacionais.", fases: [
    { label: "SQL Básico", cor: "#55efc4", cursos: [
      { plat: "📺", name: "MySQL Completo", by: "Curso em Vídeo", free: true, url: "https://www.cursoemvideo.com/curso/mysql/" },
      { plat: "🌐", name: "SQLZoo", by: "sqlzoo.net", free: true, url: "https://sqlzoo.net/" },
    ]},
    { label: "SQL Avançado", cor: "#6c63ff", cursos: [
      { plat: "🌐", name: "Mode SQL Tutorial", by: "mode.com", free: true, url: "https://mode.com/sql-tutorial/" },
      { plat: "🌐", name: "PostgreSQL Docs", by: "postgresql.org", free: true, url: "https://www.postgresql.org/docs/current/tutorial.html" },
    ]},
    { label: "NoSQL", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "MongoDB University", by: "learn.mongodb.com", free: true, url: "https://learn.mongodb.com/" },
      { plat: "📺", name: "MongoDB Crash Course", by: "Traversy Media (YouTube)", free: true, url: "https://www.youtube.com/watch?v=-56x56UppqQ" },
    ]},
    { label: "Performance & Roadmap", cor: "#00d4aa", cursos: [
      { plat: "🌐", name: "Database Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/postgresql-dba" },
      { plat: "🌐", name: "Use The Index, Luke!", by: "use-the-index-luke.com", free: true, url: "https://use-the-index-luke.com/" },
    ]},
  ]},
  qa: { name: "QA / Testes", icon: "🔍", desc: "Você vai garantir a qualidade de software através de testes manuais e automatizados.", fases: [
    { label: "Fundamentos", cor: "#b2bec3", cursos: [
      { plat: "📺", name: "QA para Iniciantes", by: "Pesquisa no YouTube", free: true, url: "https://www.youtube.com/results?search_query=qa+testes+software+iniciantes+br" },
      { plat: "🌐", name: "ISTQB Glossário", by: "istqb.org", free: true, url: "https://glossary.istqb.org/pt_BR/search?term=&exact=false" },
    ]},
    { label: "Testes Manuais", cor: "#6c63ff", cursos: [
      { plat: "📺", name: "Postman Tutorial", by: "Pesquisa no YouTube", free: true, url: "https://www.youtube.com/results?search_query=postman+tutorial+pt+br" },
      { plat: "🌐", name: "Postman Learning Center", by: "learning.postman.com", free: true, url: "https://learning.postman.com/docs/getting-started/introduction/" },
    ]},
    { label: "Automação", cor: "#00d4aa", cursos: [
      { plat: "📺", name: "Selenium Python", by: "freeCodeCamp (YouTube)", free: true, url: "https://www.youtube.com/watch?v=j7VZsCCnptM" },
      { plat: "🌐", name: "Cypress Docs", by: "cypress.io", free: true, url: "https://docs.cypress.io/guides/overview/why-cypress" },
    ]},
    { label: "Roadmap", cor: "#ff9500", cursos: [
      { plat: "🌐", name: "QA Roadmap", by: "roadmap.sh", free: true, url: "https://roadmap.sh/qa" },
      { plat: "🌐", name: "Test Automation University", by: "testautomationu.applitools.com", free: true, url: "https://testautomationu.applitools.com/" },
    ]},
  ]},
};

const questions = [
  { q: "O que mais te atrai na tecnologia?", hint: "Escolha a opção mais próxima do que você sente.", opts: [
    { label: "Criar coisas visuais e bonitas",           scores: { frontend: 3, uxui: 3, mobile: 1 } },
    { label: "Resolver problemas de lógica e sistemas",  scores: { backend: 3, ads: 2, fullstack: 1 } },
    { label: "Trabalhar com dados e análises",           scores: { dados: 3, ia: 2, banco: 1 } },
    { label: "Proteger e garantir segurança",            scores: { cyber: 4 } },
  ]},
  { q: "Como você prefere trabalhar?", hint: "Pense no seu dia a dia ideal.", opts: [
    { label: "Criando interfaces que as pessoas usam",    scores: { frontend: 3, uxui: 2, mobile: 2 } },
    { label: "Fazendo a \"máquina\" funcionar por trás",  scores: { backend: 3, devops: 2, ads: 1 } },
    { label: "Mergulhado em dados e padrões",             scores: { dados: 3, ia: 2, banco: 2 } },
    { label: "Testando e garantindo que tudo funciona",   scores: { qa: 4 } },
  ]},
  { q: "Você gosta de matemática?", hint: "Seja honesto — não tem certo ou errado!", opts: [
    { label: "Sim! Adoro cálculo e estatística",              scores: { ia: 4, dados: 3 } },
    { label: "Um pouco — lógica sim, cálculo não tanto",      scores: { backend: 2, fullstack: 2, ads: 1 } },
    { label: "Não muito, prefiro o lado criativo",             scores: { frontend: 2, uxui: 3 } },
    { label: "Não muito, prefiro o lado prático/operacional",  scores: { devops: 2, qa: 2, cyber: 2 } },
  ]},
  { q: "Qual dessas atividades te parece mais divertida?", hint: "Imagine que você vai passar horas fazendo isso.", opts: [
    { label: "Desenhar telas e montar layouts",                  scores: { uxui: 4, frontend: 2 } },
    { label: "Programar algoritmos e APIs",                      scores: { backend: 3, fullstack: 2 } },
    { label: "Explorar vulnerabilidades e proteger sistemas",     scores: { cyber: 4 } },
    { label: "Criar e treinar modelos de IA",                    scores: { ia: 4, dados: 2 } },
  ]},
  { q: "Que tipo de resultado você quer ver no seu trabalho?", hint: "O que mais te daria satisfação?", opts: [
    { label: "Um site ou app bonito funcionando",           scores: { frontend: 3, mobile: 3, uxui: 1 } },
    { label: "Um sistema robusto rodando no servidor",      scores: { backend: 3, devops: 2 } },
    { label: "Um relatório ou insight que ajuda decisões",  scores: { dados: 4, ia: 1 } },
    { label: "Um sistema seguro e sem falhas",              scores: { cyber: 2, qa: 3 } },
  ]},
  { q: "Você tem interesse em trabalhar com dispositivos móveis?", hint: "Apps de celular, tablets, etc.", opts: [
    { label: "Sim! Quero criar apps para Android/iOS",    scores: { mobile: 5 } },
    { label: "Um pouco, mas não é meu foco principal",    scores: { fullstack: 1, frontend: 1 } },
    { label: "Prefiro web ou desktop",                    scores: { frontend: 1, backend: 1, fullstack: 1 } },
    { label: "Não tenho preferência",                     scores: {} },
  ]},
  { q: "O que você prefere entre as opções abaixo?", hint: "Escolha o que mais se encaixa no seu perfil.", opts: [
    { label: "Automatizar processos e gerenciar servidores",   scores: { devops: 5 } },
    { label: "Analisar sistemas e criar soluções completas",   scores: { ads: 4, fullstack: 2 } },
    { label: "Trabalhar com SQL e modelagem de bancos",        scores: { banco: 5, dados: 1 } },
    { label: "Criar experiências de usuário incríveis",        scores: { uxui: 4, frontend: 1 } },
  ]},
  { q: "Onde você se imagina trabalhando?", hint: "Pense no ambiente de trabalho ideal.", opts: [
    { label: "Em uma startup criando produtos digitais",         scores: { frontend: 2, fullstack: 3, mobile: 2 } },
    { label: "Em uma empresa de segurança ou banco",             scores: { cyber: 2, banco: 2, qa: 1 } },
    { label: "Em um laboratório de dados ou pesquisa",           scores: { ia: 3, dados: 3 } },
    { label: "Em qualquer lugar — quero ter um perfil completo", scores: { fullstack: 2, ads: 3, devops: 1 } },
  ]},
];

// ===================== TYPES =====================
type Screen = "home" | "choose-path" | "area-select" | "quiz" | "result" | "trilha";

const screenLabels: Record<Screen, string> = {
  home: "Início",
  "choose-path": "Caminho",
  "area-select": "Escolher Área",
  quiz: "Quiz",
  result: "Resultado",
  trilha: "Trilha",
};

// ===================== MODAL =====================
function ModalCurso({ onConfirm, onClose }: { onConfirm: (curso: string, periodo: string) => void; onClose: () => void }) {
  const [cursoId, setCursoId] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [loading, setLoading] = useState(false);

  const cursoSelecionado = CURSOS_LIST.find((c) => c.id === cursoId);
  const maxPeriodos = cursoSelecionado?.periodos ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cursoId || !periodo) return;
    setLoading(true);
    try {
      await onConfirm(cursoSelecionado!.label, periodo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#111118", border: "1px solid rgba(108,99,255,0.3)", borderRadius: "24px",
        padding: "2.5rem 2rem", width: "100%", maxWidth: "480px",
        animation: "fadeUp 0.35s ease both",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.2)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "1rem",
            fontSize: "12px", color: "#6c63ff", letterSpacing: "2px", textTransform: "uppercase",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6c63ff" }} />
            Antes de começar
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#f0eef8", marginBottom: "0.5rem" }}>
            Nos conte um pouco sobre você
          </h2>
          <p style={{ color: "#a09cb8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Essas informações nos ajudam a entender melhor o perfil dos estudantes de T.I.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#a09cb8", marginBottom: "0.5rem", fontWeight: 500 }}>
              Qual curso de T.I. você faz?
            </label>
            <select
              value={cursoId}
              onChange={(e) => { setCursoId(e.target.value); setPeriodo(""); }}
              required
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.2)",
                borderRadius: "12px", padding: "12px 16px", color: "#f0eef8", fontSize: "0.95rem",
                outline: "none", cursor: "pointer", appearance: "none",
              }}
            >
              <option value="" style={{ background: "#111118" }}>Selecione seu curso...</option>
              {CURSOS_LIST.map((c) => (
                <option key={c.id} value={c.id} style={{ background: "#111118" }}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#a09cb8", marginBottom: "0.5rem", fontWeight: 500 }}>
              Qual período você está cursando?
            </label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              required
              disabled={!cursoId}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.2)",
                borderRadius: "12px", padding: "12px 16px", color: cursoId ? "#f0eef8" : "#6b6785", fontSize: "0.95rem",
                outline: "none", cursor: cursoId ? "pointer" : "not-allowed", appearance: "none",
                opacity: cursoId ? 1 : 0.5,
              }}
            >
              <option value="" style={{ background: "#111118" }}>
                {cursoId ? "Selecione o período..." : "Selecione o curso primeiro"}
              </option>
              {cursoId && Array.from({ length: maxPeriodos }, (_, i) => (
                <option key={i + 1} value={`${i + 1}º período`} style={{ background: "#111118" }}>
                  {i + 1}º período
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1, background: "transparent", color: "#a09cb8", border: "1px solid rgba(108,99,255,0.2)",
                borderRadius: "14px", padding: "14px", fontSize: "0.95rem", fontFamily: "'Syne', sans-serif",
                fontWeight: 600, cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!cursoId || !periodo || loading}
              style={{
                flex: 2, background: cursoId && periodo ? "#6c63ff" : "rgba(108,99,255,0.3)",
                color: "#fff", border: "none", borderRadius: "14px", padding: "14px",
                fontSize: "0.95rem", fontFamily: "'Syne', sans-serif", fontWeight: 600,
                cursor: cursoId && periodo ? "pointer" : "not-allowed", transition: "all 0.2s",
              }}
            >
              {loading ? "Salvando..." : "Continuar →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================
export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [quizState, setQuizState] = useState({ currentQ: 0, answers: new Array(questions.length).fill(null) as (number | null)[] });
  const [quizResult, setQuizResult] = useState<{ topId: string; scores: Record<string, number> } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  const salvarMutation = trpc.registros.salvar.useMutation({
    onSuccess: () => {
      toast.success("Dados salvos! Obrigado por participar.");
    },
    onError: () => {
      toast.error("Erro ao salvar dados. Continuando mesmo assim.");
    },
  });

  const go = (s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  // Particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = "";
    const colors = ["rgba(108,99,255,0.6)", "rgba(0,212,170,0.5)", "rgba(255,107,107,0.4)"];
    for (let i = 0; i < 25; i++) {
      const el = document.createElement("div");
      el.className = "fc-particle";
      const size = Math.random() * 6 + 2;
      el.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${8 + Math.random() * 12}s;animation-delay:${Math.random() * 10}s;`;
      container.appendChild(el);
    }
  }, []);

  const handleComecaAgora = () => setShowModal(true);

  const handleModalConfirm = async (curso: string, periodo: string) => {
    await salvarMutation.mutateAsync({ curso, periodo });
    setShowModal(false);
    go("choose-path");
  };

  // ---- QUIZ ----
  const startQuiz = () => {
    setQuizState({ currentQ: 0, answers: new Array(questions.length).fill(null) });
    go("quiz");
  };

  const selectAnswer = (idx: number) => {
    setQuizState((prev) => {
      const answers = [...prev.answers];
      answers[prev.currentQ] = idx;
      return { ...prev, answers };
    });
  };

  const nextQ = () => {
    if (quizState.answers[quizState.currentQ] === null) return;
    if (quizState.currentQ < questions.length - 1) {
      setQuizState((prev) => ({ ...prev, currentQ: prev.currentQ + 1 }));
    } else {
      computeResult();
    }
  };

  const prevQ = () => {
    if (quizState.currentQ > 0) {
      setQuizState((prev) => ({ ...prev, currentQ: prev.currentQ - 1 }));
    }
  };

  const computeResult = () => {
    const scores: Record<string, number> = {};
    Object.keys(trilhas).forEach((k) => (scores[k] = 0));
    quizState.answers.forEach((ans, qi) => {
      if (ans === null) return;
      const s = questions[qi].opts[ans].scores as Record<string, number>;
      Object.entries(s).forEach(([k, v]) => { if (scores[k] !== undefined) scores[k] += v; });
    });
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topId = sorted[0][0];
    setSelectedArea(topId);
    setQuizResult({ topId, scores });
    go("result");
  };

  const goToTrilha = (id?: string) => {
    const areaId = id || selectedArea;
    if (areaId) {
      setSelectedArea(areaId);
      go("trilha");
    }
  };

  // ---- RENDER HELPERS ----
  const renderTrilha = (id: string) => {
    const t = trilhas[id];
    if (!t) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, padding: "5rem 2rem 4rem" }}>
        <div className="fc-trilha-header">
          <button className="fc-back-btn" onClick={() => go("area-select")}>← Voltar para áreas</button>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{t.icon}</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>{t.name}</h2>
          <p style={{ color: "var(--fc-text2)", fontSize: "1rem", lineHeight: 1.6 }}>{t.desc}</p>
        </div>
        <div className="fc-trilha-content">
          {t.fases.map((fase, fi) => (
            <div key={fi} className="fc-fase-block fc-slide-in" style={{ animationDelay: `${fi * 0.1}s` }}>
              <div className="fc-fase-label">
                <div className="fc-fase-num" style={{ background: `${fase.cor}22`, color: fase.cor }}>{fi + 1}</div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem" }}>{fase.label}</span>
                <div className="fc-fase-line" />
              </div>
              <div className="fc-cursos-row">
                {fase.cursos.map((c, ci) => (
                  <a key={ci} className="fc-curso-card" href={c.url} target="_blank" rel="noopener noreferrer">
                    <div className="fc-curso-plat" style={{ background: `${fase.cor}22` }}>{c.plat}</div>
                    <div className="fc-curso-info">
                      <h5>{c.name}</h5>
                      <p>{c.by}</p>
                      {c.free && <span className="fc-free">✓ Gratuito</span>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="fc-btn-secondary" onClick={() => go("area-select")}>← Outras áreas</button>
          <button className="fc-btn-primary" onClick={() => go("home")}>Início</button>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!quizResult) return null;
    const { topId, scores } = quizResult;
    const topArea = areas.find((a) => a.id === topId)!;
    const t = trilhas[topId];
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sorted[0][1] || 1;
    const top5 = sorted.slice(0, 5);
    return (
      <div className="fc-result-card">
        <div className="fc-result-icon">{topArea.icon}</div>
        <div className="fc-result-tag">Resultado do seu perfil</div>
        <h2 className="fc-result-title">{t.name}</h2>
        <p className="fc-result-desc">{t.desc} Com base nas suas respostas, esse é o perfil que mais combina com você!</p>
        <div className="fc-match-bars">
          <p style={{ fontSize: "0.85rem", color: "var(--fc-text3)", marginBottom: "1rem" }}>Compatibilidade por área</p>
          {top5.map(([id, sc]) => {
            const ar = areas.find((a) => a.id === id)!;
            const pct = Math.round((sc / maxScore) * 100);
            return (
              <div key={id} className="fc-match-row">
                <div className="fc-match-label">
                  <span>{ar.icon} {ar.name}</span>
                  <span style={{ color: "var(--fc-accent2)" }}>{pct}%</span>
                </div>
                <div className="fc-match-track">
                  <div className="fc-match-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="fc-result-actions">
          <button className="fc-btn-primary" onClick={() => goToTrilha()}>Ver minha trilha →</button>
          <button className="fc-btn-ghost" onClick={startQuiz}>Refazer quiz</button>
        </div>
      </div>
    );
  };

  const q = questions[quizState.currentQ];
  const total = questions.length;
  const pct = (quizState.currentQ / total) * 100;

  return (
    <>
      {/* Partículas de fundo */}
      <div ref={particlesRef} id="fc-particles" />

      {/* Barra de navegação */}
      <nav className="fc-top-nav">
        <span className="fc-nav-logo">Form<span>Carrer</span></span>
        <span style={{ color: "var(--fc-text3)" }}>|</span>
        <span style={{ color: "var(--fc-text3)", fontSize: "0.85rem" }}>{screenLabels[screen]}</span>
      </nav>

      {/* Modal de coleta */}
      {showModal && (
        <ModalCurso
          onConfirm={handleModalConfirm}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ===== HOME ===== */}
      {screen === "home" && (
        <div className="fc-screen fc-screen-home">
          <div className="fc-logo-badge">
            <div className="fc-logo-dot" />
            Plataforma de Orientação em T.I.
          </div>
          <h1 className="fc-home-title">Sua carreira em<br /><span>T.I. começa aqui.</span></h1>
          <p className="fc-home-sub">
            Descubra qual área da tecnologia combina com você e receba uma trilha de cursos
            100% gratuitos para começar hoje mesmo.
          </p>
          <div className="fc-home-btns">
            <button className="fc-btn-primary" onClick={handleComecaAgora}>Começar agora →</button>
            <button className="fc-btn-secondary" onClick={() => go("area-select")}>Ver todas as áreas</button>
          </div>
          <div className="fc-home-stats">
            <div className="fc-stat"><div className="fc-stat-num">12</div><div className="fc-stat-label">Áreas cobertas</div></div>
            <div className="fc-stat"><div className="fc-stat-num">80+</div><div className="fc-stat-label">Cursos gratuitos</div></div>
            <div className="fc-stat"><div className="fc-stat-num">100%</div><div className="fc-stat-label">Sem custo</div></div>
          </div>
        </div>
      )}

      {/* ===== CHOOSE PATH ===== */}
      {screen === "choose-path" && (
        <div className="fc-screen fc-screen-choose">
          <div style={{ paddingTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, justifyContent: "center", padding: "5rem 2rem 3rem" }}>
            <button className="fc-back-btn" onClick={() => go("home")}>← Voltar</button>
            <h2 className="fc-section-title">Por onde você está?</h2>
            <p className="fc-section-sub" style={{ margin: "0 auto 3rem" }}>Escolha o caminho que melhor descreve sua situação agora.</p>
            <div className="fc-path-cards">
              <div className="fc-path-card" onClick={() => go("area-select")}>
                <div className="fc-path-icon">🎯</div>
                <h3>Já sei minha área</h3>
                <p>Você já tem uma área em mente e quer saber exatamente por onde começar.</p>
                <span className="fc-badge fc-badge-yes">Ir direto à trilha</span>
              </div>
              <div className="fc-path-card" onClick={startQuiz}>
                <div className="fc-path-icon">🧭</div>
                <h3>Ainda não sei</h3>
                <p>Responda algumas perguntas rápidas e descubra qual área combina com seu perfil.</p>
                <span className="fc-badge fc-badge-no">Fazer o quiz</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== AREA SELECT ===== */}
      {screen === "area-select" && (
        <div className="fc-screen" style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, padding: "5rem 2rem 3rem" }}>
          <button className="fc-back-btn" onClick={() => go("choose-path")}>← Voltar</button>
          <h2 className="fc-section-title" style={{ textAlign: "center" }}>Qual área você quer seguir?</h2>
          <p className="fc-section-sub" style={{ textAlign: "center", margin: "0 auto 2.5rem" }}>
            Clique na área para ver a trilha completa de estudos.
          </p>
          <div className="fc-areas-grid">
            {areas.map((a) => (
              <div key={a.id} className="fc-area-card" onClick={() => goToTrilha(a.id)}>
                <div className="fc-area-icon">{a.icon}</div>
                <h4>{a.name}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--fc-text2)", marginTop: "4px" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== QUIZ ===== */}
      {screen === "quiz" && (
        <div className="fc-screen fc-screen-quiz">
          <div className="fc-quiz-container fc-slide-in">
            <button className="fc-back-btn" onClick={() => go("choose-path")}>← Voltar</button>
            <div className="fc-progress-bar-wrap">
              <div className="fc-progress-bar" style={{ width: `${pct}%` }} />
            </div>
            <div className="fc-quiz-step">Pergunta {quizState.currentQ + 1} de {total}</div>
            <h2 className="fc-quiz-q">{q.q}</h2>
            <p className="fc-quiz-hint">{q.hint}</p>
            <div className="fc-quiz-options">
              {q.opts.map((o, i) => (
                <div
                  key={i}
                  className={`fc-quiz-opt${quizState.answers[quizState.currentQ] === i ? " fc-selected" : ""}`}
                  onClick={() => selectAnswer(i)}
                >
                  <div className="fc-quiz-opt-letter">{["A", "B", "C", "D"][i]}</div>
                  <span>{o.label}</span>
                </div>
              ))}
            </div>
            <div className="fc-quiz-nav">
              {quizState.currentQ > 0 && (
                <button className="fc-btn-ghost" onClick={prevQ}>← Anterior</button>
              )}
              <button className="fc-btn-primary" style={{ marginLeft: "auto" }} onClick={nextQ}>
                {quizState.currentQ === total - 1 ? "Ver resultado ✓" : "Próxima →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== RESULT ===== */}
      {screen === "result" && (
        <div className="fc-screen fc-screen-result">
          {renderResult()}
        </div>
      )}

      {/* ===== TRILHA ===== */}
      {screen === "trilha" && selectedArea && (
        <div className="fc-screen">
          {renderTrilha(selectedArea)}
        </div>
      )}
    </>
  );
}
