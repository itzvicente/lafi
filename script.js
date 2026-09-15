// Cambiar la vista activa (Login, Registro o Dashboard)
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

// Cambiar pestañas dentro del Dashboard
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  if (activeTab) activeTab.classList.add('active');

  const activeBtn = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

// Eventos de formularios y botones
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('form-register');
  const loginForm = document.getElementById('form-login');
  const logoutBtn = document.getElementById('btn-logout');

  // Al completar el registro -> redirige al login
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showView('view-login');
    });
  }

  // Al completar el login -> entra al dashboard principal
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showView('view-dashboard');
    });
  }

  // Botón de Cerrar Sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      showView('view-login');
    });
  }

  // Vista inicial por defecto
  showView('view-login');
});
