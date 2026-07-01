const questions = [
    {
        question: "Era melhor ter ido assistir o jogo do:?",
        answers: ["Brasil", "Pelé", "Nenhum, futebol paia"],
        correct: 1
    },
    {
        question: "Qual o seu filho favorito??",
        answers: ["Jonatas", "Jaqueline", "Nenhum, amo os meus dois filhos igualmente"],
        correct: 2
    },
    {
        question: "Everaldo é:",
        answers: ["Paizão", "Palhaço", "Impossível", "Herói", "Amigo", "Todas as anteriores"],
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
    
    // Confetes ao abrir o bolo
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
}

function blowCandles() {
    // Apaga as chamas das velas
    document.querySelectorAll('.candle').forEach(candle => {
        candle.classList.add('extinguished');
    });

    // Pequena explosão de confetes nos cantos ao soprar
    if (typeof confetti === 'function') {
        confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 } });
    }

    // Espera 2 segundos com as velas apagadas e vai para a tela do pedido (Screen 6)
    setTimeout(() => {
        goToScreen(6);
        
        // Espera 5 segundos na tela do pedido e vai para a carta (Screen 7)
        setTimeout(() => {
            goToScreen(7);
            if (typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }, 5000);
    }, 2000);
}

// LÓGICA DO CARTÃO RASPADINHA (SISTEMA CANVAS)
function initScratchCard() {
    goToScreen(9);
    
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Desenha a camada cinza por cima
    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adiciona um texto por cima para indicar que é para raspar
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('💡 Raspe aqui com o dedo', canvas.width / 2, canvas.height / 2);

    // Função que apaga o cinza
    function scratch(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        // Suporte para mouse ou touch de celular
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2); // Tamanho do "dedo" que raspa
        ctx.fill();
    }

    // Eventos de Mouse
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    // Eventos de Touch (Celular)
    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratch);
}