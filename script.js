const form = document.getElementById('depression-form');
const resultInfo = document.getElementById('result-info');

function interpretScore(score) {
  if (score <= 4) {
    return {
      level: 'Minimal or no depression',
      className: 'low',
      advice: 'Your symptoms suggest minimal or no depression. Keep monitoring how you feel, and reach out if needed.'
    };
  } else if (score <= 9) {
    return {
      level: 'Mild depression',
      className: 'low',
      advice: 'Your symptoms indicate mild depression. Consider self-care strategies and consult a professional if symptoms persist.'
    };
  } else if (score <= 14) {
    return {
      level: 'Moderate depression',
      className: 'moderate',
      advice: 'You may be experiencing moderate depression. Seeking support from a mental health professional is recommended.'
    };
  } else if (score <= 19) {
    return {
      level: 'Moderately severe depression',
      className: 'high',
      advice: 'Your symptoms picture moderately severe depression. It is important to consult a professional as soon as possible.'
    };
  } else {
    return {
      level: 'Severe depression',
      className: 'high',
      advice: 'Your symptoms indicate severe depression. Please seek immediate help from a qualified mental health provider.'
    };
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  let totalScore = 0;
  let unanswered = false;

  for(let i=1; i<=9; i++) {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      unanswered = true;
      break;
    }
    totalScore += parseInt(selected.value);
  }

  if (unanswered) {
    resultInfo.textContent = 'Please answer all questions before calculating.';
    resultInfo.className = 'result high';
    return;
  }
  const interpretation = interpretScore(totalScore);

  resultInfo.innerHTML = `
    <div class="result ${interpretation.className}">
      <p><strong>Score: ${totalScore} / 27</strong></p>
      <p>Depression Level: ${interpretation.level}</p>
      <p>${interpretation.advice}</p>
    </div>
  `;
});
