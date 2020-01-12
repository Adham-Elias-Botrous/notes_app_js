document.addEventListener('DOMContentLoaded', function() {
  let sotredNotes = JSON.parse(localStorage.getItem('notes'));
  let notesArray = sotredNotes ? sotredNotes : [];
  const lastCount = Number(localStorage.getItem('counter'));
  let count = lastCount ? lastCount : 0;
  let list = document.getElementById('list');
  let divEdit = document.getElementById('div-edit');
  renderSaveNotesArray();

  document.getElementById('add').addEventListener('click', function() {
    let name = document.getElementById('name').value;
    let content = document.getElementById('content').value;
    let date = new Date().toJSON();
    if (name === '') {
      alert('You have to insert the Note Title');
    } else {
      notesArray.push({ id: count.toString(), name, content, date });
      count++;
    }
    document.getElementById('name').value = '';
    document.getElementById('content').value = '';
    renderSaveNotesArray();
  });

  function renderSaveNotesArray() {
    list.innerHTML = '';
    if (notesArray.length !== 0) {
      for (let i = 0; i < notesArray.length; i++) {
        const id = notesArray[i].id;
        const name = notesArray[i].name;
        const date = new Date(notesArray[i].date);
        const dateString =
          date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
        const element = document.createElement('LI');
        const divName = document.createElement('DIV');
        divName.setAttribute('class', 'div-name');
        divName.textContent = name;
        const divDate = document.createElement('DIV');
        divDate.setAttribute('class', 'div-date');
        divDate.textContent = dateString;
        const linkToView = document.createElement('A');
        linkToView.setAttribute('href', '#div-edit');
        linkToView.setAttribute('id', id);
        linkToView.appendChild(divName);
        linkToView.appendChild(divDate);
        element.appendChild(linkToView);
        linkToView.addEventListener('click', showItemEvent);
        list.appendChild(element);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        localStorage.setItem('counter', JSON.stringify(count));
      }
    } else {
      localStorage.removeItem('notes');
    }
  }

  function showItemEvent() {
    divEdit.classList.remove('hide');
    let id = this.getAttribute('id');
    let name = '';
    let content = '';
    if (document.querySelector('#list li a.selected') != null) {
      document
        .querySelector('#list li a.selected')
        .classList.remove('selected');
    }
    this.classList.add('selected');

    for (let i = 0; i < notesArray.length; i++) {
      if (id == notesArray[i].id) {
        name = notesArray[i].name;
        content = notesArray[i].content;
      }
    }
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-content').value = content;
  }

  document.getElementById('save').addEventListener('click', function() {
    let name = document.getElementById('edit-name').value;
    let content = document.getElementById('edit-content').value;
    let id = document.querySelector('#list li a.selected').getAttribute('id');
    for (let i = 0; i < notesArray.length; i++) {
      if (id === notesArray[i].id) {
        notesArray[i].name = name;
        notesArray[i].content = content;
        break;
      }
    }
    renderSaveNotesArray();
    document.querySelector(`#list li a[id="${id}"]`).classList.add('selected');
  });

  document.getElementById('cancel').addEventListener('click', function() {
    divEdit.classList.add('hide');
    document.querySelector('#list li a.selected').classList.remove('selected');
  });

  document.getElementById('remove').addEventListener('click', function() {
    let id = document.querySelector('#list li a.selected').getAttribute('id');
    let confirmResutl = confirm('Are you sure you want to delete this Note?');
    if (confirmResutl) {
      for (let i = 0; i < notesArray.length; i++) {
        if (id == notesArray[i].id) {
          notesArray.splice(i, 1);
          break;
        }
      }
      renderSaveNotesArray();
      divEdit.classList.add('hide');
    }
  });
});
