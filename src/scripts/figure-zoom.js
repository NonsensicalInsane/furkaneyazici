import { uiText } from './ui-strings.js';

// Click-to-enlarge for <Figure>: one native <dialog> per page (focus trapping,
// Esc to close and the backdrop come with the element), created on first use.
export function initFigureZoom() {
  const buttons = document.querySelectorAll('[data-figure-zoom]');
  if (!buttons.length) return;

  let dialog;
  let image;

  const create = () => {
    dialog = document.createElement('dialog');
    dialog.className = 'figure-lightbox';
    dialog.setAttribute('aria-label', uiText('enlargedFigure', 'Enlarged figure'));

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'figure-lightbox-close';
    close.setAttribute('aria-label', uiText('close', 'Close'));
    close.textContent = '×';
    close.addEventListener('click', () => dialog.close());

    image = document.createElement('img');
    dialog.append(close, image);
    // A click on the backdrop (outside the image) closes it too
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
    document.body.append(dialog);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      if (!source) return;
      if (!dialog) create();
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      dialog.showModal();
    });
  });
}
