'use strict';
const dialog = document.querySelector('.image-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  let trigger;
  document.querySelectorAll('.image-zoom').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      dialog.querySelector('img').src = button.dataset.image;
      dialog.querySelector('img').alt = button.dataset.alt;
      dialog.querySelector('#image-title').textContent = button.dataset.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => trigger?.focus());
}
const demo = document.querySelector('[data-demo]');
if (demo) {
  let step = 0;
  const next = document.querySelector('#demo-next');
  const input = document.querySelector('#phase-name');
  const feedback = document.querySelector('#demo-status');
  function render() {
    demo.querySelectorAll('[data-step]').forEach((item, index) => {
      if (index === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    const states = [
      ['Step 1 / A suggestion', 'Three tasks for the project.', 'The suggested phases are research, writing and review. The next step is to check whether the tasks describe the work clearly enough.', 'Review this plan →', 'Draft / not saved', 'Nothing has been saved yet.', 'Suggested name'],
      ['Step 2 / Check and edit', 'What would you change?', 'Try changing the first task name so its action is clearer. In StudyOS, the review also includes dates, effort and priority.', 'Confirm this example →', 'Reviewing / not saved', 'Check the first task, then confirm this example.', 'You can edit this'],
      ['Step 3 / Confirm', 'The reviewed plan is ready.', 'Confirmation is the step that turns a reviewed proposal into saved work in StudyOS. This example shows that decision without creating planner records.', 'Example confirmed ✓', 'Confirmed / example only', 'This example has not changed the actual planner.', 'Reviewed task']
    ][step];
    ['demo-label','demo-heading','demo-explanation','demo-next','proposal-status','proposal-foot','edit-hint'].forEach((id, i) => document.getElementById(id).textContent = states[i]);
    input.readOnly = step !== 1;
    next.disabled = step === 2;
  }
  next.addEventListener('click', () => {
    if (step === 1 && !input.value.trim()) {
      feedback.textContent = 'Add a name for the first task before confirming.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    input.value = input.value.trim();
    step = Math.min(step + 1, 2);
    render();
    feedback.textContent = step === 1 ? 'You can now edit the first task name.' : 'Confirmed in this example. First task: ' + input.value + '.';
    if (step === 1) input.focus();
    else document.getElementById('demo-reset').focus();
  });
  document.getElementById('demo-reset').addEventListener('click', () => {
    step = 0;
    input.value = 'Research the question';
    input.removeAttribute('aria-invalid');
    render();
    feedback.textContent = 'Back to the start. Nothing was saved to the actual planner.';
    next.focus();
  });
}
