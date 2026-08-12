let currentStation = null;
let currentTeam = localStorage.getItem("team") || "";
let score = Number(localStorage.getItem("score") || 0);

const completed = JSON.parse(localStorage.getItem("completed") || "{}");

document.getElementById("gameTitle").textContent = GAME.title;

function show(id) {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("adminScreen").style.display = "none";

    document.getElementById(id).style.display = "block";
}

function saveProgress() {
    localStorage.setItem("team", currentTeam);
    localStorage.setItem("score", score);
    localStorage.setItem("completed", JSON.stringify(completed));
}

function startGame() {
    currentTeam = document.getElementById("teamSelect").value;
    saveProgress();

    alert("Tým " + currentTeam + " je připraven. Teď naskenujte QR kód.");
}

document.getElementById("startButton").addEventListener("click", startGame);

function openStation(id, testMode = false) {
    currentStation = GAME.stations.find(s => s.id === Number(id));

    if (!currentStation) {
        alert("Stanoviště neexistuje.");
        return;
    }

    show("gameScreen");

    document.getElementById("stationTitle").textContent =
        currentStation.title;

    document.getElementById("stationQuestion").textContent =
        currentStation.question;

    document.getElementById("result").innerHTML = "";

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    if (currentStation.type === "choice") {
        currentStation.options.forEach((option, index) => {
            answers.innerHTML += `
                <label class="answerOption">
                    <input
                        type="radio"
                        name="answer"
                        value="${index}"
                    >
                    ${option}
                </label>
            `;
        });
    }

    if (currentStation.type === "text") {
        answers.innerHTML = `
            <input
                id="textAnswer"
                type="text"
                placeholder="Napište odpověď"
            >
        `;
    }

    if (currentStation.type === "task") {
        answers.innerHTML = `
            <div class="clueBox">
                Po splnění úkolu klikněte na Odeslat.
            </div>
        `;
    }

    document.getElementById("submitAnswer").dataset.test =
        testMode ? "1" : "0";
}

function answerIsCorrect() {
    if (currentStation.type === "choice") {
        const selected =
            document.querySelector('input[name="answer"]:checked');

        if (!selected) {
            alert("Vyberte odpověď.");
            return false;
        }

        return Number(selected.value) === currentStation.correct;
    }

    if (currentStation.type === "text") {
        const input = document.getElementById("textAnswer");

        if (!input || !input.value.trim()) {
            alert("Napište odpověď.");
            return false;
        }

        return input.value.trim().toLowerCase() ===
            String(currentStation.answer).trim().toLowerCase();
    }

    if (currentStation.type === "task") {
        return true;
    }

    return false;
}

function checkAnswer() {
    if (!currentStation) return;

    const testMode =
        document.getElementById("submitAnswer").dataset.test === "1";

    const result = document.getElementById("result");

    if (!answerIsCorrect()) {
        result.innerHTML =
            `<p class="bad">Špatně. Zkuste to znovu.</p>`;
        return;
    }

    if (testMode) {
        result.innerHTML = `
            <p class="good">Správně.</p>
            <p>TESTOVACÍ REŽIM – nic se neukládá.</p>
            <div class="clueBox">
                <strong>Indicie:</strong><br>
                ${currentStation.clue}
            </div>
        `;
        return;
    }

    if (completed[currentStation.id]) {
        result.innerHTML = `
            <p class="good">Toto stanoviště už máte splněné.</p>
            <div class="clueBox">
                <strong>Indicie:</strong><br>
                ${currentStation.clue}
            </div>
        `;
        return;
    }

    completed[currentStation.id] = true;
    score += currentStation.points;
    saveProgress();

    result.innerHTML = `
        <p class="good">Správně!</p>
        <p><strong>+${currentStation.points} bodů</strong></p>
        <p>Celkem máte: <strong>${score} bodů</strong></p>
        <div class="clueBox">
            <strong>Indicie:</strong><br>
            ${currentStation.clue}
        </div>
    `;
}

document
    .getElementById("submitAnswer")
    .addEventListener("click", checkAnswer);

document
    .getElementById("backButton")
    .addEventListener("click", () => {
        show("homeScreen");
    });

document
    .getElementById("adminLogin")
    .addEventListener("click", e => {
        e.preventDefault();

        const password = prompt("Heslo organizátora:");

        if (password !== GAME.adminPassword) {
            alert("Špatné heslo.");
            return;
        }

        openAdmin();
    });

function openAdmin() {
    show("adminScreen");

    const list = document.getElementById("stationList");
    list.innerHTML = `
        <p>
            Tým: <strong>${currentTeam || "zatím nevybrán"}</strong><br>
            Body: <strong>${score}</strong>
        </p>

        <p>
            Kliknutím otevřeš stanoviště v testovacím režimu.
            Nic se nebude ukládat.
        </p>

        <div class="adminGrid"></div>

        <button id="resetProgress">
            Resetovat postup tohoto telefonu
        </button>
    `;

    const grid = list.querySelector(".adminGrid");

    GAME.stations.forEach(station => {
        const button = document.createElement("button");

        button.className = "stationButton";
        button.textContent = station.id;

        button.addEventListener("click", () => {
            openStation(station.id, true);
        });

        grid.appendChild(button);
    });

    document
        .getElementById("resetProgress")
        .addEventListener("click", resetProgress);
}

function resetProgress() {
    const yes = confirm(
        "Opravdu chcete smazat tým, body a všechna splněná stanoviště na tomto telefonu?"
    );

    if (!yes) return;

    localStorage.removeItem("team");
    localStorage.removeItem("score");
    localStorage.removeItem("completed");

    currentTeam = "";
    score = 0;

    Object.keys(completed).forEach(key => {
        delete completed[key];
    });

    alert("Postup byl smazán.");
    show("homeScreen");
}

document
    .getElementById("closeAdmin")
    .addEventListener("click", () => {
        show("homeScreen");
    });

const params = new URLSearchParams(window.location.search);

if (params.has("s")) {
    const stationId = Number(params.get("s"));
    openStation(stationId, false);
}