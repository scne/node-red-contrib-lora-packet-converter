# cast-buffer [![Build Status](https://travis-ci.org/tjmehta/cast-buffer.svg?branch=master)](https://travis-ci.org/tjmehta/cast-buffer)
cast objects, arrays, numbers, strings and booleans to buffers

# Installation
```bash
npm i --save cast-buffer
```

# Usage
```js
var buff

buff = castBuffer({ 'foo': 1, 'bar': 2 }) // new Buffer('{ 'foo': 1, 'bar': 2 }')
buff = castBuffer([ 'foo', 'bar', 'qux' ]) // new Buffer('[ 'foo', 'bar', 'qux' ]')
buff = castBuffer('hello') // new Buffer('hello')
buff = castBuffer(10) // new Buffer('10') // stringified number
buff = castBuffer(1.1) // new Buffer('1.1') // stringified number
buff = castBuffer(true) // new Buffer('true') // stringified boolean
buff = castBuffer(new Buffer('hello')) // returns same buffer

// Calls toJSON if it exists
var foobar = {
  _json: {}
  get: function () {/*...*/}
  set: function () {/*...*/}
  toJSON: function () {
    return this._json
  }
}
buff = castBuffer(foobar) // new Buffer('{}')
buff = castBuffer([ foobar ]) // new Buffer('[{}]')
```

# License
MIT
