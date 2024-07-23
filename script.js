document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const options = document.querySelectorAll('.option');
    const questionImage = document.getElementById('question-image');
    const scoreDisplay = document.getElementById('score');
    const questionText = document.getElementById('question-text');
    const feedbackText = document.getElementById('feedback');
    const usernameInput = document.getElementById('username');
    const resultHeader = document.getElementById('result-header');
    const backgroundMusic = document.getElementById('background-music');
    const buttonSound = document.getElementById('button-sound');
    const crowdSound = document.getElementById('crowd-sound');

    let questions = [
        { image: './img/jpg.jpg', question: '¿Como se llama este adorable pez?', options: ['Adolfito', 'Jaimito', 'Juanito', 'Pecesito'], correct: 2 },
        { image: './img/image1.jpg', question: '¿De que año es esta fotografía?', options: ['2014', '2015', '2016', '2017'], correct: 0 },
        { image: './img/jpg2.jpg', question: '¿En que mes me mudé?', options: ['Enero', 'Noviembre', 'Febrero', 'Diciembre'], correct: 3 },
        { image: './img/jpg3.jpg', question: '¿Que mes cumple años Zoe?', options: ['Julio', 'Agosto', 'Septiembre', 'Marzo'], correct: 1 },
        { image: './img/jpg4.jpg', question: '¿Como se llama el guardavidas pelado de esta pileta?', options: ['Ulises', 'Juanchi', 'Santiago', 'Luisito'], correct: 0 },
        { image: './img/jpg6.jpg', question: '¿En que contexto se tomó esta fotografía?', options: ['Cumpleaños Santi', 'Cumpleaños Facu', 'Navidad', 'Reyes Magos'], correct: 2 },
        { image: './img/jpg7.jpg', question: '¿Como se llama este adorable gato?', options: ['Juanito', 'Tito', 'Memameu', 'Napoleon'], correct: 3 },
        { image: './img/jpg8.jpg', question: '¿De que año es esta fotografía?', options: ['2014', '2016', '2015', '2017'], correct: 1 },
        { image: './img/jpg9.jpg', question: '¿En donde se tomó esta fotografía?', options: ['Córdoba', 'Tandil', 'Brasil', 'Catamarca'], correct: 2 },
        { image: './img/jpg5.jpg', question: '¿Como se llama este animal?', options: ['Bandurria', 'Chimango', 'Cacamacho', 'Churruen'], correct: 0 },
        { image: './img/jpg10.jpg', question: '¿De que año es esta fotografía?', options: ['1994', '1992', '1996', '1990'], correct: 1 },
        { image: './img/jpg11.jpg', question: '¿Que mes se casaron Mami y Papi?', options: ['Marzo', 'Agosto', 'Octubre', 'Noviembre'], correct: 3 },
        { image: './img/jpg12.jpg', question: '¿Cuantas especies de hipopotamos existen?', options: ['2', '6', '12', '18'], correct: 0 },
        { image: './img/jpg13.jpg', question: '¿Como se llama la cuadra de Aranjuez donde vivíamos?', options: ['Castellana', 'Bartolomé de las Casas', 'Arturo Frondizi', 'Bernardo Irigoyen'], correct: 1 },
        { image: './img/jpg14.png', question: '¿En que mes cumple años Lorenzo (hijo de Flor)?', options: ['Octubre', 'Noviembre', 'Septiembre', 'Agosto'], correct: 2 },
        { image: './img/jpg15.png', question: '¿En que año abrió La Volcan?', options: ['1957', '1959', '1962', '1976'], correct: 0 },
        { image: './img/jpg16.png', question: '¿Donde estudió Santiago?', options: ['CAEAN', 'CIC', 'UACA', 'UNSEM'], correct: 1 },
        { image: './img/jpg17.jpg', question: '¿Como se llamaba la quinta de Cardales?', options: ['Sotomayor', 'San Jorge', 'Cordillera', 'Pehumayen'], correct: 3 },
        { image: './img/jpg18.jpg', question: '¿Como se llamaba esta panchería?', options: ['Pehuamar', 'Bristol', 'Lo de Tito', 'Pompeya'], correct: 1 },
        { image: './img/final.jpg', question: 'Por último... ¿Cual era el nombre de este gato?', options: ['Tinte', 'Menzo', 'Boris', 'Tomás'], correct: 2 },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hay que ingresar nombre de usuario para comenzar el quiz",
                footer: "Beldi´s Quiz"
            })
            return;
        }
        Swal.fire({
            icon: "warning",
            title: "Empezamos pero... ¡Cuidado!",
            text: "Una vez elegida una opción, no se podrá modificar",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                currentQuestionIndex = 0;
                score = 0;
                showScreen(quizScreen);
                backgroundMusic.play();  // Iniciar la música
                showQuestion();
            }
        });
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionImage.src = question.image;
        questionText.textContent = question.question;
        options.forEach((button, index) => {
            button.textContent = question.options[index];
            button.onclick = () => {
                buttonSound.play(); // Reproducir el sonido del botón
                checkAnswer(index);
            };
            button.disabled = false; // Habilitar el botón
        });
        nextButton.classList.add('hidden');
    }

    function checkAnswer(selected) {
        options.forEach(button => button.disabled = true); // Deshabilitar todas las opciones
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
        scoreDisplay.textContent = `Respuestas correctas: ${score} / ${questions.length}`;
        resultHeader.textContent = `Resultado de ${username}`;
        backgroundMusic.pause();  // Detener la música de fondo
        backgroundMusic.currentTime = 0;  // Reiniciar la música al principio
        crowdSound.play();  // Reproducir el sonido de la multitud
        showScreen(resultScreen);
    }

    startButton.addEventListener('click', startQuiz);

    showScreen(startScreen);
});