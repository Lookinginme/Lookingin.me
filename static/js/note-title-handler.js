document.addEventListener('DOMContentLoaded', function () {
  const editableName = document.getElementById('note-name');

  // Load title from localStorage
  const savedTitle = localStorage.getItem('noteTitle');
  if (savedTitle && savedTitle.trim() !== '') {
    editableName.textContent = savedTitle;
  } else {
    editableName.innerHTML = '&nbsp;';
  }

  // Maintain title content
  function maintainContent() {
    if (editableName.textContent.trim() === '') {
      editableName.innerHTML = '&nbsp;';
    }
  }

  maintainContent();

  // Save on input
  editableName.addEventListener('input', function () {
    maintainContent();
    localStorage.setItem('noteTitle', editableName.textContent.trim());
  });

  // Style on focus
  editableName.addEventListener('focus', function () {
    this.style.backgroundColor = 'white';
    this.style.color = 'black';
    if (editableName.innerHTML === '&nbsp;') {
      editableName.innerHTML = '';
    }
  });

  // Style on blur + save
  editableName.addEventListener('blur', function () {
    maintainContent();
    this.style.backgroundColor = 'transparent';
    this.style.color = 'white';
    localStorage.setItem('noteTitle', editableName.textContent.trim());
    console.log('Note title saved:', editableName.textContent.trim());
  });
});
