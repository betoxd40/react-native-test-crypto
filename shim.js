// Inject node globals into React Native global scope.
global.Buffer = require("buffer").Buffer;
global.process = require("process");

if (typeof btoa === "undefined") {
  global.btoa = function(str) {
    return new Buffer(str, "binary").toString("base64");
  };
}

if (typeof atob === "undefined") {
  global.atob = function(b64Encoded) {
    return new Buffer(b64Encoded, "base64").toString("binary");
  };
}

if (typeof window === "object") {
  if (!window.crypto) window.crypto = {};
  crypto = window.crypto;
} else {
  crypto = require("crypto");
}

if (!crypto.getRandomValues) {
  crypto.getRandomValues = getRandomValues
}

let randomBytes

function getRandomValues (arr) {
  if (!randomBytes) randomBytes = require('react-native-randombytes').randomBytes

  const bytes = randomBytes(arr.length)
  for (var i = 0; i < bytes.length; i++) {
      arr[i] = bytes[i]
  }
}