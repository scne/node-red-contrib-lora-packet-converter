var assertArgs = require('assert-args')
var castBuffer = require('cast-buffer')
var defaults = require('101/defaults')

module.exports = bufferSplice
/**
 * Splice a buffer
 * @param  {Buffer|Object} buffer input buffer or object w/ buffer { buffer: ... }
 * @param  {Integer} [start]  default: buffer.length
 * @param  {Integer} [count]  default: buffer.length
 * @param  {Buffer,String,Number,Object,Array} [...items] items to insert into buffer (will be casted to buffer before insertion)
 * @return {Buffer} modified buffer
 */
function bufferSplice (buffer, start, count/*, [...items] */) {
  var args = assertArgs(arguments, {
    buffer: [Buffer, 'object'],
    '[start]': 'integer',
    '[count]': 'integer',
    '[...items]': [Buffer, 'string', 'array', 'object', 'number']
  })
  defaults(args, {
    start: buffer.length,
    count: buffer.length,
    items: []
  })
  buffer = args.buffer
  start = args.start
  count = args.count
  var opts
  if (!Buffer.isBuffer(buffer)) {
    opts = buffer
    buffer = opts.buffer
  }
  var items = args.items.map(castBuffer)
  var end = start + count

  var modified = Buffer.concat(
    [ buffer.slice(0, start) ]
      .concat(items)
      .concat(buffer.slice(end, buffer.length))
  )

  if (opts) {
    opts.buffer = modified // opts.buffer becomes modified buffer
    return buffer.slice(start, end) // removed buffer
  }

  return modified // modified buffer
}
