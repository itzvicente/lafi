// 1. Navegación Visual
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

// 2. Registro (Simulado)
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

    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];
    
    if (usuarios.find(u => u.email === email)) {
        alert("Este correo ya está registrado");
        return;
    }

    const nuevoUsuario = {
        id: 'user_' + Date.now(),
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        sucursal: sucursal
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('github_usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioLogueado', nuevoUsuario.id);
    
    // Limpiar campos visuales
    document.getElementById('regNombre').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regTelefono').value = '';
    document.getElementById('regDireccion').value = '';
    document.getElementById('regSucursal').value = '';
    document.getElementById('regPass1').value = '';
    document.getElementById('regPass2').value = '';
    
    navigate('home');
}

// 3. Iniciar Sesión (Acceso Directo Inteligente)
function iniciarSesion() {
    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];

    // Si no hay usuarios en la memoria, creamos uno de prueba automáticamente 
    // para que no se trabe la navegación
    if (usuarios.length === 0) {
        const usuarioPrueba = {
            id: 'user_prueba_123',
            nombre: 'Usuario de Prueba',
            email: 'prueba@gmail.com',
            telefono: '+54 11 1234-5678',
            direccion: 'Calle Falsa 123',
            sucursal: 'Centro'
        };
        usuarios.push(usuarioPrueba);
        localStorage.setItem('github_usuarios', JSON.stringify(usuarios));
    }

    // Inicia sesión usando la primera cuenta disponible
    localStorage.setItem('usuarioLogueado', usuarios[0].id);
    
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPass').value = '';
    
    navigate('home');
}

// 4. Hacer Pedido (Simulado)
function hacerPedido() {
    const userId = localStorage.getItem('usuarioLogueado');
    if (!userId) {
        navigate('login');
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem('github_pedidos')) || [];
    
    const nuevoPedido = {
        id_package: 'PED-' + Math.floor(Math.random() * 10000),
        id_usuario: userId,
        solicitud_package: 'Pedido web estándar',
        estado_pedido: 'En preparación'
    };

    pedidos.push(nuevoPedido);
    localStorage.setItem('github_pedidos', JSON.stringify(pedidos));
    
    // Actualizamos los datos del tracking con el usuario actual
    let usuarios = JSON.parse(localStorage.getItem('github_usuarios')) || [];
    let usuarioActivo = usuarios.find(u => u.id === userId);
    
    if (usuarioActivo) {
        document.getElementById('trackSucursal').innerText = usuarioActivo.sucursal;
        document.getElementById('trackDireccion').innerText = usuarioActivo.direccion;
    }

    alert("¡Pedido generado correctamente!");
    navigate('tracking'); 
}

// 5. Historial de Actividad (Simulado)
function cargarActividad() {
    const userId = localStorage.getItem('usuarioLogueado');
    if (!userId) return; 
    
    let pedidos = JSON.parse(localStorage.getItem('github_pedidos')) || [];
    let misPedidos = pedidos.filter(p => p.id_usuario === userId).reverse();
    
    const contenedor = document.getElementById('listaPedidos');
    contenedor.innerHTML = ''; 
    
    if(misPedidos.length === 0) {
        contenedor.innerHTML = '<p>Aún no tienes pedidos registrados.</p>';
        return;
    }

    misPedidos.forEach(pedido => {
        contenedor.innerHTML += `
        <div class="card">
            <p style="margin: 0 0 5px 0;"><strong>${pedido.estado_pedido}</strong> - ${pedido.id_package}</p>
            <p style="margin: 0; color: #555;">${pedido.solicitud_package}</p>
        </div>`;
    });
}

// 6. Cargar Perfil (Simulado)
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
    navigate('login');
}
