document.addEventListener('DOMContentLoaded', () => {
    // 1. Identificamos el contenedor 
    const container = document.getElementById('notifications-list-container');
    
    // Si no existe el contenedor, detenemos la ejecución para evitar errores
    if (!container) return;

    // 2. Función para generar datos falsos (Mock Data)
    const generateMockData = (count) => {
        const data = [];
        const statuses = ['Enviada', 'Borrador', 'Error'];
        const types = ['Mantenimiento', 'Académico', 'Administrativo'];
        
        for (let i = 1; i <= count; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            // Simulamos fechas recientes
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 10));

            data.push({
                id: i,
                title: `Aviso ${randomType}: Actualización #${i}`,
                date: date.toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' }),
                status: randomStatus,
                description: `Esta es una descripción simulada para la notificación número ${i}. El objetivo es verificar cómo se comporta el texto en varias líneas dentro del contenedor diseñado.`
            });
        }
        return data;
    };

    // 3. Renderizamos la lista
    const renderNotifications = () => {
        const notifications = generateMockData(40); // Tarea: Mostrar hasta 40 elementos
        
        // Limpiamos el texto "Espacio para el componente" y quitamos la clase de borde punteado
        container.innerHTML = '';
        container.classList.remove('list-placeholder'); 
        
        // Creamos un wrapper para la lista
        const listWrapper = document.createElement('div');
        listWrapper.className = 'notification-list';

        notifications.forEach(note => {
            const card = document.createElement('article');
            card.className = 'notification-card';
            
            // Asignamos clase de color según el estado
            const statusClass = `status-${note.status.toLowerCase()}`;

            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${note.title}</h3>
                    <span class="card-date">${note.date}</span>
                </div>
                <div class="card-body">
                    <p>${note.description}</p>
                </div>
                <div class="card-footer">
                    <span class="status-badge ${statusClass}">${note.status}</span>
                </div>
            `;
            
            listWrapper.appendChild(card);
        });

        container.appendChild(listWrapper);
    };

    // Ejecutamos la función
    renderNotifications();
});