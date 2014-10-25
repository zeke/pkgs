var _ = require("lodash")
var async = require("async")
var registry = require("npm-stats")()
var pkgs = module.exports = function(names, properties, callback) {

  // properties array is optional
  // all properties are returned by default
  if (arguments.length === 2) {
    callback = properties
    properties = null
  }

  async.map(
    names,
    function(pkg, cb) {
      registry.module(pkg).info(cb)
    },
    function(err, pkgs) {
      if (err) return callback(err)

      pkgs = pkgs.map(function(pkg) {
        if (!pkg) return null
        if (properties) return _.pick(pkg, properties)
        return pkg
      })

      return callback(null, pkgs)
    }
  )
}
