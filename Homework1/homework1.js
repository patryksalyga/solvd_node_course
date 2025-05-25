String.prototype.plus = function (num) {
    const a = this.split('').reverse();
    const b = num.split('').reverse();
    const out = [];
    let carry = 0;
  
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = parseInt(a[i] || '0');
      const y = parseInt(b[i] || '0');
      let s = x + y + carry;
      carry = s >= 10 ? 1 : 0;
      out.push(s % 10);
    }
  
    if (carry) out.push(1);
    return out.reverse().join('');
  };
  
  String.prototype.minus = function (num) {
    const a = this.split('').reverse();
    const b = num.split('').reverse();
    const res = [];
    let borrow = 0;
  
    for (let i = 0; i < a.length; i++) {
      let x = parseInt(a[i]);
      let y = parseInt(b[i] || '0') + borrow;
      if (x < y) {
        x += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      res.push(x - y);
    }
  
    while (res.length > 1 && res[res.length - 1] === 0) res.pop();
    return res.reverse().join('');
  };
  
  String.prototype.multiply = function (num) {
    const a = this.split('').reverse();
    const b = num.split('').reverse();
    const result = new Array(a.length + b.length).fill(0);
  
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        let tmp = parseInt(a[i]) * parseInt(b[j]) + result[i + j];
        result[i + j] = tmp % 10;
        result[i + j + 1] += Math.floor(tmp / 10);
      }
    }
  
    while (result.length > 1 && result[result.length - 1] === 0) result.pop();
    return result.reverse().join('');
  };
  
  String.prototype.divide = function (num) {
    if (num === '0') throw 'Dzielenie przez zero';
    if (this === '0') return '0';
  
    let part = '';
    let output = '';
  
    for (let i = 0; i < this.length; i++) {
      part += this[i];
      part = part.replace(/^0+/, '') || '0';
      let times = 0;
      while (compare(part, num) >= 0) {
        part = part.minus(num);
        times++;
      }
      output += times;
    }
  
    return output.replace(/^0+/, '') || '0';
  
    function compare(a, b) {
      if (a.length !== b.length) return a.length - b.length;
      return a > b ? 1 : (a < b ? -1 : 0);
    }
  };
  
  console.log("2".plus("22"));          // "24"
  console.log("1000".minus("1"));       // "999"
  console.log("12".multiply("345"));   // "4140"
  console.log("4140".divide("345"));   // "12"
  