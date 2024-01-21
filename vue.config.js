/**
 * Replace md4 algorithm by sha256 algorithm.
 */
const crypto = require("crypto");
const origCreateHash = crypto.createHash;
crypto.createHash = (alg, opts) => {
  return origCreateHash(alg === "md4" ? "sha256" : alg, opts);
};

// Original answwer from https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1885#issuecomment-1316805488
// /**
//  * md4 algorithm is not available anymore in NodeJS 17+ (because of lib SSL 3).
//  * In that case, silently replace md4 by md5 algorithm.
//  */
// try {
//   crypto.createHash("md4");
// } catch (e) {
//   console.warn('Crypto "md4" is not supported anymore by this Node version');
//   const origCreateHash = crypto.createHash;
//   crypto.createHash = (alg, opts) => {
//     return origCreateHash(alg === "md4" ? "md5" : alg, opts);
//   };
// }

module.exports = {
  transpileDependencies: ["vuetify"],
};
