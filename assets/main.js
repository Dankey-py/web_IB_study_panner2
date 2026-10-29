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
      ['01 / THE PROPOSAL', 'A large project becomes three phases.', 'An example proposal breaks coursework into research, drafting and review. A suggestion does not yet change the calendar.', 'Review the proposal →', 'DRAFT / NOT SAVED', 'Nothing has been added to the calendar.', 'Read-only proposal'],
      ['02 / YOUR REVIEW', 'Make the first step your own.', 'Edit the first phase name in the example. In StudyOS, review also includes dates, effort and priority. Confirm only when the proposal makes sense.', 'Confirm this example →', 'EDITING / NOT SAVED', 'Your edits stay in this example until you confirm.', 'Editable — try a new name'],
      ['03 / CONFIRMED', 'A reviewed plan is ready to use.', 'The example now shows your confirmed phases. In the full application, confirmation saves the reviewed plan and makes it visible in the calendar.', 'Example confirmed ✓', 'CONFIRMED / EXAMPLE ONLY', 'Example complete. No real planner data was created.', 'Reviewed phase']
    ][step];
    ['demo-label','demo-heading','demo-explanation','demo-next','proposal-status','proposal-foot','edit-hint'].forEach((id, i) => document.getElementById(id).textContent = states[i]);
    input.readOnly = step !== 1;
    next.disabled = step === 2;
  }
  next.addEventListener('click', () => {
    if (step === 1 && !input.value.trim()) {
      feedback.textContent = 'Give the first phase a name before confirming.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    input.value = input.value.trim();
    step = Math.min(step + 1, 2);
    render();
    feedback.textContent = step === 1 ? 'Review step opened. You can now edit the first phase.' : 'Confirmed in this example. Your reviewed phase: ' + input.value + '.';
    if (step === 1) input.focus();
    else document.getElementById('demo-reset').focus();
  });
  document.getElementById('demo-reset').addEventListener('click', () => {
    step = 0;
    input.value = 'Research the question';
    input.removeAttribute('aria-invalid');
    render();
    feedback.textContent = 'Example reset. No planner data was created.';
    next.focus();
  });
}
