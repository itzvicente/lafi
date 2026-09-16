// ==========================================================================
// CONTROL DE VISTAS Y NAVEGACIÓN
// ==========================================================================

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

  // Limpiar mensajes al cambiar de vista
  clearMessages();
}

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

// ==========================================================================
// MOSTRAR Y LIMPIAR MENSAJES EN LA INTERFAZ
// ==========================================================================

function showMessage(elementId, text, type = 'error') {
  const msgBox = document.getElementById(elementId);
  if (!msgBox) return;

  msgBox.textContent = text;
  msgBox.className = `auth-message ${type}`;
}

function clearMessages() {
  const messages = document.querySelectorAll('.auth-message');
  messages.forEach(msg => {
    msg.textContent = '';
    msg.className = 'auth-message hidden';
  });
}

// Validación de estructura: mín 8 caracteres, al menos 1 letra y 1 carácter especial
function validatePasswordStructure(password) {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*.,\-_]/.test(password);

  return minLength && hasLetter && hasSpecialChar;
}

// ==========================================================================
// EVENTOS PRINCIPALES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

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

  // ------------------------------------------------------------------------
  // FORMULARIO DE REGISTRO
  // ------------------------------------------------------------------------
  const registerForm = document.getElementById('form-register');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearMessages();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const phone = document.getElementById('reg-phone').value.trim();
      const address = document.getElementById('reg-address').value.trim();
      const pass = document.getElementById('reg-pass').value;
      const passConfirm = document.getElementById('reg-pass-confirm').value;

      // 1. Validar campos vacíos
      if (!name || !email || !phone || !address || !pass || !passConfirm) {
        showMessage('register-msg', 'Por favor, completa todos los campos requeridos.', 'error');
        return;
      }

      // 2. Validar complejidad de contraseña
      if (!validatePasswordStructure(pass)) {
        showMessage('register-msg', 'La contraseña debe tener mínimo 8 caracteres, al menos una letra y un carácter especial (!@#$%^&*.,-_).', 'error');
        return;
      }

      // 3. Validar coincidencia de contraseñas
      if (pass !== passConfirm) {
        showMessage('register-msg', 'Las contraseñas ingresadas no coinciden.', 'error');
        return;
      }

      // 4. Guardar datos en LocalStorage
      const userData = { name, email, phone, address, password: pass };
      localStorage.setItem('lafi_user_' + email, JSON.stringify(userData));

      registerForm.reset();
      
      // Mostrar mensaje de éxito en la vista de Login
      showView('view-login');
      showMessage('login-msg', '¡Cuenta creada con éxito! Ingresa con tus credenciales.', 'success');
    });
  }

  // ------------------------------------------------------------------------
  // FORMULARIO DE INICIO DE SESIÓN
  // ------------------------------------------------------------------------
  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearMessages();

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const pass = document.getElementById('login-password').value;

      // 1. Validar campos vacíos
      if (!email || !pass) {
        showMessage('login-msg', 'Ingresa tu correo y contraseña.', 'error');
        return;
      }

      // 2. Comprobar usuario
      const savedUserRaw = localStorage.getItem('lafi_user_' + email);
      if (!savedUserRaw) {
        showMessage('login-msg', 'El correo ingresado no está registrado.', 'error');
        return;
      }

      const savedUser = JSON.parse(savedUserRaw);

      // 3. Validar contraseña
      if (savedUser.password !== pass) {
        showMessage('login-msg', 'Contraseña incorrecta. Inténtalo de nuevo.', 'error');
        return;
      }

      // 4. Cargar perfil y pasar al Dashboard
      const profileInputs = document.querySelectorAll('#tab-profile input');
      if (profileInputs.length >= 4) {
        profileInputs[0].value = savedUser.name;
        profileInputs[1].value = savedUser.email;
        profileInputs[2].value = savedUser.phone;
        profileInputs[3].value = savedUser.address;
      }

      loginForm.reset();
      showView('view-dashboard');
    });
  }

  // ------------------------------------------------------------------------
  // CERRAR SESIÓN Y PESTAÑAS
  // ------------------------------------------------------------------------
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('view-login');
      showMessage('login-msg', 'Has cerrado sesión correctamente.', 'success');
    });
  }

  const navButtons = document.querySelectorAll('.nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });

  showView('view-login');
});
