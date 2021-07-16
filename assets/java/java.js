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
    {question:"This is the question 9 text", choices:["Option1", "Option2", "Option3", "Option4"], answer:1}
];

var content = document.querySelector("#quiz-box");
//question iteration 
var iteration = 0;
var score = 0;

//removes current content in quiz-box
function removeContent(){
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }

}

//populate quiz-box with multiple choice questions
function generateQuestion() {
    if(iteration<questions.length){
        var questionNumber = iteration;
        removeContent(content);
        
        var questionPrompt = $('<h2>'+questions[questionNumber].question+'</h2>');
        $('#quiz-box').append(questionPrompt);


        var questionChoices = $('<div class="choices">');
        $("#quiz-box").append(questionChoices);

        for (n=0;n<questions[questionNumber].choices.length;n++){
            var questionBtn = $('<button class="choice-option">'+questions[questionNumber].choices[n]+'</button>');
            questionBtn.attr('data-question-option',n);
            $(".choices").append(questionBtn);
        }
        iteration++;
    }
}

//question option click event
$("#quiz-box").on('click', '.choice-option' , function(event) {
    event.preventDefault();
    var selectedAnswer = $(this).attr('data-question-option');
    var correctAnwser = questions[iteration].answer;
    var resultContainer = $('<div class="answer-result">')
    var result = $('<p>');
    if (selectedAnswer == correctAnwser) {
        result.text('Correct!');
        score++;
    }
    else {
        result.text('Wrong...');
    }
    removeContent();
    generateQuestion();
    $("#quiz-box").append(resultContainer.append(result));
});

//reset quiz ------------ combined with start, if not nessessary
function reset() {
    iteration = 0;
    score = 0;
}


//start quiz
function startQuiz(){
    reset();
    generateQuestion();
}




//populate quiz-box with total and allow test taker to enter name in to save score 

//populate quiz-box with score screen  