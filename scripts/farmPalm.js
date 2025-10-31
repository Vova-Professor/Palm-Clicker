function farmPalm(button) {
    if (health < maxHealth && !healthTimeId) startHealthRegen();
    if (energy < maxEnergy && !energyTimeId) startEnergyRegen();

    disablePalmTemporarily(button);
    if (health > 0 && energy > 0) {
        punchAudio.play();
        logsAmount += logsPerClick;
        health--;
        energy--;
        heartImg.style.transform = "scale(0.8)";
        setTimeout(() => {
            heartImg.style.transform = "scale(1)";
        }, 150);
    }


    likely = Math.round(logsAmount*marketLogPrice);


    healthTxt.textContent = health;
    logsTxt.textContent = `Logs: ${logsAmount}`;
    energyTxt.textContent = `Energy: ${energy}`;
    likelyTxt.textContent = `After selling your logs you'll get: $${likely.toLocaleString()}`;
}




function sellLogs() {
    if (logsAmount != 0) {
        cashRegister.play();
        userMoney += Math.round(logsAmount*marketLogPrice);
        logsAmount = 0;
        likely = 0;
        moneyTxt.textContent = `Money: $${userMoney.toLocaleString()}`;
        logsTxt.textContent = `Logs: ${logsAmount}`;
        likelyTxt.textContent = `After selling your logs you'll get: $${likely.toLocaleString()}`;
    }

}
