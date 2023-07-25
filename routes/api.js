'use strict';

const expect = require('chai').expect;
const { json } = require('body-parser');
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  



  let convertHandler = new ConvertHandler();


  app.route('/api/convert')
  .get(function (req, res) {
    console.log(req.query);
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum,initUnit);
    //let speltReturnUnit = convertHandler.spellOutUnit(returnUnit);
    let string = convertHandler.getString(initNum,initUnit,returnNum,returnUnit);

    let responce = {initNum:initNum, initUnit:initUnit, returnNum:returnNum, returnUnit:returnUnit, string:string};
    //let answer = "Answer - initNum: "+initNum+"  initUnit: "+initUnit+"  returnNum: "+returnNum+ "  returnUnit: "+returnUnit+"  spelt return unit: "+speltReturnUnit+ "  string: "+ convertHandler.getString(initNum,initUnit,returnNum,returnUnit);
    //res.send('Data recieved'+answer);    
    if(initNum=='invalid number'&&initUnit=='invalid unit'){
      res.send('invalid number and unit');
    }else if(initUnit=='invalid unit'){
      res.send('invalid unit')
    }else if(initNum=='invalid number'){
      res.send('invalid number');
    }else{
       res.json(responce);
    }

    });


};
