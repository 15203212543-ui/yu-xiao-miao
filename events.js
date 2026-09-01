// Centralized click delegation for stable interaction across desktop and mobile PWA.
(function () {
  document.addEventListener('click', function (event) {
    const target = event.target;
    const viewButton = target.closest('[data-view]');
    if (viewButton && typeof window.setView === 'function') {
      event.preventDefault();
      window.setView(viewButton.dataset.view);
      return;
    }

    const openButton = target.closest('[data-open]');
    if (openButton && typeof window.openModal === 'function') {
      event.preventDefault();
      window.openModal(openButton.dataset.open);
      return;
    }

    if (target.closest('#close')) {
      event.preventDefault();
      const modal = document.getElementById('modal');
      if (modal) modal.classList.add('hidden');
      return;
    }

    if (target.id === 'modal') target.classList.add('hidden');
  });
})();
