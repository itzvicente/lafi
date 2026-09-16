// BASE DE DATOS EXTENDIDA DE PRODUCTOS (REALISTA)
const DEFAULT_PRODUCTS = [
  // Analgésicos y Antiinflamatorios
  { id: 'p1', name: 'Paracetamol 500mg (x20 com)', category: 'Analgésicos y Antiinflamatorios', lab: 'Bayer', price: 1200 },
  { id: 'p2', name: 'Ibuprofeno 600mg (x10 com)', category: 'Analgésicos y Antiinflamatorios', lab: 'Roemmers', price: 1850 },
  { id: 'p3', name: 'Diclofenac Sódico 75mg (x15 com)', category: 'Analgésicos y Antiinflamatorios', lab: 'Novartis', price: 2100 },
  { id: 'p4', name: 'Ketorolac 20mg (x10 com)', category: 'Analgésicos y Antiinflamatorios', lab: 'Siddus', price: 1900 },
  
  // Antibióticos
  { id: 'p5', name: 'Amoxicilina 500mg (x16 com)', category: 'Antibióticos', lab: 'Bagó', price: 3400 },
  { id: 'p6', name: 'Azitromicina 500mg (x5 com)', category: 'Antibióticos', lab: 'Elea', price: 4200 },
  { id: 'p7', name: 'Ciprofloxacina 500mg (x10 com)', category: 'Antibióticos', lab: 'Bayer', price: 3900 },
  
  // Psicofármacos
  { id: 'p8', name: 'Sertralina 50mg (x30 com)', category: 'Psicofármacos', lab: 'Gador', price: 5800 },
  { id: 'p9', name: 'Clonazepam 2mg (x30 com)', category: 'Psicofármacos', lab: 'Rivotril', price: 4600 },
  { id: 'p10', name: 'Alprazolam 1mg (x30 com)', category: 'Psicofármacos', lab: 'Gador', price: 4100 },

  // Gastroenterología
  { id: 'p11', name: 'Omeprazol 20mg (x28 com)', category: 'Gastroenterología', lab: 'Ivax', price: 2800 },
  { id: 'p12', name: 'Buscapina Compositum (x10 com)', category: 'Gastroenterología', lab: 'Boehringer', price: 2300 },
  { id: 'p13', name: 'Reliverán Metoclopramida (x20 com)', category: 'Gastroenterología', lab: 'Sanofi', price: 1950 },

  // Cardiovascular
  { id: 'p14', name: 'Enalapril 10mg (x30 com)', category: 'Cardiovascular', lab: 'Roemmers', price: 2600 },
  { id: 'p15', name: 'Losartán 50mg (x30 com)', category: 'Cardiovascular', lab: 'Bagó', price: 3100 },
  { id: 'p16', name: 'Aspirineta 100mg (x28 com)', category: 'Cardiovascular', lab: 'Bayer', price: 1500 },

  // Primeros Auxilios
  { id: 'p17', name: 'Alcohol Etílico 70° 500ml', category: 'Primeros Auxilios', lab: 'Porta', price: 950 },
  { id: 'p18', name: 'Gasa Estéril 10x10cm (x5 un)', category: 'Primeros Auxilios', lab: 'Donath', price: 620 },
  { id: 'p19', name: 'Peróxido de Hidrógeno 10v 250ml', category: 'Primeros Auxilios', lab: 'Efa', price: 880 },
  { id: 'p20', name: 'Cinta Hipoalergénica 2.5cmx9m', category: 'Primeros Auxilios', lab: '3M', price: 1400 },

  // Cuidado Personal y Suplementos
  { id: 'p21', name: 'Crema Dermaglós Hidratante 200g', category: 'Cuidado Personal', lab: 'Andrómaco', price: 6500 },
  { id: 'p22', name: 'Protector Solar FPS 50 150ml', category: 'Cuidado Personal', lab: 'Dermaglós', price: 9800 },
  { id: 'p23', name: 'Vitamina C 1000mg Efervescente (x10)', category: 'Suplementos y Vitaminas', lab: 'Redoxon', price: 3200 },
  { id: 'p24', name: 'Magnesio + Zinc (x30 com)', category: 'Suplementos y Vitaminas', lab: 'Natufarma', price: 4100 }
];

// STOCK INICIAL SIMULADO
const INITIAL_FARMACIA_STOCK = [
  { productId: 'p1', quantity: 30 },
  { productId: 'p2', quantity: 15 },
  { productId: 'p5', quantity: 8 },
  { productId: 'p17', quantity: 12 },
  { productId: 'p21', quantity: 5 }
];

// CUENTA DE DEMOSTRACIÓN PREGURADADA
const DEMO_USER = {
  name: 'Farmacia San Martín',
  email: 'demo@farmacia.com',
  phone: '+54 11 4444-5555',
  password: 'DemoUser123!',
  cuit: '30-71122334-9',
  taxStatus: 'Responsable Inscripto',
  iibb: 'AGIP (CABA)',
  socialReason: 'Farmacia San Martín S.R.L.',
  fantasyName: 'Farmacia San Martín',
  deliveryAddress: 'Av. San Martín 2450, CABA',
  healthCert: 'HAB-2024-8902',
  healthAuthority: 'ANMAT / Ministerio de Salud CABA',
  dtName: 'Dra. Laura Giménez',
  dtDni: '32.456.789',
  dtLicense: 'MN 45892',
  dtAuthorized: 'Carlos Ruiz (DNI 35.123.456)',
  paymentMethod: 'Cuenta Corriente',
  bankCbu: '0170099920000012345678',
  bankAlias: 'FARMACIA.SANMARTIN',
  billingEmail: 'facturacion@farmaciasanmartin.com',
  files: {
    afip: 'constancia_afip_demo.pdf',
    iibb: 'constancia_iibb_demo.pdf',
    health: 'habilitacion_sanitaria_demo.pdf',
    dtLicense: 'matricula_dt_demo.pdf'
  }
};

let currentUser = null;
let userCart = [];
let sellCart = []; // Carrito interno para la venta de stock propio

function ensureDemoUserRegistered() {
  if (!localStorage.getItem('lafi_user_' + DEMO_USER.email)) {
    localStorage.setItem('lafi_user_' + DEMO_USER.email, JSON.stringify(DEMO_USER));
  }
}

function getStockKey(email) { return 'lafi_stock_' + email; }
function getOrdersKey(email) { return 'lafi_orders_' + email; }
function getSalesKey(email) { return 'lafi_sales_' + email; }

function getUserStock(email) {
  const saved = localStorage.getItem(getStockKey(email));
  if (saved) return JSON.parse(saved);
  localStorage.setItem(getStockKey(email), JSON.stringify(INITIAL_FARMACIA_STOCK));
  return INITIAL_FARMACIA_STOCK;
}

function saveUserStock(email, stockArray) {
  localStorage.setItem(getStockKey(email), JSON.stringify(stockArray));
}

function getUserOrders(email) {
  const saved = localStorage.getItem(getOrdersKey(email));
  return saved ? JSON.parse(saved) : [];
}

function saveUserOrders(email, ordersArray) {
  localStorage.setItem(getOrdersKey(email), JSON.stringify(ordersArray));
}

function getUserSales(email) {
  const saved = localStorage.getItem(getSalesKey(email));
  return saved ? JSON.parse(saved) : [];
}

function saveUserSales(email, salesArray) {
  localStorage.setItem(getSalesKey(email), JSON.stringify(salesArray));
}

// NAVEGACIÓN Y TABLA DE VISTAS
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

  if (currentUser) {
    if (tabId === 'tab-stock') renderStockTable();
    if (tabId === 'tab-sales') renderSalesHistory();
    if (tabId === 'tab-catalog') renderCatalogGrid();
    if (tabId === 'tab-orders') renderOrdersHistory();
  }
}

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
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[!@#$%^&*.,\-_]/.test(password);
}

// RENDERS Y MANEJO DE STOCK Y VENTAS PROPIAS
function renderStockTable() {
  const tbody = document.getElementById('stock-list-tbody');
  if (!tbody || !currentUser) return;

  const stockList = getUserStock(currentUser.email);
  tbody.innerHTML = '';

  if (stockList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--color-gray);">No tienes productos en stock actualmente.</td></tr>`;
    renderSellCart();
    return;
  }

  stockList.forEach(item => {
    const prod = DEFAULT_PRODUCTS.find(p => p.id === item.productId);
    if (!prod) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${prod.name}</strong></td>
      <td><span class="cat-badge" style="background:#eee; font-size:0.75rem; padding:2px 6px; border-radius:4px;">${prod.category}</span></td>
      <td>${prod.lab}</td>
      <td><strong>${item.quantity}</strong> unidades</td>
      <td>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
          <button class="btn-primary-sm" onclick="addToCart('${prod.id}', 10)">Solicitar +10 u.</button>
          ${item.quantity > 0 ? `<button class="btn-secondary" style="font-size:0.78rem; padding:0.3rem 0.6rem;" onclick="addToSellCart('${prod.id}')">+ Vender 1 u.</button>` : ''}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  renderSellCart();
}

function addToSellCart(productId) {
  const stockList = getUserStock(currentUser.email);
  const stockItem = stockList.find(s => s.productId === productId);
  if (!stockItem || stockItem.quantity <= 0) {
    alert('No hay stock disponible para vender de este producto.');
    return;
  }

  const existingInSellCart = sellCart.find(i => i.id === productId);
  const currentSellQty = existingInSellCart ? existingInSellCart.qty : 0;

  if (currentSellQty + 1 > stockItem.quantity) {
    alert(`No puedes vender más unidades de las disponibles en stock (${stockItem.quantity} u.).`);
    return;
  }

  const prod = DEFAULT_PRODUCTS.find(p => p.id === productId);

  if (existingInSellCart) {
    existingInSellCart.qty += 1;
  } else {
    sellCart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
  }

  renderSellCart();
}

function renderSellCart() {
  const container = document.getElementById('sell-cart-container');
  const totalEl = document.getElementById('sell-cart-total');
  if (!container || !totalEl) return;

  container.innerHTML = '';

  if (sellCart.length === 0) {
    container.innerHTML = `<p style="color: var(--color-gray); font-size: 0.88rem;">No has añadido productos al carrito de ventas internas.</p>`;
    totalEl.textContent = '$0';
    return;
  }

  let total = 0;

  sellCart.forEach((item, index) => {
    const itemSubtotal = item.price * item.qty;
    total += itemSubtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <span style="font-size:0.8rem; color:var(--color-gray);">$${item.price.toLocaleString('es-AR')} c/u</span>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span>Cant: <strong>${item.qty}</strong></span>
        <button class="btn-secondary" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="removeFromSellCart(${index})">X</button>
      </div>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `$${total.toLocaleString('es-AR')}`;
}

function removeFromSellCart(index) {
  sellCart.splice(index, 1);
  renderSellCart();
}

function confirmSale() {
  if (sellCart.length === 0) {
    alert('El carrito de venta de stock está vacío.');
    return;
  }

  const stockList = getUserStock(currentUser.email);

  // Descontar Stock
  sellCart.forEach(item => {
    const stockIndex = stockList.findIndex(s => s.productId === item.id);
    if (stockIndex > -1) {
      stockList[stockIndex].quantity -= item.qty;
    }
  });

  saveUserStock(currentUser.email, stockList);

  // Generar registro de Venta y Factura B (Consumidor Final / Cliente)
  const invoiceNumber = 'FAC-B-0002-' + Math.floor(100000 + Math.random() * 900000);
  const invoiceDate = new Date().toLocaleDateString('es-AR');

  let subtotal = 0;
  sellCart.forEach(i => subtotal += (i.price * i.qty));
  const tax = subtotal * 0.21;
  const total = subtotal; // Precio de venta final público

  const saleData = {
    invoiceNumber,
    date: invoiceDate,
    items: [...sellCart],
    subtotal: subtotal - tax,
    tax: tax,
    total: total,
    sellerName: currentUser.socialReason || currentUser.name,
    cuit: currentUser.cuit,
    type: 'Venta Mostrador'
  };

  const sales = getUserSales(currentUser.email);
  sales.unshift(saleData);
  saveUserSales(currentUser.email, sales);

  renderSaleInvoiceModal(saleData);

  sellCart = [];
  renderStockTable();
  document.getElementById('modal-invoice').classList.remove('hidden');
}

function renderSaleInvoiceModal(sale) {
  const container = document.getElementById('invoice-printable-area');
  const titleEl = document.getElementById('invoice-modal-title');
  if (!container) return;

  if (titleEl) titleEl.textContent = "Comprobante / Factura de Venta Emitida";

  let itemsHtml = sale.items.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td>$${i.price.toLocaleString('es-AR')}</td>
      <td>$${(i.price * i.qty).toLocaleString('es-AR')}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="invoice-header">
      <div>
        <div class="invoice-title">${sale.sellerName}</div>
        <p>CUIT: ${sale.cuit}</p>
        <p>Venta al Mostrador / Consumidor Final</p>
      </div>
      <div style="text-align: right;">
        <h4 style="color:#800020;">FACTURA B</h4>
        <p><strong>N°:</strong> ${sale.invoiceNumber}</p>
        <p><strong>Fecha:</strong> ${sale.date}</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Cant.</th>
          <th>Precio Unid.</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="text-align:right; margin-top:1rem; font-size:0.95rem;">
      <p style="font-size:1.2rem; color:#800020; margin-top:0.4rem;"><strong>TOTAL COBRADO: $${sale.total.toLocaleString('es-AR')}</strong></p>
    </div>
  `;
}

function renderSalesHistory() {
  const container = document.getElementById('sales-list-container');
  if (!container || !currentUser) return;

  const sales = getUserSales(currentUser.email);
  container.innerHTML = '';

  if (sales.length === 0) {
    container.innerHTML = `<p style="color: var(--color-gray);">No registras ventas ni facturas emitidas desde tu stock.</p>`;
    return;
  }

  sales.forEach(sale => {
    const card = document.createElement('div');
    card.className = 'profile-block';
    card.style.background = 'rgba(255, 255, 255, 0.4)';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
        <h3 style="margin:0;">Factura de Venta: ${sale.invoiceNumber}</h3>
        <span class="order-status-badge status-delivered">Completada</span>
      </div>
      <p style="font-size:0.85rem; margin-bottom:0.3rem;"><strong>Fecha:</strong> ${sale.date} | <strong>Total Cobrado:</strong> $${sale.total.toLocaleString('es-AR')}</p>
      <p style="font-size:0.82rem; color:var(--color-gray); margin-bottom:0.8rem;">Detalle: ${sale.items.map(i => i.name + ' (x' + i.qty + ')').join(', ')}</p>
      
      <div style="display:flex; gap:0.5rem;">
        <button class="btn-secondary" style="font-size:0.8rem; padding:0.3rem 0.6rem;" onclick='reopenSaleInvoice(${JSON.stringify(sale)})'>Ver Factura de Venta</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function reopenSaleInvoice(sale) {
  renderSaleInvoiceModal(sale);
  document.getElementById('modal-invoice').classList.remove('hidden');
}

function renderCatalogGrid() {
  const grid = document.getElementById('catalog-grid');
  if (!grid || !currentUser) return;

  const userStock = getUserStock(currentUser.email);
  const searchFilter = document.getElementById('catalog-search')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('catalog-category')?.value || 'all';

  grid.innerHTML = '';

  const filteredProducts = DEFAULT_PRODUCTS.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchFilter) || prod.lab.toLowerCase().includes(searchFilter);
    const matchesCategory = categoryFilter === 'all' || prod.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--color-gray); padding: 2rem;">No se encontraron productos que coincidan con la búsqueda.</p>`;
    return;
  }

  filteredProducts.forEach(prod => {
    const stockItem = userStock.find(s => s.productId === prod.id);
    const inStock = stockItem && stockItem.quantity > 0;
    const stockQty = stockItem ? stockItem.quantity : 0;

    const card = document.createElement('div');
    card.className = 'catalog-card';
    card.innerHTML = `
      <div>
        <span class="cat-badge">${prod.category}</span>
        <h4>${prod.name}</h4>
        <p class="lab">Lab: ${prod.lab}</p>
        <p class="price">$${prod.price.toLocaleString('es-AR')}</p>
        <span class="stock-tag ${inStock ? 'in-stock' : 'no-stock'}">
          ${inStock ? `En tu Stock (${stockQty} u.)` : 'Sin stock en farmacia'}
        </span>
      </div>
      <button class="btn-primary-sm" style="width:100%; margin-top:0.8rem;" onclick="addToCart('${prod.id}', 5)">
        + Añadir 5 al Carrito
      </button>
    `;
    grid.appendChild(card);
  });
}

// CARRITO Y OPERACIONES DROGUERÍA
function addToCart(productId, qty = 1) {
  const prod = DEFAULT_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const existingIndex = userCart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    userCart[existingIndex].qty += qty;
  } else {
    userCart.push({ id: prod.id, name: prod.name, price: prod.price, qty: qty });
  }

  updateCartBadge();
  
  const currentTab = document.querySelector('.tab-content.active')?.id;
  if (currentTab === 'tab-stock') {
    showMessage('stock-notification', `Se agregaron ${qty} u. de "${prod.name}" al carrito.`, 'success');
  } else if (currentTab === 'tab-catalog') {
    showMessage('catalog-notification', `Se agregaron ${qty} u. de "${prod.name}" al carrito.`, 'success');
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const totalItems = userCart.reduce((acc, item) => acc + item.qty, 0);
  if (badge) badge.textContent = totalItems;
}

function renderCartModal() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;
  container.innerHTML = '';

  if (userCart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color: var(--color-gray); padding: 1.5rem 0;">El carrito está vacío.</p>`;
    subtotalEl.textContent = '$0';
    taxEl.textContent = '$0';
    totalEl.textContent = '$0';
    return;
  }

  let subtotal = 0;

  userCart.forEach((item, index) => {
    const itemSubtotal = item.price * item.qty;
    subtotal += itemSubtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <span style="font-size:0.8rem; color:var(--color-gray);">$${item.price.toLocaleString('es-AR')} c/u</span>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span>Cant: <strong>${item.qty}</strong></span>
        <button class="btn-secondary" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="removeFromCart(${index})">X</button>
      </div>
    `;
    container.appendChild(div);
  });

  const tax = subtotal * 0.21;
  const total = subtotal + tax;

  subtotalEl.textContent = `$${subtotal.toLocaleString('es-AR')}`;
  taxEl.textContent = `$${tax.toLocaleString('es-AR')}`;
  totalEl.textContent = `$${total.toLocaleString('es-AR')}`;
}

function removeFromCart(index) {
  userCart.splice(index, 1);
  updateCartBadge();
  renderCartModal();
}

function checkoutCart() {
  if (userCart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const invoiceNumber = 'FAC-A-0001-' + Math.floor(100000 + Math.random() * 900000);
  const invoiceDate = new Date().toLocaleDateString('es-AR');

  let subtotal = 0;
  userCart.forEach(i => subtotal += (i.price * i.qty));
  const tax = subtotal * 0.21;
  const total = subtotal + tax;

  const orderData = {
    invoiceNumber,
    date: invoiceDate,
    items: [...userCart],
    subtotal,
    tax,
    total,
    paymentMethod: currentUser.paymentMethod || 'Transferencia Bancaria',
    clientName: currentUser.socialReason || currentUser.name,
    cuit: currentUser.cuit,
    status: 'En preparación',
    stockAdded: false
  };

  const orders = getUserOrders(currentUser.email);
  orders.unshift(orderData);
  saveUserOrders(currentUser.email, orders);

  renderInvoiceModal(orderData);

  userCart = [];
  updateCartBadge();
  document.getElementById('modal-cart').classList.add('hidden');
  document.getElementById('modal-invoice').classList.remove('hidden');
}

function renderInvoiceModal(order) {
  const container = document.getElementById('invoice-printable-area');
  const titleEl = document.getElementById('invoice-modal-title');
  if (!container) return;

  if (titleEl) titleEl.textContent = "Factura Electrónica (Emitida por Droguería LAFI)";

  let itemsHtml = order.items.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.qty}</td>
      <td>$${i.price.toLocaleString('es-AR')}</td>
      <td>$${(i.price * i.qty).toLocaleString('es-AR')}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="invoice-header">
      <div>
        <div class="invoice-title">DROGUERÍA LAFI S.A.</div>
        <p>Av. Rivadavia 4560, CABA</p>
        <p>CUIT: 30-88888888-9 | IVA Responsable Inscripto</p>
      </div>
      <div style="text-align: right;">
        <h4 style="color:#800020;">FACTURA A</h4>
        <p><strong>N°:</strong> ${order.invoiceNumber}</p>
        <p><strong>Fecha:</strong> ${order.date}</p>
      </div>
    </div>

    <div style="margin-bottom:1rem; padding:0.5rem; background:#f9f9f9; border:1px solid #ddd;">
      <p><strong>Cliente:</strong> ${order.clientName}</p>
      <p><strong>CUIT Cliente:</strong> ${order.cuit}</p>
      <p><strong>Forma de Pago:</strong> ${order.paymentMethod}</p>
      <p><strong>Estado Actual:</strong> <span class="order-status-badge ${getStatusClass(order.status)}">${order.status}</span></p>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Cant.</th>
          <th>Precio Unid.</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="text-align:right; margin-top:1rem; font-size:0.95rem;">
      <p>Subtotal: $${order.subtotal.toLocaleString('es-AR')}</p>
      <p>IVA (21%): $${order.tax.toLocaleString('es-AR')}</p>
      <p style="font-size:1.2rem; color:#800020; margin-top:0.4rem;"><strong>TOTAL: $${order.total.toLocaleString('es-AR')}</strong></p>
    </div>
  `;
}

function getStatusClass(status) {
  if (status === 'En preparación') return 'status-prep';
  if (status === 'En camino') return 'status-shipped';
  if (status === 'Entregado') return 'status-delivered';
  return '';
}

function renderOrdersHistory() {
  const container = document.getElementById('orders-list-container');
  if (!container || !currentUser) return;

  const orders = getUserOrders(currentUser.email);
  container.innerHTML = '';

  if (orders.length === 0) {
    container.innerHTML = `<p style="color: var(--color-gray);">No registras pedidos ni facturas generadas.</p>`;
    return;
  }

  orders.forEach((order, index) => {
    const card = document.createElement('div');
    card.className = 'profile-block';
    card.style.background = 'rgba(255, 255, 255, 0.4)';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
        <h3 style="margin:0;">Factura: ${order.invoiceNumber}</h3>
        <div>
          <span class="order-status-badge ${getStatusClass(order.status)}">${order.status}</span>
        </div>
      </div>
      <p style="font-size:0.85rem; margin-bottom:0.3rem;"><strong>Fecha:</strong> ${order.date} | <strong>Total:</strong> $${order.total.toLocaleString('es-AR')}</p>
      <p style="font-size:0.82rem; color:var(--color-gray); margin-bottom:0.8rem;">Contenido: ${order.items.map(i => i.name + ' (x' + i.qty + ')').join(', ')}</p>
      
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button class="btn-secondary" style="font-size:0.8rem; padding:0.3rem 0.6rem;" onclick='reopenInvoice(${JSON.stringify(order)})'>Ver Factura Detallada</button>
        ${order.status !== 'Entregado' ? `<button class="btn-primary-sm" style="font-size:0.8rem; padding:0.3rem 0.6rem;" onclick="advanceOrderStatus(${index})">[DEMO] Avanzar Estado Envío</button>` : ''}
        ${order.status === 'Entregado' && !order.stockAdded ? `<button class="btn-primary-sm" style="font-size:0.8rem; padding:0.3rem 0.6rem; background:#137333;" onclick="confirmOrderReception(${index})">Confirmar Recepción e Ingresar a Stock</button>` : ''}
        ${order.stockAdded ? `<span style="font-size:0.78rem; color:#137333; font-weight:700; align-self:center;">✓ Stock Ingresado en Farmacia</span>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

function advanceOrderStatus(orderIndex) {
  const orders = getUserOrders(currentUser.email);
  if (!orders[orderIndex]) return;

  if (orders[orderIndex].status === 'En preparación') {
    orders[orderIndex].status = 'En camino';
  } else if (orders[orderIndex].status === 'En camino') {
    orders[orderIndex].status = 'Entregado';
  }

  saveUserOrders(currentUser.email, orders);
  renderOrdersHistory();
}

function confirmOrderReception(orderIndex) {
  const orders = getUserOrders(currentUser.email);
  const order = orders[orderIndex];
  if (!order || order.stockAdded) return;

  const currentStock = getUserStock(currentUser.email);
  order.items.forEach(item => {
    const stockIndex = currentStock.findIndex(s => s.productId === item.id);
    if (stockIndex > -1) {
      currentStock[stockIndex].quantity += item.qty;
    } else {
      currentStock.push({ productId: item.id, quantity: item.qty });
    }
  });

  order.stockAdded = true;
  saveUserStock(currentUser.email, currentStock);
  saveUserOrders(currentUser.email, orders);

  alert('¡El pedido fue ingresado con éxito al stock de tu farmacia!');
  renderOrdersHistory();
}

function reopenInvoice(order) {
  renderInvoiceModal(order);
  document.getElementById('modal-invoice').classList.remove('hidden');
}

function loadProfileData(savedUser) {
  if (!savedUser) return;
  document.getElementById('prof-name').value = savedUser.name || '';
  document.getElementById('prof-email').value = savedUser.email || '';
  document.getElementById('prof-phone').value = savedUser.phone || '';

  document.getElementById('prof-cuit').value = savedUser.cuit || '';
  document.getElementById('prof-tax-status').value = savedUser.taxStatus || '';
  document.getElementById('prof-iibb').value = savedUser.iibb || '';
  document.getElementById('prof-social-reason').value = savedUser.socialReason || '';
  document.getElementById('prof-fantasy-name').value = savedUser.fantasyName || '';
  document.getElementById('prof-delivery-address').value = savedUser.deliveryAddress || '';

  document.getElementById('prof-health-cert').value = savedUser.healthCert || '';
  document.getElementById('prof-health-authority').value = savedUser.healthAuthority || '';

  document.getElementById('prof-dt-name').value = savedUser.dtName || '';
  document.getElementById('prof-dt-dni').value = savedUser.dtDni || '';
  document.getElementById('prof-dt-license').value = savedUser.dtLicense || '';
  document.getElementById('prof-dt-authorized').value = savedUser.dtAuthorized || 'Sin especificar';

  document.getElementById('prof-payment-method').value = savedUser.paymentMethod || '';
  document.getElementById('prof-bank-cbu').value = savedUser.bankCbu || '';
  document.getElementById('prof-bank-alias').value = savedUser.bankAlias || 'N/A';
  document.getElementById('prof-billing-email').value = savedUser.billingEmail || '';

  document.getElementById('prof-file-afip').textContent = savedUser.files?.afip ? 'Cargado (' + savedUser.files.afip + ')' : 'No adjuntado';
  document.getElementById('prof-file-iibb').textContent = savedUser.files?.iibb ? 'Cargado (' + savedUser.files.iibb + ')' : 'No adjuntado';
  document.getElementById('prof-file-health').textContent = savedUser.files?.health ? 'Cargado (' + savedUser.files.health + ')' : 'No adjuntado';
  document.getElementById('prof-file-dt').textContent = savedUser.files?.dtLicense ? 'Cargado (' + savedUser.files.dtLicense + ')' : 'No adjuntado';
}

function setupFileInputListeners() {
  const fileInputs = [
    { inputId: 'file-afip', labelId: 'file-afip-name' },
    { inputId: 'file-iibb', labelId: 'file-iibb-name' },
    { inputId: 'file-health', labelId: 'file-health-name' },
    { inputId: 'file-dt-license', labelId: 'file-dt-license-name' }
  ];

  fileInputs.forEach(({ inputId, labelId }) => {
    const inputEl = document.getElementById(inputId);
    const labelEl = document.getElementById(labelId);

    if (inputEl && labelEl) {
      inputEl.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          labelEl.textContent = e.target.files[0].name;
        } else {
          labelEl.textContent = 'Sin archivo';
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // Registrar usuario DEMO por defecto al cargar la app
  ensureDemoUserRegistered();

  setupFileInputListeners();

  // Escuchador de Venta Interna
  document.getElementById('btn-confirm-sale')?.addEventListener('click', confirmSale);

  // Escuchadores de Filtro en Catálogo
  document.getElementById('catalog-search')?.addEventListener('input', renderCatalogGrid);
  document.getElementById('catalog-category')?.addEventListener('change', renderCatalogGrid);

  // BOTÓN DE AUTOCOMPLETADO Y ACCESO RÁPIDO A DEMO
  document.getElementById('btn-demo-autofill')?.addEventListener('click', () => {
    document.getElementById('login-email').value = DEMO_USER.email;
    document.getElementById('login-password').value = DEMO_USER.password;
    
    // Iniciar sesión automáticamente
    currentUser = DEMO_USER;
    loadProfileData(currentUser);
    showView('view-dashboard');
    switchTab('tab-stock');
  });

  // Navegación
  document.getElementById('go-to-register').addEventListener('click', (e) => { e.preventDefault(); showView('view-register'); });
  document.getElementById('go-to-login').addEventListener('click', (e) => { e.preventDefault(); showView('view-login'); });
  document.getElementById('go-to-reset').addEventListener('click', (e) => { e.preventDefault(); showView('view-reset'); });
  document.getElementById('go-to-login-from-reset').addEventListener('click', (e) => { e.preventDefault(); showView('view-login'); });

  document.getElementById('btn-go-catalog-add').addEventListener('click', () => {
    switchTab('tab-catalog');
  });

  // Modales
  document.getElementById('btn-open-cart').addEventListener('click', () => {
    renderCartModal();
    document.getElementById('modal-cart').classList.remove('hidden');
  });

  document.getElementById('btn-close-cart').addEventListener('click', () => {
    document.getElementById('modal-cart').classList.add('hidden');
  });

  document.getElementById('btn-empty-cart').addEventListener('click', () => {
    userCart = [];
    updateCartBadge();
    renderCartModal();
  });

  document.getElementById('btn-checkout').addEventListener('click', checkoutCart);

  document.getElementById('btn-close-invoice').addEventListener('click', () => {
    document.getElementById('modal-invoice').classList.add('hidden');
  });

  document.getElementById('btn-accept-invoice').addEventListener('click', () => {
    document.getElementById('modal-invoice').classList.add('hidden');
  });

  // REGISTRO
  document.getElementById('form-register').addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const pass = document.getElementById('reg-pass').value;
    const passConfirm = document.getElementById('reg-pass-confirm').value;

    if (localStorage.getItem('lafi_user_' + email)) {
      showMessage('register-msg', 'El correo ingresado ya está registrado.', 'error');
      return;
    }

    if (!validatePasswordStructure(pass)) {
      showMessage('register-msg', 'La contraseña debe tener mínimo 8 caracteres, al menos una letra y un carácter especial.', 'error');
      return;
    }

    if (pass !== passConfirm) {
      showMessage('register-msg', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    const userData = {
      name: document.getElementById('reg-name').value.trim(),
      email: email,
      phone: document.getElementById('reg-phone').value.trim(),
      password: pass,
      cuit: document.getElementById('reg-cuit').value.trim(),
      taxStatus: document.getElementById('reg-tax-status').value,
      iibb: document.getElementById('reg-iibb').value,
      socialReason: document.getElementById('reg-social-reason').value.trim(),
      fantasyName: document.getElementById('reg-fantasy-name').value.trim(),
      deliveryAddress: document.getElementById('reg-delivery-address').value.trim(),
      healthCert: document.getElementById('reg-health-cert').value.trim(),
      healthAuthority: document.getElementById('reg-health-authority').value.trim(),
      dtName: document.getElementById('reg-dt-name').value.trim(),
      dtDni: document.getElementById('reg-dt-dni').value.trim(),
      dtLicense: document.getElementById('reg-dt-license').value.trim(),
      dtAuthorized: document.getElementById('reg-dt-authorized').value.trim(),
      paymentMethod: document.getElementById('reg-payment-method').value,
      bankCbu: document.getElementById('reg-bank-cbu').value.trim(),
      bankAlias: document.getElementById('reg-bank-alias').value.trim(),
      billingEmail: document.getElementById('reg-billing-email').value.trim(),
      files: {
        afip: document.getElementById('file-afip').files[0]?.name || '',
        iibb: document.getElementById('file-iibb').files[0]?.name || '',
        health: document.getElementById('file-health').files[0]?.name || '',
        dtLicense: document.getElementById('file-dt-license').files[0]?.name || ''
      }
    };

    localStorage.setItem('lafi_user_' + email, JSON.stringify(userData));
    document.getElementById('form-register').reset();
    document.querySelectorAll('.file-name').forEach(fn => fn.textContent = 'Sin archivo');

    showView('view-login');
    showMessage('login-msg', '¡Registro completado! Ya puedes iniciar sesión.', 'success');
  });

  // LOGIN
  document.getElementById('form-login').addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pass = document.getElementById('login-password').value;

    const savedUserRaw = localStorage.getItem('lafi_user_' + email);

    if (!savedUserRaw) {
      showMessage('login-msg', 'El correo ingresado no se encuentra registrado.', 'error');
      return;
    }

    const savedUser = JSON.parse(savedUserRaw);

    if (savedUser.password !== pass) {
      showMessage('login-msg', 'Contraseña incorrecta.', 'error');
      return;
    }

    currentUser = savedUser;
    loadProfileData(currentUser);
    document.getElementById('form-login').reset();
    showView('view-dashboard');
    switchTab('tab-stock');
  });

  // LOGOUT
  document.getElementById('btn-logout').addEventListener('click', () => {
    currentUser = null;
    userCart = [];
    sellCart = [];
    updateCartBadge();
    showView('view-login');
    showMessage('login-msg', 'Has cerrado sesión correctamente.', 'success');
  });

  // HOTBAR NAV
  const navButtons = document.querySelectorAll('.nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    });
  });

  showView('view-login');
});
