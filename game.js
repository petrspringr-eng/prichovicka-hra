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
    localStorage.setItem("score", score);
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

    const storyList = document.getElementById("storyList");

    if (completedCount === 0) {
        storyList.innerHTML = "Zatím žádné.";
        return;
    }

    storyList.innerHTML = "";

    GAME.stations.forEach(station => {
        if (completed[station.id]) {
            storyList.innerHTML += `
                <div class="storyItem">
                    <strong>Stanoviště ${station.id}</strong><br>
                    ${station.story}
                </div>
            `;
        }
    });
}

function startGame() {
    currentTeam = document.getElementById("teamSelect").value;
    saveProgress();
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
    testBanner.style.display = testMode ? "block" : "none";

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
                autocomplete="off"
            >
        `;
    }

    if (currentStation.type === "task") {
        answers.innerHTML = `
            <div class="storyBox">
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

function checkAnswer() {
    if (!currentStation) return;

    const result = document.getElementById("result");

    if (!answerIsCorrect()) {
        result.innerHTML = `
            <p class="bad">
                ❌ Špatně. Zkuste to znovu.
            </p>
        `;
        return;
    }

    if (testMode) {
        result.innerHTML = `
            <p class="good">✅ Správně.</p>

            <p>
                Testovací režim – body ani postup se neukládají.
            </p>

            <div class="storyBox">
                <strong>Indicie:</strong><br>
                ${currentStation.story}
            </div>

            <p>
                Hodnota stanoviště:
                <strong>${currentStation.points} bodů</strong>
            </p>
        `;
        return;
    }

    if (!currentTeam) {
        alert(
            "Nejdřív vyberte svůj tým na úvodní stránce."
        );
        showScreen("homeScreen");
        updateDashboard();
        return;
    }

    if (completed[currentStation.id]) {
        result.innerHTML = `
            <p class="good">
                ✅ Toto stanoviště už máte splněné.
            </p>

            <div class="storyBox">
                <strong>Vaše indicie:</strong><br>
                ${currentStation.story}
            </div>

            <p>
                Celkem máte:
                <strong>${score} bodů</strong>
            </p>
        `;
        return;
    }

    completed[currentStation.id] = {
        points: currentStation.points,
        story: currentStation.story
    };

    score += currentStation.points;

    saveProgress();

    result.innerHTML = `
        <p class="good">
            🎉 Správně!
        </p>

        <p>
            Získáváte
            <strong>+${currentStation.points} bodů</strong>.
        </p>

        <p>
            Celkem máte:
            <strong>${score} bodů</strong>
        </p>

        <div class="storyBox">
            <strong>Vaše indicie:</strong><br>
            ${currentStation.story}
        </div>
    `;
}

function openAdmin() {
    adminMode = true;
    showScreen("adminScreen");

    const stationList = document.getElementById("stationList");

    stationList.innerHTML = `
        <p>
            Kliknutím na číslo otevřeš stanoviště
            v testovacím režimu.
        </p>

        <div class="adminGrid" id="adminGrid"></div>

        <hr>

        <p>
            Aktuální tým:
            <strong>${currentTeam || "žádný"}</strong>
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
        } else {
            showScreen("homeScreen");
            updateDashboard();
        }
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
        adminMode = false;
        testMode = false;

        showScreen("homeScreen");
        updateDashboard();
    });

updateDashboard();

const params = new URLSearchParams(window.location.search);

if (params.has("s")) {
    openStation(
        Number(params.get("s")),
        false
    );
}