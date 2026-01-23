function sunUpgrader(button) {
    if (sunTier >= 6) {
        disableUpgrade(
            shopOffers[1],
            sunTierTxt,
            sunPriceTxt,
            button
        );
        return;
    }
    disableButtonTemporarily(button);
    if (userMoney >= sunCurrentPrice && sunTier < 6) {
        buyAudio.play();
        logsPerClick += 1;
        userMoney = userMoney - sunCurrentPrice;
        sunCurrentPrice = Math.round(sunCurrentPrice*3.5);
        sunTier++;
        sunTierTxt.textContent = sunTier;
        sunPriceTxt.textContent = `$${sunCurrentPrice.toLocaleString()}`;

    }


    moneyTxt.textContent = userMoney;


}



function upgradePalm(button) {
    if (palmTier >= 10) {
        disableUpgrade(
            shopOffers[1],
            palmTierTxt,
            palmPriceTxt,
            button
        );
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
        palmTierTxt.textContent = palmTier;
        shamanenoPriceTxt.textContent = `$${shamanenoCurrentPrice.toLocaleString()}`;

    }



    healthTxt.textContent = Math.round(health);
    moneyTxt.textContent = ` $${userMoney.toLocaleString()}`;


} 



function upgradeSpeed(button) {
    if (speedTier == 10) {
        disableUpgrade(
            shopOffers[2],
            palmTierTxt,
            palmPriceTxt,
            button
        );
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
        bootsTierTxt.textContent = speedTier;
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
        staminaTierTxt.textContent = staminaTier;
    }


    moneyTxt.textContent = `$${userMoney.toLocaleString()}`;
    energyTxt.textContent = energy; 
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
    energyTxt.textContent = energy; 
} 