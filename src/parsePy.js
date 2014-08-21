
function literalToken(value) {
  this.lbp = 0;
  this.value = value;
}
literalToken.prototype.nud = function () {
  return this.value;
}

function operatorAddToken() {
  this.lbp = 10;
}
operatorAddToken.prototype.led = function (left) {
  var right = expression(10)
  return left + right;
}

function endToken() {
  this.lbp = 0;
}





function expression(rbp) {
  var t = token;
  token = next();
  left = t.nud();
  while (rbp < token.lbp) {
    t = token;
    token = next();
    left = t.led(left);
  }
  return left;
}

var rToken = /\s*(?:(\d+)|(.))/;

function tokenize(program) {
  var matches = [];
  while((match = rToken.exec(program)) !== null) {
    console.log(match);
    matches.push(match);
  }
  console.log(matches);
}

var token, next;

function parse(program) {
  next = tokenize(program).next;
  token = next();
  return expression(0);
}

parse('1 + 2');
