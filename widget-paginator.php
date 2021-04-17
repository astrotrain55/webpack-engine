<div data-widget="pagination" data-name="<Пагинатор/>">
  <style>
    [type="x-widget-template"] {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      padding: 10px 20px;
      background-color: #222;
      border-bottom-right-radius: 10px;
      transition: all .3s ease;
      transform: translate(-100%,0);
    }
    [type="x-widget-template"]:after {
      content: " ";
      position: absolute;
      top: 0;
      left: 100%;
      width: 24px;
      height: 24px;
      background-color: #222;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC);
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
    [type="x-widget-template"]:hover {
      transform: translate(0,0);
    }
    [type="x-widget-template"] ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    [type="x-widget-template"] li {
      padding: 0 0 10px;
    }
    [type="x-widget-template"] a {
      color: #fff;
      text-decoration: none;
      font-size: 15px;
    }
    [type="x-widget-template"] a:hover {
      text-decoration: underline;
    }
  </style>
  <script>
    const script = document.currentScript;
    const expansion = 'php';

    fetch('../json/data.json').then(res => res.json()).then(pages => {
      const menu = pages.reduce((total, item, index) => {
        return total += `
          <li>
            <a href="${item.link}.${expansion}">
              ${index + 1}. ${item.title}
            </a>
          </li>`;
      }, '');

      const markup = `
        <div type="x-widget-template">
          <ul>
            ${menu}
            <li>
              <a href="tmp.${expansion}">Тестовая страница Vue</a>
            </li>
          </ul>
        </div>`;

      script.insertAdjacentHTML('beforebegin', markup);
    });
  </script>
</div>
