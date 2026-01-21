// Redirige al login si no hay token guardado en el navegador.
(function enforceAuth() {
  const token = localStorage.getItem('sigra_token');
  if (!token) {
    window.location.href = './login.html';
  }
})();