const pb = new PocketBase('http://127.0.0.1:8090');

document.addEventListener("DOMContentLoaded", async () => {
    const statusBadge = document.getElementById("connection-status");
    try {
        await pb.health.check();
        statusBadge.textContent = "Conectado";
        statusBadge.className = "text-xs px-2 py-1 rounded bg-emerald-500 text-white";
        cargarDatos();
    } catch (err) {
        statusBadge.textContent = "Sin conexión con servidor";
        statusBadge.className = "text-xs px-2 py-1 rounded bg-rose-500 text-white";
    }
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        el.classList.add('text-slate-600');
    });
    
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    event.currentTarget.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    event.currentTarget.classList.remove('text-slate-600');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

async function cargarDatos() {
    try {
        // Cargar Órdenes
        const ordenes = await pb.collection('ordenes').getFullList({ expand: 'vehiculo_id,mecanico_id' });
        const contenedorOrdenes = document.getElementById('lista-ordenes');
        contenedorOrdenes.innerHTML = ordenes.map(o => `
            <div class="bg-white p-4 rounded shadow border-l-4 ${o.estado === 'entregada' ? 'border-emerald-500' : 'border-blue-500'}">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-semibold px-2 py-1 bg-slate-100 rounded uppercase">${o.estado}</span>
                    <span class="text-xs text-slate-500">${new Date(o.created).toLocaleDateString()}</span>
                </div>
                <p class="font-bold text-slate-700">Vehículo ID: ${o.vehiculo_id}</p>
                <p class="text-sm text-slate-600 mt-1"><strong>Problema:</strong> ${o.problema}</p>
                <p class="text-xs text-slate-500 mt-3">Saldo pendiente: $${o.saldo_pendiente || 0}</p>
            </div>
        `).join('') || '<p class="text-slate-500">No hay órdenes registradas.</p>';

        // Cargar Repuestos (Alertas si existencias < 5)
        const repuestos = await pb.collection('repuestos').getFullList();
        const contenedorRepuestos = document.getElementById('lista-repuestos');
        contenedorRepuestos.innerHTML = repuestos.map(r => `
            <div class="bg-white p-4 rounded shadow ${r.existencias < 5 ? 'border-2 border-rose-400 bg-rose-50' : ''}">
                <h4 class="font-bold text-slate-800">${r.nombre}</h4>
                <p class="text-sm text-slate-600">Código: ${r.codigo}</p>
                <p class="text-sm font-semibold mt-2">Precio: $${r.precio_venta}</p>
                <p class="text-xs mt-1 ${r.existencias < 5 ? 'text-rose-600 font-bold' : 'text-slate-500'}">
                    Existencias: ${r.existencias} ${r.existencias < 5 ? '⚠️ ¡Stock bajo!' : ''}
                </p>
            </div>
        `).join('');

        // Cargar Clientes
        const clientes = await pb.collection('clientes').getFullList();
        const tablaClientes = document.getElementById('tabla-clientes');
        tablaClientes.innerHTML = clientes.map(c => `
            <tr class="hover:bg-slate-50">
                <td class="p-3 font-medium">${c.nombre}</td>
                <td class="p-3 text-slate-600">${c.telefono || 'N/A'}</td>
                <td class="p-3 text-slate-600">${c.direccion || 'N/A'}</td>
                <td class="p-3 text-amber-600 font-semibold">Consultar órdenes</td>
            </tr>
        `).join('');

    } catch (err) {
        console.error("Error al cargar datos:", err);
    }
}

async function guardarOrden(e) {
    e.preventDefault();
    const data = {
        vehiculo_id: document.getElementById('vehiculo_id').value,
        mecanico_id: document.getElementById('mecanico_id').value,
        problema: document.getElementById('problema').value,
        estado: 'recibida',
        total_pagado: 0,
        saldo_pendiente: 0
    };
    try {
        await pb.collection('ordenes').create(data);
        closeModal('modal-orden');
        document.getElementById('form-orden').reset();
        cargarDatos();
    } catch (err) {
        alert("Error al crear la orden: " + err.message);
    }
}
