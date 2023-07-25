function ConvertHandler() {
  
  this.getNum = function(input) {
    //extract the numbers at the front of the input
    let numbers = extractedNumber(input);
    //check if there were no numbers - if not return 1.
    if(numbers.length<1){return 1};
    //check if there are more than one divisions.
    if(numberOfDivisions(numbers)>1){
      //too many divisions
      return 'invalid number';
    }
    //check if there are divsions - if so then check if valid and return result.
    if(numberOfDivisions(numbers)>0){
      var pattern = /^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/;
      var match = numbers.match(pattern);
    
      if (match) {
        var numerator = parseFloat(match[1]);
        var denominator = parseFloat(match[2]);
        var result = parseFloat(numerator / denominator);
        return result;
      } else {
        //divisions not correctly placed
        return 'invalid number';
      }
    }
    //check if number is a valid float, if so then parse and return.
    if (isValidFloat(numbers)) { 
      let floatValue=parseFloat(numbers);
      return floatValue;
    } else {
      //invalid float
      return 'invalid number';
    }
    
  };
  
  this.getUnit = function(input) {

   let letters = extractedLetters(input);
   letters = letters.toLowerCase();
   if(letters=='l'){letters='L'};
   //check if letters corespond to one of the units

   let allowedUnits = ["gal","L","lbs","kg","mi","km"];
   const isContained = allowedUnits.includes(letters);
   if(isContained){
    return letters;
   }else{
    return "invalid unit";
   }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit){
      case 'gal':result='L';break;
      case 'L':result='gal';break;
      case 'lbs':result='kg';break;
      case 'kg':result='lbs';break;
      case 'mi':result='km';break;
      case 'km':result='mi';break;
      default :result='invalid input';break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit){
      case 'gal':result='gallons';break;
      case 'L':result='liters';break;
      case 'lbs':result='pounds';break;
      case 'kg':result='kilograms';break;
      case 'mi':result='miles';break;
      case 'km':result='kilometers';break;
      default :result='invalid input';break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let mutiple;
    switch (initUnit){
      case 'gal':mutiple=galToL;break;
      case 'L':mutiple=1/galToL;break;
      case 'lbs':mutiple=lbsToKg;break;
      case 'kg':mutiple=1/lbsToKg;break;
      case 'mi':mutiple=miToKm;break;
      case 'km':mutiple=1/miToKm;break;
      default :mutiple='invalid input';break;
    }

    let result =  parseFloat((initNum*mutiple).toFixed(5));
    

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    let result = initNum+" "+this.spellOutUnit(initUnit)+ " converts to "+returnNum+" "+this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}


function extractedNumber(input){  
  let numberLength = input.length - unitLength(input);
  let number = input.slice(0, numberLength);
  return number;
}

function extractedLetters(input){
  let unitLen = unitLength(input);
  let letters = input.slice(-unitLen);
  return letters;
}

//function to calculate the length of the unit section of the string
function unitLength(input){
  let unitLen=0;
  let foundLetter = false;
  for (let i = input.length - 1; i >= 0; i--) {
   if(!(/[a-zA-Z]/.test(input[i])) && foundLetter==false){
   unitLen++;
   }
   if(/[a-zA-Z]/.test(input[i])){
    unitLen++;
     foundLetter=true;
   }
   if(!(/[a-zA-Z]/.test(input[i])) && foundLetter==true){
     break;
   }
 }

 if (unitLen==input.length && foundLetter==false){
  unitLen=0;
 }

  return unitLen;
}

function numberOfDivisions(number){
  const count = number.split('/').length - 1;
  return count;
}

function isValidFloat(str) {
  return /^\d*\.?\d?$/.test(str);
}

module.exports = ConvertHandler;
