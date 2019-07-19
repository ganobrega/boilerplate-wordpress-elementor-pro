exports.config =
  files:
    javascripts:
      joinTo:
        'js/app.js': /^(app)/
        'js/vendor.js': /^(node_modules|bower_components)/

    stylesheets:
      joinTo:
        'style.css': /^(app)/
        'vendor.css': /^(bower_components|node_modules)/

  plugins:

    pleeease:
      sass: true
      autoprefixer:
        browsers: ['> 1%']


  modules:
    autoRequire:
      'js/app.js': ['js/initialize']

  npm:
    enabled: true
    globals:
      jQuery: 'jquery'
      $: 'jquery'
      bootstrap: 'bootstrap'
