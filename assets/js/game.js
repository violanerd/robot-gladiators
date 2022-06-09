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
var enemyHealth = Math.floor(Math.random()*21) + 40;
var enemyAttack = 12;

console.log(enemyAttack, enemyHealth);
// this creates a function named "fight"

var fight = function (enemyName) {    
    // repeat and execute as long as the enemy robot is alive 
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask player if they would like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."); 

        // if player chooses to skip, confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip this fight. Goodbye!");
                //subtract money
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        // remove enemy's health by subtracting the amout set in the playerAttack var
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(    
            playerName + " attacked " + enemyName  + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );   

        // check enemy's health
        if (enemyHealth <=0) {
            window.alert(enemyName + " has died");
            
            // award player money for winning
            playerMoney = playerMoney + 20;
            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }
         
        // remove player's health by subtracting the amount set in the enemyAttack var  
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

        // check player's health
        if (playerHealth <=0) {
        window.alert(playerName + " has died.");
        // leave while() loop if player is dead
            break;
        } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } // end of while loop
}; // end of fight function

// function to start new game
var startGame = function() {
    // iterate over enemies
    
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to the Robot Gladiators! Round " + (i + 1));
            
            // pick new enemy to fight based on the index of enemyNames array
            var pickedEnemyName = enemyNames[i];
            //reset enemy health before starting a new fight
            enemyHealth = randomNumber(40, 60);
            // use debugger to pause script from running and check what's going on at that moment in the code
            
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
            //if we are not at the last enemy in the array 
            if (playerHealth > 0 && i < enemyNames.length - 1){
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")
                
                if (storeConfirm) {
                    shop();
                }
            }
        } 
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};


//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame ();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch(shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7){
            // increase health and decrease money
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else{
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7){
                // increase attack and decrease money
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else{
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE":
        case "leave":
            // do nothing so function will end
            window.alert("Leaving the store.");
            break;
        default:
            // call shop again to force player to pick a valid option
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max - min) + 1) + min;
    return value;
}

startGame(); 
