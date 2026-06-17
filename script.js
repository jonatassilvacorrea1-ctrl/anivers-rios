const questions = [
    {
        question: "Quem o Jonatas ama mais?",
        answers: ["Eliane", "Pietro", "O Jonatas ama os dois igualmente"],
        correct: 2
    },
    {
        question: "Qual a melhor comida?",
        answers: ["Carne", "Farofa de Frango Empanado", "Calabresa"],
        correct: 1
    },
    {
        question: "Eliane é:",
        answers: ["Maravilhosa", "Chorona", "Linda", "Vaca", "Inteligente", "Todas as anteriores"],
        correct: 5
    }
];

let currentQuestion = 0;

function goToScreen(number) {
    document.querySelectorAll('.screen').forEach(screen => 
        screen.classList.remove('active')
    );
    document.getElementById(`screen${number}`).classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    goToScreen(3);
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question-counter").textContent = 
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    document.getElementById("question").textContent = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;

        btn.onclick = () => {
            if (index === q.correct) {
                currentQuestion++;
                document.getElementById("error").textContent = "";

                if (currentQuestion >= questions.length) {
                    goToScreen(4);
                } else {
                    loadQuestion();
                }
            } else {
                document.getElementById("error").textContent = "❌ Resposta errada!";
            }
        };
        answersDiv.appendChild(btn);
    });
}

function showCake() {
    goToScreen(5);
    const music = document.getElementById("music");
    music.play().catch(() => {});
}

function blowCandles() {
    document.querySelector(".candles").innerHTML = "💨";

    setTimeout(() => {
        goToScreen(6);
        setTimeout(() => {
            goToScreen(7);
        }, 5000);
    }, 1500);
}