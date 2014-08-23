markdown-react
==============

React markdown renderer

What is this?
-------------

A markdown to [React](http://facebook.github.io/react/) renderer.


Parse markdown to a React structure instead of a html. This allows you to all sort of custom things that you can do with react.
This means you can render a normal html structure but also do al sort of crazy things.

This script doesn't parse markdown, instead it uses `evilstreak/markdown-js`. I'm probably going to add an other backend too `chjj/marked`

TODO
----

* Clean up the installtion
* Clean up repo (in progress)
* Build a small what using React can do (numbered titles, onClick,...)
* Make this useable for a blog site (compile to React and static HTML)
* Add a backend for: chjj/marked
* More tests and fix the tests to point to lib
* Complete documentation
* Server example

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
