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
  data.entries.unshift(newObject);
  data.nextEntryId++;
  const img = document.querySelector('img');
  img.src = './images/placeholder-image-square.jpg';
  submitForm.reset();
});

function renderEntry(entry) {

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'is-flex');

  const imageLi = document.createElement('li');
  imageLi.setAttribute('class', 'column-one-half');
  ul.appendChild(imageLi);

  const imageDiv = document.createElement('div');
  imageLi.appendChild(imageDiv);

  const image = document.createElement('img');
  image.setAttribute('class', 'image-entry-desktop');
  image.setAttribute('src', entry.url);
  imageDiv.appendChild(image);

  const textLi = document.createElement('li');
  textLi.setAttribute('class', 'column-one-half');
  ul.appendChild(textLi);

  const textDiv = document.createElement('div');
  textLi.appendChild(textDiv);

  const title = document.createElement('h3');
  title.textContent = entry.title;
  textDiv.appendChild(title);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  textDiv.appendChild(notes);

  return ul;
}

const div = document.querySelector('.all-entries');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = renderEntry(data.entries[i]);
    div.appendChild(dataEntry);
  }
});
