markdown-react
==============

React markdown renderer

What is this?
-------------

A markdown to [React](http://facebook.github.io/react/) renderer.


Parse markdown to a React structure instead of a html. This allows you to all sort of custom things that you can do with react.

This script doesn't parse markdown, instead it uses `evilstreak/markdown-js`. I'm probably going to add an other backend too `chjj/marked`

TODO
----

* Clean up repo (in progress)
* Build a small what using React can do (numbered titles, onClick,...)
* Make this useable for a blog site (compile to React and static HTML)
* Add a backend for: chjj/marked
* More tests
* Complete documentation

Installation
------------

* clone this repo
* `npm install`
* compile jsx `node_modules/react-tools/bin/jsx --watch --harmony src/ dist/`
* run `node dist/index.js`

Tests
-----

* clone this repo
* `npm install`
* compile jsx `node_modules/react-tools/bin/jsx --watch --harmony src/ dist/`
* run `node_modules/mocha/bin/mocha`
