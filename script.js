const questions = [
    {
        question: "Qual a melhor fala?",
        answers: ["Cocoricorihaaaaaaaa", "Quiridu", "Só uma depenadinha"],
        correct: 0
    },
    {
        question: "Qual o filho favorito da Indira?",
        answers: ["Capi", "Amora", "Ela não tem filhos favoritos, amo todos igualmente"],
        correct: 1
    },
    {
        question: "Jonas é:",
        answers: ["Gay", "Incrível", "Hétero"],
        correct: 2
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