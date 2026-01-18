document.addEventListener('DOMContentLoaded', () => {
    
    const headerContainer = document.getElementById('subject-header-container');
    const activitiesContainer = document.getElementById('activities-container');
    const resourcesContainer = document.getElementById('resources-container');

    const mockAsignatura = {
        id: "MAT-03",
        nombre: "Matemática III",
        codigo: "2025CR-ECT08303-MG",
        semestre: "2025-II",
        docente: {
            nombre: "Ing. Javier Lopez",
            email: "javier.lopez@sigra.edu"
        }
    };

    const mockActividades = [
        {
            id: 1,
            titulo: "Informe de Investigación: Derivadas Parciales",
            ponderacion: 15,
            fechaLimite: "2026-02-15T23:59:00", // Fecha futura
            estado: "pendiente" 
        },
        {
            id: 2,
            titulo: "Taller Práctico: Vectores en R3",
            ponderacion: 20,
            fechaLimite: "2026-01-05T23:59:00", // Fecha pasada
            estado: "pendiente" 
        },
        {
            id: 3,
            titulo: "Examen Parcial I: Geometría Analítica",
            ponderacion: 25,
            fechaLimite: "2025-12-20T10:00:00",
            estado: "entregado"
        }
    ];

    const mockRecursos = [
        {
            id: 101, titulo: "Guía de Ejercicios - Unidad 1",
            tipo: "pdf", peso: "2.4 MB", url: "#"
        },
        {
            id: 102, titulo: "Diapositivas: Cálculo Vectorial",
            tipo: "pdf", peso: "5.1 MB", url: "#"
        },
        {
            id: 103, titulo: "Video: Teorema de Green",
            tipo: "link", peso: "YouTube", url: "#"
        },
        {
            id: 104, titulo: "Simulador Gráfico 3D",
            tipo: "link", peso: "GeoGebra", url: "#"
        }
    ];
    function renderHeader(data) {
        if (!data) return;
        
        const html = `
            <div class="header-content">
                <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom:6px; opacity: 0.8; font-weight: 600;">
                    ${data.codigo}
                </div>
                <h1>${data.nombre}</h1>
                <div class="header-meta">
                    <span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ${data.docente.nombre}
                    </span>
                    <span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Semestre ${data.semestre}
                    </span>
                </div>
            </div>
        `;
        
        headerContainer.innerHTML = html;
        headerContainer.classList.remove('skeleton-loading');
    }

    function calcularTiempoRestante(fechaLimite) {
        const ahora = new Date();
        const limite = new Date(fechaLimite);
        const diferencia = limite - ahora;
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (diferencia < 0) return { texto: "Cerrado", esTarde: true };
        if (dias > 0) return { texto: `Vence en ${dias} días`, esTarde: false };
        return { texto: `Vence en ${horas} horas`, esTarde: false };
    }

    function renderActivities(actividades) {
        activitiesContainer.innerHTML = ''; 

        actividades.forEach(act => {
            const tiempoData = calcularTiempoRestante(act.fechaLimite);
            
            let estadoClase = 'status-pending';
            let textoBadge = 'Pendiente';
            let badgeClase = 'pending';

            if (act.estado === 'entregado') {
                estadoClase = 'status-submitted';
                textoBadge = 'Enviado';
                badgeClase = 'submitted';
            } else if (tiempoData.esTarde) {
                estadoClase = 'status-late';
                textoBadge = 'Retrasado';
                badgeClase = 'late';
            }

            const fechaFormateada = new Date(act.fechaLimite).toLocaleDateString('es-ES', {
                weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit'
            });

            const cardHTML = `
                <article class="activity-card ${estadoClase}">
                    <div class="card-header">
                        <div>
                            <h3 class="card-title">${act.titulo}</h3>
                            <span class="card-weight">${act.ponderacion}% Ponderación</span>
                        </div>
                        <span class="status-badge ${badgeClase}">${textoBadge}</span>
                    </div>
                    
                    <div class="card-footer">
                        <div class="time-remaining">
                            <span style="display:block; font-size: 0.75rem; opacity: 0.8;">Fecha límite: ${fechaFormateada}</span>
                            <strong>${act.estado === 'entregado' ? 'Tarea completada' : tiempoData.texto}</strong>
                        </div>
                        
                        <button class="ghost-btn">
                            ${act.estado === 'entregado' ? 'Ver entrega' : 'Entregar tarea'}
                        </button>
                    </div>
                </article>
            `;
            activitiesContainer.innerHTML += cardHTML;
        });
    }

    function renderResources(recursos) {
        resourcesContainer.innerHTML = '';

        recursos.forEach(rec => {
            let iconSVG = '';
            let claseIcono = rec.tipo === 'pdf' ? 'pdf' : 'link';
            
            if (rec.tipo === 'pdf') {
                iconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
            } else {
                iconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
            }

            const itemHTML = `
                <a href="${rec.url}" class="resource-item">
                    <div class="resource-icon ${claseIcono}">${iconSVG}</div>
                    <div class="resource-info">
                        <div class="resource-title">${rec.titulo}</div>
                        <div class="resource-meta">${rec.peso} • ${rec.tipo.toUpperCase()}</div>
                    </div>
                    <div class="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            ${rec.tipo === 'pdf' ? '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>' : '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>'}
                        </svg>
                    </div>
                </a>
            `;
            resourcesContainer.innerHTML += itemHTML;
        });
    }

    // --- 3. INICIALIZACIÓN (Con retraso simulado) ---
    setTimeout(() => {
        renderHeader(mockAsignatura);
        renderActivities(mockActividades);
        renderResources(mockRecursos);
    }, 600); 
});