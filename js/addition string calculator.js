/*  File Name: addition string calculator.js
   Author: Alexander Parcasio IV
   Email: parcasioalexander@outlook.com
   Purpose: A string calculator for addition
*/

/**
 *  Summary: Add respective numbers using a delimiter
 * 
 *  Description: Adds the numbers within the string by default uses
 *  comma (,) as the delimiter/separator for each number.
 *  
 *  Additional features: can specify one or more delimiters with
 *  arbitrary length using this format 
 *      //[delimiter 1],[delimiter 2]\n[separated numbers]
 *  
 *  @param {String} numbers  String to calculate
 *  @returns {Int} integer 0 if string is empty or invalid
 */
function Add(numbers){
   var negatives = [];//Array for Negative values
   var handledLines = "\\n"; //Specified line to be handled
   var customDelimiterLine = "//";//custom delimiter string
   var total = 0; //Total value of numbers to add
   var delimiter = new RegExp(",","gm");//Default delimiter
   var parsedNumbers = [];//Empty array for numbers

   //check if string is empty and return 0
   if(numbers==""){
      return 0;
   }
   
   //check if custom delimiter is specified
   if(numbers.substr(0,2)==customDelimiterLine){
      //Find where the custom delimiter ends using \n
      var linePos = numbers.indexOf(handledLines,0);
      //Create a new variable for delimiter(s)
      var delimiterLine = numbers.substr(2,linePos-2);
      //Remove used lines from numbers
      numbers = numbers.replace(customDelimiterLine+delimiterLine,"");

      //Split the delimiters into an array
      var delimiters = delimiterLine.split(",");
      //Loop through delimiters to apply escape
      for(var i = 0;i < delimiters.length;i++){
         delimiters[i] = delimiters[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }
      //Set the first delimiter reg expression
      var delimRegex = "(?:"+delimiters[0]+")";
      //Loop and add the rest of the custom delimiters
      for(var i = 1;i < delimiters.length; i++){
         delimRegex = delimRegex+"|(?:"+delimiters[i]+")";
      }
      //Set the new RegEx Pattern
      delimiter = new RegExp(delimRegex,"g");
      
      //code purpose: output total on the console
      //console.log("RegExp:\t\t"+delimiter);
   }

   //Remove handledLines from numbers
   numbers = numbers.replace(handledLines,"");
   
   //code purpose: output total on the console
   //console.log("Numbers:\t"+numbers);

   //Split numbers/values by delimiter
   var parsedNumbers = numbers.split(delimiter);

   //For each value per delimiter
   parsedNumbers.forEach(function(number){
      //convert current number to integer
      number = parseInt(number,10); 

      //code purpose: output total on the console
      //console.log("Current Number:"+number);

      //if the number is a negative add it to negatives array
      if(number<0){
         negatives.push(number);
      }else if(number>1000){
         //BONUS: Numbers greater than 1000 is ignored
         number = 0;
      }

      total += number; //Add number to the total value
   });

   //Throw exception and show alert if negatives numbers are found
   if(negatives.length>0){
      alert("Negatives not allowed:"+negatives);
      throw "Negatives not allowed:"+negatives;
   }

   //code purpose: output total on the console
   //console.log("Total:"+total);

   return total;
}

/**
 * Purpose: Uses the Add function from calculator.js to add values in the string
 */
function calculate(){
   //Add string specified by user
   var result = Add(document.getElementById('inputString').value);
   //Set the total/value to element
   document.getElementById('result').innerHTML = result;
}
