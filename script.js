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
// MOSTRAR Y LIMPIAR MENSAJES
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

function validatePasswordStructure(password) {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*.,\-_]/.test(password);

  return minLength && hasLetter && hasSpecialChar;
}

// ==========================================================================
// EVENTOS Y LÓGICA PRINCIPAL
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // Botones de cambio de vista
  const goToRegisterBtn = document.getElementById('go-to-register');
  const goToLoginBtn = document.getElementById('go-to-login');
  const goToResetBtn = document.getElementById('go-to-reset');
  const goToLoginFromResetBtn = document.getElementById('go-to-login-from-reset');
  const btnSupport = document.getElementById('btn-support');

  if (goToRegisterBtn) goToRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-register'); });
  if (goToLoginBtn) goToLoginBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-login'); });
  if (goToResetBtn) goToResetBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-reset'); });
  if (goToLoginFromResetBtn) goToLoginFromResetBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-login'); });

  // Redirección a redactar mail de soporte
  if (btnSupport) {
    btnSupport.addEventListener('click', () => {
      alert('Redirigiendo al cliente de correo para redactar una consulta a soporte técnico...');
      window.location.href = 'mailto:soporte@lafi.com?subject=Recuperacion%20de%20cuenta%20LAFI&body=Hola,%20necesito%20ayuda%20para%20recuperar%20mi%20cuenta.%20No%20recuerdo%20mi%20correo%20registrado.';
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

      if (!name || !email || !phone || !address || !pass || !passConfirm) {
        showMessage('register-msg', 'Por favor, completa todos los campos requeridos.', 'error');
        return;
      }

      // Validar si el correo YA está registrado
      if (localStorage.getItem('lafi_user_' + email)) {
        showMessage('register-msg', 'El correo ingresado ya se encuentra registrado. Intenta con otro o inicia sesión.', 'error');
        return;
      }

      if (!validatePasswordStructure(pass)) {
        showMessage('register-msg', 'La contraseña debe tener mínimo 8 caracteres, al menos una letra y un carácter especial (!@#$%^&*.,-_).', 'error');
        return;
      }

      if (pass !== passConfirm) {
        showMessage('register-msg', 'Las contraseñas ingresadas no coinciden.', 'error');
        return;
      }

      const userData = { name, email, phone, address, password: pass };
      localStorage.setItem('lafi_user_' + email, JSON.stringify(userData));

      registerForm.reset();
      showView('view-login');
      showMessage('login-msg', '¡Registro exitoso! Ya puedes ingresar.', 'success');
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

      if (!email || !pass) {
        showMessage('login-msg', 'Ingresa tu correo y contraseña.', 'error');
        return;
      }

      const savedUserRaw = localStorage.getItem('lafi_user_' + email);

      // Si NO está registrado, avisa específicamente
      if (!savedUserRaw) {
        showMessage('login-msg', 'El correo ingresado no está registrado.', 'error');
        return;
      }

      const savedUser = JSON.parse(savedUserRaw);

      // Validación de contraseña
      if (savedUser.password !== pass) {
        showMessage('login-msg', 'Contraseña incorrecta. Inténtalo de nuevo.', 'error');
        return;
      }

      // Cargar datos al perfil del usuario
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
  // FORMULARIO DE OLVIDÉ MI CONTRASEÑA
  // ------------------------------------------------------------------------
  const resetForm = document.getElementById('form-reset');
  if (resetForm) {
    resetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearMessages();

      const email = document.getElementById('reset-email').value.trim().toLowerCase();

      if (!email) {
        showMessage('reset-msg', 'Por favor, ingresa tu correo electrónico.', 'error');
        return;
      }

      const savedUserRaw = localStorage.getItem('lafi_user_' + email);

      if (!savedUserRaw) {
        showMessage('reset-msg', 'El correo ingresado no está registrado en el sistema.', 'error');
        return;
      }

      // Notificación exitosa
      showMessage('reset-msg', 'Se ha enviado un método de cambio de contraseña a tu correo electrónico.', 'success');
      resetForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // LOGOUT Y NAVEGACIÓN TAB
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
      if (targetTab) switchTab(targetTab);
    });
  });

  showView('view-login');
});
