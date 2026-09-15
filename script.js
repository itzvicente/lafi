document.addEventListener("DOMContentLoaded", () => {
  // Elementos de la interfaz
  const loginView = document.getElementById("login-view");
  const registerView = document.getElementById("register-view");
  const dashboardView = document.getElementById("app-dashboard");

  const goToRegister = document.getElementById("go-to-register");
  const goToLogin = document.getElementById("go-to-login");

  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");
  const btnLogout = document.getElementById("btn-logout");

  // Navegación entre formularios de autenticación
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

  // REGISTRO DE NUEVA CUENTA
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const phone = document.getElementById("reg-phone").value.trim();
    const branch = document.getElementById("reg-branch").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-password-confirm").value;
    const errorMsg = document.getElementById("reg-error");

    // Validación de campos incompletos
    if (!name || !email || !phone || !branch || !password || !confirmPassword) {
      errorMsg.textContent = "CAMPO INCOMPLETO";
      return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
      errorMsg.textContent = "NO COINCIDE";
      return;
    }

    // Obtener usuarios almacenados o inicializar lista
    const users = JSON.parse(localStorage.getItem("lafi_users")) || [];

    // Verificar si el correo ya existe
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      errorMsg.textContent = "EL CORREO YA ESTÁ REGISTRADO";
      return;
    }

    // Guardar nuevo usuario
    const newUser = { name, email, phone, branch, password };
    users.push(newUser);
    localStorage.setItem("lafi_users", JSON.stringify(users));

    errorMsg.textContent = "";
    alert("¡Registro exitoso! Ya puedes iniciar sesión.");

    // Limpiar campos y redirigir al Login
    formRegister.reset();
    registerView.classList.remove("active");
    loginView.classList.add("active");
  });

  // INICIO DE SESIÓN
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const errorMsg = document.getElementById("login-error");

    const users = JSON.parse(localStorage.getItem("lafi_users")) || [];

    // Buscar coincidencia de credenciales
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!validUser) {
      errorMsg.textContent = "CORREO O CONTRASEÑA INCORRECTOS";
      return;
    }

    // Guardar usuario en sesión activa
    localStorage.setItem("lafi_logged_user", JSON.stringify(validUser));

    errorMsg.textContent = "";
    formLogin.reset();

    // Cargar datos en el Dashboard y mostrarlo
    loadUserData(validUser);
    loginView.classList.remove("active");
    dashboardView.classList.remove("hidden");
    switchTab("tab-home");
  });

  // CERRAR SESIÓN
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("lafi_logged_user");
    dashboardView.classList.add("hidden");
    loginView.classList.add("active");
  });

  // VERIFICAR SESIÓN ACTIVA AL CARGAR
  const loggedUser = JSON.parse(localStorage.getItem("lafi_logged_user"));
  if (loggedUser) {
    loadUserData(loggedUser);
    loginView.classList.remove("active");
    dashboardView.classList.remove("hidden");
  }
});

// Carga los datos del usuario logueado en las pantallas de Perfil y Pedido
function loadUserData(user) {
  if (!user) return;

  document.getElementById("prof-name").value = user.name || "";
  document.getElementById("prof-email").value = user.email || "";
  document.getElementById("prof-phone").value = user.phone || "";
  document.getElementById("prof-branch").value = user.branch || "";

  document.getElementById("display-sucursal").textContent = user.branch || "No asignada";
}

// Ocultar / Mostrar contraseña
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Cambiar de pestañas en el Dashboard
function switchTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  const navItems = document.querySelectorAll(".nav-item");

  tabs.forEach((tab) => tab.classList.remove("active"));
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("onclick").includes(tabId)) {
      item.classList.add("active");
    }
  });
}
