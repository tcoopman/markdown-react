'use strict';

var fs = require('fs');
var markdown = require('markdown').markdown;

var lexer = require('./parse.js');

var symbolTable = {};
var token;
var tokens;
var tokenNr = 0;

var itself = function () {
  return this;
};

var originalSymbol = {
  nud: function () {
    return new Error('Undefined.');
  },
  led: function (left) {
    return new Error('Missing operator');
  }
};

var symbol = function (id, bp) {
  var s = symbolTable[id];
  bp = bp || 0;
  if (s) {
    if (bp >= s.lbp) {
      s.lbp = bp;
    }
  } else {
    s = Object.create(originalSymbol);
    s.id = s.value = id;
    s.lbp = bp;
    symbolTable[id] = s;
  }

  return s;
}

symbol('(end)').nud = itself;
symbol('(literal)', 10).nud = itself;
symbol(' ').nud = itself;
symbol('\n').nud = itself;


var infix = function (id, bp, led) {
  var s = symbol(id, bp);
  s.led = led || function (left) {
    this.first = left;
    this.second = expression(bp);
    this.arity = "whitespace";
    return this;
  }
  return s;
};
infix(' ', 0);
infix('\n', 0);

var prefix = function (id, nud) {
  var s = symbol(id);
  s.nud = nud || function () {
    this.first = expression(70);
    this.arity = 'prefix';
    return this;
  }
  return s;
}
prefix('#');
prefix('##');
prefix(' ');

prefix('*', function () {
  var a = [];
  while (true) {
    if (token.id === '*' || token.id === '\n' || token.id === '(end)') {
      break;
    }

  }
  this.first = expression(70);
  this.arity = 'star';
  return this;
});


var statement = function() {
  var n = token, v;
  if (n.std) {
    advance();
    return n.std();
  }
  v = expression(0);
  if (!v.assignment && v.id !== '(') {
    v.error('Bad expression statement.');
  }
  advance('\n');
  return v;
}

var statements = function () {
  var a = [], s;
  while (true) {
    if (token.id === '*' || token.id === '\n' || token.id === '(end)') {
      break;
    }
    s = statement();
    if (s) {
      a.push(s);
    }
  }
  return a.length === 0 ? null : a.length === 1 ? a[0] : a;
}

var stmt = function (s, f) {
  var x = symbol(s);
  x.std = f;
  return x;
}

var advance = function (id) {
  var a, o, t, v;

  if (id && token.id !== id) {
    token.error('Expected "' + id + '".');
  }

  if (tokenNr >= tokens.length) {
    token = symbolTable['(end)'];
    return;
  }

  t = tokens[tokenNr];
  tokenNr += 1;

  v = t.value;
  a = t.type;

  if (a === 'operator'){
    o = symbolTable[v];
    if (!o) {
      t.error('Unknown operator.');
    }
  } else if (a === 'text') {
    a = 'literal';
    o = symbolTable['(literal)'];
  } else if (a === 'whitespace') {
    o = symbolTable[v];
  } else {
    t.error('Unexpected token.');
  }

  token = Object.create(o);
  token.value = v;
  token.arity = a;
  return token;
}


var expression = function (rbp) {
  var left;
  var t = token;
  advance();
  left = t.nud();
  while (rbp < token.lbp) {
    t = token;
    advance();
    left = t.led(left);
  }

  return left;
}

function main() {
  var text = fs.readFileSync('text.md', 'utf-8');
  var tree = markdown.parse(text);
  console.log(tree);
  tokens = lexer(text);
  console.log(tokens);
  token = advance();
  var tree = [];
  while (true) {
    if (token.id === '(end)') {
      break;
    }
    tree.push(expression(0));
  }
  console.log(tree);
}

main();
