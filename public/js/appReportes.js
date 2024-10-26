document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    fetch('/filtrarVentas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate, endDate })
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#resultsTable tbody');
        tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            const fecha = row.fecha_hora.split('T')[0];
            tr.innerHTML = `
                <td>${row.venta_id}</td>
                <td>${row.nombre_producto}</td>
                <td>${row.cantidad_vendida}</td>
                <td>${fecha}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('downloadPdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableData = [];
    const rows = document.querySelectorAll('#resultsTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = [];
        cells.forEach(cell => {
            rowData.push(cell.innerText);
        });
        tableData.push(rowData);
    });

    doc.autoTable({
        head: [['Venta ID', 'Nombre Producto', 'Cantidad Vendida', 'Fecha']],
        body: tableData,
        theme: 'grid',
        styles: {
            fontSize: 10, 
            cellPadding: 2, 
            overflow: 'linebreak', 
            halign: 'center',
            valign: 'middle',
            lineColor: [0, 0, 0], 
            lineWidth: 0.5 
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            lineWidth: 1 
        },
        columnStyles: {
            0: {cellWidth: 20}, 
            1: {cellWidth: 60}, 
            2: {cellWidth: 40}, 
            3: {cellWidth: 30}
        }
    });
    doc.save('ventas.pdf');
});