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
    const questionText = document.getElementById('question-text');
    const feedbackText = document.getElementById('feedback');
    const usernameInput = document.getElementById('username');
    const resultHeader = document.getElementById('result-header');

    let questions = [
        { image: './img/jpg.jpg', question: '¿Como se llama este adorable pez?', options: ['Adolfito', 'Jaimito', 'Juanito', 'Pecesito'], correct: 2 },
        { image: './img/jpg10.jpg', question: '¿De que año es esta fotografía?', options: ['2014', '2015', '2016', '2017'], correct: 0 },
        { image: './img/jpg2.jpg', question: '¿En que mes me mudé?', options: ['Enero', 'Noviembre', 'Febrero', 'Diciembre'], correct: 3 },
        { image: './img/jpg3.jpg', question: '¿Que mes cumple años Zoe?', options: ['Julio', 'Agosto', 'Septiembre', 'Marzo'], correct: 1 },
        { image: './img/jpg4.jpg', question: '¿Como se llama el guardavidas pelado de esta pileta?', options: ['Ulises', 'Juanchi', 'Santiago', 'Luisito'], correct: 0 },
        { image: './img/jpg6.jpg', question: '¿En que contexto se tomó esta fotografía?', options: ['Cumpleaños Santi', 'Cumpleaños Facu', 'Navidad', 'Reyes Magos'], correct: 2 },
        { image: './img/jpg7.jpg', question: '¿Como se llama este adorable gato?', options: ['Juanito', 'Tito', 'Memameu', 'Napoleon'], correct: 3 },
        { image: './img/jpg8.jpg', question: '¿De que año es esta fotografía?', options: ['2014', '2016', '2015', '2017'], correct: 1 },
        { image: './img/jpg9.jpg', question: '¿En donde se tomó esta fotografía?', options: ['Córdoba', 'Tandil', 'Brasil', 'Catamarca'], correct: 2 },
        { image: './img/jpg5.jpg', question: '¿Como se llama este animal?', options: ['Bandurria', 'Chimango', 'Cacamacho', 'Churruen'], correct: 0 },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let startTime;
    let username = '';

    function showScreen(screen) {
        startScreen.classList.remove('visible');
        quizScreen.classList.remove('visible');
        resultScreen.classList.remove('visible');
        screen.classList.add('visible');
    }

    function startQuiz() {
        username = usernameInput.value.trim();
        if (username === '') {
            alert('Por favor, ingresa tu nombre.');
            return;
        }
        currentQuestionIndex = 0;
        score = 0;
        startTime = new Date();
        showScreen(quizScreen);
        showQuestion();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionImage.src = question.image;
        questionText.textContent = question.question;
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
        scoreDisplay.textContent = `Respuestas correctas: ${score} / ${questions.length}`;
        timeTakenDisplay.textContent = `Tiempo: ${timeTaken} segundos`;
        feedbackText.textContent = nota(score, timeTaken);
        resultHeader.textContent = `Resultado de ${username}`;
        showScreen(resultScreen);
    }

    function nota(score, timeTaken) {
        let notaCalculo = score === 0 ? 0 : timeTaken / score;
        let calificacion;

        if (score <= 2) {
            calificacion = "Mal";
        } else if (score <= 5) {
            if (notaCalculo <= 8) {
                calificacion = "Bien";
            } else if (notaCalculo <= 12) {
                calificacion = "Regular";
            } else {
                calificacion = "Mal";
            }
        } else {
            if (notaCalculo <= 8) {
                calificacion = "Excelente";
            } else if (notaCalculo <= 10) {
                calificacion = "Muy bien";
            } else if (notaCalculo <= 12) {
                calificacion = "Bien";
            } else if (notaCalculo <= 15) {
                calificacion = "Regular";
            } else {
                calificacion = "Mal";
            }
        }

        return `${calificacion}! Tu nota: ${notaCalculo.toFixed(2)}`;
    }

    startButton.addEventListener('click', startQuiz);

    showScreen(startScreen);
});
