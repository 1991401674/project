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

const ymd=function (val) {
  var date = new Date(val);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  mi < 10 && (mi = "0" + mi);
  h < 10 && (h = "0" + h);
  s < 10 && (s = "0" + s);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`
}

module.exports = {
  formatTime: formatTime,
  ymd: ymd
}
