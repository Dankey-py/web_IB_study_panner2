'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menu && navigation) {
  menu.hidden = false;
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      menu.focus();
    }
  });
}
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
      ['Step 1 / A suggestion', 'Three tasks for the project.', 'This example divides coursework into research, writing and review. Nothing has been added to a calendar yet.', 'Review this plan →', 'Draft / not saved', 'Nothing has been saved yet.', 'Suggested name'],
      ['Step 2 / Check and edit', 'What would you change?', 'Try changing the first task name. In the actual planner, I can also edit the dates, effort and priority before saving.', 'Confirm this example →', 'Reviewing / not saved', 'Check the first task, then confirm this example.', 'You can edit this'],
      ['Step 3 / Confirm', 'The reviewed plan is ready.', 'In StudyOS, confirming adds the reviewed tasks to the calendar. Here, it only completes this example.', 'Example confirmed ✓', 'Confirmed / example only', 'This example has not changed the actual planner.', 'Reviewed task']
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
