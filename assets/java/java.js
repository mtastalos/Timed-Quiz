//array of question objects
var questions =[
    {question:"This is the question 1 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 2 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 3 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 4 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 5 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 6 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 7 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 8 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1},
    {question:"This is the question 9 text", choices:["Option1", "Option2", "Option3", "Option4"], anwer:1}
];

var content = document.querySelector("#quiz-box");
//question iteration 
var iteration = 0;

//removes current content in quiz-box
function removeContent(){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }

}

//populate quiz-box with multiple choice questions
function generateQuestion() {
    var questionNumber = iteration;
    removeContent(content);
    // var layout = $('<div id="container">');
    // $("#quiz-box").append(layout);
    
    var questionPrompt = $('<h2>'+questions[questionNumber].question+'</h2>');
    $("#quiz-box").append(questionPrompt);


    var questionChoices = $('<div class="choices">');
    $("#quiz-box").append(questionChoices);

    for (n=0;n<questions[questionNumber].choices.length;n++){
        var radioBtn = $('<input type="radio" name="question-choice" id="q'+questionNumber+'">');
        var questionText = $('<label for="q'+questionNumber+'">'+questions[questionNumber].choices[n]+'</label>');
        $(".choices").append(radioBtn,questionText);

    }


    iteration++;
    // var questionRow = $("#quiz-box").append("<p>"+i+"</p>");
    // var question = $('<div class="prompt">');
    // $("#quiz-box").append(question);

}

//reset quiz
function reset() {
    iteration = 0;
}


//start quiz
function startQuiz(){
    if (iteration<questions.length){
        generateQuestion();
    }
}




//populate quiz-box with total and allow test taker to enter name in to save score 

//populate quiz-box with score screen  