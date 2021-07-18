//array of question objects
var questions =[
    {question:"This is the question 1 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 2 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 3 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 4 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 5 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 6 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 7 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 8 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 9 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1},
    {question:"This is the question 10 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1}

];

var content = document.querySelector("#quiz-box");
//question iteration 
var iteration = 0;
var score = 0;
var time =75;
let timer;
var highscores = [];

//High scores (link in head)
function displayHighscoreLink(display){
    if (display===true){
        $('.highscore').text('View High Scores');
    }
    else if (display===false)
        $('.highscore').text('');
}

//Count down (timer)
function countDown(controller){
    if(controller=="start"){
        timer = setInterval(function(){
            time--;
            $('.timer').html('Time: '+time);
        }, 1000);
    }
    else if (controller=="stop"){
        clearInterval(timer);
    }
    else if (controller=="clear"){
        $('.timer').html('');
    }
}

//Home Page
function homePage() {
    displayHighscoreLink(true);
    reset();
    var homeScreen = $(
        '<h2>Coding Quiz Challenge</h2>'+
        '<p>You are about to start a timed quiz that will have question coding related!</p>'+
        '<button class="start">Start Quiz!</button>'
        );
    $("#quiz-box").append(homeScreen);
}

//Question page
function generateQuestion() {
    if(iteration<questions.length){
        removeContent();
        var questionPrompt = $('<h3>'+questions[iteration].question+'</h3>');;
        var questionChoices = $('<div class="choices-container">');
        $("#quiz-box").append(questionChoices.append(questionPrompt));

        for (n=0;n<questions[iteration].choices.length;n++){
            var questionBtn = $('<button class="choice-option">'+questions[iteration].choices[n]+'</button>');
            questionBtn.attr('data-question-option',n);
            $(".choices-container").append(questionBtn);
        }
    }
}

//Results page
function resultsPage() {
    var finalScore = Math.round((score/questions.length)*100)
    var resultScreen = $(
        '<h4>All Done!</h4>'+
        '<p>Your final score is '+finalScore+'.</p>'+
        '<p>'+
            '<label for="initials">Enter in initials to your record score:</label>'+
            '<input type="text" name="initials" id="initials" placeholder="AAA"/>'+
            '<button class="submit">Submit</button>'+
        '</p>'
        );
    $("#quiz-box").append(resultScreen);
}

//High scores page
function HighScoreBoard() {
    removeContent();
    countDown('clear');
    displayHighscoreLink(false);
    var scoreBoard = $('<div class="scoreboard">');
    var scoreBoardTitle = $('<h5 class="scoreboardTitle">').text('High Scores');
    if(localStorage.getItem('scores')!=null){
        storageArr = JSON.parse(localStorage.getItem('scores'));
        storageArr.forEach(function(item) {
            var stats = $('<p>').text('. '+item.userInitial+' - '+ (item.score*10));
            $("#quiz-box").append(scoreBoardTitle,scoreBoard.append(stats));
        });
    }
    else{
        var stats = $('<p>').text('Currently no stats available, you can be the fist! Take the quiz and then come back here.');
        $("#quiz-box").append(scoreBoardTitle,scoreBoard.append(stats));
    }
    var goBackBtn = $('<button>').addClass('go-back').text('Go Back');
    var clearBtn = $('<button>').addClass('clear-highscores').text('Clear Highscores');
    var navButtons = $('<div>');
    $("#quiz-box").append(navButtons.append(goBackBtn,clearBtn));
}

//start button click event
$("#quiz-box").on('click', '.start' , function(event) {
    event.preventDefault();
    countDown('start');
    generateQuestion();
});

//submit button click event
$("#quiz-box").on('click', '.submit' , function(event) {
    event.preventDefault();   
    if($('#initials').val().trim().length!=3){
        window.alert("Please enter in only three characters for the scoreboard.")
        return;
    }
    $('.answer-result').remove();
    if(localStorage.getItem('scores')!=null){
        highscores = JSON.parse(localStorage.getItem('scores'));
    }
    var userInitial = $('#initials').val().trim();
    highscores.push({userInitial,score});
    localStorage.setItem('scores', JSON.stringify(highscores));
    HighScoreBoard()
});

//question answer button click event
$("#quiz-box").on('click', '.choice-option' , function(event) {
    event.preventDefault();   
    //creates containers for results
    var resultContainer = $('<div class="answer-result">');
    var result = $('<p>');

    //grabs answer selected and checks to see if it's correct
    var selectedAnswer = $(this).attr('data-question-option');
    var correctAnwser = questions[iteration].answer;
    if (selectedAnswer == correctAnwser) {
        result.text('Correct!');
        score++;
        time+=20;
    } else {
        result.text('Wrong...');
        time-=15
    }

    //checks to see if there are more questions, if not display resultPage
    if (iteration<questions.length-1){
        iteration++;
        generateQuestion();
    }
    else{
        removeContent();
        countDown("stop");
        resultsPage();
    }    
    //inplace to avoid error, can't delete something that doesn't exist
    if ($('.answer-result').length != 0){$('.answer-result').remove();}
    //adds created content to form
    $(".quiz-container").append(resultContainer.append(result));  
});

//high score button click event
$('#header').on('click', '.highscore' , function(event) {
    event.preventDefault();
    displayHighscoreLink(false);
    HighScoreBoard();
});

//removes current content in quiz-box
function removeContent(){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }

}

//reset quiz ------------ combined with start, if not nessessary
function reset() {
    iteration = 0;
    score = 0;
}

homePage();