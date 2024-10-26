// appGraficos.js

function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
}

window.onload = loadNavbar;

// Función para obtener las ventas mensuales
async function obtenerVentasMensuales() {
    const response = await fetch('/graficos/ventas-mensuales');
    if (!response.ok) {
        throw new Error('Error al obtener las ventas mensuales');
    }
    return await response.json();
}

// Función para obtener los impuestos mensuales
async function obtenerImpuestosMensuales() {
    const response = await fetch('/graficos/impuestos-mensuales');
    if (!response.ok) {
        throw new Error('Error al obtener los impuestos mensuales');
    }
    return await response.json();
}

// Nueva función para obtener las estadísticas mensuales
async function obtenerEstadisticasMensuales() {
    const response = await fetch('/graficos/estadisticas-mensuales');
    if (!response.ok) {
        throw new Error('Error al obtener las estadísticas mensuales');
    }
    return await response.json();
}

// Función para mostrar las estadísticas en el HTML
async function mostrarEstadisticas() {
    const estadisticas = await obtenerEstadisticasMensuales();
    
    const estadisticasDiv = document.getElementById('estadisticas');
    estadisticasDiv.innerHTML = `
        <p><strong>Mes con Mayor Ventas:</strong> ${estadisticas.mes_con_mayor_ventas} (${estadisticas.max_ventas} ventas)</p>
        <p><strong>Objeto Más Vendido:</strong> ${estadisticas.objeto_mas_vendido}</p>
        <p><strong>Total de Impuestos por Mes:</strong> ${estadisticas.total_impuestos.toFixed(2)} USD</p>
    `;
}

// Función para generar el gráfico de ventas
async function generarGraficoVentas() {
    const datos = await obtenerVentasMensuales();

    const etiquetas = datos.map(d => d.mes);
    const valores = datos.map(d => parseFloat(d.total_ventas) || 0); // Maneja valores nulos

    const ctx = document.getElementById('graficoVentas').getContext('2d');

    // Colores para cada mes
    const colores = [
        'rgba(255, 99, 132, 0.2)', 
        'rgba(54, 162, 235, 0.2)', 
        'rgba(255, 206, 86, 0.2)', 
        'rgba(75, 192, 192, 0.2)', 
        'rgba(153, 102, 255, 0.2)', 
        'rgba(255, 159, 64, 0.2)', 
        'rgba(255, 99, 132, 0.2)', 
        'rgba(54, 162, 235, 0.2)', 
        'rgba(255, 206, 86, 0.2)', 
        'rgba(75, 192, 192, 0.2)', 
        'rgba(153, 102, 255, 0.2)', 
        'rgba(255, 159, 64, 0.2)'  
    ];

    const coloresBarras = colores.slice(0, etiquetas.length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Ventas Mensuales',
                data: valores,
                backgroundColor: coloresBarras,
                borderColor: coloresBarras.map(color => color.replace('0.2', '1')),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Ventas (USD)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mes'
                    }
                }
            }
        }
    });
}

/// Función para generar el gráfico de impuestos (gráfico de pastel)
async function generarGraficoImpuestos() {
    const datos = await obtenerImpuestosMensuales();

    const etiquetas = datos.map(d => d.mes);
    const valores = datos.map(d => parseFloat(d.total_impuestos) || 0); // Maneja valores nulos

    const ctx = document.getElementById('graficoImpuestos').getContext('2d');

    new Chart(ctx, {
        type: 'pie', // Cambiado a 'pie'
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Impuestos Mensuales',
                data: valores,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw.toFixed(2) + ' USD';
                            return label;
                        }
                    }
                }
            }
        }
    });
}


//pdf


// Asegúrate de llamar a mostrarEstadisticas y generarGraficoImpuestos en window.onload
window.onload = () => {
    loadNavbar();
    mostrarEstadisticas(); // Llama a la función para mostrar estadísticas
    generarGraficoVentas(); // Genera el gráfico de ventas
    generarGraficoImpuestos(); // Genera el gráfico de impuestos
};
