// Game States
// "WIN" - Player robbot has deafeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less





//console.log(enemy.attack, enemy.health);
// this creates a function named "fight"

var fight = function (enemy) {    
    // repeat and execute as long as the enemy robot is alive 
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they would like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."); 

        // if player chooses to skip, confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip this fight. Goodbye!");
                //subtract money
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
        // remove enemy's health by subtracting the amout set in the playerInfo.attack var
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(    
            playerInfo.name + " attacked " + enemy.name  + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );   

        // check enemy's health
        if (enemy.health <=0) {
            window.alert(enemy.name + " has died");
            
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }
         
        // remove player's health by subtracting the amount set in the enemy.attack var  
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

        // check player's health
        if (playerInfo.health <=0) {
        window.alert(playerInfo.name + " has died.");
        // leave while() loop if player is dead
            break;
        } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    } // end of while loop
}; // end of fight function

// function to start new game
var startGame = function() {
    // iterate over enemies
    
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to the Robot Gladiators! Round " + (i + 1));
            
            // pick new enemy to fight based on the index of enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            //reset enemy health before starting a new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            // use debugger to pause script from running and check what's going on at that moment in the code
            
            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
            //if we are not at the last enemy in the array 
            if (playerInfo.health > 0 && i < enemyInfo.length - 1){
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
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
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};


var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)  
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame(); 
