// 1. Navegación
function navigate(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }

    if (screenId === 'activity') {
        cargarActividad();
    }
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    
    if (sidebar.classList.contains('open')) {
        cargarPerfil();
    }
}

// 2. Registro (Simulado en LocalStorage)
function registrarUsuario() {
    const nombre = document.getElementById('regNombre').value;
    const email = document.getElementById('regEmail').value;
    const telefono = document.getElementById('regTelefono').value;
    const direccion = document.getElementById('regDireccion').value;
    const sucursal = document.getElementById('regSucursal').value;
    const pass1 = document.getElementById('regPass1').value;
    const pass2 = document.getElementById('regPass2').value;
    
    const errorCampos = document.getElementById('errorCampos');
    const errorPass = document.getElementById('errorPass');
    
    errorCampos.style.display = 'none';
    errorPass.style.display = 'none';

    if (nombre.trim() === '' || email.trim() === '' || telefono.trim() === '' || 
        direccion.trim() === '' || sucursal.trim() === '' || pass1.trim() === '') {
        errorCampos.style.display = 'block';
        return;
    }

    if (pass1 !== pass2) {
        errorPass.style.display = 'block';
        return;
    }

    // Leemos la base de datos simulada de usuarios
    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];
    
    // Verificamos si el correo ya existe
    if (usuarios.find(u => u.email === email)) {
        alert("Este correo ya está registrado");
        return;
    }

    // Creamos el nuevo usuario con un ID único basado en la fecha exacta
    const nuevoUsuario = {
        id: 'user_' + Date.now(),
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        sucursal: sucursal,
        password: pass1
    };

    // Guardamos en la base de datos simulada
    usuarios.push(nuevoUsuario);
    localStorage.setItem('github_usuarios', JSON.stringify(usuarios));
    
    // Iniciamos sesión automáticamente
    localStorage.setItem('usuarioLogueado', nuevoUsuario.id);
    
    // Limpiamos los campos
    document.getElementById('regNombre').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regTelefono').value = '';
    document.getElementById('regDireccion').value = '';
    document.getElementById('regSucursal').value = '';
    document.getElementById('regPass1').value = '';
    document.getElementById('regPass2').value = '';
    
    navigate('home');
}

// 3. Login (Modificado para acceso directo)
function iniciarSesion() {
    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];

    // Si la memoria está vacía, pedimos que registre al menos uno
    if (usuarios.length === 0) {
        alert("Primero debes crear al menos una cuenta en 'Crear cuenta nueva' para tener un perfil que cargar.");
        return;
    }

    // Inicia sesión automáticamente con el primer usuario registrado
    localStorage.setItem('usuarioLogueado', usuarios[0].id);
    
    // Limpiamos los textos que haya escrito el usuario
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPass').value = '';
    
    navigate('home');
}

// 4. Pedido (Simulado en LocalStorage)
function hacerPedido() {
    const userId = localStorage.getItem('usuarioLogueado');
    if (!userId) {
        alert("Debes iniciar sesión primero");
        navigate('login');
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem('github_pedidos')) || [];
    
    const nuevoPedido = {
        id_package: 'pkg_' + Math.floor(Math.random() * 10000),
        id_usuario: userId,
        solicitud_package: 'Pedido estándar',
        estado_pedido: 'En preparacion'
    };

    pedidos.push(nuevoPedido);
    localStorage.setItem('github_pedidos', JSON.stringify(pedidos));
    
    // Actualizar pantalla de tracking con los datos del usuario
    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];
    let usuarioActivo = usuarios.find(u => u.id === userId);
    
    if (usuarioActivo) {
        document.getElementById('trackSucursal').innerText = usuarioActivo.sucursal;
        document.getElementById('trackDireccion').innerText = usuarioActivo.direccion;
    }

    alert("¡Pedido creado con éxito!");
    navigate('tracking'); 
}

// 5. Historial de Actividad
function cargarActividad() {
    const userId = localStorage.getItem('usuarioLogueado');
    if (!userId) return; 
    
    let pedidos = JSON.parse(localStorage.getItem('github_pedidos')) || [];
    let misPedidos = pedidos.filter(p => p.id_usuario === userId).reverse();
    
    const contenedor = document.getElementById('listaPedidos');
    contenedor.innerHTML = ''; 
    
    if(misPedidos.length === 0) {
        contenedor.innerHTML = '<p>Aún no tienes pedidos.</p>';
        return;
    }

    misPedidos.forEach(pedido => {
        contenedor.innerHTML += `
        <div class="card">
            <p style="margin: 0 0 5px 0;"><strong>${pedido.estado_pedido}</strong> - ${pedido.id_package}</p>
            <p style="margin: 0;">${pedido.solicitud_package}</p>
        </div>`;
    });
}

// 6. Cargar Perfil
function cargarPerfil() {
    const userId = localStorage.getItem('usuarioLogueado');
    if (!userId) return;

    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];
    let usuarioActivo = usuarios.find(u => u.id === userId);

    if (usuarioActivo) {
        document.getElementById('perfilNombre').innerText = usuarioActivo.nombre;
        document.getElementById('perfilEmail').innerText = usuarioActivo.email;
        document.getElementById('perfilTelefono').innerText = usuarioActivo.telefono;
        document.getElementById('perfilDireccion').innerText = usuarioActivo.direccion;
        document.getElementById('perfilSucursal').innerText = usuarioActivo.sucursal;
    }
}

// 7. Cerrar Sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    // Limpiamos los inputs de login por seguridad
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPass').value = '';
    navigate('login');
}
