const isLeapYear = require("../test/isLeap.js").isLeapYear;

const expect = require("chai").expect;

describe ('Leap yeat test', ()=> {
    
    it('1. Check regular not leap', ()=>{
        let l1 = isLeapYear(1919);
        expect(l1).to.be.false;
    });

    it('2. Check leap not century end', ()=>{
        let l2 = isLeapYear(2020);
        expect(l2).to.be.true;
    });

    it('3. Check century end', ()=>{
        let l3 = isLeapYear(1900);
        expect(l3).to.be.false;
    });

    it('4. Check regular not leap', ()=>{
        let l4 = isLeapYear(2000);
        expect(l4).to.be.true;
    });

})