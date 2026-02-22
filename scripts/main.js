let health = 30;
let logsAmount = 0;
let userMoney = 0;

let logsPerClick = 1;
let energy = 20;

let maxEnergy = 20;
let maxHealth = 30;

const SAVE = 'palm_game_save'


// Titles
const healthTxt = document.getElementById("health");
const moneyTxt = document.getElementById("money");
const logsTxt = document.getElementById("logs");
const sunPriceTxt = document.getElementById("sun-price");
const palmPriceTxt = document.getElementById("palm-price");
const energyTxt = document.getElementById("energy");
const likelyTxt = document.getElementById("likely");
const bootsPriceTxt = document.getElementById("boots-price");
const staminaPriceTxt = document.getElementById("stamina-price");
const shamanenoPriceTxt = document.getElementById("shaman-price");

// Tiers
const bootsTierTxt = document.getElementById("speed-tier");
const sunTierTxt = document.getElementById("sun-tier");
const palmTierTxt = document.getElementById("palm-tier");
const staminaTierTxt = document.getElementById("stamina-tier");

// Images
const heartImg = document.getElementById("heart");
const logImg = document.getElementById("log-img");
const energyImg = document.getElementById("energy-img");

var energyTimeId = null;
var healthTimeId = null;


// Starting values
let healthRegenTime = 3000;
let energyRegenTime = 2000;

let sunCurrentPrice = 100;
let palmCurrentPrice = 1500;
let bootsCurrentPrice = 20;
let staminaCurrentPrice = 20;
let shamanenoCurrentPrice = 1500;

let sunTier = 0;
let palmTier = 0;
let speedTier = 0;
let staminaTier = 0;

// Sounds
var punchAudio = new Audio('./sounds/punch.mp3');
var buyAudio = new Audio('./sounds/bought.mp3');
var cashRegister = new Audio('./sounds/register.mp3');
var ritAudio = new Audio('./sounds/rit.mp3');


let marketLogPrice = 3.5;
let likely = 0;

const shopOffers = document.querySelectorAll(".shop-panel article");


document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    checkMaxUpgradesOnStart();
    applyLayout();
});

setInterval(saveGame, 5000);

setInterval(() => {
  checkPalmTier();
}, 500);


const shopOffersState = new Map();


const theme = localStorage.getItem("theme");

if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "sunburned");

} else {
    document.documentElement.removeAttribute("data-theme");
}


function disabledWrap(state, wrap) {
    if (shopOffersState.get(wrap) === state) return;
    shopOffersState.set(wrap, state);

    wrap.style.transition = "opacity 0.3s linear, transform 0.3s linear";

    if (state) {
        wrap.style.opacity = 0;
        wrap.style.transform = "scale(0.1)";

    } else {
        wrap.style.display = "block";
        wrap.style.opacity = 0;
        wrap.style.transform = "scale(0.1)";
        wrap.style.pointerEvents = "auto";

        setTimeout(() => {
            wrap.style.opacity = 1;
            wrap.style.transform = "scale(1)";
        }, 10);
    }
}

function checkMaxUpgradesOnStart() {
    if (sunTier >= 6) {
        lockUpgrade("sun");
    }
    if (palmTier >= 10) {
        lockUpgrade("palm");
    }
    if (speedTier >= 10) {
        lockUpgrade("speed");
    }
    if (staminaTier >= 5) {
        lockUpgrade("stamina");
    }
}




function startHealthRegen() {
    if (healthTimeId) clearInterval(healthTimeId);
    healthTimeId = setInterval(() => {
        if (health < maxHealth) {
            health++;
            healthTxt.textContent = health;
        } else {
            clearInterval(healthTimeId);
            healthTimeId = null;
        }
    }, healthRegenTime);
}



function startEnergyRegen() {
    if (energyTimeId) clearInterval(energyTimeId);
    energyTimeId = setInterval(() => {
        if (energy < maxEnergy) {
            energy++;
            energyTxt.textContent = energy;
        } else {
            clearInterval(energyTimeId);
            energyTimeId = null;
        }
    }, energyRegenTime);
}



function disableButtonTemporarily(button, delay=2000) {
    button.disabled = true;
    button.style.opacity = .5;
        setTimeout(() => {
        button.disabled = false;
        button.style.opacity = 1;
    }, delay);
}

function disablePalmTemporarily(button, delay=300) {
    button.disabled = true;
    button.style.opacity = .8;
        setTimeout(() => {
        button.disabled = false;
        button.style.opacity = 1;
    }, delay);
}

function getUpgrade(name) {
    const article = document.querySelector(`.shop-panel article[data-upgrade="${name}"]`);
    if (!article) return null;
    return {
        article,
        button: article.querySelector("input")
    };
}


function lockUpgrade(name) {
    const upgrade = getUpgrade(name);
    if (!upgrade) return;

    upgrade.article.classList.add("locked");
    upgrade.article.style.display = "none";
}

function unlockUpgrade(name) {
    const upgrade = getUpgrade(name);
    if (!upgrade) return;

    upgrade.article.classList.remove("locked");
    upgrade.article.style.display = "block";
} 


function checkPalmTier() {
    if (palmTier >= 5) {
        unlockUpgrade("shaman");
    } else {
        lockUpgrade("shaman");
    }

    if (palmTier >= 3) {
        if (speedTier < 10) unlockUpgrade("speed");
        if (staminaTier < 5) unlockUpgrade("stamina");
    } else {
        lockUpgrade("speed");
        lockUpgrade("stamina");
    }
}



function animateNumber(element, start, end, duration = 500, text) {
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        element.textContent = `${text}${formatNumber(value)}`;

        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function floatingText(parent, text) {
    const span = document.createElement("span");
    span.className = "float-text";
    span.textContent = text;
    parent.appendChild(span);
    setTimeout(() => span.remove(), 700);
}

function saveGame() {
    const savedData = {
        health,
        maxHealth,
        energy,
        maxEnergy,
        logsAmount,
        userMoney,
        logsPerClick,
        marketLogPrice,

        sunTier,
        palmTier,
        speedTier,
        staminaTier,

        sunCurrentPrice,
        palmCurrentPrice,
        bootsCurrentPrice,
        staminaCurrentPrice,
        shamanenoCurrentPrice,

        healthRegenTime,
        energyRegenTime,

        workers,
        palms,
        unlocks,
        globalLogsMultiplier
    }
    localStorage.setItem("rebirth_logs", rebithed_logs);

    localStorage.setItem(SAVE, JSON.stringify(savedData));
    localStorage.setItem("unlocks", JSON.stringify(unlocks));
}



function loadGame() {
    const saved = localStorage.getItem(SAVE);
    if (!saved) return;

    const data = JSON.parse(saved);

    Object.assign(window, data);

    health = data.health;
    maxHealth = data.maxHealth;
    energy = data.energy;
    maxEnergy = data.maxEnergy;

    logsAmount = data.logsAmount;
    userMoney = data.userMoney;
    logsPerClick = data.logsPerClick;
    marketLogPrice = data.marketLogPrice;

    sunTier = data.sunTier;
    palmTier = data.palmTier;
    speedTier = data.speedTier;
    staminaTier = data.staminaTier;

    sunCurrentPrice = data.sunCurrentPrice;
    palmCurrentPrice = data.palmCurrentPrice;
    bootsCurrentPrice = data.bootsCurrentPrice;
    staminaCurrentPrice = data.staminaCurrentPrice;
    shamanenoCurrentPrice = data.shamanenoCurrentPrice;

    healthRegenTime = data.healthRegenTime;
    energyRegenTime = data.energyRegenTime;

    healthTxt.textContent = health;
    energyTxt.textContent = energy;
    logsTxt.textContent = logsAmount;
    moneyTxt.textContent = `$${formatNumber(userMoney)}`;

    palmTierTxt.textContent = palmTier;
    sunTierTxt.textContent = sunTier;
    bootsTierTxt.textContent = speedTier;
    staminaTierTxt.textContent = staminaTier;

    sunPriceTxt.textContent = `$${formatNumber(sunCurrentPrice)}`;
    palmPriceTxt.textContent = `$${formatNumber(palmCurrentPrice)}`;
    bootsPriceTxt.textContent = `$${formatNumber(bootsCurrentPrice)}`;
    staminaPriceTxt.textContent = `$${formatNumber(staminaCurrentPrice)}`;
    shamanenoPriceTxt.textContent = `$${formatNumber(shamanenoCurrentPrice)}`;

    likely = Math.round(logsAmount * marketLogPrice);
    likelyTxt.textContent = `$${likely}`;

    startHealthRegen();
    startEnergyRegen();

    const storedWorkers = JSON.parse(localStorage.getItem("workers") || "[]");
    const storedPalms = JSON.parse(localStorage.getItem("palms") || "[]");

    workers = storedWorkers;
    palms = storedPalms;

    rebithed_logs = Number(localStorage.getItem("rebirth_logs")) || data.rebithed_logs || 0;
    rebithLbl.textContent = rebithed_logs;

    unlocks = JSON.parse(localStorage.getItem("unlocks")) || unlocks;
    globalLogsMultiplier = data.globalLogsMultiplier || 1;

    restorePalmsUI();
    restoreWorkersUI();
    updatePalmUI();
    updateWorkersUI();
    applyUnlocks();

    applyLanguage(localStorage.getItem("language") || "en");

}

function formatNumber(num) {
    if (num < 1_000) return num;
    if (num < 1_000_000) return (num / 1_000).toFixed(1) + "K";
    if (num < 1_000_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num < 1_000_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num < 1_000_000_000_000_000) return (num / 1_000_000_000_000).toFixed(1) + "T";
    if (num < 1_000_000_000_000_000_000) return (num / 1_000_000_000_000_000).toFixed(1) + "Q";

    return "∞";
}

function updateHeader(tab) {
    document.querySelectorAll(".header-item").forEach(el => el.style.display = "none");

    if (tab === "normalShop") {
        document.querySelectorAll(".logs-item, .money-item, .energy-item").forEach(el => el.style.display = "flex");
    }
    else if (tab === "rebShop") {
        document.querySelectorAll(".money-item, .reb-logs-item, .logs-item").forEach(el => el.style.display = "flex");
    }
    else if (tab === "workshop") {
        document.querySelectorAll(".money-item, .logs-item").forEach(el => el.style.display = "flex");
    }
}

function applyLayout() {
    const layout = localStorage.getItem("layout") || "right";

    if (layout === "left") {
        document.body.classList.add("shop-left");
    }
    else {
        document.body.classList.remove("shop-left");
    }
}