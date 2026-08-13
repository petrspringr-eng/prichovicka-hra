let currentStation = null;
let currentTeam = localStorage.getItem("team") || "";
let score = Number(localStorage.getItem("score") || 0);
let completed = JSON.parse(localStorage.getItem("completed") || "{}");

let adminMode = false;
let testMode = false;

document.getElementById("gameTitle").textContent = GAME.title;

function showScreen(screenId) {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("adminScreen").style.display = "none";
    document.getElementById(screenId).style.display = "block";
}

function saveProgress() {
    localStorage.setItem("team", currentTeam);
    localStorage.setItem("score", String(score));
    localStorage.setItem("completed", JSON.stringify(completed));
}

function updateDashboard() {
    if (!currentTeam) {
        document.getElementById("teamSetup").style.display = "block";
        document.getElementById("dashboard").style.display = "none";
        return;
    }

    document.getElementById("teamSetup").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("teamName").textContent = "Tým " + currentTeam;
    document.getElementById("scoreValue").textContent = score;

    const completedCount = Object.keys(completed).length;
    document.getElementById("completedValue").textContent =
        completedCount + " / " + GAME.stations.length;

    const storyList =
        document.getElementById("storyList") ||
        document.getElementById("clueList");

    if (!storyList) return;

    if (completedCount === 0) {
        storyList.innerHTML = "Zatím žádné.";
        return;
    }

    storyList.innerHTML = "";

    GAME.stations.forEach(station => {
        if (completed[station.id]) {
            const savedStory =
                completed[station.id].story || station.story || "";

            storyList.innerHTML += `
                <div class="clueItem">
                    <strong>📜 Stránka deníku č. ${station.id}</strong><br>
                    ${savedStory}
                </div>
            `;
        }
    });
}

function startGame() {
    currentTeam = document.getElementById("teamSelect").value;
    saveProgress();
    showDashboard();
}

function showDashboard() {
    adminMode = false;
    testMode = false;
    currentStation = null;

    history.replaceState({}, "", window.location.pathname);

    showScreen("homeScreen");
    updateDashboard();
}

function resetGame() {
    const ok = confirm(
        "Opravdu chcete smazat tým, body a všechna splněná stanoviště na tomto telefonu?"
    );

    if (!ok) return;

    localStorage.removeItem("team");
    localStorage.removeItem("score");
    localStorage.removeItem("completed");

    currentTeam = "";
    score = 0;
    completed = {};

    history.replaceState({}, "", window.location.pathname);
    showScreen("homeScreen");
    updateDashboard();
}

function openStation(id, isTest = false) {
    currentStation = GAME.stations.find(
        station => station.id === Number(id)
    );

    if (!currentStation) {
        alert("Stanoviště neexistuje.");
        return;
    }

    testMode = isTest;
    showScreen("gameScreen");

    const testBanner = document.getElementById("testBanner");
    if (testBanner) {
        testBanner.style.display = testMode ? "block" : "none";
    }

    document.getElementById("stationTitle").textContent =
        currentStation.title;

    document.getElementById("stationQuestion").textContent =
        currentStation.question;

    document.getElementById("result").innerHTML = "";

    const submitButton = document.getElementById("submitAnswer");
    submitButton.style.display = "block";

    const backButton = document.getElementById("backButton");
    backButton.textContent =
        testMode ? "Zpět do organizátora" : "Zpět na přehled";

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    if (currentStation.type === "choice") {
        currentStation.options.forEach((option, index) => {
            answers.innerHTML += `
                <label class="answerOption">
                    <input type="radio" name="answer" value="${index}">
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
                autocomplete="off"
            >
        `;
    }

    if (currentStation.type === "task") {
        answers.innerHTML = `
            <div class="clueBox">
                Po splnění úkolu klikněte na tlačítko Odeslat.
            </div>
        `;
    }
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

        return normalizeText(input.value) ===
            normalizeText(currentStation.answer);
    }

    if (currentStation.type === "task") {
        return true;
    }

    return false;
}

function normalizeText(text) {
    return String(text)
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function renderSuccess(alreadyCompleted = false) {
    const result = document.getElementById("result");
    const submitButton = document.getElementById("submitAnswer");
    const backButton = document.getElementById("backButton");

    submitButton.style.display = "none";

    if (testMode) {
        result.innerHTML = `
            <p class="good">✅ Správně.</p>
            <p>Testovací režim – body ani postup se neukládají.</p>

            <div class="clueBox">
                <strong>📜 Stránka Cimrmanova deníku</strong><br><br>
                ${currentStation.story || ""}
            </div>

            <p>
                Hodnota stanoviště:
                <strong>${currentStation.points} bodů</strong>
            </p>
        `;

        backButton.textContent = "Zpět do organizátora";
        return;
    }

    if (alreadyCompleted) {
        result.innerHTML = `
            <p class="good">✅ Toto stanoviště už máte splněné.</p>

            <div class="clueBox">
                <strong>📜 Stránka Cimrmanova deníku</strong><br><br>
                ${currentStation.story || ""}
            </div>

            <p>Celkem máte: <strong>${score} bodů</strong></p>
        `;
    } else {
        result.innerHTML = `
            <p class="good">🎉 Správně!</p>

            <p>
                Získáváte
                <strong>+${currentStation.points} bodů</strong>.
            </p>

            <p>Celkem máte: <strong>${score} bodů</strong></p>

            <div class="clueBox">
                <strong>📜 Stránka Cimrmanova deníku</strong><br><br>
                ${currentStation.story || ""}
            </div>
        `;
    }

    backButton.textContent = "Pokračovat";
}

function checkAnswer() {
    if (!currentStation) return;

    const result = document.getElementById("result");

    if (!answerIsCorrect()) {
        result.innerHTML = `
            <p class="bad">❌ Špatně. Zkuste to znovu.</p>
        `;
        return;
    }

    if (testMode) {
        renderSuccess(false);
        return;
    }

    if (!currentTeam) {
        alert("Nejdřív vyberte svůj tým.");
        showScreen("homeScreen");
        updateDashboard();
        return;
    }

    if (completed[currentStation.id]) {
        renderSuccess(true);
        return;
    }

    completed[currentStation.id] = {
        points: currentStation.points,
        story: currentStation.story || ""
    };

    score += currentStation.points;
    saveProgress();

    renderSuccess(false);
}

function openAdmin() {
    currentTeam = localStorage.getItem("team") || currentTeam;
    score = Number(localStorage.getItem("score") || score || 0);
    completed = JSON.parse(
        localStorage.getItem("completed") ||
        JSON.stringify(completed || {})
    );

    adminMode = true;
    testMode = false;

    showScreen("adminScreen");

    const stationList = document.getElementById("stationList");

    stationList.innerHTML = `
        <p>
            Kliknutím na číslo otevřeš stanoviště
            v testovacím režimu. Nic se neuloží.
        </p>

        <div class="adminGrid" id="adminGrid"></div>

        <hr>

        <p>
            Aktuální tým:
            <strong>${currentTeam || "zatím nevybrán"}</strong>
        </p>

        <p>
            Aktuální skóre:
            <strong>${score}</strong>
        </p>
    `;

    const grid = document.getElementById("adminGrid");

    GAME.stations.forEach(station => {
        const button = document.createElement("button");

        button.className = "stationButton";
        button.textContent = station.id;

        button.addEventListener("click", () => {
            openStation(station.id, true);
        });

        grid.appendChild(button);
    });
}

document
    .getElementById("startButton")
    .addEventListener("click", startGame);

document
    .getElementById("submitAnswer")
    .addEventListener("click", checkAnswer);

document
    .getElementById("backButton")
    .addEventListener("click", () => {
        if (adminMode && testMode) {
            openAdmin();
            return;
        }

        showDashboard();
    });

document
    .getElementById("changeTeamButton")
    .addEventListener("click", resetGame);

document
    .getElementById("adminLogin")
    .addEventListener("click", event => {
        event.preventDefault();

        const password = prompt("Heslo organizátora:");

        if (password !== GAME.adminPassword) {
            alert("Špatné heslo.");
            return;
        }

        openAdmin();
    });

document
    .getElementById("closeAdmin")
    .addEventListener("click", () => {
        showDashboard();
    });

const params = new URLSearchParams(window.location.search);
const stationFromQr = params.get("s");

if (stationFromQr) {
    openStation(Number(stationFromQr), false);
} else {
    showScreen("homeScreen");
    updateDashboard();
}
