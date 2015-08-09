/**
 * Dependencies
 */
var Duo = require('duo');
var each = require('async').each;
var path = require('path');

/**
 * Expose `plugin`
 */
module.exports = plugin;

/**
 * A Metalsmith plugin to parse assets with duojs.
 *
 * @param {Array} entry
 */
function plugin(opts) {
  /**
   * Init
   */
  opts = opts || {};

  // At least one entry point should be specified
  if (!opts.entry) {
    throw new Error('You must specify at least one entry point');
  }

  // Map to local variable
  var entry = opts.entry;

  /**
   * Main plugin function
   */
  return function (files, metalsmith, done) {
    var root = metalsmith.path();

    /**
     * Convert files
     */
    function convert(file, done){
      var ext = path.extname(file);
      var type = ext.replace('.', '');
      var data = files[file];
      var str = data.contents.toString();

      var duo = new Duo(root)
        .entry(str, type)
        .run(function(err, results) {
          if (err) {
            return done(err);
          }

          data.contents = new Buffer(results);
          done();
        });
    }

    /**
     * Convert all matched files
     */
    each(entry, convert, done);
  };
}
