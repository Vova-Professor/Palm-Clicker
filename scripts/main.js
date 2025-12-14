let health = 30;
let logsAmount = 0;
let userMoney = 0;

let logsPerClick = 1;
let energy = 20;

let maxEnergy = 20;
let maxHealth = 30;


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
let shamanenoCurrentPrice = 8500;

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


setInterval(() => {
  checkPalmTier();
}, 500);


const shopOffersState = new Map();

function disabledWrap(state, wrap) {
    if (shopOffersState.get(wrap) === state) return;
    shopOffersState.set(wrap, state);

    wrap.style.transition = "opacity 0.3s linear, transform 0.3s linear";

    if (state) {
        wrap.style.opacity = 0;
        wrap.style.transform = "scale(0.1)";
        wrap.style.pointerEvents = "none";

        setTimeout(() => {
            wrap.style.display = "none";
        }, 300);
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
            energyTxt.textContent = `Energy: ${energy}`;
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


function checkPalmTier() {
    if (palmTier >= 5) {
        disabledWrap(false, shopOffers[0]);
    }
    else {
        disabledWrap(true, shopOffers[0]);
    }

    if (palmTier >= 3) {
        disabledWrap(false, shopOffers[3]);
        disabledWrap(false, shopOffers[4]);
    }

    else {
        disabledWrap(true, shopOffers[3]);
        disabledWrap(true, shopOffers[4]);
    }
}

function animateNumber(element, start, end, duration = 500, text) {
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        element.textContent = `${text}${value.toLocaleString()}`;

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

function disableUpgrade(wrap, tierTxt, priceTxt, button) {
    tierTxt.textContent = "MAX";
    priceTxt.textContent = "SOLD";

    tierTxt.style.color = "red";
    priceTxt.style.color = "red";

    button.disabled = true;
    button.style.opacity = 0.5;

    wrap.style.transition = "opacity .4s, transform .4s";
    wrap.style.opacity = 0;
    wrap.style.transform = "scale(.5)";

    setTimeout(() => {
        wrap.style.display = "none";
    }, 400);
}
