export default function () {
  return function (input) {
    const date = new Date(input);
    const between = Date.now() / 1000 - (date.valueOf() / 1000);
    if (between < 3600) {
      return pluralize(~~(between / 60), ' minute');
    } else if (between < 86400) {
      return pluralize(~~(between / 3600), ' hour');
    } else if (between < 2628000) {
      return pluralize(~~(between / 86400), ' day');
    } else if (between < 31536000) {
      return pluralize(~~(between / 2628000), ' month');
    }
    return pluralize(~~(between / 31536000), ' year');
  };
}

function pluralize(time, label) {
  if (time === 1) {
    return `${time}${label} ago`;
  }
  return `${time}${label}s ago`;
}
