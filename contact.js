// Contact form: posts to a form service (e.g. Formspree) when data-endpoint is set,
// otherwise opens a pre-filled email in the visitor's mail app.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const mailLink = document.querySelector('.contact-list a[href^="mailto:"]');

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (data.get('_gotcha')) return; // spam bot filled the hidden field

    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      if (!mailLink) return;
      const subject = data.get('subject') || 'Website enquiry from ' + data.get('name');
      const body =
        data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')';
      window.location.href =
        mailLink.getAttribute('href') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      setStatus('Opening your email app… If nothing happens, please email directly.', '');
      return;
    }

    button.disabled = true;
    setStatus('Sending…', '');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('Thanks! Your message has been sent — I’ll get back to you soon.', 'success');
    } catch (err) {
      setStatus('Sorry, something went wrong. Please email directly instead.', 'error');
    } finally {
      button.disabled = false;
    }
  });
});
