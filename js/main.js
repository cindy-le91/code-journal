const photoURL = document.getElementById('image-url');
photoURL.addEventListener('input', function (event) {
  const img = document.querySelector('img');
  img.src = event.target.value;
});

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = submitForm.elements.title.value;
  const image = submitForm.elements.image.value;
  const notes = submitForm.elements.notes.value;
  const newObject = {
    title,
    image,
    notes,
    entryId: data.nextEntryId
  };
  data.entries.push(newObject);
  data.nextEntryId++;
  const img = document.querySelector('img');
  img.src = './images/placeholder-image-square.jpg';
  submitForm.reset();
});
