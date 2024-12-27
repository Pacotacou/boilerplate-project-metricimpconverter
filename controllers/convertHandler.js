function ConvertHandler() {
  this.regexp = /^((\d+|\d+\.\d+)(\/(\d+|\d+\.\d+))?)?(l|lbs|kg|gal|km|mi){1}$/i;
  this.regexpUnit = /^([^a-zA-Z]*)?(l|lbs|kg|gal|km|mi){1}$/i;
  this.regexpNumber = /^((\d+|\d+\.\d+)(\/(\d+|\d+\.\d+))?)?([a-zA-Z])/;

  this.unitSymbols = {
    km: "kilometers",
    mi: "miles",
    L: "liters",
    gal: "gallons",
    kg: "kilograms",
    lbs: "pounds"
  };

  this.getNum = function (input) {
    if (!this.regexp.test(input)) {
      throw new Error("Invalid number");
    }

    const match = this.regexp.exec(input);
    if (!match[1]) return 1; // Default to 1 if no number is provided

    if (match[3]) { // Handle fraction
      return Number(match[2]) / Number(match[4]);
    }

    return Number(match[1]);
  };

  this.getUnit = function (input) {
    if (!this.regexpUnit.test(input)) {
      throw new Error("Invalid unit");
    }

    const match = this.regexp.exec(input);
    let unit = match[match.length - 1].toLowerCase();
    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      L: "gal",
      gal: "L",
      kg: "lbs",
      lbs: "kg",
      km: "mi",
      mi: "km"
    };

    return unitMap[initUnit] || false;
  };

  this.spellOutUnit = function (unit) {
    return this.unitSymbols[unit] || "";
  };

  this.convert = function (initNum, initUnit) {
    const conversionRates = {
      galToL: 3.78541,
      lbsToKg: 0.453592,
      miToKm: 1.60934
    };

    switch (initUnit) {
      case "L":
        return (initNum / conversionRates.galToL).toFixed(5);
      case "gal":
        return (initNum * conversionRates.galToL).toFixed(5);
      case "kg":
        return (initNum / conversionRates.lbsToKg).toFixed(5);
      case "lbs":
        return (initNum * conversionRates.lbsToKg).toFixed(5);
      case "km":
        return (initNum / conversionRates.miToKm).toFixed(5);
      case "mi":
        return (initNum * conversionRates.miToKm).toFixed(5);
      default:
        return false;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
