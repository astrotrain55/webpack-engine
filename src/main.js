import youtube from 'root/components/youtube/youtube';
import tpl from 'root/components/templates/templates';
import mobx from 'root/store';
import { Ajax, SmoothScroll, jq } from 'root/libs/';
import $ from './common/tools';
import './assets/styles/index.styl';
import image from './assets/images/skulltag.png';
import Vue from 'vue';
import App from './vue/App';
import store from './vue/store/';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
});

$.ready(() => {
  youtube.init();
  console.log(mobx.total);

  Ajax({
    method: 'post',
    params: { req: 'params' },
    data: {
      request: {
        axios: true,
      },
    },
  }, {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  }, (local, json) => {
    console.log(local);
    document.body.insertAdjacentHTML('beforeend', tpl.render(json, 'template'));
  });

  ev.once('custom:event', document, () => {
    console.log('Event: custom:event');
  });

  ev.emit('custom:event');

  console.log(ev.get());
  console.log($.getSearch('?q=URLUtils.searchParams&topic=api&topic=webdev').get('q'));
  console.log($.strSearch({
    q: 'URLUtils.searchParams',
    topic: 'webdev',
  }));

  testJq(['el', 'all']);
});

async function testJq(arParams) {
  await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const selectors = 'div';
  const element = document.querySelector(selectors);
  const collection = document.querySelectorAll(selectors);

  _.each(arParams, (fn) => {
    console.log(fn);
    console.log(jq[fn](element));
    console.log(jq[fn](selectors));
    console.log(jq[fn](collection));
  });

  const img = document.createElement('img');
  img.src = image;
  jq.dom.insertEl(document.body, img);
}
