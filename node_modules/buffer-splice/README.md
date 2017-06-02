# buffer-splice [![Build Status](https://travis-ci.org/tjmehta/buffer-splice.svg)](https://travis-ci.org/tjmehta/buffer-splice) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
Splice a buffer.. like array and string splice

# Installation
```bash
npm i --save buffer-splice
```

# Usage
### splice(buffer, [start], [count], [...insert])
Splice a buffer
* @param  {Buffer|Object} buffer input buffer or opts: { buffer: <buffer> }
* @param  {Integer} [start] default: buffer.length
* @param  {Integer} [count] default: buffer.length
* @param  {Buffer,String,Number,Object,Array} [...items] items to insert into buffer (will be casted to buffer)
* @param  {Integer} [count] default: buffer.length
* @return {Buffer} modified buffer of removed buffer if `opts` is passed

Examples
```js
var splice = require('buffer-splice')

var buffer = new Buffer('helloworld')

splice(buffer) // new Buffer('helloworld')

splice(buffer, 5, 5) // new Buffer('hello')

splice(buffer, 5, 5, new Buffer("FOO")) // new Buffer('helloFOO')

// Want the removed buffer too?
// Pass `opts` and splice will work more like `Array.splice`
// Unlike Arrays, Buffers cannot be modified directly.
// When you pass an `opts` w/ `buffer` property `buffer-splice` can update the `buffer` reference.

var opts = {
  buffer: buffer
}
var removed = splice(opts, 1) // removed: new Buffer('elloworld')
opts.buffer // modified: new Buffer('h') // ref was changed

```

More Examples
```js
// buffer-splice supports all types for items,
// it uses cast-buffer to cast `items` to buffers

splice(buffer, 5, 5) // new Buffer('hello')

splice(buffer, 5, 5, new Buffer("FOO")) // new Buffer('helloFOO')

splice(buffer, 5, 5, "FOO") // new Buffer('helloFOO')

splice(buffer, 5, 5, 10) // new Buffer('hello10')

splice(buffer, 5, 5, [ 'array' ]) // new Buffer('hello["array"]')

splice(buffer, 5, 5, { object: true }) // new Buffer('hello{"object":true}')

splice(buffer, 5, 5, 'FOO', 10, 'QUX') // new Buffer('helloFOO10QUX')
```

# License
MIT