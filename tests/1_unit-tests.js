const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
// #1
test('#should correctly read a whole number input', function(){
    assert.equal(convertHandler.getNum('2mi'),2);
})

// #2
test('#should correctly read a decimal number input', function(){
    assert.equal(convertHandler.getNum('2.5mi'),2.5);
})
    
// #3
test('#should correctly read a fractional input', function(){
    assert.equal(convertHandler.getNum('6/4mi'),1.5);
})

// #4
test('#should correctly read a fractional input with a decimal', function(){
    assert.equal(convertHandler.getNum('2.5/2mi'),1.25);
})

// #5
test('#should correctly return an error on a double-fraction', function(){
    assert.equal(convertHandler.getNum('3/2/3mi'),'invalid number');
})
// #6
test('#should correctly default to a numerical input of 1 when no numerical input is provided', function(){
    assert.equal(convertHandler.getNum('mi'),1);
})
// #7
test(' should correctly read each valid input unit.', function(){
    assert.equal(convertHandler.getUnit('2.5mi'),'mi'),
    assert.equal(convertHandler.getUnit('2.5km'),'km'),
    assert.equal(convertHandler.getUnit('2.5L'),'L'),
    assert.equal(convertHandler.getUnit('2.5gal'),'gal'),
    assert.equal(convertHandler.getUnit('2.5lbs'),'lbs'),
    assert.equal(convertHandler.getUnit('2.5kg'),'kg')
})



// #8
test('should correctly return an error for an invalid input unit', function(){
    assert.equal(convertHandler.getUnit('2.5mit'),'invalid unit');
})


//# 9
test('should return the correct return unit for each valid input unit', function(){
    assert.equal(convertHandler.getReturnUnit('mi'),'km'),
    assert.equal(convertHandler.getReturnUnit('km'),'mi'),
    assert.equal(convertHandler.getReturnUnit('L'),'gal'),
    assert.equal(convertHandler.getReturnUnit('gal'),'L'),
    assert.equal(convertHandler.getReturnUnit('lbs'),'kg'),
    assert.equal(convertHandler.getReturnUnit('kg'),'lbs')
})


//# 10
test('should correctly return the spelled-out string unit for each valid input unit', function(){
    assert.equal(convertHandler.spellOutUnit('mi'),'miles'),
    assert.equal(convertHandler.spellOutUnit('km'),'kilometers'),
    assert.equal(convertHandler.spellOutUnit('L'),'liters'),
    assert.equal(convertHandler.spellOutUnit('gal'),'gallons'),
    assert.equal(convertHandler.spellOutUnit('lbs'),'pounds'),
    assert.equal(convertHandler.spellOutUnit('kg'),'kilograms')
})

// #11
test('should correctly convert gal to L', function(){
    assert.equal(convertHandler.convert(1,'gal'),3.78541);
})

// #12
test('should correctly convert L to gal', function(){
    assert.equal(convertHandler.convert(1,'L'),0.26417);
})

// #13
test('should correctly convert mi to km', function(){
    assert.equal(convertHandler.convert(1,'mi'),1.60934);
})

// #14
test('should correctly convert km to mi', function(){
    assert.equal(convertHandler.convert(1,'km'),0.62137);
})

// #15
test('should correctly convert lbs to kg', function(){
    assert.equal(convertHandler.convert(1,'lbs'),0.45359);
})

// #16
test('should correctly convert kg to lbs', function(){
    assert.equal(convertHandler.convert(1,'kg'),2.20462);
})

});