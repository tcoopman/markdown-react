markdown-react
==============

React markdown renderer

What is this?
-------------

A markdown to [React](http://facebook.github.io/react/) renderer.


Parse markdown to a React structure instead of a html. This allows you to all sort of custom things that you can do with react.
This means you can render a normal html structure but also do al sort of crazy things.

This script doesn't parse markdown, instead it uses `evilstreak/markdown-js`. I'm probably going to add an other backend too `chjj/marked`

Some examples can be found in examples. After installation, you can run these (`node examples/simple.js`).
A server example can be found in [react-markdown-server](https://github.com/tcoopman/markdown-react-server)

TODO
----

* ~~Clean up the installation~~
* ~~Clean up repo~~
* Build a small example of what is possible with React together with markdown (numbered titles, onClick,...)
* Make this useable for a blog site (compile to React and static HTML)
* Add a backend for: chjj/marked
* More tests and fix the tests to point to lib
* Complete documentation
* ~~Server example~~
* Publish to npm

Installation
------------

* clone this repo
* `npm install`

Tests
-----

* clone this repo
* `npm install`
* compile jsx `node_modules/react-tools/bin/jsx --watch --harmony src/ dist/`
* run `node_modules/mocha/bin/mocha`

Maybe later
-----------

* Use [facebook/immutable-js](https://github.com/facebook/immutable-js) as a for the intermediate tree and implement `shouldComponentUpdate` for fast updates (in case we want to use this as an markdown editor for example.)
