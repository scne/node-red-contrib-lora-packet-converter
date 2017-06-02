'use strict'
var Lab = require('lab')
var Code = require('code')

var castBuffer = require('../index.js')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

describe('castBuffer', function () {
  it('should return if val is a buffer', function (done) {
    var val = new Buffer('hello')
    expect(castBuffer(val)).to.equal(val)
    done()
  })

  it('should cast an array to a buffer', function (done) {
    var val = []
    var expected = new Buffer('[]')
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should cast an object to a buffer', function (done) {
    var val = {}
    var expected = new Buffer('{}')
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should cast a string to a buffer', function (done) {
    var val = 'hello'
    var expected = new Buffer(val)
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should cast an int to a buffer', function (done) {
    var val = 10
    var expected = new Buffer(val + '')
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should cast a float to a buffer', function (done) {
    var val = 10.1
    var expected = new Buffer(val + '')
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should cast a boolean to a buffer', function (done) {
    var val = true
    var expected = new Buffer(val + '')
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should toJSON if value has it', function (done) {
    var val = {
      toJSON: function () {
        return {}
      }
    }
    var expected = new Buffer('{}')
    expect(castBuffer(val)).to.deep.equal(expected)
    done()
  })

  it('should throw an error for null', function (done) {
    var val = null
    expect(castBuffer.bind(null, val)).to.throw()
    done()
  })
})
