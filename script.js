
/* TEST SUBJECT
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 

should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
*/


// NOTE - Need to revisit this code. function from dylanmestyanek. 
// STEP 1 - Set up object for reference our payment types
function checkCashRegister(price, cash, cid) {
    let moneyBills = {            // creates variable 'currency' equal to object with keys and values. 
        "ONE HUNDRED" : 10000,  // Javascript has issues dealing with decimal numbers, therefore, we'll x100 our object values, and compare x100 vs. x100 below. 
        "TWENTY" : 2000,
        "TEN" : 1000,
        "FIVE" : 500,
        "ONE" : 100,
        "QUARTER" : 25,
        "DIME" : 10,
        "NICKEL" : 5,
        "PENNY" : 1,
    };
    
 // STEP 2 - adjust our inputs to make it easier to work with
    cid.reverse(); 
  // Changes our input 'cid' is read. 
  // Before: [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
  // After:  [["ONE HUNDRED", 100], ["TWENTY", 60], ["TEN", 20], ["FIVE", 55], ["ONE", 90], ["QUARTER", 4.25], ["DIME", 3.1], ["NICKEL", 2.05], ["PENNY", 1.01]]
    price *= 100; // To avoid dealin with decimal numbers, we will compare x100 vs x100. We multiplied by x100 in our 'let currency' 
    cash *= 100;

// STEP 3 - set up our variables to use in our function
    let changeDifference = cash - price; // refs our inputs
    
    let changeReturned = []; // creates empty placeholder for us to update and return change to the customer
    
    let sumOfChange = 0; // creates temporary binding to calculate and return change to the customer
    let cashHeld = 0; // creates temporary binding to assess the cash we currently have before the transaction


// STEP 4 - create a loop to run through the cid array
    for (let i = 0; i < cid.length; i++){ // Creates a loop to run through all the cid subarrays aka the bills. cid.length will return 9, because there are 9 subarrays in the cid array. 
      cashHeld += cid[i][1]; // This adds the cash bills currently held in cid. [i] runs through each subarray. [1] refs the value. e.g. cid[0][1] -> 100.

// STEP 5 - check if changeDifference is the same as the cash we have on hand. 
      if (changeDifference/100 === cashHeld){ // Our changeDifference was x100, therefore, we need to normalize again to compare with an input e.g. 50/100 === ["NICKEY",0.5]. 
        return {status: "CLOSED", change: cid.reverse()}; // if condition above is met, it spits out this object. However, we want to cid.reverse, because above we had reversed to check for the biggest bill, but we want to present it from smallest bill first as an output. 
      }

        cid[i][1] *= 100; // cid[i] runs through the subarrays, while [1] targets the index position 1, the value. 
        
        for (let j in moneyBills) { // for(in) is for objects. for(of) is for arrays. Creates a for loop, Refs our variable 'moneyBills' and checks through each key. 
        // Output would appear:
        /*
        ONE HUNDRED
        TWENTY
        TEN
        FIVE
        ONE
        QUARTER
        DIME
        NICKEL
        PENNY
        */
          
 // STEP 6 - iterate through our register, deducting what we have as we give change to the customer in changeDifference
            if (moneyBills[j] <= changeDifference && cid[i][0] === j){ // e.g. 1st iteration: if 100 <= 0.50 && and "ONE HUNDRED" === "ONE HUNDRED"  
            //moneyBills[j] actually returns the value. vs. moneyBills would return just the properties. 
            // e.g. cid[1] -> ["TWENTY", 60] refers to the subarray in index position 1
             // e.g. cid[1][0] -> ["TWENTY"] refers to subarray in index position 1, and the element in index position 0
              
                while (moneyBills[j] <= changeDifference && cid[i][1] > 0){  // moneyBills from biggest to smallest, if we can find the closest largest one below the changeDifference && as long as we actually have it aka ["QUARTER", 4.25], 4.25 needs to be greater than 0
                changeDifference -= moneyBills[j]; // then we will deduct the largest moneyBill we do have from the changeDifference e.g. 50 - 25. This updates the remaining changeDifference. 
                cid[i][1] -= moneyBills[j]; // this updates the cash we were holding onto, this shows the exchange. This updates the initial input in cid, to reduce it down from offsetting the changeDifference. 
                
 // STEP 7 - 
                if (changeReturned.length == 0 || j !== changeReturned[changeReturned.length - 1][0]){ // if no change remaining aka == 0 , OR, the value in moneyBills NOT equal to 
                // changeReturned[changeReturned.length - 1][0] -> changeReturned.length - 1 refers to the index position of the last subarray, and [0] is the name
                    changeReturned.push([j, moneyBills[j]/100]); // update the changeReturned placeholder array, by adding [Quarter, 25/100]
             
 // STEP 8 - 
                } else if (j === changeReturned[changeReturned.length - 1][0]) { // ???
                    changeReturned[changeReturned.length - 1][1] += moneyBills[j]/100; // changeReturned will add the value from moneyBills object
                    
                } else if (changeDifference !== 0) { // If updated changedDifference above after dedictopms, IS STILL not equal to 0, rereun the while loop 
                    continue; // In a while loop, the condition is tested, and if it is true, the loop is executed again. The continue statement "jumps over" one iteration in the loop .
                }
                } 
            }
        }
    }

 // STEP 9 - if cash held is less than the change needed to give to customer 
      if (cashHeld < changeDifference) {
          return {status: "INSUFFICIENT_FUNDS", change: []};
      } else 
          return {status: "OPEN", change: changeReturned}; // otherwise, if we do have cashHeld >= changeDifference,  we will return this object and ref our variable 'changeReturned' that has gone through the adjustments
      }

    


// TEST
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));



