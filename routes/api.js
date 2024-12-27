'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert/").get((req, res) => {
    const input = req.query.input;

    const isValidInput = convertHandler.regexp.test(input);
    const hasValidNumber = convertHandler.regexpNumber.test(input);
    const hasValidUnit = convertHandler.regexpUnit.test(input);

    if (!isValidInput) {
      if (!hasValidNumber && !hasValidUnit) {
        return res.send("invalid number and unit");
      }
      if (!hasValidNumber) {
        return res.send("invalid number");
      }
      if (!hasValidUnit) {
        return res.send("invalid unit");
      }
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = Number(convertHandler.convert(initNum, initUnit));
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const conversionString = convertHandler.getString(
      initNum,
      convertHandler.spellOutUnit(initUnit),
      returnNum,
      convertHandler.spellOutUnit(returnUnit)
    );

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: conversionString,
    });
  });
};
