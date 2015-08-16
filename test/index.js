var assert = require('assert');
var autoprefixer = require('duo-autoprefixer');
var duo = require('..');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var rimraf = require('rimraf');

describe('metalsmith-duo', function(){
  it('should process a css entry point', function(done){
    this.timeout(15000);
    setTimeout(done, 15000);

    rimraf.sync('./test/fixtures/css/components');

    Metalsmith('test/fixtures/css')
      .use(duo({entry: ['index.css']}))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/css/expected', 'test/fixtures/css/build');
        done();
      });
  });

  it('should process a js entry point', function(done){
    this.timeout(15000);
    setTimeout(done, 15000);

    rimraf.sync('./test/fixtures/js/components');

    Metalsmith('test/fixtures/js')
      .use(duo({entry: ['index.js']}))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/js/expected', 'test/fixtures/js/build');
        done();
      });
  });

  it('should accept options', function(done){
    this.timeout(15000);
    setTimeout(done, 15000);

    rimraf.sync('./test/fixtures/options/components');

    Metalsmith('test/fixtures/options')
      .use(duo({
        entry: ['index.js'],
        options: {
          global: 'Tip'
        }
      }))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/options/expected', 'test/fixtures/options/build');
        done();
      });
  });

  it('should accept plugins', function(done){
    this.timeout(15000);
    setTimeout(done, 15000);

    rimraf.sync('./test/fixtures/plugins/components');

    Metalsmith('test/fixtures/plugins')
      .use(duo({
        entry: ['index.css'],
        plugins: [autoprefixer({
          browsers: ['IE 10']
        })]
      }))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/plugins/expected', 'test/fixtures/plugins/build');
        done();
      });
  });

  it('should ignore entry points that don\'t exist', function(done){
    this.timeout(15000);
    setTimeout(done, 15000);

    rimraf.sync('./test/fixtures/nonexistent/components');

    Metalsmith('test/fixtures/nonexistent')
      .use(duo({entry: ['index.js']}))
      .build(function(err){
        if (err) {
          return done(err);
        }
        equal('test/fixtures/nonexistent/expected', 'test/fixtures/nonexistent/build');
        done();
      });
  });

});
