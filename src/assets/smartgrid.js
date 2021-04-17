const path = require('path');
const smartgrid = require('smart-grid');

smartgrid(path.resolve(__dirname, 'styles'), {
  filename: 'smartgrid',
  outputStyle: 'styl',
  mobileFirst: false,
  columns: 24,
  tab: '  ',
  mixinNames: {
    size: 'col-size',
    clearfix: 'cf',
  },
  offset: '2%',
  container: {
    maxWidth: '1300px',
    fields: '30px', /* side fields */
  },
  breakPoints: {
    w320: { /* Custom, iPhone Retina */
      width: '320px',
    },
    w480: { /* Extra Small Devices, Phones */
      width: '480px',
    },
    w768: { /* Small Devices, Tablets */
      width: '768px',
      fields: '15px', /* set fields only if you want to change container.fields */
    },
    w992: { /* Medium Devices, Desktops */
      width: '992px',
    },
    w1200: { /* Large Devices, Wide Screens */
      width: '1200px',
    },
  },
});
