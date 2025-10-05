// ============================
//   Funciones de utilidad
// ============================

// Guarda en localStorage todos los platos actuales
function saveDishes() {
  const dishes = [];
  document.querySelectorAll('#dishList li').forEach(li => {
    dishes.push(li.dataset.info);
  });
  localStorage.setItem('dishes', JSON.stringify(dishes));
}

// Carga los platos desde localStorage al iniciar la página
function loadDishes() {
  const stored = JSON.parse(localStorage.getItem('dishes') || '[]');
  stored.forEach(dishInfo => {
    const { name, price, desc } = JSON.parse(dishInfo);
    addDishToDOM(name, price, desc);
  });
}

// Crea un <li> con la información de un plato y lo agrega a la lista principal
function addDishToDOM(name, price, desc) {
  const li = document.createElement('li');
  const dishData = JSON.stringify({ name, price, desc });
  li.dataset.info = dishData;
  li.innerHTML = `<strong>${name}</strong> – S/ ${price}<br><small>${desc}</small>`;
  document.getElementById('dishList').appendChild(li);
  refreshEditDeleteLists();
}

// Actualiza las listas de edición y eliminación
function refreshEditDeleteLists() {
  const dishes = Array.from(document.querySelectorAll('#dishList li'));
  const editList = document.getElementById('editList');
  const deleteList = document.getElementById('deleteList');
  if (!editList || !deleteList) return;

  editList.innerHTML = '';
  deleteList.innerHTML = '';

  dishes.forEach(li => {
    const { name, price, desc } = JSON.parse(li.dataset.info);

    // ======= Editar =======
    const editItem = document.createElement('li');
    editItem.style.marginBottom = '12px';
    editItem.innerHTML = `
      <span><strong>${name}</strong> – S/ ${price}</span>
      <button>Editar</button>
    `;
    const editBtn = editItem.querySelector('button');

    editBtn.addEventListener('click', () => {
      // Reemplaza el contenido por un mini formulario en línea
      editItem.innerHTML = `
        <input type="text" value="${name}" style="width:120px; margin-right:6px;">
        <input type="number" step="0.01" value="${price}" style="width:80px; margin-right:6px;">
        <input type="text" value="${desc}" style="width:180px; margin-right:6px;">
        <button>Guardar</button>
      `;

      const [nameInput, priceInput, descInput, saveBtn] = editItem.querySelectorAll('input, button');

      saveBtn.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        const newPrice = parseFloat(priceInput.value).toFixed(2);
        const newDesc  = descInput.value.trim();
        if (!newName || !newPrice || !newDesc) return;

        // Actualiza el li principal
        li.dataset.info = JSON.stringify({ name: newName, price: newPrice, desc: newDesc });
        li.innerHTML = `<strong>${newName}</strong> – S/ ${newPrice}<br><small>${newDesc}</small>`;

        saveDishes();
        refreshEditDeleteLists(); // vuelve a la vista normal
      });
    });
    editList.appendChild(editItem);

    // ======= Eliminar =======
    const deleteItem = document.createElement('li');
    deleteItem.style.marginBottom = '12px';
    deleteItem.innerHTML = `
      <span><strong>${name}</strong> – S/ ${price}</span>
      <button>Eliminar</button>
    `;
    deleteItem.querySelector('button').addEventListener('click', () => {
      li.remove();
      saveDishes();
      refreshEditDeleteLists();
    });
    deleteList.appendChild(deleteItem);
  });
}


// ============================
//   Navegación entre secciones
// ============================
function showSection(section) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.remove('active', 'hidden'));
  document.getElementById(`section-${section}`).classList.add('active');
}

// ============================
//   Inicialización
// ============================
document.addEventListener('DOMContentLoaded', () => {

  // Cargar datos guardados
  loadDishes();
  refreshEditDeleteLists();

  // Manejo del formulario para agregar
  const form = document.getElementById('addForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('dishName').value.trim();
      const price = parseFloat(document.getElementById('dishPrice').value).toFixed(2);
      const desc = document.getElementById('dishDesc').value.trim();
      if (!name || !price || !desc) return;

      addDishToDOM(name, price, desc);
      saveDishes();
      form.reset();
    });
  }
});


