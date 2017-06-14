const I18N = require('./i18n.js');
/**
 * 取得i18n key
 * @param {any} id
 * @param {any} region
 * @returns
 */
function getI18n (id, region) {
  if (!region || !I18N[region]) {
    region = 'en';
  }
  return I18N[region][id];
}

module.exports = {
  'getI18n': getI18n
};
