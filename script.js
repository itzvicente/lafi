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
// VALIDACIONES Y LÓGICA DE USUARIOS
// ==========================================================================

// Regla de contraseña: mínimo 8 caracteres, al menos 1 letra y al menos 1 carácter especial común (!@#$%^&*.,)
function validatePasswordStructure(password) {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*.,\-_]/.test(password);

  return minLength && hasLetter && hasSpecialChar;
}

document.addEventListener('DOMContentLoaded', () => {

  // Navegación entre vistas simples
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
  // VALIDACIÓN DE REGISTRO
  // ------------------------------------------------------------------------
  const registerForm = document.getElementById('form-register');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const phone = document.getElementById('reg-phone').value.trim();
      const address = document.getElementById('reg-address').value.trim();
      const pass = document.getElementById('reg-pass').value;
      const passConfirm = document.getElementById('reg-pass-confirm').value;

      // 1. Validar que no haya campos vacíos
      if (!name || !email || !phone || !address || !pass || !passConfirm) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
      }

      // 2. Validar estructura de la contraseña
      if (!validatePasswordStructure(pass)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir al menos una letra y un carácter especial (ej: ! @ # $ % * . , _).');
        return;
      }

      // 3. Validar coincidencia de contraseñas
      if (pass !== passConfirm) {
        alert('Las contraseñas no coinciden. Por favor, verifícalas.');
        return;
      }

      // 4. Guardar datos en LocalStorage
      const userData = {
        name,
        email,
        phone,
        address,
        password: pass
      };

      localStorage.setItem('lafi_user_' + email, JSON.stringify(userData));

      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      registerForm.reset();
      showView('view-login');
    });
  }

  // ------------------------------------------------------------------------
  // VALIDACIÓN DE INICIO DE SESIÓN
  // ------------------------------------------------------------------------
  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const pass = document.getElementById('login-password').value;

      // 1. Validar campos vacíos
      if (!email || !pass) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
      }

      // 2. Obtener usuario del LocalStorage
      const savedUserRaw = localStorage.getItem('lafi_user_' + email);

      if (!savedUserRaw) {
        alert('El correo ingresado no está registrado.');
        return;
      }

      const savedUser = JSON.parse(savedUserRaw);

      // 3. Validar contraseña ingresada
      if (savedUser.password !== pass) {
        alert('Contraseña incorrecta.');
        return;
      }

      // 4. Cargar datos del usuario registrado en el Perfil del Dashboard
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
  // CERRAR SESIÓN Y NAVEGACIÓN TAB
  // ------------------------------------------------------------------------
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('view-login');
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

  // Vista inicial
  showView('view-login');
});
