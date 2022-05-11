/*  File Name: addition string calculator test.js
    Author: Alexander Parcasio IV
    Email: parcasioalexander@outlook.com
    Purpose: Test functionality of addition string calculator.js
    Other files: addition string calculator.js, index.html
*/

//Global variables
var testsGroup;//for the testGroup Div

document.onreadystatechange = function () {
   if (document.readyState == "complete") {
      testsGroup = document.getElementById("testsGroup");
      document.getElementById("btn_Test").disabled = false;
   }
}

/**Test the Add(numbers:String) function and creates visual elements
 * @param {*} name Test Name
 * @param {*} input Calculator Input
 * @param {*} expected Expected Output
 * @returns {boolean} true if pass, false otherwise
 */
function do_test(name,input,expected){
   //Local variables to hold information
   var result;
   //This catches any exceptions that may occur
   try{
      result = Add(input);
   }catch(e){
      testsGroup.appendChild(create_Test_Element(name,input,expected,e));
      return (e.includes(expected)  ? true : false);
   }
   console.log(expected);
   testsGroup.appendChild(create_Test_Element(name,input,expected,result));
   return (result == expected ? true : false);
}

/**
 * Creates elements representing a test a user creates
 * @param {String} testName Name of Test
 * @param {String} testInput Input used for Add(numbers:String) function
 * @param {Int} testExpected Expected output of Add(number:String) function
 * @param {Int} testOutput    Output/result of test
 * @returns {Element} testDiv
 */
function create_Test_Element(testName,testInput,testExpected,testOutput){
   //Create necessary elements for each test
   var testDiv = document.createElement("div");
   testDiv.setAttribute('class','Test');
   var nameElement = document.createElement("h2");
   nameElement.innerHTML="Test Name: "+testName;
   var inputElement = document.createElement("h3");
   inputElement.innerHTML="Input: "+testInput;
   var expectedElement = document.createElement("h3");
   expectedElement.innerHTML="Expected: "+testExpected;
   var outputElement = document.createElement("h3");
   outputElement.innerHTML="Output: "+testOutput;
   
   //Append all sub elements of Test div
   testDiv.appendChild(nameElement);
   testDiv.appendChild(inputElement);
   testDiv.appendChild(expectedElement);
   testDiv.appendChild(outputElement);
   //Return element object
   return testDiv;
}

function run_Tests(){
   //Passed
   do_test("Adding simple inputs","1,2,5",8);
   do_test("Adding empty input","",0);
   do_test("Adding with new lines",(String.raw`1\n,2,3`),6);
   do_test("Adding with new lines",(String.raw`1,\n2,4`),7);
   do_test("Adding with new lines",(String.raw`1,2,5\n`),8);
   do_test("Adding with a single character delimiter",(String.raw`//;\n1;3;4`),8);
   do_test("Adding with a special character delimiter",(String.raw`//$\n1$2$3`),6);

   //Bonus conditions
   do_test("Adding a number greater than 1000 is ignored","2,1001,5",7);
   do_test("Delimiters can have arbitrary length",(String.raw`//$$$\n6$$$5$$$2`),13);
   do_test("Multiple delimiters are allowed",(String.raw`//@,!\n1!4@3`),8);
   do_test("Multiple delimiters can have arbitrary length",(String.raw`//$$$,***\n5$$$5***5`),15);
   
   //Exceptions or expected errors with negatives.
   do_test("Adding with negatives throws an exception",(String.raw`//@\n1@-3@4`),"Negatives not allowed:-3");
   do_test("Adding with multiple negatives throws an exception",(String.raw`//*\n6*-3*4*-8`),"Negatives not allowed:-3,-8");
}