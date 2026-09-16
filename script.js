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

let currentUserEmail = null;

// ==========================================================================
// GENERADOR DE PDF OFICIAL DE ALTA LAFI
// ==========================================================================

function generateLafiPdf(userData = {}) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(15, 76, 129);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text("DROGUERÍA LAFI S.A.", 15, 18);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("Formulario Oficial de Alta Comercial y Registro Sanitario", 15, 25);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  const today = new Date().toLocaleDateString('es-AR');
  doc.text(`Fecha de emisión: ${today}`, 150, 40);

  let y = 48;

  const drawSection = (title) => {
    doc.setFillColor(240, 244, 248);
    doc.rect(15, y, 180, 7, 'F');
    doc.setTextColor(15, 76, 129);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 18, y + 5);
    y += 12;
  };

  const addField = (label, val = "________________________") => {
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 18, y);
    doc.setFont('helvetica', 'normal');
    doc.text(String(val), 75, y);
    y += 7;
  };

  drawSection("1. DATOS DEL TITULAR Y CUENTA");
  addField("Nombre de Usuario", userData.name || "");
  addField("Correo Electrónico", userData.email || "");
  addField("Teléfono de Contacto", userData.phone || "");

  y += 3;
  drawSection("2. DATOS FISCALES Y COMERCIALES DE LA FARMACIA");
  addField("CUIT", userData.pharmacy?.cuit || "");
  addField("Condición Fiscal", userData.pharmacy?.taxCondition || "");
  addField("Inscripción IIBB", userData.pharmacy?.iibb || "");
  addField("Razón Social", userData.pharmacy?.businessName || "");
  addField("Nombre Fantasía", userData.pharmacy?.fantasyName || "");
  addField("Domicilio de Entrega", userData.pharmacy?.deliveryAddress || "");

  y += 3;
  drawSection("3. HABILITACIÓN Y DIRECCIÓN TÉCNICA");
  addField("Cert. Habilitación Sanitaria", userData.pharmacy?.sanitaryCert || "");
  addField("Registro ANMAT", userData.pharmacy?.anmat || "N/A");
  addField("Director Técnico (DT)", userData.pharmacy?.dtName || "");
  addField("DNI Director Técnico", userData.pharmacy?.dtDni || "");
  addField("Matrícula Profesional DT", userData.pharmacy?.dtLicense || "");

  y += 20;
  doc.setLineWidth(0.5);
  doc.line(25, y, 90, y);
  doc.line(120, y, 185, y);

  y += 5;
  doc.setFontSize(8);
  doc.text("Firma y Sello del Director Técnico", 32, y);
  doc.text("Firma del Titular / Apoderado", 132, y);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Droguería LAFI S.A. - Documentación requerida conforme a normativas de ANMAT y Ministerio de Salud.", 15, 285);

  doc.save("Alta_Farmacia_Drogueria_LAFI.pdf");
}

// ==========================================================================
// EVENTOS Y LÓGICA PRINCIPAL
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const goToRegisterBtn = document.getElementById('go-to-register');
  const goToLoginBtn = document.getElementById('go-to-login');
  const goToResetBtn = document.getElementById('go-to-reset');
  const goToLoginFromResetBtn = document.getElementById('go-to-login-from-reset');
  const btnSupport = document.getElementById('btn-support');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');

  if (goToRegisterBtn) goToRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-register'); });
  if (goToLoginBtn) goToLoginBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-login'); });
  if (goToResetBtn) goToResetBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-reset'); });
  if (goToLoginFromResetBtn) goToLoginFromResetBtn.addEventListener('click', (e) => { e.preventDefault(); showView('view-login'); });

  if (btnSupport) {
    btnSupport.addEventListener('click', () => {
      alert('Redirigiendo al cliente de correo para redactar una consulta a soporte técnico...');
      window.location.href = 'mailto:soporte@lafi.com?subject=Recuperacion%20de%20cuenta%20LAFI&body=Hola,%20necesito%20ayuda%20para%20recuperar%20mi%20cuenta.%20No%20recuerdo%20mi%20correo%20registrado.';
    });
  }

  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', () => {
      let savedUser = {};
      if (currentUserEmail) {
        savedUser = JSON.parse(localStorage.getItem('lafi_user_' + currentUserEmail) || '{}');
      }
      generateLafiPdf(savedUser);
    });
  }

  // REGISTRO DE USUARIO
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

      const userData = {
        name,
        email,
        phone,
        address,
        password: pass,
        pharmacyRegistered: false
      };

      localStorage.setItem('lafi_user_' + email, JSON.stringify(userData));

      registerForm.reset();
      showView('view-login');
      showMessage('login-msg', '¡Cuenta creada con éxito! Inicia sesión para completar los datos de tu farmacia.', 'success');
    });
  }

  // INICIO DE SESIÓN
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

      if (!savedUserRaw) {
        showMessage('login-msg', 'El correo ingresado no está registrado.', 'error');
        return;
      }

      const savedUser = JSON.parse(savedUserRaw);

      if (savedUser.password !== pass) {
        showMessage('login-msg', 'Contraseña incorrecta. Inténtalo de nuevo.', 'error');
        return;
      }

      currentUserEmail = email;

      if (!savedUser.pharmacyRegistered) {
        loginForm.reset();
        showView('view-pharmacy-reg');
        showMessage('pharmacy-msg', 'Primer ingreso detectado: Registra tu farmacia para activar la cuenta.', 'success');
        return;
      }

      const profileInputs = document.querySelectorAll('#tab-profile input');
      if (profileInputs.length >= 4) {
        profileInputs[0].value = savedUser.name;
        profileInputs[1].value = savedUser.email;
        profileInputs[2].value = savedUser.phone;
        profileInputs[3].value = savedUser.pharmacy ? savedUser.pharmacy.deliveryAddress : savedUser.address;
      }

      loginForm.reset();
      showView('view-dashboard');
    });
  }

  // REGISTRO DE FARMACIA
  const pharmacyForm = document.getElementById('form-pharmacy');
  if (pharmacyForm) {
    pharmacyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearMessages();

      const filesInput = document.getElementById('pharm-files');
      if (!filesInput.files || filesInput.files.length === 0) {
        showMessage('pharmacy-msg', 'Por favor, adjunta la documentación sanitaria y fiscal requerida.', 'error');
        return;
      }

      const cuit = document.getElementById('pharm-cuit').value.trim();
      const taxCondition = document.getElementById('pharm-tax-condition').value;
      const iibb = document.getElementById('pharm-iibb').value.trim();
      const businessName = document.getElementById('pharm-business-name').value.trim();
      const fantasyName = document.getElementById('pharm-fantasy-name').value.trim();
      const deliveryAddress = document.getElementById('pharm-delivery-address').value.trim();
      const sanitaryCert = document.getElementById('pharm-sanitary-cert').value.trim();
      const anmat = document.getElementById('pharm-anmat').value.trim();
      const dtName = document.getElementById('pharm-dt-name').value.trim();
      const dtDni = document.getElementById('pharm-dt-dni').value.trim();
      const dtLicense = document.getElementById('pharm-dt-license').value.trim();

      const savedUser = JSON.parse(localStorage.getItem('lafi_user_' + currentUserEmail));
      savedUser.pharmacyRegistered = true;
      savedUser.pharmacy = {
        cuit, taxCondition, iibb, businessName, fantasyName,
        deliveryAddress, sanitaryCert, anmat, dtName, dtDni, dtLicense,
        fileCount: filesInput.files.length
      };

      localStorage.setItem('lafi_user_' + currentUserEmail, JSON.stringify(savedUser));

      const profileInputs = document.querySelectorAll('#tab-profile input');
      if (profileInputs.length >= 4) {
        profileInputs[0].value = savedUser.name;
        profileInputs[1].value = savedUser.email;
        profileInputs[2].value = savedUser.phone;
        profileInputs[3].value = savedUser.pharmacy.deliveryAddress;
      }

      const modal = document.getElementById('modal-pending');
      const timerSpan = document.getElementById('timer-seconds');
      let secondsLeft = 5;

      if (modal) {
        modal.classList.remove('hidden');
        
        const countdown = setInterval(() => {
          secondsLeft--;
          if (timerSpan) timerSpan.textContent = secondsLeft;

          if (secondsLeft <= 0) {
            clearInterval(countdown);
            modal.classList.add('hidden');
            pharmacyForm.reset();
            showView('view-dashboard');
          }
        }, 1000);
      } else {
        pharmacyForm.reset();
        showView('view-dashboard');
      }
    });
  }

  // OLVIDÉ CONTRASEÑA
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

      showMessage('reset-msg', 'Se ha enviado un método de cambio de contraseña a tu correo electrónico.', 'success');
      resetForm.reset();
    });
  }

  // LOGOUT Y TABS
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentUserEmail = null;
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
