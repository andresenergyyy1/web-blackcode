async function loadNavbar() {
    const response = await fetch('navbar.html');
    const data = await response.text();
    document.getElementById('navbar').innerHTML = data;
}

async function obtenerProductos() {
    try {
        const response = await fetch('/productos');
        if (!response.ok) throw new Error('Error al obtener productos');
        const productos = await response.json();
        actualizarTablaProductos(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

function actualizarTablaProductos(productos) {
    const tbody = document.querySelector('#productosTable tbody');
    tbody.innerHTML = '';

    productos.forEach((producto) => {
        const fila = document.createElement('tr');
        
        const precioUnitario = Number(producto.precio_unitario) || 0;
        const impuestos = Number(producto.impuestos) || 0;

        fila.innerHTML = `
            <td>${producto.codigo_producto}</td>
            <td>${producto.numero_serie}</td>
            <td>${precioUnitario.toFixed(2)}</td>
            <td>${producto.categoria_id}</td>
            <td>${producto.descripcion}</td>
            <td>${impuestos.toFixed(2)}</td>
            <td>
                <button onclick="editarProducto(${producto.producto_id})">Editar</button>
                <button onclick="eliminarProducto(${producto.producto_id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function calcularImpuesto() {
    const precioUnitario = parseFloat(document.getElementById('pu').value) || 0;
    const impuestos = (precioUnitario * 0.12).toFixed(2);
    document.getElementById('impuestos').value = impuestos;
}

async function agregarProducto() {
    const producto = {
        codigo_producto: document.getElementById('codigo').value,
        numero_serie: document.getElementById('serie').value,
        precio_unitario: parseFloat(document.getElementById('pu').value) || 0,
        categoria_id: parseInt(document.getElementById('categoria').value) || 0,
        descripcion: document.getElementById('descripcion').value,
        impuestos: parseFloat(document.getElementById('impuestos').value) || 0
    };

    try {
        const response = await fetch('/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!response.ok) throw new Error('Error al agregar producto');
        obtenerProductos(); // Actualizar la tabla
        document.getElementById('form-container').reset(); // Limpiar el formulario
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
}

async function editarProducto(producto_id) {
    try {
        const response = await fetch(`/productos/${producto_id}`);
        if (!response.ok) throw new Error('Error al obtener producto');
        const producto = await response.json();

        // Rellenar el formulario con los datos del producto
        document.getElementById('codigo').value = producto.codigo_producto;
        document.getElementById('serie').value = producto.numero_serie;
        document.getElementById('pu').value = producto.precio_unitario;
        document.getElementById('categoria').value = producto.categoria_id;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('impuestos').value = producto.impuestos;

        // Mostrar el botón de actualización
        document.getElementById('guardarProducto').style.display = 'none';
        document.getElementById('actualizarProducto').style.display = 'inline';
        document.getElementById('actualizarProducto').onclick = () => guardarActualizacion(producto_id);
    } catch (error) {
        console.error('Error al editar producto:', error);
    }
}

async function guardarActualizacion(producto_id) {
    const producto = {
        codigo_producto: document.getElementById('codigo').value,
        numero_serie: document.getElementById('serie').value,
        precio_unitario: parseFloat(document.getElementById('pu').value) || 0,
        categoria_id: parseInt(document.getElementById('categoria').value) || 0,
        descripcion: document.getElementById('descripcion').value,
        impuestos: parseFloat(document.getElementById('impuestos').value) || 0
    };

    try {
        const response = await fetch(`/productos/${producto_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!response.ok) throw new Error('Error al actualizar producto');
        obtenerProductos(); // Actualizar la tabla
        document.getElementById('form-container').reset(); // Limpiar el formulario

        // Resetear botones
        document.getElementById('guardarProducto').style.display = 'inline';
        document.getElementById('actualizarProducto').style.display = 'none';
    } catch (error) {
        console.error('Error al guardar actualización:', error);
    }
}

async function eliminarProducto(producto_id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        try {
            const response = await fetch(`/productos/${producto_id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar producto');
            obtenerProductos(); // Actualizar la tabla
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

window.onload = async () => {
    loadNavbar();
    await obtenerProductos();

    // Asignar el evento oninput al campo de precio unitario
    const precioUnitarioInput = document.getElementById('pu');
    if (precioUnitarioInput) {
        precioUnitarioInput.addEventListener('input', calcularImpuesto);
    }
};
