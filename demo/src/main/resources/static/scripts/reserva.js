/* ======================================================
   reserva.js - Wizard completo con pasos 1 a 6
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // 1) ELEMENTOS Y ESTADO GLOBAL
  // ----------------------------
  const steps = Array.from(document.querySelectorAll(".reserva-step"));
  const timelineSteps = Array.from(document.querySelectorAll(".timeline .step"));
  const btnSiguientes = Array.from(document.querySelectorAll(".btn-siguiente"));
  const btnAnteriores = Array.from(document.querySelectorAll(".btn-anterior"));

  const reservaData = { personas: 2, fecha: null, hora: null, zona: null };

  let selectedDate = null;
  let selectedCell = null;
  let selectedHour = null;
  let selectedHourCell = null;
  let selectedZona = null;

  const resumenDiv = document.getElementById("resumen-reserva");

  // ----------------------------
  // 2) FUNCIONES DE NAVEGACIÓN
  // ----------------------------
  function getActiveStepIndex() {
    return steps.findIndex(s => s.classList.contains("active"));
  }

  function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle("active", i === index));
    timelineSteps.forEach((t, i) => t.classList.toggle("active", i <= index));
    actualizarResumen(); // Actualiza resumen en paso 5
  }

  btnSiguientes.forEach(btn => btn.addEventListener("click", () => {
    const current = getActiveStepIndex();
    if (current < steps.length - 1) showStep(current + 1);
  }));

  btnAnteriores.forEach(btn => btn.addEventListener("click", () => {
    const current = getActiveStepIndex();
    if (current > 0) showStep(current - 1);
  }));

  // ----------------------------
  // 3) PASO 1: Personas
  // ----------------------------
  const inputPersonas = document.getElementById("personas");
  if (inputPersonas) {
    inputPersonas.addEventListener("input", () => {
      reservaData.personas = inputPersonas.value;
    });
    reservaData.personas = inputPersonas.value;
  }

  // ----------------------------
  // 4) PASO 2: Calendario
  // ----------------------------
  const calContainer = document.getElementById("calendar-container");
  const prevBtn = document.querySelector(".cal-nav.prev");
  const nextBtn = document.querySelector(".cal-nav.next");

  if (calContainer && prevBtn && nextBtn) {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const today = new Date();

    function renderCalendar(month, year) {
      calContainer.innerHTML = "";
      const calendar = document.createElement("div");
      calendar.classList.add("calendar");

      const monthName = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
      const header = document.createElement("div");
      header.classList.add("calendar-header");
      header.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      calendar.appendChild(header);

      ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"].forEach(d => {
        const el = document.createElement("div");
        el.classList.add("day-name");
        el.textContent = d;
        calendar.appendChild(el);
      });

      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
      for (let i = 0; i < firstDay; i++) calendar.appendChild(document.createElement("div"));

      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      for (let day = 1; day <= lastDate; day++) {
        const cell = document.createElement("div");
        cell.classList.add("day");
        cell.textContent = day;
        const cellDate = new Date(year, month, day);

        if (cellDate < startOfToday) cell.classList.add("disabled");
        if (cellDate.getTime() === startOfToday.getTime()) cell.classList.add("today");

        cell.addEventListener("click", () => {
          if (cellDate < startOfToday) return;
          if (selectedCell) selectedCell.classList.remove("selected");
          cell.classList.add("selected");
          selectedCell = cell;
          selectedDate = cellDate;
          reservaData.fecha = cellDate;
          actualizarResumen();
        });

        calendar.appendChild(cell);
      }

      calContainer.appendChild(calendar);
    }

    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
  }

  // ----------------------------
  // 5) PASO 3: Hora
  // ----------------------------
  const horaGrid = document.getElementById("hora-grid");
  if (horaGrid) {
    const horarios = [
      "12:00 PM","12:15 PM","12:30 PM","12:45 PM","1:00 PM",
      "3:00 PM","3:15 PM","3:30 PM","3:45 PM",
      "4:00 PM","4:15 PM","4:30 PM","4:45 PM",
      "5:00 PM","5:15 PM","5:30 PM","5:45 PM",
      "6:00 PM","7:00 PM","7:15 PM","7:30 PM","7:45 PM","8:00 PM"
    ];

    horarios.forEach(hora => {
      const cell = document.createElement("div");
      cell.classList.add("hora-slot");
      cell.textContent = hora;
      cell.addEventListener("click", () => {
        if (selectedHourCell) selectedHourCell.classList.remove("selected");
        cell.classList.add("selected");
        selectedHourCell = cell;
        selectedHour = hora;
        reservaData.hora = hora;
        actualizarResumen();
      });
      horaGrid.appendChild(cell);
    });
  }

  // ----------------------------
  // 6) PASO 4: Zona
  // ----------------------------
  const slides = Array.from(document.querySelectorAll(".zona-slide"));
  const slidesContainer = document.querySelector(".zona-slides");
  const prevZona = document.querySelector(".zona-nav.prev");
  const nextZona = document.querySelector(".zona-nav.next");
  if (slides.length && slidesContainer && prevZona && nextZona) {
    let currentZonaIndex = 0;
    function updateZonaPosition() { slidesContainer.style.transform = `translateX(-${currentZonaIndex*100}%)`; }
    prevZona.addEventListener("click", () => { currentZonaIndex = (currentZonaIndex - 1 + slides.length) % slides.length; updateZonaPosition(); });
    nextZona.addEventListener("click", () => { currentZonaIndex = (currentZonaIndex + 1) % slides.length; updateZonaPosition(); });
    slides.forEach(slide => {
      slide.addEventListener("click", () => {
        slides.forEach(s => s.classList.remove("selected"));
        slide.classList.add("selected");
        selectedZona = slide.dataset.zona;
        reservaData.zona = selectedZona;
        actualizarResumen();
      });
    });
  }

  // ----------------------------
  // 7) PASO 5: Datos del cliente + resumen
  // ----------------------------
  const tipoComprobante = document.getElementById("tipo-comprobante");
  const facturaCampos = document.getElementById("factura-campos");
  const boletaCampos = document.getElementById("boleta-campos");
  const btnContinuar = document.getElementById("btn-continuar");

  if (tipoComprobante) {
    tipoComprobante.addEventListener("change", () => {
      facturaCampos.classList.toggle("hidden", tipoComprobante.value !== "factura");
      boletaCampos.classList.toggle("hidden", tipoComprobante.value !== "boleta");
    });
  }

  if (btnContinuar) {
    btnContinuar.addEventListener("click", () => {
      reservaData.nombre = document.getElementById("nombre").value;
      reservaData.apellidos = document.getElementById("apellidos").value;
      reservaData.email = document.getElementById("email").value;
      reservaData.telefono = document.getElementById("telefono").value;
      reservaData.comprobante = tipoComprobante.value;

      // Mostrar paso 6
      const idxPaso6 = steps.findIndex(s => s.dataset.step === "6");
      if (idxPaso6 !== -1) showStep(idxPaso6);
    });
  }

  // ----------------------------
  // 8) PASO 6: Confirmar tarjeta + resumen final
  // ----------------------------
  const btnConfirmar = document.getElementById("btn-confirmar");
  const resumenFinal = document.getElementById("resumen-final");

  function actualizarResumen() {
    if (resumenDiv) {
      resumenDiv.innerHTML = `
        <p><strong>Personas:</strong> ${reservaData.personas || ""}</p>
        <p><strong>Fecha:</strong> ${reservaData.fecha ? reservaData.fecha.toLocaleDateString() : ""}</p>
        <p><strong>Hora:</strong> ${reservaData.hora || ""}</p>
        <p><strong>Zona:</strong> ${reservaData.zona || ""}</p>
      `;
    }
    if (resumenFinal) {
      resumenFinal.innerHTML = `
        <h3>Resumen de la reserva</h3>
        <p><strong>Nombre:</strong> ${reservaData.nombre || ""} ${reservaData.apellidos || ""}</p>
        <p><strong>Email:</strong> ${reservaData.email || ""}</p>
        <p><strong>Teléfono:</strong> ${reservaData.telefono || ""}</p>
        <p><strong>Personas:</strong> ${reservaData.personas || ""}</p>
        <p><strong>Fecha:</strong> ${reservaData.fecha ? reservaData.fecha.toLocaleDateString() : ""}</p>
        <p><strong>Hora:</strong> ${reservaData.hora || ""}</p>
        <p><strong>Zona:</strong> ${reservaData.zona || ""}</p>
      `;
    }
  }

  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", () => {
      alert("¡Reserva confirmada! Recibirás un SMS o correo con los detalles.");
    });
  }

  // ----------------------------
  // 9) Mostrar primer paso
  // ----------------------------
  showStep(0);
});

