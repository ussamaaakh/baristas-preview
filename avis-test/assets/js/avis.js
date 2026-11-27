// Keep the confirmation URL compatible with the production domain and subdirectory previews.
const reviewRedirect = document.querySelector('input[name="_next"]');
if (reviewRedirect && /^https?:$/.test(location.protocol)) {
  reviewRedirect.value = new URL('merci-avis.html', location.href).href;
}
const reviewDate = document.querySelector('#review-date');
if (reviewDate) {
  const today = new Date();
  reviewDate.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
// A table QR can preselect an existing venue: avis.html?lieu=Morocco%20Mall
const reviewLocation = document.querySelector('#review-location');
const venue = new URLSearchParams(location.search).get('lieu');
if (reviewLocation && venue && [...reviewLocation.options].some(option => option.value === venue)) {
  reviewLocation.value = venue;
}
