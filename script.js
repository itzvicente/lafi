document.addEventListener("DOMContentLoaded", () => {
  // Manejo de navegación Auth
  const loginView = document.getElementById("login-view");
  const registerView = document.getElementById("register-view");
  const dashboardView = document.getElementById("app-dashboard");

  const goToRegister = document.getElementById("go-to-register");
  const goToLogin = document.getElementById("go-to-login");
  
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");
  const btnLogout = document.getElementById("btn-logout");

  goToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginView.classList.remove("active");
    registerView.classList.add("active");
  });

  goToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerView.classList.remove("active");
    loginView.classList.add("active");
  });

  // Login Submit
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    loginView.classList.remove("active");
    dashboardView.classList.remove("hidden");
  });

  // Registro Submit
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const pass = document.getElementById("reg-password").value;
    const passConf = document.getElementById("reg-password-confirm").value;
    const errorMsg = document.getElementById("reg-error");

    if (pass !== passConf) {
      errorMsg.textContent = "NO COINCIDE";
      return;
    }

    errorMsg.textContent = "";
    alert("Registro exitoso");
    registerView.classList.remove("active");
    loginView.classList.add("active");
  });

  // Logout
  btnLogout.addEventListener("click", () => {
    dashboardView.classList.add("hidden");
    loginView.classList.add("active");
  });
});

// Alternar visibilidad de contraseña
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Alternar entre Pestañas del Dashboard
function switchTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  const navItems = document.querySelectorAll(".nav-item");

  tabs.forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");

  // Actualizar estado activo en la barra inferior
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("onclick").includes(tabId)) {
      item.classList.add("active");
    }
  });
}
