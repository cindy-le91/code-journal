
const photoURL = document.getElementById('image-url');
photoURL.addEventListener('input', function (event) {
  const img = document.querySelector('img');
  img.src = event.target.value;
});
