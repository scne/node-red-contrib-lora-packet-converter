var expect = require('chai').expect

var splice = require('../index.js')
var beforeEach = global.beforeEach
var describe = global.describe
var it = global.it

describe('buffer-splice', function () {
  beforeEach(function (done) {
    this.string = 'abcdef'
    this.buffer = new Buffer(this.string)
    done()
  })

  describe('return modified', function () {
    it('should splice(buffer)', function (done) {
      var buffer = this.buffer
      var string = this.string.slice() // copy

      var out = splice(buffer)
      expect(out).to.deep.equal(new Buffer(string))
      done()
    })
    it('should splice(buffer, 1)', function (done) {
      var buffer = this.buffer
      var string = this.string.slice() // copy

      var out = splice(buffer, 1)
      expect(out).to.deep.equal(new Buffer(string.slice(0, 1)))

      done()
    })
    it('should splice(buffer, 2, 2)', function (done) {
      var buffer = this.buffer
      var string = this.string.slice() // copy

      var out = splice(buffer, 2, 2)
      expect(out).to.deep.equal(new Buffer([
        string.slice(0, 2),
        string.slice(4, string.length)
      ].join('')))

      done()
    })
    it('should splice(buffer, 2, 2, new Buffer("FOO"))', function (done) {
      var buffer = this.buffer

      var out = splice(buffer, 2, 2, new Buffer('FOO'))
      expect(out).to.deep.equal(new Buffer('abFOOef'))

      done()
    })
    it('should splice(buffer, 2, 2, "FOO")', function (done) {
      var buffer = this.buffer

      var out = splice(buffer, 2, 2, 'FOO')
      expect(out).to.deep.equal(new Buffer('abFOOef'))

      done()
    })
    it('should splice(buffer, 2, 2, 10)', function (done) {
      var buffer = this.buffer
      var string = this.string.slice() // copy
      var item = 10

      var out = splice(buffer, 2, 2, item)
      expect(out).to.deep.equal(new Buffer([
        string.slice(0, 2),
        JSON.stringify(item),
        string.slice(4, string.length)
      ].join('')))

      done()
    })
    it('should splice(buffer, 2, 2, ["array"])', function (done) {
      var buffer = this.buffer
      var string = this.string.slice() // copy
      var item = [ 'array' ]

      var out = splice(buffer, 2, 2, item)
      expect(out).to.deep.equal(new Buffer([
        string.slice(0, 2),
        JSON.stringify(item),
        string.slice(4, string.length)
      ].join('')))

      done()
    })
    it('should splice(buffer, 2, 2, {object:10})', function (done) {
      var buffer = this.buffer
      var string = this.string.slice() // copy
      var item = { object: 10 }

      var out = splice(buffer, 2, 2, item)
      expect(out).to.deep.equal(new Buffer([
        string.slice(0, 2),
        JSON.stringify(item),
        string.slice(4, string.length)
      ].join('')))

      done()
    })

    it('should splice(buffer, 2, 2, "FOO", "BAR")', function (done) {
      var buffer = this.buffer

      var out = splice(buffer, 2, 2, 'FOO', 'BAR')
      expect(out).to.deep.equal(new Buffer('abFOOBARef'))

      done()
    })
  })

  describe('return removed', function () {
    it('should splice(buffer, 2, 2, "FOO")', function (done) {
      var opts = { buffer: this.buffer }

      var out = splice(opts, 2, 2, 'FOO')
      expect(out).to.deep.equal(new Buffer('cd'))
      expect(opts.buffer).to.deep.equal(new Buffer('abFOOef'))

      done()
    })
  })
})
