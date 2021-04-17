class DOMManipulator {
  array: HTMLElement[];

  constructor(elements) {
    this.array = elements;
  }

  append(content) {
    return this.insert.html(content);
  }

  eq(index) {
    return this.array[index] || null;
  }

  first() {
    return this.eq(0);
  }

  last() {
    return this.eq(this.array.length - 1);
  }

  find(selector) {
    let selection = null;
    wrapper(() => selection = this.first().querySelector(selector));
    return el(selection);
  }

  findAll(selector) {
    let selection = null;
    wrapper(() => selection = this.first().querySelectorAll(selector));
    return all(selection);
  }

  parent() {
    return this.first() ? el(this.first().parentElement) : null;
  }

  parents(selector) {
    return this.first() ? el(this.first().closest(selector)) : null;
  }

  prev() {
    return this.first() ? el(this.first().previousElementSibling) : null;
  }

  next() {
    return this.first() ? el(this.first().nextElementSibling) : null;
  }

  attr(name, value) {
    if (!this.array.length) return '';
    if (!value) this.first().getAttribute(name);

    return this.each((el) => el.setAttribute(name, value));
  }

  removeAttr(name) {
    return this.each((el) => el.removeAttribute(name));
  }

  addClass(className) {
    return this.each((el) => el.classList.add(className));
  }

  removeClass(className) {
    return this.each((el) => el.classList.remove(className));
  }

  hasClass(className) {
    if (!this.array.length) return false;
    return this.first().classList.contains(className);
  }

  text(content) {
    if (!this.array.length) return '';
    if (!content) return this.first().textContent;

    return this.each((el) => el.textContent = content);
  }

  html(content) {
    if (!this.array.length) return '';
    if (!content) return this.first().innerHTML;

    return this.each((el) => el.innerHTML = content);
  }

  val(content) {
    if (!this.array.length) return '';
    if (!content) return (<HTMLInputElement>this.first()).value;

    return this.each((el) => el.value = content);
  }

  test() {
    const array = [1,2,3];
    array.forEach((item) => {
      console.log(item);
    });
  }

  show() {
    return this.css({ display: '' });
  }

  hide() {
    return this.css({ display: 'none' });
  }

  empty() {
    this.html('');
    return this;
  }

  not(element) {
    this.array = this.array.filter((el) => el !== element);
    return this;
  }

  remove() {
    return this.each((el) => el.remove());
  }

  css(styles) {
    if (!this.array.length) return {};
    if (!styles) return this.first().style;

    this.each((el) => Object.keys(styles).forEach((key) => el.style[key] = styles[key]));
    return this;
  }

  each(fn) {
    this.array.forEach(fn);
    return this;
  }

  get data() {
    return this.array.length ? this.first().dataset : {};
  }

  get insert() {
    return {
      html: (content, target?) => {
        return this.each((el) => DOMManipulator.insertHTML(el, content, target));
      },

      text: (content, target?) => {
        return this.each((el) => DOMManipulator.insertText(el, content, target));
      },

      el: (content, target?) => {
        return this.each((el) => DOMManipulator.insertEl(el, content, target));
      },
    };
  }

  static position(target = 'append') {
    const positions = {
      prev: 'beforebegin',
      prepend: 'afterbegin',
      append: 'beforeend',
      next: 'afterend',
    };

    return positions[target];
  }

  static bodyAppend(markup) {
    DOMManipulator.insertHTML(document.body, markup);
  }

  static insertHTML(targetElement, html, target?) {
    targetElement.insertAdjacentHTML(DOMManipulator.position(target), html);
  }

  static insertText(targetElement, text, target?) {
    targetElement.insertAdjacentText(DOMManipulator.position(target), text);
  }

  static insertEl(targetElement, el, target?) {
    targetElement.insertAdjacentElement(DOMManipulator.position(target), el);
  }
}

const methodList = ['bodyAppend', 'insertHTML', 'insertText', 'insertEl'];

export const dom = methodList.reduce((acc, name) => {
  acc[name] = DOMManipulator[name];
  return acc;
}, Object.create(null));

export function all(query) {
  const result = [];

  wrapper(() => {
    const selection = isSelector(query) ? document.querySelectorAll(query) : query;
    if (isElement(selection)) result.push(selection);
    if (isCollection(selection)) result.push(...selection);
  });

  return new DOMManipulator(result);
}

export function el(query) {
  const result = [];

  wrapper(() => {
    const selection = isSelector(query) ? document.querySelector(query) : query;
    if (isElement(selection)) result.push(selection);
    if (isCollection(selection)) result.push(selection[0]);
  });

  return new DOMManipulator(result);
}

el.create = (tagName = 'div', className = '') => {
  let element = null;

  wrapper(() => {
    element = document.createElement(tagName);
    if (className) element.className = className;
  });

  return el(element);
}

// helpers
function isSelector(query) {
  return typeof query === 'string';
}

function isElement(query) {
  return query && query instanceof HTMLElement;
}

function isCollection(query) {
  return query && query instanceof NodeList && query.length;
}

function wrapper(fn) {
  try {
    fn();
  } catch (e) {}
}
