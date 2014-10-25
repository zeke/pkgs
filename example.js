var pkgs = require("./")

// Pass in an array of package names
pkgs(["ghwd", "domready", "lodash.pluck"], function(err, packages){
  console.log(err, packages)
})

// Optionally specify some desired properties
var names = ["ghwd", "domready", "lodash.pluck"]
var props = ["name", "description", "repository"]
pkgs(names, props, function(err, packages){
  console.log(err, packages)
})
