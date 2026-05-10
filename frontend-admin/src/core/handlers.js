export const handlers = {
  _id: 0,
  click: {},
  submit: {},
  mouseenter: {},
  mouseleave: {},
  getId: function () { return ++this._id; },
};

export const registerClick = (handler) => {
  const id = handlers.getId();
  handlers.click[id] = handler;
  return id;
};

export const registerSubmit = (handler) => {
  const id = handlers.getId();
  handlers.submit[id] = handler;
  return id;
};

export const registerMouseEnter = (handler) => {
  const id = handlers.getId()
  handlers.mouseenter[id] = handler
  return id
}

export const registerMouseLeave = (handler) => {
  const id = handlers.getId()
  handlers.mouseleave[id] = handler
  return id
}

export function cleanDeadHandlers() {
  for (const id in handlers.click) {
    const element = document.querySelector(`[data-handler="${id}"]`);
    if (!element) delete handlers.click[id];
  }
  for (const id in handlers.submit) {
    const element = document.querySelector(`[data-handler="${id}"]`);
    if (!element) delete handlers.submit[id];
  }
  for (const id in handlers.mouseenter) {
    const element = document.querySelector(`[data-handler="${id}"]`);
    if (!element) delete handlers.submit[id];
  }
  for (const id in handlers.mouseleave) {
    const element = document.querySelector(`[data-handler="${id}"]`);
    if (!element) delete handlers.submit[id];
  }
}

export const initListeners = () => {
  const handleClick = (e) => {
    const { handler } = e.target.closest('[data-handler]')
      ? e.target.closest('[data-handler]').dataset
      : { handler: null };
    if (handlers.click[handler]) {
      handlers.click[handler](e);
    }
  };

  const handleSubmit = (e) => {
    const { handler } = e.target.dataset;
    e.preventDefault();
    if (handlers.submit[handler]) {
      handlers.submit[handler](e);
    }
  };
  const handleMouseEnter = (e) => {
    if (e.target.dataset) {
      const { mouseenter } = e.target.dataset;
      if (handlers.mouseenter[mouseenter]) {
        console.log(1, handlers.mouseenter[mouseenter]);
        handlers.mouseenter[mouseenter](e);
      }
    }
  };
  const handleMouseLeave = (e) => {
    if (e.target.dataset) {
      const { mouseleave } = e.target.dataset;
      if (handlers.mouseleave[mouseleave]) {
        handlers.mouseleave[mouseleave](e);
      }
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('mouseenter', handleMouseEnter, true);
  document.addEventListener('mouseleave', handleMouseLeave, true);
};
