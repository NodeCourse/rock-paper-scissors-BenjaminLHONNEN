const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const randomItem = require('random-item');

// Use Pug to render views
app.set('view engine', 'pug');

// Serve assets from the public folder
app.use(express.static('public'));

// Decode form data
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON body
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('homepage');
});

app.post('/result', (req, res) => {
    const {choice} = req.body;

    let userChoice = choiceParser(choice);
    let appChoice = randomAppChoice(choice);

    let obj = {
        result: doesFirstChoiceWin(userChoice.choice, appChoice.choice),
        userChoice: userChoice,
        appChoice: appChoice
    };
    console.log(obj);
    res.render('result', {obj: obj});
});

function doesFirstChoiceWin(choice1, choice2) {
    if (choice1 === choice2) {
        return "Egalité"
    } else if (choice1 === "paper") {
        if (doesPaperWin(choice2)) {
            return "Gagné !"
        } else {
            return "Perdu !"
        }
    } else if (choice1 === "rock") {
        if (doesRockWin(choice2)) {
            return "Gagné !"
        } else {
            return "Perdu !"
        }
    } else if (choice1 === "scissors") {
        if (doesScissorsWin(choice2)) {
            return "Gagné !"
        } else {
            return "Perdu !"
        }
    } else if (choice1 === "spock") {
        if (doesSpockWin(choice2)) {
            return "Gagné !"
        } else {
            return "Perdu !"
        }
    } else if (choice1 === "lizzard") {
        if (doesLizzardWin(choice2)) {
            return "Gagné !"
        } else {
            return "Perdu !"
        }
    }
}

function doesScissorsWin(compareEl) {
    if (compareEl === "paper" || compareEl === "lizzard") {
        return true;
    } else {
        return false;
    }
}

function doesPaperWin(compareEl) {
    if (compareEl === "spock" || compareEl === "rock") {
        return true;
    } else {
        return false;
    }
}

function doesRockWin(compareEl) {
    if (compareEl === "scissors" || compareEl === "lizzard") {
        return true;
    } else {
        return false;
    }
}

function doesSpockWin(compareEl) {
    if (compareEl === "scissors" || compareEl === "rock") {
        return true;
    } else {
        return false;
    }
}

function doesLizzardWin(compareEl) {
    if (compareEl === "spock" || compareEl === "paper") {
        return true;
    } else {
        return false;
    }
}


function randomAppChoice() {
    const possibleChoice = ["paper", "scissors", "rock", "spock", "lizzard"];
    return choiceParser(randomItem(possibleChoice));
}

function choiceParser(choice) {
    let obj = {};
    obj.choice = choice;
    obj.isPaper = isPaper(choice);
    obj.isScissors = isScissors(choice);
    obj.isRock = isRock(choice);
    obj.isSpock = isSpock(choice);
    obj.isLizzard = isLizzard(choice);
    return obj;
}

function isPaper(choice) {
    if (choice === "paper") {
        return true;
    } else {
        return false;
    }
}
function isRock(choice) {
    if (choice === "rock") {
        return true;
    } else {
        return false;
    }
}
function isScissors(choice) {
    if (choice === "scissors") {
        return true;
    } else {
        return false;
    }
}
function isSpock(choice) {
    if (choice === "spock") {
        return true;
    } else {
        return false;
    }
}
function isLizzard(choice) {
    if (choice === "lizzard") {
        return true;
    } else {
        return false;
    }
}

app.listen(3000);