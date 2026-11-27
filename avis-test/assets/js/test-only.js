const testForm = document.querySelector('#avis-form');
// No network submission or persistence: the demo only opens its confirmation page.
testForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.assign(new URL('merci-avis.html', window.location.href));
});
testForm.querySelector('button[type="submit"]').disabled = false;
