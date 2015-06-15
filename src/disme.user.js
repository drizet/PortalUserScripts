// ==UserScript==
// @name        Disme QA2 ALL Labels
// @namespace   Disme
// @include     https://disme.bwin.corp./out/out.Deploy.php
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @grant       none
// ==/UserScript==

$(document).ready(function() {
  var deployServer = "ATVD1WWQA0205";
  
   // Find all labels except: WPOR, PMU.FR and PP.FR
   var inputs = $("#form1 td:contains('home.'):not(:contains('WPOR'),:contains('PMU.FR'),:contains('PP.FR'))");

   var to = 0;
   var from = 0;
  
   var receivedUserResponse = false;

   while (!receivedUserResponse)
   {
      var userResponse = prompt(inputs.length+" Portal labels were found.\n\nFirst part of servers = 1\nSecond part of servers = 2", "1")
     
      // 'Cancel' button clicked
      if(userResponse == null)
         return;
      
      switch(parseInt(userResponse))
      {
        case 1:
            to = Math.floor(inputs.length/2);
            receivedUserResponse = true;
            break;
        case 2:
           from = Math.floor(inputs.length/2);
           to = inputs.length;
           receivedUserResponse = true;
           break; 
        default:
           alert("Value is incorrect. Please enter 1 or 2.")
      }
   }
  
  // Select apropriate labels
  inputs.slice(from, to).parent().find("input").click(); 

  // Set Stage=Development-QA
  $("#stageid option[value='8']").prop("selected", true).click();
  
  // Set Common set of servers
  $("#deploytoCommmonSetOfServers").prop("checked", true).click();
  
  // Set QA2 server as a deploy server
  setTimeout(function(){
    $("input[onclick*='" + deployServer +"']").click();
  }, 1200);
});