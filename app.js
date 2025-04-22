var questions = [
    {
      question: "1. What does HTML stand for?",
      option1: "Hyperlinks and Text Markup Language",
      option2: "Hypertext Markup Language",
      option3: "Home Tool Markup Language",
      correctOption: "Hypertext Markup Language",
    },
    {
      question: "2. Who is making the Web standards?",
      option1: "Google",
      option2: "The World Wide Web Consortium",
      option3: "Microsoft",
      correctOption: "The World Wide Web Consortium",
    },
    {
      question: "3. Choose the correct HTML element for the largest heading:",
      option1: "<heading>",
      option2: "<h6>",
      option3: "<h1>",
      correctOption: "<h1>",
    },
    {
      question: "4. What is the correct HTML element for inserting a line break?",
      option1: "<linebreak>",
      option2: "<br>",
      option3: "<break>",
      correctOption: "<br>",
    },
    {
      question: "5. What is the correct HTML for adding a background color?",
      option1: '<body bg="yellow">',
      option2: "<background>yellow</background>",
      option3: '<body style="background-color:yellow;">',
      correctOption: '<body style="background-color:yellow;">',
    },
    {
      question: "6. Which tag is used to define an unordered list?",
      option1: "<ol>",
      option2: "<ul>",
      option3: "<li>",
      correctOption: "<ul>",
    },
    {
      question: "7. What does CSS stand for?",
      option1: "Cascading Style Sheets",
      option2: "Colorful Style Sheets",
      option3: "Creative Style System",
      correctOption: "Cascading Style Sheets",
    },
    {
      question: "8. Which HTML attribute is used to define inline styles?",
      option1: "font",
      option2: "style",
      option3: "class",
      correctOption: "style",
    },
  ];

  var getQues = document.getElementById("ques");
  var getOption1 = document.getElementById("opt1");
  var getOption2 = document.getElementById("opt2");
  var getOption3 = document.getElementById("opt3");
  var getBtn = document.getElementById("btn");
  var quizBox = document.getElementById("quiz-box");

  var index = 0;
  var score = 0;
  var timer;
  var timerDuration = 60;

  window.onload = function () {
    showQuestion();
  };

  function startTimer() {
    var countdown = timerDuration;
    clearInterval(timer);

    timer = setInterval(function () {
      document.getElementById("timer").innerText = `Time left: ${countdown}s`;

      if (countdown <= 0) {
        clearInterval(timer);
        autoNext();
      } else {
        countdown--;
      }
    }, 1000);
  }

  function showQuestion() {
    var q = questions[index];
    getQues.innerText = q.question;
    getOption1.innerText = q.option1;
    getOption2.innerText = q.option2;
    getOption3.innerText = q.option3;
    getBtn.disabled = true;
    clearOptions();
    startTimer();
  }

  function clearOptions() {
    var getInputs = document.getElementsByName("answer");
    getInputs.forEach((input) => (input.checked = false));
  }

  function enableNext() {
    getBtn.disabled = false;
  }

  function checkAnswer() {
    var selectedAnswer;
    var getInputs = document.getElementsByName("answer");

    for (var i = 0; i < getInputs.length; i++) {
      if (getInputs[i].checked) {
        selectedAnswer = document.getElementById("opt" + (i + 1)).innerText;
        break;
      }
    }

    if (selectedAnswer === questions[index].correctOption) {
      score++;
    }
  }

  function next() {
    clearInterval(timer);
    checkAnswer();
    index++;

    if (index >= questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }

  function autoNext() {
    Swal.fire({
      title: "Time's Up!",
      text: "Automatically moving to next question.",
      icon: "warning",
      timer: 1500,
      showConfirmButton: false,
    });

    checkAnswer();
    index++;

    if (index >= questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }

  function endQuiz() {
    clearInterval(timer);
    document.getElementById("timer").innerText = "";

    Swal.fire({
      title: "Quiz Finished!",
      html: `Your Score: <strong>${score}/${questions.length}</strong>`,
      icon: "success",
      confirmButtonText: "Restart Quiz",
    }).then(() => {
      location.reload();
    });
  }