// Game States
// "WIN" - Player robbot has deafeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less



var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// this creates a function named "fight"

var fight = function (enemyName) {    
    // repeat and execute as long as the enemy robot is alive 
    while (enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."); 

        // if player chooses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
            // remove enemy's health by subtracting the amout set in the playerAttack var
            enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName  + ". " + enemyName + " now has " + enemyHealth + " health remaining.");   

        // check enemy's health
            if (enemyHealth <=0) {
                window.alert(enemyName + " has died");
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

        
            // remove player's health by subtracting the amount set in the enemyAttack var    
            playerHealth = playerHealth - enemyAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <=0) {
            window.alert(playerName + " has died.");
            } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
            }

        // if player chooses to skip
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip this fight. Goodbye!");
                //subtract money
                playerMoney = playerMoney - 2;
            }
            // if no (false), ask a question again by running fight() again
            else {
                fight ();
            }
        // if player did not chose fight or skip    
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
}; // end of fight function

// Run fight function, iterate over enemies
for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    // call fight function with enemy-robot
    fight(pickedEnemyName);
}


