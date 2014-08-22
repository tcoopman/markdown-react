var assert = require('chai').assert;
var sinon = require('sinon');
var build = require('../dist/buildMarkdownTree');


var builder = {
  build: function (tokens) {
    return tokens;
  }
};


describe('Builder', function () {
  it('should build listitems', function () {
    var builditem = sinon.spy();
    var builder = new build.Builder({
      'build': builditem
    });
    builder.build(['build', 'a', 'b']);
    sinon.assert.calledOnce(builditem);
    sinon.assert.calledWith(builditem, ['a', 'b']);
  });


  it('should work on strings', function () {
    var builder = new build.Builder({});
    var builded = builder.build('build');
    assert.equal(builded, 'build');
  });
});

describe('build functions', function () {
  beforeEach(function () {
    sinon.spy(builder, 'build');
  });


  afterEach(function () {
    builder.build.restore();
  });


  describe('buildListitem', function () {
    it('should build simple lists', function () {
      var listToken = ['plugins/dropbox/README.md'];
      var listItem = build.buildListitem(listToken, builder);
      assert.equal(listItem.id, 'listitem');
      assert.isArray(listItem.values);
      assert.equal(listItem.values[0], listToken[0]);
      assert.equal(builder.build.callCount, 1);
    });


    it('should ignore para in - this is a bug in markdown-js', function () {
      var listToken = ['para', 'plugins/dropbox/README.md'];
      var listItem = build.buildListitem(listToken, builder);
      assert.equal(listItem.id, 'listitem');
      assert.isArray(listItem.values);
      assert.equal(listItem.values, listToken[1]);
      assert.equal(builder.build.callCount, 1);
    });


    it('should build nested items', function () {
      var listToken = ['something ', ['em', 'with em'], 'else ', ['strong', 'item']];
      var listItem = build.buildListitem(listToken, builder);
      assert.equal(listItem.id, 'listitem');
      assert.isArray(listItem.values);
      assert.equal(listItem.values.length, listToken.length);
      assert.equal(builder.build.callCount, 4);
    });
  });


  describe('buildHeader', function () {
    it('should build simple headers', function () {
      var listToken = [{level: 1}, 'Header'];
      var header = build.buildHeader(listToken, builder);
      assert.equal(header.id, 'header');
      assert.equal(header.level, 1);
      assert.isArray(header.values);
      assert.equal(builder.build.callCount, 1);
      assert.equal(header.values[0], listToken[1]);
    });
  });


  describe('buildLinkRef', function () {
    it('should build link ref', function () {
      var listToken = [{ref: 'ref', original: '[original]'}, 'original'];
      var link = build.buildLinkRef(listToken, builder);
      assert.equal(link.id, 'link_ref');
      assert.equal(link.ref, 'ref');
      assert.equal(link.original, '[original]');
      assert.isArray(link.values);
      assert.equal(builder.build.callCount, 1);
      assert.equal(link.values[0], listToken[1]);
    });
  });


  describe('customBuildFactory', function () {
    it('should build with simple custom items', function () {
      var id = 'whatever';
      var b = build.customBuildFactory(id);
      var listToken = ['abc'];
      var item = b(listToken, builder);
      assert.equal(item.id, id);
      assert.equal(item.values.length, 1);
      assert.equal(item.values[0], 'abc');
    });


    it('should build custom items', function () {
      var id = 'whatever';
      var b = build.customBuildFactory(id);
      var listToken = [['listitem', 'some'], ['listitem', 'other']];
      var item = b(listToken, builder);
      assert.equal(item.id, id);
      assert.isArray(item.values);
      assert.equal(builder.build.callCount, 2);
      assert.equal(item.values[0][0], listToken[0][0]);
      assert.equal(item.values[0][1], listToken[0][1]);
      assert.equal(item.values[1][0], listToken[1][0]);
      assert.equal(item.values[1][1], listToken[1][1]);
    });
  });
})
