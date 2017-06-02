'use strict'

var assertArgs = require('assert-args')
var isObject = require('101/is-object')
var toJSON = function (val) {
  return (val && val.toJSON) ? val.toJSON() : val
}

module.exports = castBuffer
/**
 * cast value to buffer
 * @param  {Buffer|Object|Array|String|Boolean} val value to be casted
 * @return {Buffer}     value as a Buffer
 */
function castBuffer (val) {
  if (Buffer.isBuffer(val)) {
    return val
  }

  val = toJSON(val)
  var args = assertArgs([val], {
    val: ['string', 'array', 'object', 'number', 'boolean']
  })
  val = args.val

  var str

  if (Array.isArray(val)) {
    val = val.map(toJSON)
    str = JSON.stringify(val)
  } else if (isObject(val)) {
    val = toJSON(val)
    str = JSON.stringify(val)
  } else { // val is a string, number, or boolean
    str = val + ''
  }

  return new Buffer(str)
}
