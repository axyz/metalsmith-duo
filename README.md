[![NPM version][npm-image]][npm-url]

A Metalsmith plugin to compile your assets with [Duo.js](https://github.com/duojs/duo)



## Installation

In a Metalsmith project just install metalsmith-duo straight from `npm` with:

```
$ npm install --save metalsmith-duo
```

Duo requires you to authenticate with GitHub to increase your rate limit and allow you to pull from private repositories. To do that, add the following entry to your `~/.netrc` file:

    machine api.github.com
      login <username>
      password <token>

You can create a new `token` here: https://github.com/settings/tokens/new



## CLI Usage

If you are using the command-line version of Metalsmith, you can install via npm, and then add the
`metalsmith-duo` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-duo": {}
  }
}
```



## JavaScript API

If you are using the JS Api for Metalsmith, then you can require the module and add it to your
`.use()` directives:

```js
var duo = require('metalsmith-duo');

metalsmith.use(duo());
```



## OPTIONS

By default the plugin will try to process every file in the `src` folder and will output the result in the `build` folder in the same path.

However this is going to work only for really small projects, when things get complicated you can pass an array of operation to perform:

```json
{
  "plugins": {
    "metalsmith-duo": {
      "DEST1":"ORIG1",
      "DEST2":"ORIG2"
    }
  }
}
```

where `DEST1` and `DEST2` are the paths of the built files, while `ORIG1` and `ORIG2` are the respective sources e.g.

```json
{
  "plugins": {
    "metalsmith-duo": {
      "css/index.css":"stylesheets/main.css",
      "js/bundle.js":"scripts/app.js"
    }
  }
}
```


## Authors

- [Andrea Moretti](http://github.com/axyz)



## License

The MIT License

Copyright &copy; 2014

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[npm-image]: https://img.shields.io/npm/v/metalsmith-duo.svg?style=flat
[npm-url]: https://npmjs.org/package/metalsmith-duo
