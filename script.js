document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const options = document.querySelectorAll('.option');
    const questionImage = document.getElementById('question-image');
    const scoreDisplay = document.getElementById('score');
    const timeTakenDisplay = document.getElementById('time-taken');
    
    let questions = [
        { image: './img/jpg.jpg', options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'], correct: 1 },
        { image: 'image2.jpg', options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'], correct: 3 },
        // Agrega más preguntas según sea necesario
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let startTime;

    function showScreen(screen) {
        startScreen.classList.remove('visible');
        quizScreen.classList.remove('visible');
        resultScreen.classList.remove('visible');
        screen.classList.add('visible');
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        startTime = new Date();
        showScreen(quizScreen);
        showQuestion();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionImage.src = question.image;
        options.forEach((button, index) => {
            button.textContent = question.options[index];
            button.onclick = () => checkAnswer(index);
        });
        nextButton.classList.add('hidden');
    }

    function checkAnswer(selected) {
        if (selected === questions[currentQuestionIndex].correct) {
            score++;
        }
        nextButton.classList.remove('hidden');
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    });

    function endQuiz() {
        const endTime = new Date();
        const timeTaken = Math.round((endTime - startTime) / 1000);
        scoreDisplay.textContent = `Puntaje: ${score} / ${questions.length}`;
        timeTakenDisplay.textContent = `Tiempo: ${timeTaken} segundos`;
        showScreen(resultScreen);
    }

    startButton.addEventListener('click', startQuiz);

    showScreen(startScreen);
});
