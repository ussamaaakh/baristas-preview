// Keep the success page on the same site, including localhost and GitHub Pages.
const successRedirect = document.querySelector('.event-form input[name="_next"]');
if (successRedirect && /^https?:$/.test(window.location.protocol)) {
  successRedirect.value = new URL('merci.html', window.location.href).href;
}
