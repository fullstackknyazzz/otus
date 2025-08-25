function getPath(element) {
  if (!(element instanceof Element)) {
    throw new Error("Argument must be a DOM element");
  }

  const parts = [];

  while (element && element.nodeType === Node.ELEMENT_NODE) {
    
    if (element === document.body) {
      parts.unshift("body");
      break;
    }

    
    if (element.id) {
      parts.unshift(`#${element.id}`);
      break;
    }

    let selector = element.tagName.toLowerCase();

    
    if (element.className) {
      const className = element.className.trim().split(/\s+/)[0];
      if (className) {
        selector += `.${className}`;
      }
    }

    
    if (element.parentNode) {
      const siblings = Array.from(element.parentNode.children)
        .filter(el => el.tagName === element.tagName);
      if (siblings.length > 1) {
        const index = Array.from(element.parentNode.children).indexOf(element) + 1;
        selector += `:nth-child(${index})`;
      }
    }

    parts.unshift(selector);
    element = element.parentNode;
  }

  return parts.join(" ");
}


module.exports = { getPath };
