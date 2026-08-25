// Função para mostrar a notificação
function showNotification() {
    const modal = document.getElementById('notificationModal-alert');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar a notificação
function closeNotification() {
    const modal = document.getElementById('notificationModal-alert');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Marca como visualizada na sessão atual
    sessionStorage.setItem('notificationShown', 'true');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('notificationModal-alert');
    const closeBtn = document.querySelector('.close-alert');
    
    // Mostra notificação apenas se ainda não foi mostrada nesta sessão
    if (!sessionStorage.getItem('notificationShown')) {
        showNotification();
    }
    
    // Fecha clicando no X
    closeBtn.addEventListener('click', closeNotification);
    
    // Fecha clicando fora do modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeNotification();
        }
    });
    
    // Fecha com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeNotification();
        }
    });
});
