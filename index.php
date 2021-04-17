<!DOCTYPE html>
<html>
  <head>
    <title>Список страниц проекта</title>
    <meta charset="utf-8">
    <link rel="icon" href="./dist/favicon.ico" type="image/x-icon">
    <style>
      html,
      body,
      main {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      body {
        display: table;
      }
      main {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
      section {
        display: inline-block;
      }
      ol {
        text-align: left;
        font-family: sans-serif;
        font-size: 18px;
        line-height: 1.5;
        list-style-type: none;
        counter-reset: counter;
      }
      li:before {
        counter-increment: counter;
        content: counter(counter, decimal-leading-zero) ". ";
        color: #668a97;
      }
      a {
        text-decoration: none;
        color: inherit;
        border-bottom: 1px solid;
        transition: opacity .5s;
      }
      a:hover {
        opacity: .6;
      }
    </style>
  </head>
  <body>
    <main>
      <section></section>
    </main>
    <script>
      fetch('./json/data.json').then(res => res.json()).then(pages => {
        const expansion = 'php';
        const m = pages.reduce((acc, item) => {
          return acc += `
            <li>
              <a href="./dist/${item.link}.${expansion}">
                ${item.title}
              </a>
            </li>`;
        }, '');
        document.querySelector('section').innerHTML = `<ol>${m}</ol>`;
      });
    </script>
  </body>
</html>
