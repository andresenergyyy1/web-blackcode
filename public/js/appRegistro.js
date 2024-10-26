 async function loadNavbar() {
            const response = await fetch('navbar.html');
            const data = await response.text();
            document.getElementById('navbar').innerHTML = data;
        }

        window.onload = loadNavbar;

        async function obtenerClientes() {
            try {
                const response = await fetch('/clientes');
                if (!response.ok) throw new Error('Error al obtener clientes');
                const clientes = await response.json();
                actualizarTablaClientes(clientes);
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        }

        function actualizarTablaClientes(clientes) {
            const tbody = document.querySelector('#clientesTable tbody');
            tbody.innerHTML = '';

            clientes.forEach((cliente, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.direccion}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.sexo}</td>
                    <td>${cliente.NIT}</td>
                    <td>${cliente.CUI}</td>
                    <td>${cliente.seguro_medico}</td>
                    <td>${cliente.numero_poliza}</td>
                    <td>
                        <button onclick="editarCliente('${cliente.CUI}')">Editar</button>
                        <button onclick="eliminarCliente('${cliente.CUI}')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        }

        async function agregarCliente() {
            const cliente = {
                nombre: document.getElementById('nombre').value,
                direccion: document.getElementById('direccion').value,
                telefono: document.getElementById('telefono').value,
                correo: document.getElementById('correo').value,
                sexo: document.getElementById('sexo').value,
                NIT: document.getElementById('nit').value,
                CUI: document.getElementById('cui').value,
                seguro_medico: document.getElementById('seguro_medico').value,
                numero_poliza: document.getElementById('numero_poliza').value
            };

            try {
                const response = await fetch('/clientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente)
                });
                if (!response.ok) throw new Error('Error al agregar cliente');
                obtenerClientes(); // Actualizar la tabla
                document.getElementById('form-container').reset(); // Limpiar el formulario
            } catch (error) {
                console.error('Error al agregar cliente:', error);
            }
        }

        async function editarCliente(cui) {
            try {
                const response = await fetch(`/clientes/${cui}`);
                if (!response.ok) throw new Error('Error al obtener cliente');
                const cliente = await response.json();
                
                // Rellenar el formulario con los datos del cliente
                document.getElementById('nombre').value = cliente.nombre;
                document.getElementById('direccion').value = cliente.direccion;
                document.getElementById('telefono').value = cliente.telefono;
                document.getElementById('correo').value = cliente.correo;
                document.getElementById('sexo').value = cliente.sexo;
                document.getElementById('nit').value = cliente.NIT;
                document.getElementById('cui').value = cliente.CUI;
                document.getElementById('seguro_medico').value = cliente.seguro_medico;
                document.getElementById('numero_poliza').value = cliente.numero_poliza;

                // Mostrar el botón de actualización
                document.getElementById('guardarCliente').style.display = 'none';
                document.getElementById('actualizarCliente').style.display = 'inline';
                document.getElementById('actualizarCliente').onclick = () => guardarActualizacion(cui);
            } catch (error) {
                console.error('Error al editar cliente:', error);
            }
        }

        async function guardarActualizacion(cui) {
            const cliente = {
                nombre: document.getElementById('nombre').value,
                direccion: document.getElementById('direccion').value,
                telefono: document.getElementById('telefono').value,
                correo: document.getElementById('correo').value,
                sexo: document.getElementById('sexo').value,
                NIT: document.getElementById('nit').value,
                CUI: document.getElementById('cui').value,
                seguro_medico: document.getElementById('seguro_medico').value,
                numero_poliza: document.getElementById('numero_poliza').value
            };

            try {
                const response = await fetch(`/clientes/${cui}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente)
                });
                if (!response.ok) throw new Error('Error al actualizar cliente');
                obtenerClientes(); // Actualizar la tabla
                document.getElementById('form-container').reset(); // Limpiar el formulario

                // Resetear botones
                document.getElementById('guardarCliente').style.display = 'inline';
                document.getElementById('actualizarCliente').style.display = 'none';
            } catch (error) {
                console.error('Error al guardar actualización:', error);
            }
        }

        async function eliminarCliente(cui) {
            if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
                try {
                    const response = await fetch(`/clientes/${cui}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Error al eliminar cliente');
                    obtenerClientes(); // Actualizar la tabla
                } catch (error) {
                    console.error('Error al eliminar cliente:', error);
                }
            }
        }

        window.onload = async () => {
            loadNavbar();
            await obtenerClientes();
        };