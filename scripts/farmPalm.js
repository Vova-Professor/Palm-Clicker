function farmPalm(button) {
    if (health < maxHealth && !healthTimeId) startHealthRegen();
    if (energy < maxEnergy && !energyTimeId) startEnergyRegen();

    disablePalmTemporarily(button);

    const oldLikely = Math.round(logsAmount * marketLogPrice);
    
    if (health > 0 && energy > 0) {
        punchAudio.play();
        logsAmount += logsPerClick;
        health--;
        energy--;
        heartImg.style.transform = "scale(0.8)";
        energyImg.style.transform = "scale(0.6)";
        setTimeout(() => {
            heartImg.style.transform = "scale(1)";
            energyImg.style.transform = "scale(1)";
        }, 150);
    }


    likely = Math.round(logsAmount*marketLogPrice);
    animateNumber(likelyTxt, oldLikely, likely, 500, "After selling your logs you'll get: $");


    healthTxt.textContent = health;
    logsTxt.textContent = `Logs: ${logsAmount}`;
    energyTxt.textContent = `Energy: ${energy}`;
}




function sellLogs() {
    if (logsAmount != 0) {
        cashRegister.play();
        const oldMoney = userMoney;
        userMoney += Math.round(logsAmount*marketLogPrice);
        logsAmount = 0;
        likely = 0;

        animateNumber(moneyTxt, oldMoney, userMoney, 500, "Money: $");

        logsTxt.textContent = `Logs: ${logsAmount}`;
        likelyTxt.textContent = `After selling your logs you'll get: $${likely}`;
    }

}
