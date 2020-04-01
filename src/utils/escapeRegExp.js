// Escape special characters
// see: https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
const escapeRegExp = (str) => {
    return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export default escapeRegExp;