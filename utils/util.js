const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getFloat = function (number, n) {
  n = n ? parseInt(n) : 0;
  if (n <= 0) return Math.round(number);
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
  return number;
};

const NumberLimit = (number, len = 6) => {
  if (!number && number !== 0) return '';
  if (!parseFloat(number)) return number;
  number = parseFloat(number);
  let result = number.toString();
  const isChange = number > 0 && number < 0.000001;
  if (isChange) { // <0.000001时 为科学计数法
    if (number < 0.0000000000000009) return number; // < 0.0000000000000009 时精度出现问题
    result = (number + 1).toString().split('.')[1];
    result = '0.' + result;
  }

  if (result.length <= len) return result;
  for (let i = 0; i <= result.length; i++) {
    result = number.toFixed(i);
    if (result != 0 && result.length >= len + 1) {
      return result;
    }
  }
};

module.exports = {
  formatTime: formatTime,
  getFloat: getFloat,
  NumberLimit: NumberLimit
}
