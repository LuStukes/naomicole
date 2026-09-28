// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  if (isOpen) {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.cssText += 'display:flex; position:absolute; top:100%; left:0; right:0; background:var(--cream); flex-direction:column; padding:20px 32px; border-bottom:1px solid var(--stone); gap:16px;';
  }
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((other) => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Demo discovery-call request form
const leadForm = document.getElementById('leadForm');
const formStatus = document.getElementById('formStatus');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    if (!name || !email) {
      formStatus.textContent = 'Enter your name and email to send.';
      formStatus.style.color = '#C97064';
      return;
    }
    formStatus.textContent = "Request sent — you'll hear back within a day.";
    formStatus.style.color = '#5B3A56';
    leadForm.reset();
  });
}
