//array of question objects
var questions =[
    {question:"Which tag marks the start of an html document?", choices:["&lt;html&gt;", "&lt;body&gt;", "&lt;header&gt;", "&lt;head&gt;"], answer:0},
    {question:"What tag is uses to indicate a new line?", choices:["An empty &lt;p&gt; tag", "&lt;/break&gt", "An empty &lt;div&gt", "&lt;/br&gt"], answer:3},
    {question:"Which character is used to indicate an end tag?", choices:["]", ")", "'", "/"], answer:3},
    {question:"A boolean can be either ____", choices:["Yes/No", "True/False", "Correct/False", "True/Null"], answer:1},
    {question:"Which element would you use to implement JavaScript into your HTML from an external JS file?", choices:["&lt;link&gt", "&lt;source&gt", "&lt;script&gt", "All the above"], answer:2},
    {question:"Which element can you write text in?", choices:["&lt;div&gt", "&lt;h1&gt", "&lt;p&gt", "All the above"], answer:3},
    {question:"To change the text found on the browser's tab, which element would you use?", choices:["&lt;head&gt", "&lt;header&gt", "&lt;title&gt", "&lt;name&gt"], answer:2},
    {question:"CSS or Cascading Style Sheets will execute from ____.", choices:["Top to bottom", "Right to left", "Left to right", "None of the above"], answer:0},
    {question:"'*', '=', '+', and '-' are examples of ____ in JavaScript.", choices:["Operators", "Math", "Characters", "Symbols"], answer:0},
    {question:"for(i=0;i<=10;i++){console.log('i')}    What will the console display?", choices:["It will display i incrementally number 9 times", "Run into an error", "It will display the same number 10 times", "It will display i incrementally 10 times"], answer:3}
];

var iteration = 0;
var score = 0;
var time = 90;
let timer;
var highscores = [];
var loop = true;

//Home Page
function homePage() {
    displayHighscoreLink(true);
    countDown('reset');
    $('.answer-result').remove();
    var homeScreen = $(
        '<h1>Coding Quiz Challenge</h1>'+
        '<p>You are about to start a timed quiz that will have questions pertaining to coding. During this quiz you will only have 90 seconds to answer all ten questions. '+
        'Wrong answers will descrease the remaining time so make sure to answer them quickly but also accurately! When you are ready click the button below to start the quiz.</p>'+
        '<button class="start">Start Quiz!</button>'
        );
    $("#quiz-box").append(homeScreen);
}

//High scores (link in head)
function displayHighscoreLink(display){
    //--this will remove button from header when viewing the scoreboard
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
            if(time<0){
                removeContent();
                resultsPage();
                window.alert("BZZZZ! You ran out of time!");
                clearInterval(timer);
            }
            else{
                $('.timer').html('Time: '+time);
            }
            time--;
        }, 1000);
    }
    else if (controller=='minus'){
        time-=10;
        if(time<0){
            removeContent();
            resultsPage();
            window.alert("BZZZZ! All those wrong questions ate up all your time!");
            clearInterval(timer);
            $('.timer').html('Time: 0');
            return loop=false;
        }
        $('.timer').html('Time: '+time);
    }
    else if (controller=='stop'){
        clearInterval(timer);
    }
    else if (controller=='reset'){
        $('.timer').html('Time: 0');
    }
    else if (controller=="clear"){
        $('.timer').html('');
    }
}

//removes current content in quiz-box div
function removeContent(){
    var content = document.querySelector("#quiz-box");
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
}

//Question page
function generateQuestion(loop) {
    if (loop){
        if(iteration<questions.length){
            removeContent();
            var questionPrompt = $('<h2>'+questions[iteration].question+'</h2>');;
            var questionChoices = $('<div class="choices-container">');
            $("#quiz-box").append(questionChoices.append(questionPrompt));
    
            for (n=0;n<questions[iteration].choices.length;n++){
                var questionBtn = $('<button class="choice-option">'+questions[iteration].choices[n]+'</button>');
                questionBtn.attr('data-question-option',n);
                $(".choices-container").append(questionBtn);
            }
        }
    }
    
}

//Results page
function resultsPage() {
    var finalScore = Math.round((score/questions.length)*100)
    var resultScreen = $(
        '<h3>Results!</h3>'+
        '<p>Your final score is '+finalScore+'.</p>'+
        '<p>'+
            '<label for="initials">Enter in initials to record your score: </label>'+
            '<input type="text" name="initials" id="initials" placeholder="AAA" size="3" style="text-align:center;"/>'+
            '<button class="submit">Submit</button>'+
        '</p>'
        );
    $("#quiz-box").append(resultScreen);
}

//High scores page
function HighScoreBoard() {
    //--removes current content, score board link, and timer.
    removeContent();
    countDown('clear');
    displayHighscoreLink(false);
    var scoreBoard = $('<div class="scoreboard">');
    var scoreBoardTitle = $('<h4 class="scoreboardTitle">').text('High Scores');
    //--check for localStorage, then displays them based on score (highest to lowiest). If no scores are found display message
    if(localStorage.getItem('scores')!=null){
        storageArr = JSON.parse(localStorage.getItem('scores'));
        storageArr.sort((a, b) => {
            if(a.score < b.score){return 1}
            else{return -1}})
        storageArr.forEach(function(item, index) {
            var stats = $('<p>').text((index+1)+'. '+item.userInitial+' - '+ (item.score*10));
            $("#quiz-box").append(scoreBoardTitle,scoreBoard.append(stats));
            
        });
    }
    else{
        var stats = $('<p>').text('Currently no stats available, but you can be the first! Take the quiz and then come back here.');
        $("#quiz-box").append(scoreBoardTitle,scoreBoard.append(stats));
    }
    //--adds buttons to go back to home or to clear score board 
    var goBackBtn = $('<button>').addClass('go-back').text('Go Back');
    var clearBtn = $('<button>').addClass('clear-scores').text('Clear Scores');
    var navButtons = $('<div class="buttons">');
    $("#quiz-box").append(navButtons.append(goBackBtn,clearBtn));
}

//Start quiz button click event
$("#quiz-box").on('click', '.start' , function(event) {
    //--resets varialbes 
    event.preventDefault();
    iteration = 0;
    score = 0;
    time= 90;
    loop=true; 
    countDown('start');
    generateQuestion(loop);
});

//Submit results button click event
$("#quiz-box").on('click', '.submit' , function(event) {
    //--checks initial's value, then stores value with score as an object in an array
    event.preventDefault();   
    if($('#initials').val().trim().length!=3){
        window.alert("Please enter in only three characters for the scoreboard.")
        return;
    }
    $('.answer-result').remove();
    if(localStorage.getItem('scores')!=null){
        highscores = JSON.parse(localStorage.getItem('scores'));
    }
    var userInitial = $('#initials').val().trim().toUpperCase();
    highscores.push({userInitial,score});
    localStorage.setItem('scores', JSON.stringify(highscores));
    HighScoreBoard()
});

//Question option button click event
$("#quiz-box").on('click', '.choice-option' , function(event) {
    event.preventDefault();   
    var resultContainer = $('<div class="answer-result">');
    var result = $('<p>');

    //--grabs answer selected and checks to see if it's correct
    var selectedAnswer = $(this).attr('data-question-option');
    var correctAnwser = questions[iteration].answer;
    if (selectedAnswer == correctAnwser) {
        result.text('Correct!');
        score++;
    } else {
        result.text('Wrong...');
        countDown('minus');
    }

    //--loops through question arraym then display result page
    if (iteration<questions.length-1){
        iteration++;
        generateQuestion(loop);
    }
    else{
        removeContent();
        countDown("stop");
        resultsPage();
    }    
    $('.answer-result').remove();
    $(".quiz-container").append(resultContainer.append(result));  
});

//High score button click event
$('#header').on('click', '.highscore' , function(event) {
    //--navigates to score board page
    event.preventDefault();
    displayHighscoreLink(false);
    $('.answer-result').remove();
    countDown("stop");
    HighScoreBoard();
});

//Go back button click event
$('#quiz-box').on('click', '.go-back' , function(event) {
    //--navigate back to home page
    event.preventDefault();
    removeContent();
    homePage();
});

//Clear score button click event 
$('#quiz-box').on('click', '.clear-scores' , function(event) {
    //--clears local storage 
    event.preventDefault();
    localStorage.clear();
    HighScoreBoard();

});

homePage();