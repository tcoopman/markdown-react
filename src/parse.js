var rWhiteSpace = /\s/;

function lexer(data) {
  var i, from, to, str, tokens;
  if (!data) {
    return;
  }

  i = 0;
  tokens = [];

  c = data.charAt(i);
  while (c) {
    from = i;

    if (c === '#') {
      str = c;
      i += 1;
      while (true) {
        c = data.charAt(i);
        if (c === '#') {
          str += c;
          i += 1;
        } else {
          break;
        }
      }
      tokens.push({
        type: 'operator',
        value: str
      });
    } else if (c === '*') {
      str = c;
      i += 1;
      if (rWhiteSpace.test(data.charAt(i))) {
        
      });
      }
      tokens.push({
        type: 'operator',
        value: c
      });
      c = data.charAt(i);
    } else if (c === '\n') {
      tokens.push({
        type: 'whitespace',
        value: c
      });
      i += 1;
      c = data.charAt(i);
    } else if (rWhiteSpace.test(c)) {
      str = c;
      i += 1;
      while (true) {
        c = data.charAt(i);
        if (rWhiteSpace.test(c)) {
          str += c;
          i += 1;
        } else {
          break;
        }
      }
      tokens.push({
        type: 'whitespace',
        value: str
      });
    } else {
      str = c;
      i += 1;
      while (true) {
        c = data.charAt(i);
        if (!rWhiteSpace.test(c) && c !== '*') {
          str += c;
          i += 1;
        } else {
          break;
        }
      }
      tokens.push({
        type: 'text',
        value: str
      });
    }
  }

  return tokens;
}
module.exports = lexer;
