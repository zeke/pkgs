var pkgs = require('.')

// Pass in an array of package names
pkgs(["ghwd", "domready", "lodash.pluck"], function(err, packages){
  console.log(err, packages)
})

// Pick some desired properties
var names = ["ghwd", "domready", "lodash.pluck"]
var options = {
  pick: ["name", "description", "repository"]
}
pkgs(names, options, function(err, packages){
  console.log(err, packages)
})

// Alternatively, omit some undesireable properties
var names = ["ghwd", "domready", "lodash.pluck"]
var options = {
  omit: ["versions", "readme"]
}
pkgs(names, options, function(err, packages){
  console.log(err, packages)
})
