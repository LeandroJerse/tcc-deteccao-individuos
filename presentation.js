// Presentation enhancements do not modify experiment data or model selection.
document.querySelectorAll('.tablewrap').forEach(region => {
  region.tabIndex = 0;
  region.setAttribute('role', 'region');
  region.setAttribute('aria-label', 'Tabela comparativa; use as setas para rolar horizontalmente');
});
document.querySelectorAll('video').forEach(video => {
  video.setAttribute('playsinline', '');
  const status = document.createElement('p');
  status.className = 'note';
  status.setAttribute('role', 'status');
  video.after(status);
  video.addEventListener('loadstart', () => { status.textContent = 'Carregando vídeo…'; });
  video.addEventListener('canplay', () => { status.textContent = ''; });
  video.addEventListener('error', () => { status.textContent = 'Não foi possível carregar o vídeo. Tente novamente ou use o link MP4 disponível.'; });
});
