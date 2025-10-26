let health = 30;
let logsAmount = 0;
let userMoney = 100000000;

let logsPerClick = 1;
let energy = 20;

let maxEnergy = 20;
let maxHealth = 30;


const healthTxt = document.getElementById("health");
const moneyTxt = document.getElementById("money");
const logsTxt = document.getElementById("logs");
const sunPriceTxt = document.getElementById("sun-price");
const palmPriceTxt = document.getElementById("palm-price");
const energyTxt = document.getElementById("energy");
const likelyTxt = document.getElementById("likely");
const bootsPriceTxt = document.getElementById("boots-price");
const staminaPriceTxt = document.getElementById("stamina-price");

const bootsTierTxt = document.getElementById("speed-tier");
const sunTierTxt = document.getElementById("sun-tier");
const palmTierTxt = document.getElementById("palm-tier");
const staminaTierTxt = document.getElementById("stamina-tier");

var energyTimeId = null;
var healthTimeId = null;

let healthRegenTime = 3000;
let energyRegenTime = 2000;


let sunCurrentPrice = 100;
let palmCurrentPrice = 1500;
let bootsCurrentPrice = 20;
let staminaCurrentPrice = 20;

let sunTier = 0;
let palmTier = 0;
let speedTier = 0;
let staminaTier = 0;

var punchAudio = new Audio('./sounds/punch.mp3');
var buyAudio = new Audio('./sounds/bought.mp3');
var cashRegister = new Audio('./sounds/cashRegister.mp3');


let marketLogPrice = 3.5;

let likely = 0;


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

function farmPalm(button) {
    if (health < maxHealth && !healthTimeId) {
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

    if (energy < maxEnergy && !energyTimeId) {
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
    disablePalmTemporarily(button);
    if (health > 0 && energy > 0) {
        punchAudio.play();
        logsAmount += logsPerClick;
        health--;
        energy--;
    }


    likely = Math.round(logsAmount*marketLogPrice);


    healthTxt.textContent = health;
    logsTxt.textContent = `Logs: ${logsAmount}`;
    energyTxt.textContent = `Energy: ${energy}`;
    likelyTxt.textContent = `After selling your logs you'll get: $${likely}`;
}




function sellLogs() {
    if (logsAmount != 0) {
        userMoney += Math.round(logsAmount*marketLogPrice);
        logsAmount = 0;
        likely = 0;
        moneyTxt.textContent = `Money: $${userMoney}`;
        logsTxt.textContent = `Logs: ${logsAmount}`;
        likelyTxt.textContent = `After selling your logs you'll get: $${likely}`;
    }

}

function sunUpgrader(button) {
    if (sunTier == 6) {
        sunTierTxt.innerText = "MAX";
        sunPriceTxt.innerText = "SOLD";
        sunPriceTxt.style.color = "red";
        sunTierTxt.style.color = "red";

        button.style.opacity = .5;
        button.disabled = true;

        return;
    }
    disableButtonTemporarily(button);
    if (userMoney >= sunCurrentPrice && sunTier < 6) {
        buyAudio.play();
        logsPerClick += 1;
        userMoney = userMoney - sunCurrentPrice;
        sunCurrentPrice = Math.round(sunCurrentPrice*3.5);
        sunTier++;
        sunTierTxt.textContent = `${sunTier} Tier`;
        sunPriceTxt.textContent = `$${sunCurrentPrice}`;

    }


    moneyTxt.textContent = `Money: $${userMoney}`;

}

function upgradePalm(button) {
    if (palmTier == 10) {
        palmTierTxt.innerText = "MAX";
        palmPriceTxt.innerText = "SOLD";
        palmTierTxt.style.color = "red";
        palmPriceTxt.style.color = "red";
        button.style.opacity = .5;
        button.disabled = true;

        return;
    }
    disableButtonTemporarily(button);
    if (userMoney >= palmCurrentPrice && palmTier < 10) {
        buyAudio.play();
        maxHealth = Math.round(maxHealth * 2);
        health = maxHealth;
        marketLogPrice = +(marketLogPrice * 1.5).toFixed(2);
        userMoney -= palmCurrentPrice;
        palmCurrentPrice += 2600;
        palmTier++;
        palmPriceTxt.textContent = `$${palmCurrentPrice}`;
        palmTierTxt.textContent = `${palmTier} Tier`;

    }



    healthTxt.textContent = Math.round(health);
    moneyTxt.textContent = `Money: $${userMoney}`;


} 

function upgradeSpeed(button) {
    if (speedTier == 10) {
        bootsTierTxt.innerText = "MAX";
        bootsPriceTxt.innerText = "SOLD";
        bootsPriceTxt.style.color = "red";
        bootsTierTxt.style.color = "red";

    }
    disableButtonTemporarily(button);
    if (userMoney >= bootsCurrentPrice && speedTier < 10) {
        buyAudio.play();
        healthRegenTime -= 10;
        energyRegenTime -= 5;
        userMoney -= bootsCurrentPrice;
        bootsCurrentPrice *= 2;
        speedTier++;
        bootsTierTxt.textContent = `${speedTier} Tier`;
        bootsPriceTxt.textContent = `$${bootsCurrentPrice}`;
    }



    moneyTxt.textContent = `$${userMoney}`;

}

function upgradeStamina(button) {
    if (staminaTier == 5) {
        staminaTierTxt.innerText = "MAX";
        staminaPriceTxt.innerText = "SOLD";
        staminaTierTxt.style.color = "red";
        staminaPriceTxt.style.color = "red";
        button.style.opacity = .5;
        button.disabled = true;

        return;
    }
    disableButtonTemporarily(button);
    if (userMoney >= staminaCurrentPrice && staminaTier < 5) {
        buyAudio.play();
        userMoney -= staminaCurrentPrice;
        staminaTier++;
        maxEnergy*=2;
        staminaCurrentPrice*=3;
        energy = maxEnergy;
        staminaPriceTxt.textContent = `$${staminaCurrentPrice}`;
        staminaTierTxt.textContent = `${staminaTier} Tier`;
    }


    moneyTxt.textContent = `$${userMoney}`;
    energyTxt.textContent = `Energy: ${energy}`; 
}