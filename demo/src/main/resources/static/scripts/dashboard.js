document.addEventListener("DOMContentLoaded", () => {
  const platos = ["Juane de gallina", "Tacacho con cecina", "Patarashca"];
  const list = document.getElementById("platos-list");

  const renderList = () => {
    list.innerHTML = "";
    platos.forEach(plato => {
      const li = document.createElement("li");
      li.textContent = plato;
      list.appendChild(li);
    });
  };

  renderList();

  document.getElementById("btn-add").addEventListener("click", () => {
    const nuevo = prompt("Escribe el nombre del nuevo plato:");
    if (nuevo) {
      platos.push(nuevo);
      renderList();
    }
  });

  document.getElementById("btn-update").addEventListener("click", () => {
    const index = prompt("Número del plato a actualizar (1-" + platos.length + "):");
    if (index && platos[index - 1]) {
      const nuevo = prompt("Nuevo nombre para " + platos[index - 1] + ":");
      if (nuevo) {
        platos[index - 1] = nuevo;
        renderList();
      }
    }
  });

  document.getElementById("btn-delete").addEventListener("click", () => {
    const index = prompt("Número del plato a eliminar (1-" + platos.length + "):");
    if (index && platos[index - 1]) {
      platos.splice(index - 1, 1);
      renderList();
    }
  });
});
