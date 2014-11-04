assert = require("assert")
pkgs = require("..")

describe("pkgs", function() {

  this.timeout(5000)

  it("fetches an array of package metadata", function(done) {
    pkgs(["ghwd", "domready", "lodash.pluck"], function(err, res) {
      assert(!err)
      assert(Array.isArray(res))
      assert.equal(res.length, 3)
      assert.equal(res[0].name, "ghwd")
      assert.equal(res[1].name, "domready")
      assert.equal(res[2].name, "lodash.pluck")
      done()
    })
  })

  it("fetches a single package's metadata if package is entered as a string", function (done) {
    pkgs("lodash", function (err, res) {
      assert(!err)
      assert(Array.isArray(res))
      assert.equal(res.length, 1)
      assert.equal(res[0].name, "lodash")
      done()
    })
  })

  it("fetches multiple packages' metadata if packages are entered as a string separated by spaces", function (done) {
    pkgs("lodash domready", function (err, res) {
      assert(!err)
      assert(Array.isArray(res))
      assert.equal(res.length, 2)
      assert.equal(res[0].name, "lodash")
      assert.equal(res[1].name, "domready")
      done()
    })
  })

  it("picks all properties by default", function(done) {
    pkgs(["superagent"], function(err, res) {
      assert(!err)
      var pkg = res[0]
      assert(pkg._id)
      assert(pkg._rev)
      assert(pkg.name)
      assert(pkg.description)
      assert(pkg["dist-tags"])
      assert(pkg.versions)
      assert(pkg.keywords)
      assert(pkg.repository)
      assert(pkg.homepage)
      assert(pkg.author)
      assert(pkg.bugs)
      assert(pkg.users)
      assert(pkg.readme)
      done()
    })
  })

  it("catches errors", function(done) {
    pkgs(["kjsdofiusdfdskjfjjk"], ["name"], function(err, res) {
      assert(err)
      done()
    })
  })

  describe("options", function(){

    it("allows properties to be picked", function(done) {
      var opts = {
        pick: ["name", "description"]
      }
      pkgs(["faves"], opts, function(err, res) {
        assert(!err)
        assert.equal(res.length, 1)
        assert.deepEqual(Object.keys(res[0]).sort(), ["name", "description"].sort())
        done()
      })
    })

    it("allows properties to be omitted", function(done) {
      var opts = {
        omit: ["readme", "versions"]
      }
      pkgs(["faves"], opts, function(err, res) {
        assert(!err)
        assert.equal(res.length, 1)
        var pkg = res[0]
        assert(pkg.name)
        assert(pkg['dist-tags'])
        assert(pkg.author)
        assert(!pkg.readme)
        assert(!pkg.versions)
        done()
      })
    })

    it("allows options object to instead be an array of desired properties (backwards compatiblity)", function(done) {
      pkgs(["faves"], ["name", "description"], function(err, res) {
        assert(!err)
        assert.equal(res.length, 1)
        assert.deepEqual(Object.keys(res[0]).sort(), ["name", "description"].sort())
        done()
      })
    })
  })

})
