// Función para ocultar todas las vistas y mostrar solo la deseada
function showView(viewId) {
  const views = document.querySelectorAll('.view');
  views.forEach(view => {
    view.classList.remove('active');
    view.classList.add('hidden');
  });

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.remove('hidden');
    targetView.classList.add('active');
  }
}

// Función para cambiar pestañas internas del Dashboard
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  if (activeTab) activeTab.classList.add('active');

  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

// Vinculación segura de eventos tras cargar el DOM
document.addEventListener('DOMContentLoaded', () => {

  // Botones de cambio de vista entre Registro y Login
  const goToRegisterBtn = document.getElementById('go-to-register');
  const goToLoginBtn = document.getElementById('go-to-login');

  if (goToRegisterBtn) {
    goToRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('view-register');
    });
  }

  if (goToLoginBtn) {
    goToLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('view-login');
    });
  }

  // Evento del formulario de Registro
  const registerForm = document.getElementById('form-register');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Tras registrarse manda al Login
      showView('view-login');
    });
  }

  // Evento del formulario de Login
  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Tras iniciar sesión manda a la página principal
      showView('view-dashboard');
    });
  }

  // Evento del botón de Cerrar Sesión
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('view-login');
    });
  }

  // Eventos de los botones de la barra de navegación del Dashboard
  const navButtons = document.querySelectorAll('.nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });

  // Mostrar la pantalla de Login al iniciar
  showView('view-login');
});
