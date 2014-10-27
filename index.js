var _ = require("lodash")
var async = require("async")
var registry = require("npm-stats")()
var pkgs = module.exports = function(names, options, callback) {

  if (arguments.length === 3) {
    // Allow shorthand syntax, where options is actually
    // an array of desired property names
    if (Array.isArray(options)) {
      options = {
        pick: options.join(" ").split(" ")
      }
    }
  } else if (arguments.length === 2) {
    callback = options
    options = {}
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
        if (options.omit) return _.omit(pkg, options.omit)
        if (options.pick) return _.pick(pkg, options.pick)
        return pkg
      })

      return callback(null, pkgs)
    }
  )
}
