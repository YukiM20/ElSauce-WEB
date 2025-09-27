document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adminLogin");
  const message = document.getElementById("loginMessage");

  // Lista de usuarios permitidos
  const admins = [
    { username: "fabian", password: "utp" },
    { username: "milagros", password: "utp" },
    { username: "alonso", password: "utp" },
    { username: "diego", password: "utp" }
  ];

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // Busca si el user existe
      const userFound = admins.find(
        admin => admin.username === username && admin.password === password
      );

      if (userFound) {
        message.textContent = `✅ Bienvenido ${username}. Redirigiendo...`;
        message.className = "success";

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      } else {
        message.textContent = "❌ Usuario o contraseña incorrectos.";
        message.className = "error";
      }
    });
  }
});

