
async function loadQuestions(level) {
  const res = await fetch(`/questions/${level}.json`);
  const questions = await res.json();
  const container = document.getElementById('questions');
  container.innerHTML = '';
  questions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    const sample = q.sample ? `<div class="sample"><strong>Sample:</strong> ${q.sample}</div>` : '';
    const solId = `sol-${level}-${idx}`;
    card.innerHTML = `
      <h3>${idx+1}. ${q.title}</h3>
      <p class="desc">${q.description}</p>
      ${sample}
      <button class="show-btn" data-target="${solId}">Show Solution</button>
      <pre id="${solId}" class="solution" style="display:none;"><code>${escapeHtml(q.solution || '')}</code></pre>
    `;
    container.appendChild(card);
  });
  document.querySelectorAll('.show-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const tgt = document.getElementById(btn.getAttribute('data-target'));
      if (tgt.style.display === 'none') { tgt.style.display = 'block'; btn.textContent = 'Hide Solution'; }
      else { tgt.style.display = 'none'; btn.textContent = 'Show Solution'; }
    });
  });
}

// simple html escape for code blocks
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
