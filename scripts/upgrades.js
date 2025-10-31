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
        sunPriceTxt.textContent = `$${sunCurrentPrice.toLocaleString()}`;

    }


    moneyTxt.textContent = `Money: $${userMoney.toLocaleString()}`;


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

        if (palmTier > 5) {
            shamanenoCurrentPrice = Math.round(shamanenoCurrentPrice*2.5);
        }


        palmPriceTxt.textContent = `$${palmCurrentPrice}`;
        palmTierTxt.textContent = `${palmTier} Tier`;
        shamanenoPriceTxt.textContent = `$${shamanenoCurrentPrice.toLocaleString()}`;

    }



    healthTxt.textContent = Math.round(health);
    moneyTxt.textContent = `Money: $${userMoney.toLocaleString()}`;


} 



function upgradeSpeed(button) {
    if (speedTier == 10) {
        bootsTierTxt.innerText = "MAX";
        bootsPriceTxt.innerText = "SOLD";
        bootsPriceTxt.style.color = "red";
        bootsTierTxt.style.color = "red";

        button.style.opacity = .5;
        button.disabled = true;

        return;

    }
    disableButtonTemporarily(button);
    if (userMoney >= bootsCurrentPrice && speedTier < 10) {
        buyAudio.play();
        healthRegenTime -= 180;
        energyRegenTime -= 75;
        userMoney -= bootsCurrentPrice;
        bootsCurrentPrice *= 2;
        speedTier++;
        bootsTierTxt.textContent = `${speedTier} Tier`;
        bootsPriceTxt.textContent = `$${bootsCurrentPrice.toLocaleString()}`;

        startHealthRegen();
        startEnergyRegen();
    }



    moneyTxt.textContent = `$${userMoney.toLocaleString()}`;

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
        staminaPriceTxt.textContent = `$${staminaCurrentPrice.toLocaleString()}`;
        staminaTierTxt.textContent = `${staminaTier} Tier`;
    }


    moneyTxt.textContent = `$${userMoney.toLocaleString()}`;
    energyTxt.textContent = `Energy: ${energy}`; 
}


function restore(button) {
    disableButtonTemporarily(button, 10000);

    if (userMoney>=shamanenoCurrentPrice && palmTier >= 5) {
        ritAudio.play();
        userMoney -= shamanenoCurrentPrice;
        health = maxHealth;
        energy = maxEnergy;

        shamanenoPriceTxt.textContent = `$${shamanenoCurrentPrice.toLocaleString()}`;
    }

    healthTxt.textContent = health;
    moneyTxt.textContent = `$${userMoney.toLocaleString()}`;
    energyTxt.textContent = `Energy: ${energy}`; 
} 