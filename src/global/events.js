import {
  on,
  once,
  off,
  get,
} from 'eventslibjs/dist/events.min';

function currentTarget(target, current) {
  return _.isString(current) ? target.closest(current) : current;
}

export default {
  get() {
    return get();
  },

  off(...args) {
    off(...args);
  },

  on(event, current = document, fn = _.noop) {
    on(event, current, (e) => {
      fn(e, currentTarget(e.target, current), e.detail);
    });
  },

  once(event, current = document, fn = _.noop) {
    once(event, current, (e) => {
      fn(e, currentTarget(e.target, current), e.detail);
    });
  },

  emit(name, params = {}) {
    const event = new window.CustomEvent(name, { detail: params });
    window.dispatchEvent(event);
  },

  trigger(name = 'click', el = window) {
    const event = new window.Event(name);
    el.dispatchEvent(event);
  },

  watch(event, fn) {
    this.on(event, window, fn);
  },
};
