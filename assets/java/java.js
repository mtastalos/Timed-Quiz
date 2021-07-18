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

//Home Page
function homePage() {
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
        var questionPrompt = $('<h2>'+questions[iteration].question+'</h2>');;
        var questionChoices = $('<div class="choices-container">');
        $("#quiz-box").append($('<div class="choices-container">').append(questionPrompt));

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
        '<h3>All Done!</h3>'+
        '<p>Your final score is '+finalScore+'.</p>'+
        '<p>'+
            '<label for="initials">Enter in initials to your record score:</label>'+
            '<input type="text" name="initials" id="initials" placeholder="AAA"/>'+
            '<button class="submit">Submit</button>'+
        '</p>'
        );
    $("#quiz-box").append(resultScreen);
}

//Scoreboard page
function scoreBoard() {
    removeContent();
    var scoreBoard = $('<div class="scoreboard">');
    storageArr = JSON.parse(localStorage.getItem('scores'));
    storageArr.forEach(function(item) {
        let stats = $('<p>').text('. '+item.userInitial+' - '+ (item.score*10));

        $("#quiz-box").append(scoreBoard.append(stats));
    });
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
}


//start button click event
$("#quiz-box").on('click', '.start' , function(event) {
    countDown('start');
    event.preventDefault();
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
    var userInitial = $('#initials').val().trim();
    console.log(highscores);
    highscores.push({userInitial,score});
    localStorage.setItem('scores', JSON.stringify(highscores));
    scoreBoard()
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