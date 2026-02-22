const rebithLbl = document.getElementById("rebLogs");


let logs_to_collect = 200;
let money_to_collect = 3000;
let rebithed_logs = 0;

let unlocks = JSON.parse(localStorage.getItem("unlocks")) || {
    company: false,
    workers: false,
    upgrlogs: false
};

let globalLogsMultiplier = 1;

const normalShop = document.getElementById("normalShop");
const rebShop = document.getElementById("rebShop");
const workshop = document.getElementById("workshop");

const workshop_panel = document.getElementById("workshopPanel");

const tasks = document.querySelectorAll(".tasks li");

setInterval(updateTasks, 200);


document.addEventListener("DOMContentLoaded", () => {
    switchShop("normalShop");
});

function switchShop(tid) {
    if (tid === "workshop" && !unlocks.company) {
        alert("Workshop locked!");
        return;
    }
    document.querySelectorAll(".shop-panel").forEach(PerformanceObserverEntryList => {
        PerformanceObserverEntryList.classList.remove("active");
    })

    document.getElementById(tid).classList.add("active");

    document.querySelectorAll(".shop-cath .tab").forEach(tab => {
        tab.classList.remove("selected");
        if (tab.dataset.target === tid) tab.classList.add("selected");
    });

    updateHeader(tid);
}

document.querySelectorAll(".shop-cath .tab").forEach(tab => {
    tab.addEventListener("click", () => {
        switchShop(tab.dataset.target);
    });
});

tabsNormal.forEach(t => t && (t.onclick = () => switchShop("normal")));
tabsReb.forEach(t => t && (t.onclick = () => switchShop("reb")));



function rebirth() {
    if (userMoney >= money_to_collect && logsAmount >= logs_to_collect) {
        health = 30;
        maxHealth = 30;
        energy = 20;
        maxEnergy = 20;

        logsAmount = 0;
        userMoney = 0;
        logsPerClick = 1;
        marketLogPrice = 3.5;

        sunTier = 0;
        palmTier = 0;
        speedTier = 0;
        staminaTier = 0;

        sunCurrentPrice = 100;
        palmCurrentPrice = 1500;
        bootsCurrentPrice = 20;
        staminaCurrentPrice = 20;
        shamanenoCurrentPrice = 1500;
        

        healthRegenTime = 3000;
        energyRegenTime = 2000;

        workers = [];
        palms = [];

        healthTxt.textContent = health;
        energyTxt.textContent = energy;
        logsTxt.textContent = logsAmount;
        moneyTxt.textContent = `$${formatNumber(userMoney)}`;

        palmTierTxt.textContent = palmTier;
        sunTierTxt.textContent = sunTier;
        bootsTierTxt.textContent = speedTier;
        staminaTierTxt.textContent = staminaTier;

        active_entity.type = null;
        active_entity.index = null;
        closeConfiguration();

        if (healthTimeId) clearInterval(healthTimeId);
        if (energyTimeId) clearInterval(energyTimeId);

        startHealthRegen();
        startEnergyRegen();

        document.getElementById("workersContainer").innerHTML = `
            <div class="addContainer">
                <div class="add" id="addWorker">+</div>
                <p id="add-worker-price">$500</p>
            </div>
        `;

        document.getElementById("palmsContainer").innerHTML = `
            <div class="addContainer">
                <div class="add" id="addPalm">+</div>
                <p id="add-palm-price">$2,900</p>
            </div>
        `;


        sunPriceTxt.textContent = `$${formatNumber(sunCurrentPrice)}`;
        palmPriceTxt.textContent = `$${formatNumber(palmCurrentPrice)}`;
        bootsPriceTxt.textContent = `$${formatNumber(bootsCurrentPrice)}`;
        staminaPriceTxt.textContent = `$${formatNumber(staminaCurrentPrice)}`;
        shamanenoPriceTxt.textContent = `$${formatNumber(shamanenoCurrentPrice)}`;

        localStorage.setItem("workers", JSON.stringify([]));
        localStorage.setItem("palms", JSON.stringify([]));

        likely = Math.round(logsAmount * marketLogPrice);
        likelyTxt.textContent = `$${likely}`;

        rebithed_logs += 1;
        rebithLbl.textContent = rebithed_logs;
        localStorage.setItem("rebirth_logs", rebithed_logs);

        saveGame();
        updateTasks()
    }

}


function updateTasks() {
    tasks.forEach(task => {
        const type = task.dataset.task;
        const required = Number(task.dataset.required);
        const currentSpan = task.querySelector(".task-current");

        let currentValue = 0;

        if (type === "logs") {
            currentValue = logsAmount;
        }
        else if (type === "money") {
            currentValue = userMoney;
        }

        currentSpan.textContent = Math.min(currentValue, required);

        if (currentValue >= required) {
            task.classList.add("completed");

            const unlockName = task.dataset.unlock;
            if (unlockName) unblockFeature(unlockName);
        }
        else {
            task.classList.remove("completed");
        }
    })
}

function buyRebirthUpgrade(btn) {
    const cost = Number(btn.dataset.required);
    const unlockName = btn.dataset.unlock;

    if (!unlockName) return;

    if (unlocks[unlockName]) {
        alert("Already bought!");
        return;
    }

    if (rebithed_logs < cost) {
        alert("Not enough rebirth logs!");
        return;
    }

    rebithed_logs -= cost;
    rebithLbl.textContent = rebithed_logs;

    unblockFeature(unlockName);
    updateRebirthShopUI();
    saveGame();
}

function unblockFeature(name) {
    unlocks[name] = true;
    localStorage.setItem("unlocks", JSON.stringify(unlocks));

    if (name === "company") {
        workshop_panel.disabled = false;
        workshop_panel.classList.remove("locked");
    }
    if (name === "workers") {
        document.getElementById("addWorker").classList.remove("locked");
        document.getElementById("addPalm").classList.remove("locked");
    }
    if (name === "upgrlogs") {
        globalLogsMultiplier = 1.5;
    }
}

function updateRebirthShopUI() {
    document.querySelectorAll("#rebShop input[data-unlock]").forEach(btn => {
        const unlockName = btn.dataset.unlock;

        if (unlocks[unlockName]) {
            btn.disabled = true;
            btn.style.opacity = 0.5;
        }
    })
}

function applyUnlocks() {
    if (unlocks.company) {
        workshop_panel.disabled = false;
        workshop_panel.classList.remove("locked");
        updateRebirthShopUI()
    }

    if (unlocks.workers) {
        document.getElementById("addWorker").classList.remove("locked");
        document.getElementById("addPalm").classList.remove("locked");
        updateRebirthShopUI()
    }

    if (unlocks.upgrlogs) {
        globalLogsMultiplier = 1.5;
        updateRebirthShopUI()
    }
}