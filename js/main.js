const div = document.querySelector('.all-entries');
const photoURL = document.getElementById('image-url');
const entriesPage = document.getElementById('entries-page');

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
    notes
  };// I added this to close the object. Whether a new entry or an edited entry
  // we will grab values from the form at the time so this applies to both possibilities.

  // entryId: data.nextEntryId // this should only be used for creating new entries so
  // it goes in data.editing === null

  if (data.editing === null) {
    newObject.entryId = data.nextEntryId;
    data.nextEntryId++;// I moved this here because we should only increment this value for new entries not edited entries
    data.entries.unshift(newObject); // this should be moved to the conditional that we aren't working on an edited entry.
    // We are adding in this case. We don't want to add when we are just editing.
    const newEntry = renderEntry(newObject);
    div.prepend(newEntry);
    // viewSwap('entries'); // this can be moved outside of conditionals because we want it to happen whether it is a new
    // entry or an edited entry on submit.
  } else {
    newObject.entryId = data.editing.entryId;// this applies the id of the current object being edited and adds it to our object.

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newObject.entryId) {
        data.entries[i] = newObject;
      }
    }
    const updatedEntry = renderEntry(newObject);

    updateOriginalEntry(updatedEntry, newObject.entryId);

    viewSwap('entries'); // i moved this outside of any conditionals
    // data.entries.unshift(newObject);
    // data.nextEntryId++; // this should only increment when a new object is made not an edited object
    const img = document.querySelector('img'); //
    img.src = './images/placeholder-image-square.jpg';
    submitForm.reset();
    // const newEntry = renderEntry(newObject);
    // div.prepend(newEntry); // this is already done in the conditional creating a new object
    data.editing = null;
    viewSwap('entries');
  }
});
// const submitForm = document.querySelector('form');
// submitForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   const title = submitForm.elements.title.value;
//   const image = submitForm.elements.image.value;
//   const notes = submitForm.elements.notes.value;
//   const newObject = {
//     title,
//     image,
//     notes,
//     entryId: data.nextEntryId

//     if (data.editing === null) {
//   const newEntry = renderEntry(newObject);
//   div.prepend(newEntry);
//   viewSwap('entries');
//     } else {

//     }
//   };
//   data.entries.unshift(newObject);
//   data.nextEntryId++;
//   const img = document.querySelector('img');
//   img.src = './images/placeholder-image-square.jpg';
//   submitForm.reset();

//   const newEntry = renderEntry(newObject);
//   div.prepend(newEntry);
//   viewSwap('entries');
// });

function renderEntry(entry) {
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'is-flex');
  ul.setAttribute('data-entry-id', entry.entryId);

  const imageLi = document.createElement('li');
  imageLi.setAttribute('class', 'column-one-half');
  imageLi.setAttribute('data-entry-id', 'entryId');
  ul.appendChild(imageLi);

  const imageDiv = document.createElement('div');
  imageLi.appendChild(imageDiv);

  const image = document.createElement('img');
  image.setAttribute('class', 'image-entry-desktop');
  image.setAttribute('src', entry.image);
  imageDiv.appendChild(image);

  const textLi = document.createElement('li');
  textLi.setAttribute('class', 'column-one-half');
  ul.appendChild(textLi);

  const textDiv = document.createElement('div');
  textLi.appendChild(textDiv);

  const title = document.createElement('h3');
  title.textContent = entry.title;
  textDiv.appendChild(title);

  const pencil = document.createElement('i');
  pencil.setAttribute('class', 'fa-solid fa-pencil');
  pencil.setAttribute('data-entry-id', entry.entryId);
  title.appendChild(pencil);

  pencil.addEventListener('click', function (event) {
    const clickedEntryId = event.target.attributes['data-entry-id'].value;

    viewSwap('entry-form');

    for (let i = 0; i < data.entries.length; i++) {
      //     Find the entry object in the data.entries array whose id and matches the data - entry - id attribute value of the clicked entry
      if (parseInt(data.entries[i].entryId) === parseInt(clickedEntryId)) {
        // assigns that entry’s object to the data.editing property.
        data.editing = data.entries[i];
      }
    }

    populateEntryForm();

  });

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  textDiv.appendChild(notes);

  return ul;
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    toggleNoEntries();
  }

  viewSwap('entry-form');

  document.getElementById('no-entries-paragraph').className = 'has-display-block';

  for (let i = 0; i < data.entries.length; i++) {
    const dataEntry = renderEntry(data.entries[i]);
    div.appendChild(dataEntry);
  }
});

function toggleNoEntries(event) {

  if (data.entries.length === 0) {
    entriesPage.className = 'has-display-none ';
  } else {
    entriesPage.className = 'entries-desktop';
  }
}

function viewSwap(view) {
  const entryForm = document.querySelector('.entry-form');

  if (view === 'entries') {
    entryForm.style.display = 'none';
    entriesPage.className = 'entries-desktop';

    if (data.entries.length > 0) {
      document.getElementById('no-entries-paragraph').className = 'has-display-none';

    }
  }

  if (view === 'entry-form') {
    entryForm.style.display = 'block';
    entriesPage.className = 'has-display-none';

  }
}

function populateEntryForm() {

  // select each field img, title, description
  const titleInput = document.getElementById('title');
  const imageInput = document.getElementById('image-url');
  const notesInput = document.getElementById('user-notes');

  // populate each field with the entry's value
  titleInput.value = data.editing.title;
  imageInput.value = data.editing.image;
  notesInput.value = data.editing.notes;

  const editTitle = document.querySelector('.new-entry');
  editTitle.textContent = 'Edit Entry';
}

function updateOriginalEntry(entry, entryId) {
  const entries = document.getElementsByTagName('ul');
  for (const i in entries) {
    if (entries[i].attributes && parseInt(entries[i].attributes['data-entry-id'].value) === parseInt(entryId)) {
      entries[i].replaceWith(entry);
    }
  //  }
  }
}

const entriesLink = document.querySelector('.menu-entries');
entriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

const newEntry = document.querySelector('.new-entries');
newEntry.addEventListener('click', function (event) {
  const editTitle = document.querySelector('.new-entry');
  editTitle.textContent = 'New Entry';
  viewSwap('entry-form');
});
