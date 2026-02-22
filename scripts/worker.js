let workers = JSON.parse(localStorage.getItem("workers")) || [];
let palms = JSON.parse(localStorage.getItem("palms")) || [];

let active_entity = {
    type: null,
    index: null
};

const WORKER_PRICE = 500;
const PALM_PRICE = 2900;

const worker_modal = document.getElementById("workerModal");
const palm_modal = document.getElementById("palmModal");

function createArt(container, html) {
    const article = document.createElement("article");
    article.innerHTML = html;

    container.appendChild(article);
}

function updatePricesUI() {
    document.getElementById("workshop-worker-price").textContent =
        `$${formatNumber(WORKER_PRICE)}`;

    document.getElementById("workshop-palm-price").textContent =
        `$${formatNumber(PALM_PRICE)}`;
}

function updateWorkerModal() {
    const worker = workers[active_entity.index];

    document.getElementById("upgrade-worker-price").textContent =
        `$${formatNumber(worker.lvl * 100)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    updatePricesUI();
});


function addWorker() {
    const workers_container = document.getElementById("workersContainer");
    let workerIndex = workers.length;

    workers.push({
        name: workerIndex + 1,
        lvl: 1,
        palm: null
    });

    let html = `
        <div class="content">
            <img src="./imgs/mask.png">
            <h3><span data-i18n="worker_w"></span> ${workers[workerIndex].name}</h3>
            <p class="worker-status unemployed">Unemployed</p>
            <input type="button" data-i18n="configure" onclick="openConfiguration('worker', ${workerIndex});">
        </div>
    `;


    
    createArt(workers_container, html);

    saveData();
}

function addPalm() {
    const palm_container = document.getElementById("palmsContainer");
    let palm_index = palms.length;

    palms.push({
        name: palm_index + 1,
        lvl: 1,
        workers: [null, null]
    });

    let html = `
        <div class="content">
            <img src="./imgs/palm01.png" style="width: 40px; height: 60px;">
            <h3><span data-i18n="palm"></span> ${palms[palm_index].name}</h3>

            <h3>
                <span data-i18n="worker_w"></span>
                <span class="palm-workers">0/2</span>
            </h3>
            <input type="button" data-i18n="configure" value="Configure" onclick="openConfiguration('palm', ${palm_index});">
        </div>
    `;

    createArt(palm_container, html);

    updatePalmUI();
    saveData();
}


document.addEventListener("click", (e) => {
    if (e.target.id === "addWorker") {
        if (!unlocks.workers) return;

        const price = 500;
        if (userMoney < price) {
            alert("Not enough money!");
            return;
        }

        userMoney -= price;
        moneyTxt.textContent = `$${formatNumber(userMoney)}`;
        updatePricesUI();
        addWorker();
        applyLanguage(localStorage.getItem("language") || "en");
    }
    if (e.target.id === "addPalm") {
        if (!unlocks.workers) return;

        const price = 2900;
        if (userMoney < price) {
            alert("Not enough money!");
            return;
        }

        userMoney -= price;
        moneyTxt.textContent = `$${formatNumber(userMoney)}`;
        updatePricesUI();
        addPalm();
        applyLanguage(localStorage.getItem("language") || "en");
    }
})


document.querySelector("#workerModal #upgradeWorker").addEventListener("click", () => {
    if (active_entity.type !== "worker") return;
    const worker = workers[active_entity.index];
    const cost = worker.lvl * 100;

    if (userMoney < cost ) {
        alert("Not enough money!");
        return;
    }

    userMoney -= cost;
    moneyTxt.textContent = `$${formatNumber(userMoney)}`;

    worker.lvl++;
    updateWorkerModal();
    saveData();
});

document.querySelector("#palmModal #upgradePalm").addEventListener("click", () => {
    if (active_entity.type !== "palm") return;
    const palm = palms[active_entity.index];
    const cost = palm.lvl * 500;

    if (userMoney < cost) {
        alert("Not enough money!");
        return;
    }
    userMoney -= cost;
    moneyTxt.textContent = `$${formatNumber(userMoney)}`;

    palm.lvl++;
    updatePalmModal();
    updatePalmUI();
    saveData();
});


function openConfiguration(type, index) {
    active_entity.type = type;
    active_entity.index = index;

    if (type === "worker") {
        worker_modal.classList.remove("hidden");
        updateWorkerModal();
    }
    if (type === "palm") {
        palm_modal.classList.remove("hidden");
        updatePalmModal();
    }
    
}

function closeConfiguration() {
    worker_modal.classList.add("hidden");
    palm_modal.classList.add("hidden");

    active_entity.type = null;
    active_entity.index = null;
}

function updateWorkerModal() {
    const worker = workers[active_entity.index];
    const conf = document.querySelector("#workerModal .conf");

    conf.querySelector("h2:nth-of-type(1)").textContent = worker.name;
    conf.querySelector("h2:nth-of-type(2)").textContent = `Lvl ${worker.lvl}`;

    const palmSelect = conf.querySelector("#palms-list");
    palmSelect.innerHTML = `<option value="">Unemployed</option>`;

    palms.forEach((palm, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = palm.name;
        palmSelect.appendChild(option);
    });

    const priceEl = document.getElementById("upgrade-worker-price");
    if (priceEl) {
        priceEl.textContent = `$${formatNumber(worker.lvl * 100)}`;
    }

    palmSelect.value = worker.palm === null ? "" : worker.palm;
}

function updatePalmModal() {
    const palm = palms[active_entity.index];
    const conf = document.querySelector("#palmModal .conf");

    conf.querySelector("h2:nth-of-type(1)").textContent = palm.name;
    conf.querySelector("h2:nth-of-type(2)").textContent = `Lvl ${palm.lvl}`;

    document.getElementById("upgrade-palm-price").textContent =
        `$${formatNumber(palm.lvl * 500)}`;
}

document.querySelector("#workerModal #palms-list").addEventListener("change", (e) => {
    const worker = workers[active_entity.index];
    const newPalmIndex = e.target.value === "" ? null : Number(e.target.value);

    if (worker.palm !== null) {
        const oldPalm = palms[worker.palm];
        const slot = oldPalm.workers.indexOf(active_entity.index);
        if (slot !== -1) oldPalm.workers[slot] = null;
    }

    if (newPalmIndex !== null) {
        const palm = palms[newPalmIndex];
        const freeSlot = palm.workers.indexOf(null);

        if (freeSlot === -1) {
            alert(translations[currentLang].palm_full);
            e.target.value = "";
            return;
        }

        palm.workers[freeSlot] = active_entity.index;
        worker.palm = newPalmIndex;
        saveData();
    }
    else {
        worker.palm = null;
    }
    saveData();
    updatePalmUI();
    updateWorkersUI();
    
});

function updatePalmUI() {
    const palmCards = document.querySelectorAll("#palmsContainer article");

    palms.forEach((palm, i) => {
        const used = palm.workers.filter(w => w !== null).length;
        const card = palmCards[i];

        if (!card) return;

        card.querySelector(".palm-workers").textContent = `${used}/2`;
    });
}

function updateWorkersUI() {
    const workerCards = document.querySelectorAll("#workersContainer article");

    workers.forEach((worker, i) => {
        const card = workerCards[i];
        if (!card) return;

        const status = card.querySelector(".worker-status");

        if (worker.palm === null) {
            status.textContent = translations[currentLang].unemployed;
            status.classList.add("unemployed");
            status.classList.remove("working");
        } else {
            status.textContent = translations[currentLang].working;
            status.classList.add("working");
            status.classList.remove("unemployed");
        }
    });
}

function saveData() {
    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("palms", JSON.stringify(palms));
}



function restoreWorkersUI() {
    const container = document.getElementById("workersContainer");

    workers.forEach((worker, i) => {
        createArt(container, `
            <div class="content">
                <img src="./imgs/mask.png">
                <h3><span data-i18n="worker_w"></span> ${worker.name}</h3>
                <p class="worker-status ${worker.palm === null ? "unemployed" : "working"}">
                    ${worker.palm === null ? "Unemployed" : "Working"}
                </p>
                <input type="button" data-i18n="configure"
                    onclick="openConfiguration('worker', ${i});">
            </div>
        `);
    });
}

function restorePalmsUI() {
    const container = document.getElementById("palmsContainer");

    palms.forEach((palm, i) => {
        createArt(container, `
            <div class="content">
                <img src="./imgs/palm01.png" style="width:40px;height:60px;">
                <h3><span data-i18n="palm"></span> ${palm.name}</h3>
                <h3 class="palm-workers">0/2</h3>
                <input type="button" data-i18n="configure"
                    onclick="openConfiguration('palm', ${i});">
            </div>
        `);
    });
}

function farmLoop() {
    let total_logs_per_sec = 0;

    palms.forEach(palm => {
        let palm_multiplier = 1 + (palm.lvl - 1) * 0.5;
        
        palm.workers.forEach(wi => {
            if (wi !== null) {
                const worker = workers[wi];

                let worker_prod = worker.lvl;
                total_logs_per_sec += worker_prod * palm_multiplier;
            }
        })
    });
    total_logs_per_sec *= globalLogsMultiplier;

    const oldLikely = likely;

    logsAmount += total_logs_per_sec;

    likely = Math.round(logsAmount*marketLogPrice);
    animateNumber(likelyTxt, oldLikely, likely, 500, " $");

    logsTxt.textContent = Math.floor(logsAmount);
    saveGame();
}


setInterval(farmLoop, 10000);