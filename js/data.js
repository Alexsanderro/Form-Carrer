// ===== AREAS =====
const areas = [
  { id:'frontend', icon:'🎨', name:'Front-end',              desc:'Visual e interatividade da web',       color:'#6c63ff' },
  { id:'backend',  icon:'⚙️',  name:'Back-end',               desc:'Lógica e servidores',                  color:'#00d4aa' },
  { id:'fullstack',icon:'🚀', name:'Full Stack',              desc:'Front + Back completo',                color:'#ff9500' },
  { id:'ia',       icon:'🤖', name:'Inteligência Artificial', desc:'Machine Learning e IA',               color:'#ff6b6b' },
  { id:'dados',    icon:'📊', name:'Ciência de Dados',        desc:'Análise e visualização',               color:'#4ecdc4' },
  { id:'mobile',   icon:'📱', name:'Mobile',                  desc:'Apps iOS e Android',                   color:'#a29bfe' },
  { id:'cyber',    icon:'🔐', name:'Cibersegurança',          desc:'Proteção e segurança digital',         color:'#fd79a8' },
  { id:'devops',   icon:'🛠️', name:'DevOps',                  desc:'Infraestrutura e automação',           color:'#fdcb6e' },
  { id:'uxui',     icon:'✏️', name:'UX/UI Design',            desc:'Design de experiência',                color:'#e17055' },
  { id:'ads',      icon:'💼', name:'ADS',                     desc:'Análise e Desenvolvimento de Sistemas',color:'#74b9ff' },
  { id:'banco',    icon:'🗄️', name:'Banco de Dados',          desc:'SQL, NoSQL e modelagem',               color:'#55efc4' },
  { id:'qa',       icon:'🔍', name:'QA / Testes',             desc:'Qualidade de software',                color:'#b2bec3' },
];

// ===== TRILHAS =====
const trilhas = {
  frontend: {
    name: 'Front-end',
    icon: '🎨',
    desc: 'Você vai aprender a criar interfaces bonitas e interativas para a web.',
    fases: [
      { label: 'Base', cor: '#6c63ff', cursos: [
        { plat:'📺', name:'HTML5 Completo',      by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/html5/' },
        { plat:'📺', name:'CSS3 do Zero',        by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/css3/' },
        { plat:'📚', name:'MDN Web Docs — HTML', by:'Mozilla',        free:true, url:'https://developer.mozilla.org/pt-BR/docs/Web/HTML' },
      ]},
      { label: 'Lógica & JS', cor: '#00d4aa', cursos: [
        { plat:'📺', name:'Lógica de Programação', by:'Curso em Vídeo',     free:true, url:'https://www.cursoemvideo.com/curso/algoritmos/' },
        { plat:'📺', name:'JavaScript ES6+',       by:'Curso em Vídeo',     free:true, url:'https://www.cursoemvideo.com/curso/javascript/' },
        { plat:'🌐', name:'JS.info',               by:'javascript.info',    free:true, url:'https://javascript.info' },
      ]},
      { label: 'Versionamento', cor: '#ff9500', cursos: [
        { plat:'📺', name:'Git e GitHub',      by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/git/' },
        { plat:'🌐', name:'Git Documentation', by:'git-scm.com',    free:true, url:'https://git-scm.com/book/pt-br/v2' },
      ]},
      { label: 'Framework', cor: '#ff6b6b', cursos: [
        { plat:'🌐', name:'Documentação React',    by:'react.dev',    free:true, url:'https://react.dev/learn' },
        { plat:'📺', name:'React do Zero ao Pro',  by:'freeCodeCamp', free:true, url:'https://www.youtube.com/c/freeCodeCamp' },
      ]},
      { label: 'Roadmap', cor: '#a29bfe', cursos: [
        { plat:'🗺️', name:'Frontend Roadmap 2024', by:'roadmap.sh',        free:true, url:'https://roadmap.sh/frontend' },
        { plat:'🎓', name:'CS50 Web',              by:'Harvard (edX)',      free:true, url:'https://cs50.harvard.edu/web/' },
      ]},
    ]
  },

  backend: {
    name: 'Back-end',
    icon: '⚙️',
    desc: 'Você vai construir a lógica por trás das aplicações: servidores, APIs e bancos de dados.',
    fases: [
      { label: 'Lógica Base', cor: '#00d4aa', cursos: [
        { plat:'📺', name:'Lógica de Programação', by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/algoritmos/' },
        { plat:'📺', name:'Python do Zero',        by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/python3/' },
      ]},
      { label: 'Node.js', cor: '#6c63ff', cursos: [
        { plat:'🌐', name:'Node.js Docs',       by:'nodejs.org',             free:true, url:'https://nodejs.org/pt-br/docs' },
        { plat:'📺', name:'Node.js Crash Course',by:'Traversy Media (YouTube)', free:true, url:'https://www.youtube.com/watch?v=fBNz5xF-Kx4' },
      ]},
      { label: 'Banco de Dados', cor: '#ff9500', cursos: [
        { plat:'📺', name:'MySQL Completo',       by:'Curso em Vídeo',          free:true, url:'https://www.cursoemvideo.com/curso/mysql/' },
        { plat:'🌐', name:'PostgreSQL Tutorial',  by:'postgresqltutorial.com',  free:true, url:'https://www.postgresqltutorial.com/' },
      ]},
      { label: 'APIs & REST', cor: '#ff6b6b', cursos: [
        { plat:'📚', name:'REST API Design', by:'MDN Web Docs', free:true, url:'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs' },
        { plat:'🌐', name:'Backend Roadmap', by:'roadmap.sh',   free:true, url:'https://roadmap.sh/backend' },
      ]},
      { label: 'Git & Deploy', cor: '#a29bfe', cursos: [
        { plat:'📺', name:'Git e GitHub',    by:'Curso em Vídeo',   free:true, url:'https://www.cursoemvideo.com/curso/git/' },
        { plat:'🌐', name:'Deploy no Render',by:'render.com/docs',  free:true, url:'https://render.com/docs' },
      ]},
    ]
  },

  fullstack: {
    name: 'Full Stack',
    icon: '🚀',
    desc: 'Você vai dominar tanto o front quanto o back-end e construir aplicações completas.',
    fases: [
      { label: 'HTML/CSS/JS', cor: '#ff9500', cursos: [
        { plat:'📺', name:'HTML5 + CSS3',  by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/html5/' },
        { plat:'📺', name:'JavaScript',    by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/javascript/' },
      ]},
      { label: 'Back-end', cor: '#6c63ff', cursos: [
        { plat:'📺', name:'Python do Zero',  by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/python3/' },
        { plat:'📺', name:'MySQL Completo',  by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/mysql/' },
      ]},
      { label: 'React & Node', cor: '#00d4aa', cursos: [
        { plat:'🌐', name:'React Docs',   by:'react.dev',   free:true, url:'https://react.dev/learn' },
        { plat:'🌐', name:'Node.js Docs', by:'nodejs.org',  free:true, url:'https://nodejs.org/pt-br/docs' },
      ]},
      { label: 'Git & Deploy', cor: '#ff6b6b', cursos: [
        { plat:'📺', name:'Git e GitHub',     by:'Curso em Vídeo',  free:true, url:'https://www.cursoemvideo.com/curso/git/' },
        { plat:'🌐', name:'Vercel Docs',      by:'vercel.com/docs', free:true, url:'https://vercel.com/docs' },
      ]},
      { label: 'Roadmap', cor: '#a29bfe', cursos: [
        { plat:'🌐', name:'Full Stack Roadmap', by:'roadmap.sh',   free:true, url:'https://roadmap.sh/full-stack' },
        { plat:'🎓', name:'CS50 Web',           by:'Harvard (edX)', free:true, url:'https://cs50.harvard.edu/web/' },
      ]},
    ]
  },

  ia: {
    name: 'Inteligência Artificial',
    icon: '🤖',
    desc: 'Você vai aprender a construir e treinar modelos de IA e Machine Learning.',
    fases: [
      { label: 'Matemática & Python', cor: '#ff6b6b', cursos: [
        { plat:'🎓', name:'Álgebra Linear',         by:'Khan Academy',   free:true, url:'https://pt.khanacademy.org/math/linear-algebra' },
        { plat:'📺', name:'Python para Iniciantes', by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/python3/' },
      ]},
      { label: 'Python para Dados', cor: '#6c63ff', cursos: [
        { plat:'📺', name:'Python para Dados', by:'Curso em Vídeo',  free:true, url:'https://www.cursoemvideo.com/curso/python3/' },
        { plat:'🌐', name:'Numpy & Pandas',    by:'docs.scipy.org',  free:true, url:'https://numpy.org/doc/stable/user/quickstart.html' },
      ]},
      { label: 'Machine Learning', cor: '#00d4aa', cursos: [
        { plat:'🎓', name:'Machine Learning (Andrew Ng)', by:'Coursera (audit gratuito)', free:true, url:'https://www.coursera.org/learn/machine-learning' },
        { plat:'📺', name:'ML com Scikit-learn',         by:'freeCodeCamp',              free:true, url:'https://www.youtube.com/watch?v=pqNCD_5r0IU' },
      ]},
      { label: 'Deep Learning', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'fast.ai Practical DL',  by:'fast.ai',          free:true, url:'https://course.fast.ai/' },
        { plat:'🌐', name:'TensorFlow Tutorials',  by:'tensorflow.org',   free:true, url:'https://www.tensorflow.org/tutorials?hl=pt-br' },
      ]},
      { label: 'LLMs & IA Generativa', cor: '#a29bfe', cursos: [
        { plat:'🌐', name:'Hugging Face Course', by:'huggingface.co', free:true, url:'https://huggingface.co/learn/nlp-course/chapter1/1' },
        { plat:'🌐', name:'AI Roadmap',          by:'roadmap.sh',     free:true, url:'https://roadmap.sh/ai-data-scientist' },
      ]},
    ]
  },

  dados: {
    name: 'Ciência de Dados',
    icon: '📊',
    desc: 'Você vai aprender a coletar, analisar e transformar dados em insights e decisões.',
    fases: [
      { label: 'Fundamentos', cor: '#4ecdc4', cursos: [
        { plat:'📺', name:'Python para Dados',       by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/python3/' },
        { plat:'🎓', name:'Fundamentos de Estatística',by:'Khan Academy', free:true, url:'https://pt.khanacademy.org/math/statistics-probability' },
      ]},
      { label: 'Análise de Dados', cor: '#6c63ff', cursos: [
        { plat:'🌐', name:'Pandas Docs',              by:'pandas.pydata.org', free:true, url:'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html' },
        { plat:'📺', name:'Data Analysis com Python', by:'freeCodeCamp',      free:true, url:'https://www.freecodecamp.org/learn/data-analysis-with-python/' },
      ]},
      { label: 'Visualização', cor: '#ff9500', cursos: [
        { plat:'📺', name:'Matplotlib & Seaborn', by:'freeCodeCamp (YouTube)', free:true, url:'https://www.youtube.com/watch?v=3Xc3CA655Y4' },
        { plat:'🌐', name:'Tableau Public',       by:'tableau.com',            free:true, url:'https://public.tableau.com/en-us/s/resources' },
      ]},
      { label: 'SQL & Bancos', cor: '#00d4aa', cursos: [
        { plat:'📺', name:'MySQL Completo',    by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/mysql/' },
        { plat:'🌐', name:'Mode SQL Tutorial', by:'mode.com',       free:true, url:'https://mode.com/sql-tutorial/' },
      ]},
      { label: 'ML & Projetos', cor: '#ff6b6b', cursos: [
        { plat:'🌐', name:'Kaggle Courses',         by:'kaggle.com',  free:true, url:'https://www.kaggle.com/learn' },
        { plat:'🌐', name:'Data Science Roadmap',   by:'roadmap.sh',  free:true, url:'https://roadmap.sh/data-analyst' },
      ]},
    ]
  },

  mobile: {
    name: 'Desenvolvimento Mobile',
    icon: '📱',
    desc: 'Você vai criar aplicativos para iOS e Android.',
    fases: [
      { label: 'Lógica & Base', cor: '#a29bfe', cursos: [
        { plat:'📺', name:'Lógica de Programação',   by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/algoritmos/' },
        { plat:'📺', name:'JavaScript Fundamentos',  by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/javascript/' },
      ]},
      { label: 'React Native', cor: '#6c63ff', cursos: [
        { plat:'🌐', name:'React Native Docs',         by:'reactnative.dev',           free:true, url:'https://reactnative.dev/docs/getting-started' },
        { plat:'📺', name:'React Native Crash Course', by:'Traversy Media (YouTube)',  free:true, url:'https://www.youtube.com/watch?v=Hf4MJH0jDb4' },
      ]},
      { label: 'Flutter (opcional)', cor: '#00d4aa', cursos: [
        { plat:'🌐', name:'Flutter Docs',         by:'flutter.dev',              free:true, url:'https://docs.flutter.dev/get-started/codelab' },
        { plat:'📺', name:'Flutter Crash Course', by:'freeCodeCamp (YouTube)',   free:true, url:'https://www.youtube.com/watch?v=VPvVD8t02U8' },
      ]},
      { label: 'Publicação', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'Mobile Roadmap', by:'roadmap.sh', free:true, url:'https://roadmap.sh/react-native' },
        { plat:'🌐', name:'Expo Docs',      by:'expo.dev',   free:true, url:'https://docs.expo.dev/' },
      ]},
    ]
  },

  cyber: {
    name: 'Cibersegurança',
    icon: '🔐',
    desc: 'Você vai proteger sistemas, redes e dados contra ameaças digitais.',
    fases: [
      { label: 'Fundamentos', cor: '#fd79a8', cursos: [
        { plat:'🎓', name:'Google Cybersecurity Certificate', by:'Coursera (audit gratuito)', free:true, url:'https://www.coursera.org/professional-certificates/google-cybersecurity' },
        { plat:'📺', name:'Redes de Computadores',           by:'Curso em Vídeo',           free:true, url:'https://www.cursoemvideo.com/curso/redes-de-computadores/' },
      ]},
      { label: 'Linux & Terminal', cor: '#6c63ff', cursos: [
        { plat:'🎓', name:'Linux para Iniciantes', by:'freeCodeCamp',       free:true, url:'https://www.freecodecamp.org/news/linux-basics/' },
        { plat:'🌐', name:'OverTheWire: Bandit',   by:'overthewire.org',   free:true, url:'https://overthewire.org/wargames/bandit/' },
      ]},
      { label: 'Ethical Hacking', cor: '#ff6b6b', cursos: [
        { plat:'🌐', name:'TryHackMe',   by:'tryhackme.com',   free:true, url:'https://tryhackme.com/' },
        { plat:'🌐', name:'Hack The Box', by:'hackthebox.com', free:true, url:'https://www.hackthebox.com/' },
      ]},
      { label: 'Roadmap', cor: '#00d4aa', cursos: [
        { plat:'🌐', name:'Cybersecurity Roadmap', by:'roadmap.sh', free:true, url:'https://roadmap.sh/cyber-security' },
        { plat:'🌐', name:'OWASP Top 10',          by:'owasp.org',  free:true, url:'https://owasp.org/www-project-top-ten/' },
      ]},
    ]
  },

  devops: {
    name: 'DevOps',
    icon: '🛠️',
    desc: 'Você vai automatizar pipelines, gerenciar infraestrutura e escalar sistemas.',
    fases: [
      { label: 'Linux & Shell', cor: '#fdcb6e', cursos: [
        { plat:'📺', name:'Linux Basics',       by:'freeCodeCamp (YouTube)', free:true, url:'https://www.youtube.com/watch?v=ROjZy1WbCIA' },
        { plat:'🌐', name:'Shell Script Guide', by:'gnu.org',                free:true, url:'https://www.gnu.org/software/bash/manual/bash.html' },
      ]},
      { label: 'Git & CI/CD', cor: '#6c63ff', cursos: [
        { plat:'📺', name:'Git e GitHub',        by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/git/' },
        { plat:'🌐', name:'GitHub Actions Docs', by:'GitHub',         free:true, url:'https://docs.github.com/pt/actions' },
      ]},
      { label: 'Docker & Containers', cor: '#00d4aa', cursos: [
        { plat:'🌐', name:'Docker Getting Started', by:'docs.docker.com',            free:true, url:'https://docs.docker.com/get-started/' },
        { plat:'📺', name:'Docker Tutorial',        by:'TechWorld with Nana (YouTube)',free:true, url:'https://www.youtube.com/watch?v=3c-iBn73dDE' },
      ]},
      { label: 'Cloud & Kubernetes', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'AWS Free Tier',    by:'aws.amazon.com', free:true, url:'https://aws.amazon.com/pt/free/' },
        { plat:'🌐', name:'DevOps Roadmap',   by:'roadmap.sh',     free:true, url:'https://roadmap.sh/devops' },
      ]},
    ]
  },

  uxui: {
    name: 'UX/UI Design',
    icon: '✏️',
    desc: 'Você vai criar experiências digitais centradas no usuário, bonitas e funcionais.',
    fases: [
      { label: 'Fundamentos', cor: '#e17055', cursos: [
        { plat:'🎓', name:'Google UX Design Certificate', by:'Coursera (audit gratuito)',  free:true, url:'https://www.coursera.org/professional-certificates/google-ux-design' },
        { plat:'📺', name:'UX Design para Iniciantes',    by:'Nielsen Norman (YouTube)',   free:true, url:'https://www.youtube.com/@NNgroup' },
      ]},
      { label: 'Ferramentas', cor: '#6c63ff', cursos: [
        { plat:'🌐', name:'Figma Learn',   by:'figma.com',                         free:true, url:'https://www.figma.com/resources/learn-design/' },
        { plat:'📺', name:'Figma do Zero', by:'Irmão Dev (YouTube)',                free:true, url:'https://www.youtube.com/results?search_query=figma+tutorial+pt+br' },
      ]},
      { label: 'Design System', cor: '#00d4aa', cursos: [
        { plat:'🌐', name:'Material Design',               by:'material.io',        free:true, url:'https://m3.material.io/' },
        { plat:'🌐', name:'Human Interface Guidelines',    by:'Apple Developer',    free:true, url:'https://developer.apple.com/design/human-interface-guidelines/' },
      ]},
      { label: 'Portfólio', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'Behance Portfolio', by:'behance.net', free:true, url:'https://www.behance.net/' },
        { plat:'🌐', name:'UX Roadmap',        by:'roadmap.sh',  free:true, url:'https://roadmap.sh/ux-design' },
      ]},
    ]
  },

  ads: {
    name: 'ADS — Análise e Desenvolvimento de Sistemas',
    icon: '💼',
    desc: 'Formação completa em sistemas: análise, desenvolvimento, banco de dados e processos.',
    fases: [
      { label: 'Lógica & Algoritmos', cor: '#74b9ff', cursos: [
        { plat:'📺', name:'Algoritmos e Lógica', by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/algoritmos/' },
        { plat:'📺', name:'Python 3',            by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/python3/' },
      ]},
      { label: 'Web (HTML/CSS/JS)', cor: '#6c63ff', cursos: [
        { plat:'📺', name:'HTML5 + CSS3', by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/html5/' },
        { plat:'📺', name:'JavaScript',   by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/javascript/' },
      ]},
      { label: 'Banco de Dados', cor: '#00d4aa', cursos: [
        { plat:'📺', name:'MySQL Completo', by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/mysql/' },
        { plat:'🌐', name:'SQL Tutorial',   by:'w3schools.com',   free:true, url:'https://www.w3schools.com/sql/' },
      ]},
      { label: 'Análise & UML', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'Astah Community (UML)', by:'astah.net',       free:true, url:'https://astah.net/products/astah-community/' },
        { plat:'📺', name:'Análise de Sistemas',   by:'Pesquisa no YouTube', free:true, url:'https://www.youtube.com/results?search_query=analise+de+sistemas+uml+br' },
      ]},
      { label: 'Práticas & Roadmap', cor: '#a29bfe', cursos: [
        { plat:'🎓', name:'CS50 — Intro to CS',  by:'Harvard (edX)', free:true, url:'https://cs50.harvard.edu/x/' },
        { plat:'🌐', name:'Full Stack Roadmap',  by:'roadmap.sh',    free:true, url:'https://roadmap.sh/full-stack' },
      ]},
    ]
  },

  banco: {
    name: 'Banco de Dados',
    icon: '🗄️',
    desc: 'Você vai modelar, administrar e otimizar bancos de dados relacionais e não-relacionais.',
    fases: [
      { label: 'SQL Básico', cor: '#55efc4', cursos: [
        { plat:'📺', name:'MySQL Completo', by:'Curso em Vídeo', free:true, url:'https://www.cursoemvideo.com/curso/mysql/' },
        { plat:'🌐', name:'SQLZoo',         by:'sqlzoo.net',     free:true, url:'https://sqlzoo.net/' },
      ]},
      { label: 'SQL Avançado', cor: '#6c63ff', cursos: [
        { plat:'🌐', name:'Mode SQL Tutorial', by:'mode.com',            free:true, url:'https://mode.com/sql-tutorial/' },
        { plat:'🌐', name:'PostgreSQL Docs',   by:'postgresql.org',      free:true, url:'https://www.postgresql.org/docs/current/tutorial.html' },
      ]},
      { label: 'NoSQL', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'MongoDB University',  by:'learn.mongodb.com',           free:true, url:'https://learn.mongodb.com/' },
        { plat:'📺', name:'MongoDB Crash Course',by:'Traversy Media (YouTube)',    free:true, url:'https://www.youtube.com/watch?v=-56x56UppqQ' },
      ]},
      { label: 'Performance & Roadmap', cor: '#00d4aa', cursos: [
        { plat:'🌐', name:'Database Roadmap',      by:'roadmap.sh',             free:true, url:'https://roadmap.sh/postgresql-dba' },
        { plat:'🌐', name:'Use The Index, Luke!',  by:'use-the-index-luke.com', free:true, url:'https://use-the-index-luke.com/' },
      ]},
    ]
  },

  qa: {
    name: 'QA / Testes',
    icon: '🔍',
    desc: 'Você vai garantir a qualidade de software através de testes manuais e automatizados.',
    fases: [
      { label: 'Fundamentos', cor: '#b2bec3', cursos: [
        { plat:'📺', name:'QA para Iniciantes', by:'Pesquisa no YouTube', free:true, url:'https://www.youtube.com/results?search_query=qa+testes+software+iniciantes+br' },
        { plat:'🌐', name:'ISTQB Glossário',    by:'istqb.org',           free:true, url:'https://glossary.istqb.org/pt_BR/search?term=&exact=false' },
      ]},
      { label: 'Testes Manuais', cor: '#6c63ff', cursos: [
        { plat:'📺', name:'Postman Tutorial',        by:'Pesquisa no YouTube',       free:true, url:'https://www.youtube.com/results?search_query=postman+tutorial+pt+br' },
        { plat:'🌐', name:'Postman Learning Center', by:'learning.postman.com',      free:true, url:'https://learning.postman.com/docs/getting-started/introduction/' },
      ]},
      { label: 'Automação', cor: '#00d4aa', cursos: [
        { plat:'📺', name:'Selenium Python', by:'freeCodeCamp (YouTube)', free:true, url:'https://www.youtube.com/watch?v=j7VZsCCnptM' },
        { plat:'🌐', name:'Cypress Docs',    by:'cypress.io',             free:true, url:'https://docs.cypress.io/guides/overview/why-cypress' },
      ]},
      { label: 'Roadmap', cor: '#ff9500', cursos: [
        { plat:'🌐', name:'QA Roadmap',                by:'roadmap.sh',                       free:true, url:'https://roadmap.sh/qa' },
        { plat:'🌐', name:'Test Automation University', by:'testautomationu.applitools.com',  free:true, url:'https://testautomationu.applitools.com/' },
      ]},
    ]
  },
};

// ===== QUIZ QUESTIONS =====
const questions = [
  { q: 'O que mais te atrai na tecnologia?', hint: 'Escolha a opção mais próxima do que você sente.', opts: [
    { label: 'Criar coisas visuais e bonitas',          scores: {frontend:3, uxui:3, mobile:1} },
    { label: 'Resolver problemas de lógica e sistemas', scores: {backend:3, ads:2, fullstack:1} },
    { label: 'Trabalhar com dados e análises',          scores: {dados:3, ia:2, banco:1} },
    { label: 'Proteger e garantir segurança',           scores: {cyber:4} },
  ]},
  { q: 'Como você prefere trabalhar?', hint: 'Pense no seu dia a dia ideal.', opts: [
    { label: 'Criando interfaces que as pessoas usam',    scores: {frontend:3, uxui:2, mobile:2} },
    { label: 'Fazendo a "máquina" funcionar por trás',   scores: {backend:3, devops:2, ads:1} },
    { label: 'Mergulhado em dados e padrões',            scores: {dados:3, ia:2, banco:2} },
    { label: 'Testando e garantindo que tudo funciona',  scores: {qa:4} },
  ]},
  { q: 'Você gosta de matemática?', hint: 'Seja honesto — não tem certo ou errado!', opts: [
    { label: 'Sim! Adoro cálculo e estatística',          scores: {ia:4, dados:3} },
    { label: 'Um pouco — lógica sim, cálculo não tanto', scores: {backend:2, fullstack:2, ads:1} },
    { label: 'Não muito, prefiro o lado criativo',        scores: {frontend:2, uxui:3} },
    { label: 'Não muito, prefiro o lado prático/operacional', scores: {devops:2, qa:2, cyber:2} },
  ]},
  { q: 'Qual dessas atividades te parece mais divertida?', hint: 'Imagine que você vai passar horas fazendo isso.', opts: [
    { label: 'Desenhar telas e montar layouts',           scores: {uxui:4, frontend:2} },
    { label: 'Programar algoritmos e APIs',               scores: {backend:3, fullstack:2} },
    { label: 'Explorar vulnerabilidades e proteger sistemas', scores: {cyber:4} },
    { label: 'Criar e treinar modelos de IA',             scores: {ia:4, dados:2} },
  ]},
  { q: 'Que tipo de resultado você quer ver no seu trabalho?', hint: 'O que mais te daria satisfação?', opts: [
    { label: 'Um site ou app bonito funcionando',          scores: {frontend:3, mobile:3, uxui:1} },
    { label: 'Um sistema robusto rodando no servidor',     scores: {backend:3, devops:2} },
    { label: 'Um relatório ou insight que ajuda decisões', scores: {dados:4, ia:1} },
    { label: 'Um sistema seguro e sem falhas',             scores: {cyber:2, qa:3} },
  ]},
  { q: 'Você tem interesse em trabalhar com dispositivos móveis?', hint: 'Apps de celular, tablets, etc.', opts: [
    { label: 'Sim! Quero criar apps para Android/iOS',    scores: {mobile:5} },
    { label: 'Um pouco, mas não é meu foco principal',    scores: {fullstack:1, frontend:1} },
    { label: 'Prefiro web ou desktop',                    scores: {frontend:1, backend:1, fullstack:1} },
    { label: 'Não tenho preferência',                     scores: {} },
  ]},
  { q: 'O que você prefere entre as opções abaixo?', hint: 'Escolha o que mais se encaixa no seu perfil.', opts: [
    { label: 'Automatizar processos e gerenciar servidores',   scores: {devops:5} },
    { label: 'Analisar sistemas e criar soluções completas',   scores: {ads:4, fullstack:2} },
    { label: 'Trabalhar com SQL e modelagem de bancos',        scores: {banco:5, dados:1} },
    { label: 'Criar experiências de usuário incríveis',        scores: {uxui:4, frontend:1} },
  ]},
  { q: 'Onde você se imagina trabalhando?', hint: 'Pense no ambiente de trabalho ideal.', opts: [
    { label: 'Em uma startup criando produtos digitais',        scores: {frontend:2, fullstack:3, mobile:2} },
    { label: 'Em uma empresa de segurança ou banco',            scores: {cyber:2, banco:2, qa:1} },
    { label: 'Em um laboratório de dados ou pesquisa',          scores: {ia:3, dados:3} },
    { label: 'Em qualquer lugar — quero ter um perfil completo',scores: {fullstack:2, ads:3, devops:1} },
  ]},
];
