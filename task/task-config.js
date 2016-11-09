'use strict';

var cwd = process.cwd();

module.exports = {
  stylesPath: [
    'assets/common/sass/main-common.scss',
    'assets/sp/main-sp.scss',
    'assets/pm/main-pm.scss'
  ],

  template: {
    common: {
      files: 'assets/common/views/**/*.tpl.html',
      fileName: 'template-common.js',
      moduleName: 'assets.template.common'
    },
     sp: {
      files: 'assets/sp/**/*.tpl.html',
      fileName: 'template-sp.js',
      moduleName: 'assets.template.sp'
    },
     pm: {
      files: 'assets/pm/**/*.tpl.html',
      fileName: 'template-pm.js',
      moduleName: 'assets.template.pm'
    }
  },

  bundle: {
    common: {
      type: 'common',
      entry: 'assets/common/js/main-common.js',
      weClient: false
    },
    sp: {
      type: 'sp',
      entry: 'assets/sp/main-sp.js',
      weClient: false
    },
    pm: {
      type: 'pm',
      entry: 'assets/pm/main-pm.js',
      weClient: false
    }
  },

  paths: {
    expressjs: [
      'app.js',
      'routes/**/*.js'
    ],
    sass: [
      'assets/**/*.scss'
    ],
    views: cwd + '/views/**/*.ejs',

    tpl: {
      common: 'assets/common/views/**/*.tpl.html',
      sp: 'assets/sp/**/*.tpl.html',
      pm: 'assets/pm/**/*.tpl.html'
    },
    js: {
      common: ['assets/common/**/*.js'],
      sp: ['assets/sp/**/*.js', '!app/sp/js/template-sp.js'],
      pm: ['assets/pm/**/*.js', '!app/pm/js/template-pm.js']
    }
  }
};
