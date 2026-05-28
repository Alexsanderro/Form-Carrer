// ===== STATE =====
let currentQ    = 0;
let answers     = [];
let selectedArea = null;

// ===== NAVIGATION =====
function go(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  const labels = {
    'home'        : 'Início',
    'choose-path' : 'Caminho',
    'area-select' : 'Escolher Área',
    'quiz'        : 'Quiz',
    'result'      : 'Resultado',
    'trilha'      : 'Trilha',
  };
  document.getElementById('nav-step').textContent = labels[screenId] || 'FormCarrer';
  window.scrollTo(0, 0);
}

function scrollAreas() {
  go('area-select');
}

// ===== AREAS GRID =====
function buildAreas() {
  const grid = document.getElementById('areas-grid');
  grid.innerHTML = '';

  areas.forEach(a => {
    const card = document.createElement('div');
    card.className = 'area-card';
    card.innerHTML = `
      <div class="icon">${a.icon}</div>
      <h4>${a.name}</h4>
      <p style="font-size:0.8rem;color:var(--text2);margin-top:4px">${a.desc}</p>
    `;
    card.onclick = () => {
      selectedArea = a.id;
      go('trilha');
      buildTrilha(a.id);
    };
    grid.appendChild(card);
  });
}

// ===== QUIZ =====
function startQuiz() {
  currentQ = 0;
  answers  = new Array(questions.length).fill(null);
  go('quiz');
  renderQ();
}

function renderQ() {
  const q     = questions[currentQ];
  const total = questions.length;
  const pct   = (currentQ / total) * 100;

  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('quiz-step').textContent    = `Pergunta ${currentQ + 1} de ${total}`;
  document.getElementById('quiz-q').textContent       = q.q;
  document.getElementById('quiz-hint').textContent    = q.hint;
  document.getElementById('btn-prev').style.display   = currentQ > 0 ? 'block' : 'none';
  document.getElementById('btn-next').textContent     = currentQ === total - 1 ? 'Ver resultado ✓' : 'Próxima →';

  const opts    = document.getElementById('quiz-options');
  const letters = ['A', 'B', 'C', 'D'];
  opts.innerHTML = '';

  q.opts.forEach((o, i) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-opt' + (answers[currentQ] === i ? ' selected' : '');
    btn.innerHTML = `
      <div class="quiz-opt-letter">${letters[i]}</div>
      <span>${o.label}</span>
    `;
    btn.onclick = () => {
      answers[currentQ] = i;
      opts.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    };
    opts.appendChild(btn);
  });
}

function nextQ() {
  if (answers[currentQ] === null) {
    // Shake effect when no answer selected
    const optEl = document.getElementById('quiz-options');
    optEl.style.animation = 'none';
    setTimeout(() => optEl.style.animation = '', 100);
    return;
  }
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQ();
  } else {
    showResult();
  }
}

function prevQ() {
  if (currentQ > 0) {
    currentQ--;
    renderQ();
  }
}

// ===== RESULT =====
function showResult() {
  // Tally scores
  const scores = {};
  Object.keys(trilhas).forEach(k => scores[k] = 0);

  answers.forEach((ans, qi) => {
    if (ans === null) return;
    const s = questions[qi].opts[ans].scores;
    Object.entries(s).forEach(([k, v]) => {
      if (scores[k] !== undefined) scores[k] += v;
    });
  });

  const sorted   = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topId    = sorted[0][0];
  const topArea  = areas.find(a => a.id === topId);
  const t        = trilhas[topId];
  selectedArea   = topId;

  document.getElementById('result-icon').textContent  = topArea.icon;
  document.getElementById('result-title').textContent = t.name;
  document.getElementById('result-desc').textContent  =
    t.desc + ' Com base nas suas respostas, esse é o perfil que mais combina com você!';

  const maxScore = sorted[0][1] || 1;
  const top5     = sorted.slice(0, 5);

  document.getElementById('match-bars').innerHTML =
    '<p style="font-size:0.85rem;color:var(--text3);margin-bottom:1rem">Compatibilidade por área</p>' +
    top5.map(([id, sc]) => {
      const ar  = areas.find(a => a.id === id);
      const pct = Math.round((sc / maxScore) * 100);
      return `
        <div class="match-row">
          <div class="match-label">
            <span>${ar.icon} ${ar.name}</span>
            <span style="color:var(--accent2)">${pct}%</span>
          </div>
          <div class="match-track">
            <div class="match-fill" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

  go('result');

  // Animate bars after screen transition
  setTimeout(() => {
    document.querySelectorAll('.match-fill').forEach(el => {
      const w = el.style.width;
      el.style.width = '0';
      setTimeout(() => el.style.width = w, 50);
    });
  }, 300);
}

function goToTrilha() {
  go('trilha');
  buildTrilha(selectedArea);
}

// ===== TRILHA =====
function buildTrilha(id) {
  const t  = trilhas[id];
  if (!t) return;

  document.getElementById('trilha-header').innerHTML = `
    <button class="back-btn" onclick="go('area-select')">← Voltar para áreas</button>
    <div style="font-size:3.5rem;margin-bottom:1rem">${t.icon}</div>
    <h2 style="font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;margin-bottom:0.75rem">${t.name}</h2>
    <p style="color:var(--text2);font-size:1rem;line-height:1.6">${t.desc}</p>
  `;

  document.getElementById('trilha-content').innerHTML = t.fases.map((fase, fi) => `
    <div class="fase-block slide-in" style="animation-delay:${fi * 0.1}s">
      <div class="fase-label">
        <div class="fase-num" style="background:${fase.cor}22;color:${fase.cor}">${fi + 1}</div>
        <span style="font-family:'Syne',sans-serif;font-weight:700;font-size:1rem">${fase.label}</span>
        <div class="fase-line"></div>
      </div>
      <div class="cursos-row">
        ${fase.cursos.map(c => `
          <a class="curso-card" href="${c.url}" target="_blank" rel="noopener">
            <div class="curso-plat" style="background:${fase.cor}22">${c.plat}</div>
            <div class="curso-info">
              <h5>${c.name}</h5>
              <p>${c.by}</p>
              ${c.free ? '<span class="free">✓ Gratuito</span>' : ''}
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const colors    = ['rgba(108,99,255,0.6)', 'rgba(0,212,170,0.5)', 'rgba(255,107,107,0.4)'];

  for (let i = 0; i < 25; i++) {
    const el   = document.createElement('div');
    el.className = 'p';
    const size = Math.random() * 6 + 2;
    el.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(el);
  }
}

// ===== INIT =====
buildAreas();
createParticles();
