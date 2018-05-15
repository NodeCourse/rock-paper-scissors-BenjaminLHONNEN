const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const randomItem = require('random-item');
const data = require('./data.json');

let dataObject = {};
let possibleChoice = [];
for (let p = 0; p < data.length; p++) {
    let item = data[p];
    possibleChoice.push(item.id);
    dataObject[item.id] = {
        "id": item.id,
        "imgSrc": item.imgSrc,
        "winAgaints": item.winAgaints,
    };
}

// Use Pug to render views
app.set('view engine', 'pug');

// Serve assets from the public folder
app.use(express.static('public'));

// Decode form data
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON body
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('homepage', {data: data});
});

app.get('/result/:choice', (req, res) => {
    const choice = req.params.choice;
    if (possibleChoice.indexOf(choice) !== -1) {
        let appChoice = randomAppChoice();
        let obj = {
            result: doesFirstChoiceWin(choice, appChoice),
            app: dataObject[appChoice],
            user: dataObject[choice]
        };
        res.render('result', {obj: obj});
    }
});

function doesFirstChoiceWin(choice1, choice2) {
    if (dataObject[choice1]['winAgaints'].indexOf(choice2) !== -1) {
        return "Gagné !"
    } else if (dataObject[choice2]['winAgaints'].indexOf(choice1) !== -1) {
        return "Perdu !"
    } else {
        return "Egalité !"
    }
}

function randomAppChoice() {
    return randomItem(possibleChoice);
}

app.listen(3000);