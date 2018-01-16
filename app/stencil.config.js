exports.config = {
  bundles: [
    { components: ['ico-app'] } ,
    { components: ['ico-investment'] } ,
    { components: ['ico-search'] } ,
    { components: ['ico-information'] } ,
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
