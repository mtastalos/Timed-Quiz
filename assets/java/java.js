//array of question objects
var questions =[
    //	&lt;	&gt;
    {question:"Which tag marks the start of an html document?", choices:["&lt;html&gt;", "&lt;body&gt;", "&lt;header&gt;", "&lt;head&gt;"], answer:0},
    {question:"What tag is uses to indicate a new line?", choices:["An empty &lt;p&gt; tag", "&lt;/break&gt", "An empty &lt;div&gt", "&lt;/br&gt"], answer:3},
    {question:"Which character is used to indicate an end tag?", choices:["]", ")", "'", "/"], answer:3},
    {question:"A boolean can be either ____", choices:["Yes/No", "True/False", "Correct/False", "True/Null"], answer:1},
    {question:"Which element would you use to implement JavaScript into your HTML from an external JS file?", choices:["&lt;link&gt", "&lt;source&gt", "&lt;script&gt", "All the above"], answer:2},
    {question:"Which element can you write text in?", choices:["&lt;div&gt", "&lt;h1&gt", "&lt;p&gt", "All the above"], answer:3},
    {question:"To change the text found on the browser's tab, which element would you use?", choices:["&lt;head&gt", "&lt;header&gt", "&lt;title&gt", "&lt;name&gt"], answer:2},
    {question:"CSS or Cascading Style Sheets will execute from ____", choices:["Top to bottom", "Right to left", "Left to right", "None of the above"], answer:0},
    {question:"'*', '=', '+', and '-' are examples of ____ in JavaScript", choices:["Operators", "Math", "Characters", "Symbols"], answer:0},
    {question:"for(i=0;i<=10;i++){console.log('i') \n What will the console display}", choices:["It will display i incrementally number 9 times", "Run into an error", "It will display the same number 10 times", "It will display i incrementally number 10 times"], answer:3}
];

var content = document.querySelector("#quiz-box");
//question iteration 
var iteration = 0;
var score = 0;
var time =75;
let timer;
var highscores = [];

//Home Page
function homePage() {
    displayHighscoreLink(true);
    countDown('reset');
    $('.answer-result').remove();
    iteration = 0;
    score = 0;
    var homeScreen = $(
        '<h2>Coding Quiz Challenge</h2>'+
        '<p>You are about to start a timed quiz that will have question coding related!</p>'+
        '<button class="start">Start Quiz!</button>'
        );
    $("#quiz-box").append(homeScreen);
}

//High scores (link in head)
function displayHighscoreLink(display){
    if (display){
        $('.highscore').text('View High Scores');
    }
    else {
        $('.highscore').text('');
    }
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
    else if (controller=='reset'){
        $('.timer').html('Time: 0');
    }
    else if (controller=="clear"){
        $('.timer').html('');
    }
}

//removes current content in quiz-box
function removeContent(){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }

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
    $('.answer-result').remove();
    //adds created content to form
    $(".quiz-container").append(resultContainer.append(result));  
});

//high score button click event
$('#header').on('click', '.highscore' , function(event) {
    event.preventDefault();
    displayHighscoreLink(false);
    $('.answer-result').remove();
    countDown("stop");
    HighScoreBoard();
});

//go back button click event
$('#quiz-box').on('click', '.go-back' , function(event) {
    event.preventDefault();
    removeContent()
    homePage();
});

//clear local storage click event 
$('#quiz-box').on('click', '.clear-highscores' , function(event) {
    event.preventDefault();
    localStorage.clear();
    HighScoreBoard();

});

homePage();