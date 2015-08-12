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
 * @param {Object} options
   * @property {Array} entry
   * @property {Array} plugins (optional)
   * @property {Object} options (optional)
 * @return {Function}
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

  // Map arguments to local variables
  var entry = opts.entry;
  var plugins = opts.plugins;
  var options = opts.options;

  /**
   * Main plugin function
   */
  return function (files, metalsmith, done) {
    var root = metalsmith.path();

    /**
     * Convert files
     */
    function convert(file, done){
      // Get file type
      var ext = path.extname(file);
      var type = ext.replace('.', '');

      // Get file contents
      var data = files[file];
      var str = data.contents.toString();

      // Instantiate duo at the root of the project
      var duo = new Duo(root);

      // Set entry point
      duo.entry(str, type);

      // Apply duo options
      if (options) {
        for (var option in options) {
          if (options.hasOwnProperty(option)) {
            duo = duo[option](options[option]);
          }
        }
      }

      // Use plugins
      if (plugins) {
        for (var i = 0; i < plugins.length; i++) {
          duo = duo.use(plugins[i]);
        }
      }

      // Run transformation
      duo.run(function(err, results) {
        if (err) {
          return done(err);
        }

        data.contents = new Buffer(results);
        done();
      });
    }

    /**
     * Process all entry points
     */
    each(entry, convert, done);
  };
}
