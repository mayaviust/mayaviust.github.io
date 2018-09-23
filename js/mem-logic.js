//game vars
var numTries = 0;
var numMatches = 0;
var gameStart;
var gameEnd;

var attempt = function(number, time) {
    this.number = number;
    this.time = time;
}

var match = function(number, time) {
    this.number = number;
    this.time = time;
}

//user stats arrays
var tries = [];
var matches = [];

var cols = 5;
var rows = 4;

//tile object definitions
var card = function(word, id, isFaceUp) {
    this.word = word;
    this.id = id;
    this.isFaceUp = isFaceUp;
}

//words array
var words = [
    "ALSO",
    "STEP",
    "TURN",
    "ROLL",
    "BEST",
    "CARE",
    "DEAR",
    "FROM",
    "PUSH",
    "EVER"
];

var cards = [new card('temp')];
var selected = [];
var flipped = [];

var shuffleArray = function(array) {
    var counter = array.length;

    //while there are elements in the array
    while (counter > 0) {
        //pick a random index
        var index = Math.floor(Math.random() * counter);
        counter--;
        //swap last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
};

function cardClicked(tile) {

    //log attempt
    var d = new Date();
    var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        + '.' + d.getMilliseconds();

    if (tile.isFaceUp === false) {
        //log attempt
        tries.push(new attempt(++numTries, time));
        flipped.push(tile);
        if (flipped.length <= 2) {
            tile.isFaceUp = true;
            $('#' + tile.id).addClass("picked");

            //two cards selected. check for match
            if (flipped.length === 2) {
                if (flipped[0].word === flipped[1].word) { //match made
                    //log match
                    matches.push(new match(++numMatches, time));
                    for (var i = 0; i < 2; i++) {
                        $('#' + flipped[i].id).addClass('matched');
                        $('#' + flipped[i].id).removeClass('picked');
                    }
                    flipped.pop();
                    flipped.pop();
                    if (numMatches === 10) {
                        endGame(time);
                    }
                } else { //match not made
                    setTimeout(function(){
                        $('.card').removeClass('picked');
                    }, 700);
                    for (var i = 0; i < 2; i++) {
                        flipped[i].isFaceUp = false;
                    }
                    flipped.pop();
                    flipped.pop();
                }
            }
        } else {
            $('#' + tile.id).addClass("picked");
            tile.isFaceUp = true;
            flipped.pop();
            flipped.pop();
            flipped.push(tile);
        }
    }
}

//functionality setup ie defining cards and behavior on click
function setup() {
    //set tiles array

    for (var i = 0; i < 10; i++) {
        var possibleFaces = words.slice(0);
        //randomly pick a face
        var randomInd = Math.floor(Math.random() * possibleFaces.length);
        var word = possibleFaces[randomInd];
        //push 2 copies onto array
        selected.push(word);
        selected.push(word);
        //remove from array
        words.splice(randomInd, 1);
    }

    //shuffle cards
    shuffleArray(selected);

    cards.pop();

    var curr_card = 0;

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var randomFace = selected.pop();
            var tile = new card(randomFace, curr_card++, false);
            cards.push(tile);
        }
    }
}

function afterTen() {
    $('body').css('color', 'blue');
}

function buildHTML() {
    var frag = '';

    //for each card ie for loop cards.length, id = word
    for (var i = 0; i < 20; i++) {
        frag += '<div class="card" id="' + cards[i].id + '"><h1>'
            + cards[i].word + '</h1></div>';
    }

    return frag;
}

function drawGame() {
    $('.startScreen').css('display', 'none');
    $('.endScreen').css('display', 'none');
    $('.game').css('height', '100%');
    $('body').css('color', 'white');
    setTimeout(function(){afterTen()}, 1000 * 5);
    setup();
    $('.game').append(buildHTML());

    var card_width = ($('.card').width() * 0.375) + 'px';

    $('.card').css('left', card_width);

    $('.card').click(function(event){
        var id = $(event.target).attr('id');
        if (id === undefined) {
            id = $(event.target).parent().attr('id');
        }
        cardClicked(cards[id]);
    });
}

function printArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log("\t" + arr[i].number + ": " + arr[i].time);
    }
}

function endGame(now) {
    $('.game').css('display', 'none');
    $('.endScreen').css('display', 'block')

    gameEnd = now;
    var start = tries[0].time.split(":");
    var end = now.split(":");

    var h = parseFloat(end[0]) - parseFloat(start[0]);
    var m = parseFloat(end[1]) - parseFloat(start[1]);
    var s = parseFloat(end[2]) - parseFloat(start[2]);

    var completed = h * 3600 + m * 60 + s;

    $("#time").html(completed + " seconds");
}

$(document).ready(() => {
    $('.start').click(() => {
        //show words for 10 seconds
        var d = new Date();
        gameStart = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
            + '.' + d.getMilliseconds();
        drawGame();
    });
});
