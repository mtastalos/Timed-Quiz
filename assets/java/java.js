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
function removeContent(content){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
}

//populate quiz-box with multiple choice questions
function generateQuestion(i) {
    var questionNumber = i;
    removeContent(content);
    var questionRow = $("#quiz-box").append("<p>"+i+"</p>");
    iteration++;
}

//reset quiz


//start quiz
function startQuiz(){
    if (iteration<questions.length){
        generateQuestion(iteration);
    }
}




//populate quiz-box with total and allow test taker to enter name in to save score 

//populate quiz-box with score screen  