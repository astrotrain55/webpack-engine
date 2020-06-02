## Сборщик проектов webpack-engine

#### HTML и CSS:
* [Pug](https://pugjs.org/)
* [Stylus](http://stylus-lang.com/) ([nib](http://stylus.github.io/nib/))
* [Smartgrid](https://github.com/dmitry-lavrik/smart-grid) ([YouTube](https://www.youtube.com/watch?v=KFVoIzaGPYg&list=PLyeqauxei6je28tJvioIsE0bYnARh0UVz))

#### JS:
* [axios](https://github.com/axios/axios)
* [Lodash](https://lodash.com/)
* [Swiper](https://idangero.us/swiper/)

#### Компоненты:
* [Babel](https://babeljs.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [ESLint](https://eslint.org/) ([Style Guide](https://github.com/leonidlebedev/javascript-airbnb))

#### Vue
* [Vuex](https://vuex.vuejs.org/) ([MobX](https://mobx.js.org/))
* [Vue-router](https://router.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/)

#### Установка:
```bash
mkdir имя_проекта && cd имя_проекта
git clone https://github.com/astrotrain55/webpack-engine.git .
npm ci
```

#### Команды:
```bash
# Запустить проект:
npm run dev

# Собрать проект:
npm run build

# Создать компоненты:
npm run create компонент1 компонент2 ... компонентN

# Сгенерировать сетку:
npm run grid

# Удалить node_modules:
npm run delete

# Сбросить проект (master):
npm run reset
```

#### Поиск:
```bash
# Искать списком:
npm run list строка

# Искать подробно:
npm run once строка

# Искать всё:
npm run full строка
```
