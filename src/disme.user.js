// ==UserScript==
// @name        Disme QA2 ALL Labels
// @namespace   Disme
// @include     https://disme.bwin.corp/out/out.Deploy.php
// @version     1.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @grant       none
// ==/UserScript==

$(document).ready(function() {
  var deployServer = "ATVD1WWQA0205";
  
   // Find all labels except: WPOR, PMU.FR and PP.FR
   var targets = $("#form1 td:contains('home.'):not(:contains('WPOR'),:contains('PMU.FR'),:contains('PP.FR'))");

   // Uncheck selected targets if page was refreshed.
   var inputs = targets.parent().find("input:checked").prop("checked", false);
   
   var to = 0;
   var from = 0;
  
   var receivedUserResponse = false;

   while (!receivedUserResponse)
   {
      var userResponse = prompt(targets.length+" Portal labels were found.\n\nFirst part of servers = 1\nSecond part of servers = 2", "1")
     
      // 'Cancel' button clicked
      if(userResponse == null)
         return;
      
      switch(parseInt(userResponse))
      {
        case 1:
            to = Math.floor(targets.length / 2);
            receivedUserResponse = true;
            break;
        case 2:
           from = Math.floor(targets.length / 2);
           to = targets.length;
           receivedUserResponse = true;
           break; 
        default:
           alert("Value is incorrect. Please enter 1 or 2.")
      }
   }
    
  // Select apropriate labels
  targets.slice(from, to).parent().find("input").click(); 

  // Set Stage=Development-QA
  $("#stageid option[value='8']").prop("selected", true).click();
  
  // Set Common set of servers
  $("#deploytoCommmonSetOfServers").prop("checked", true).click();
  
  // Set QA2 server as a deploy server
  setTimeout(function(){
    $("input[onclick*='" + deployServer +"']").click();
  }, 1200);
});