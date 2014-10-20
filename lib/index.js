var
  Duo   = require('duo'),
  path  = require('path'),
  fs    = require('fs'),
  async = require('async');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to parse assets with duojs.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function plugin(opts) {
  'use strict';
  return function (files, metalsmith, done) {
    var
      root    = metalsmith.dir,
      assets  = path.join(root, metalsmith._dest),
      src     = path.join(root, metalsmith._src),
      install = path.join(root, 'components');

    if (opts === {}) {

      async.map(Object.keys(files), function (file, cb) {
        var duo = new Duo(src)
          .installTo(install)
          .entry(file);

        duo.run(function (err, src) {
          if (err) { throw err; }
          fs.writeFile(path.join(assets, file), src, function () {
            cb();
          });
        });
      }, null);

    } else {

      async.map(Object.keys(opts), function (file, cb) {
        var duo = new Duo(src)
          .installTo(install)
          .entry(opts[file]);

        duo.run(function (err, src) {
          if (err) { throw err; }
          fs.writeFile(path.join(assets, file), src, function () {
            cb();
          });
        });
      });

    }

    done();
  };
}
