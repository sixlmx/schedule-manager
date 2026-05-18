let closeContextMenuHandler = null;

const removeContextMenuHandler = () => {
  if (!closeContextMenuHandler) return;

  document.removeEventListener('click', closeContextMenuHandler);
  closeContextMenuHandler = null;
};

const renderContextMenuItems = (contextMenu, items) => {
  contextMenu.replaceChildren();

  items.forEach(({ label, variant, onClick }) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = variant === 'danger'
      ? 'contextMenuItem contextMenuItemDanger'
      : 'contextMenuItem';
    item.textContent = label;
    item.addEventListener('click', () => {
      ui.hideCustomMenu();
      onClick();
    });

    contextMenu.append(item);
  });
};

export const ui = {
  openModal: (modalId) => {
    document.getElementById(modalId).classList.add('show');
  },

  closeModal: () => {
    document.querySelector('.show').classList.remove('show');
  },

  showFlashMessage: ({ type, message }) => {
    const flashContainer = document.querySelector('.flashMessage');
    if (!flashContainer) return;

    flashContainer.innerHTML = message;
    flashContainer.classList.add('show', type);

    setTimeout(() => {
      flashContainer.classList.remove('show', type);
      flashContainer.innerHTML = '';
    }, 3000);
  },

  hideCustomMenu: () => {
    const contextMenu = document.querySelector('#contextMenu');
    contextMenu.classList.remove('contextMenuOpen');
    contextMenu.replaceChildren();
    removeContextMenuHandler();
  },

  showCustomMenu: (x, y, items) => {
    const contextMenu = document.querySelector('#contextMenu');

    ui.hideCustomMenu();
    renderContextMenuItems(contextMenu, items);

    contextMenu.style.left = `${x + 6}px`;
    contextMenu.style.top = `${y + 6}px`;
    contextMenu.classList.add('contextMenuOpen');

    const menuLeft = Math.max(8, Math.min(x + 6, window.innerWidth - contextMenu.offsetWidth - 8));
    const menuTop = Math.max(8, Math.min(y + 6, window.innerHeight - contextMenu.offsetHeight - 8));

    contextMenu.style.left = `${menuLeft}px`;
    contextMenu.style.top = `${menuTop}px`;

    closeContextMenuHandler = (e) => {
      if (!contextMenu.contains(e.target)) {
        ui.hideCustomMenu();
      }
    };

    document.addEventListener('click', closeContextMenuHandler);
  },
};
