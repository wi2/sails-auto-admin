/**
 * Module dependencies
 */

var util = require('util')
  , _ = require('lodash')
  , fs = require('fs-extra')
  , NPM = require('machinepack-npm')
  , packages = [
    'sails-hook-babel',
    'grunt-browserify',
    'grunt-react',
    'babelify',
    'react@0.13',
    'react-router',
    'auto-admin',
    'rc-pagination',
    'newforms',
    'newforms-bootstrap'
    ]
  , unlinks = [
    'tasks/config/less.js',
    'tasks/config/sails-linker.js',
    'tasks/config/watch.js',
    'tasks/register/compileAssets.js',
    'tasks/register/linkAssets.js',
    'tasks/register/linkAssetsBuild.js',
    'tasks/register/linkAssetsBuildProd.js',
    'tasks/register/prod.js',
    'tasks/pipeline.js'
    ];

_.defaults = require('merge-defaults');

function installer(next) {
  console.log("installer")
  if (packages.length === 0)
    NPM.installPackage({name: 'browserify', saveDev: true}).exec(function(){
      console.log(lib + " installé");

    });
  else {
    var lib = packages.shift();
    console.log("prepare install for: " + lib);
    NPM.installPackage({name: lib, save: true}).exec(function(){
      console.log(lib + " installé");
      installer(next);
    });
  }
}


module.exports = {

  before: function (scope, cb) {
    for (var i=0,len=unlinks.length;i<len;i++) {
      fs.unlinkSync(unlinks[i]);
    }
    console.log("before")
    setTimeout(cb, 1000);
  },

  after: function (scope, cb) {
    console.log("after");
    installer(function() {
      console.log("Done");
      cb();
    });
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    //add browserify and update watch to config
    './tasks/config/browserify.js': { template: 'tasks/config/browserify.js' },
    './tasks/config/watch.js': { template: 'tasks/config/watch.js' },
    './tasks/config/less.js': { template: 'tasks/config/less.js' },
    './tasks/config/sails-linker.js': { template: 'tasks/config/sails-linker.js' },
    //replace compilleAssets.js : add browserify to register
    './tasks/register/compileAssets.js': { template: 'tasks/register/compileAssets.js' },
    './tasks/register/linkAssets.js': { template: 'tasks/register/linkAssets.js' },
    './tasks/register/linkAssetsBuild.js': { template: 'tasks/register/linkAssetsBuild.js' },
    './tasks/register/linkAssetsBuildProd.js': { template: 'tasks/register/linkAssetsBuildProd.js' },
    './tasks/register/prod.js': { template: 'tasks/register/prod.js' },

    './tasks/pipeline.js': { template: 'tasks/pipeline.js' },

    // Creates a folder for es6 react components and bootstrap example
    './components': { folder: {} },

    './components/admin': { folder: {} },
    './components/admin/forms.js': { template: 'components/admin/forms.js' },
    './components/admin/app.js': { template: 'components/admin/app.js' },

    './components/front': { folder: {} },
    './components/front/pages': { folder: {} },
    './components/front/partials': { folder: {} },
    './components/front/pages/home.js': { template: 'components/front/pages/home.js' },
    './components/front/partials/nav.js': { template: 'components/front/partials/nav.js' },
    './components/front/layout.js': { template: 'components/front/layout.js' },
    './components/front/routes.js': { template: 'components/front/routes.js' },
    './components/front/app.js': { template: 'components/front/app.js' },

   './assets': { folder: {} },

   './assets/js': { folder: {} },
    './assets/js/admin': { folder: {} },
    './assets/js/admin/dependencies': { folder: {} },
    './assets/js/front': { folder: {} },
    './assets/js/front/dependencies': { folder: {} },

   './assets/styles': { folder: {} },
    './assets/styles/admin': { folder: {} },
    './assets/styles/admin/importer.less': { template: './assets/styles/admin/importer.less' },
    './assets/styles/front': { folder: {} },
    './assets/styles/front/importer.less': { template: './assets/styles/front/importer.less' },

   './views': { folder: {} },
    './views/admin.ejs': { template: 'views/admin.ejs' },

  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};





/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "autoadmin":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-autoadmin`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
