const isSeller = (UsuarioId, propertyUserId) => {
    
    if(!UsuarioId || !propertyUserId) return false;

    
    return String(UsuarioId) === String(propertyUserId);
}

const formatDate = (date) => {
    
    const newDate = new Date(date);

    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    
    
    return newDate.toLocaleDateString('es-ES', options);
}

export {
    isSeller,
    formatDate
}