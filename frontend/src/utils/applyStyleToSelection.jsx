const applyStyleToSelection = (styleCallback) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('\u200B'));
    styleCallback(span);

    range.insertNode(span);

    const newRange = document.createRange();
    newRange.setStart(span.firstChild, 1);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
    return;
  }

  const extracted = range.extractContents();
  const fragment = document.createDocumentFragment();

  const styleNodes = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const span = document.createElement('span');
      span.textContent = node.textContent;
      styleCallback(span);
      return span;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node.cloneNode(false);
      el.removeAttribute('style');
      styleCallback(el);
      node.childNodes.forEach(child => {
        el.appendChild(styleNodes(child));
      });
      return el;
    }
    return null;
  };

  extracted.childNodes.forEach(node => {
    const styledNode = styleNodes(node);
    if (styledNode) fragment.appendChild(styledNode);
  });

  range.deleteContents();
  range.insertNode(fragment);

  const newRange = document.createRange();

  let lastNode = fragment.lastChild;

  let insertedLastNode = null;
  let container = range.startContainer;
  if (container.nodeType === Node.TEXT_NODE) {
    insertedLastNode = container.nextSibling;
  } else {
    insertedLastNode = container.childNodes[range.startOffset];
  }

  if (!insertedLastNode) insertedLastNode = container;

  newRange.setStartAfter(insertedLastNode);
  newRange.collapse(true);

  selection.removeAllRanges();
  selection.addRange(newRange);
};

export default applyStyleToSelection