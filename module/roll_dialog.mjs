export function addShowDicePromise(promises, roll) {
  if (game.dice3d) {
    // we pass synchronize=true so DSN dice appear on all players' screens
    promises.push(game.dice3d.showForRoll(roll, game.user, true, null, false));
  }
}

export async function rollDialogV1(actor,num_dice,label){
    let rollDiceFaceSuccess = 4;
    const actorRollData = actor.getRollData();
    let numDice = num_dice;
    let rollAdvantageDisadvantage = 0;
    let rollDifficulty = 0;
    let classDie = "";
    
    const cardTitle = "RollDialog";
    const rollResult = {
        actor,
        cardTitle,
        numDice,
        label,
        rollDiceFaceSuccess,
        rollAdvantageDisadvantage,
        rollDifficulty,
        classDie
      };
      const html = await foundry.applications.handlebars.renderTemplate(
        "systems/fvtt-die-rpg/templates/dialogs/roll_dialog.hbs",
        rollResult
      );

      return new Promise((resolve) => {
        new Dialog({
          title: "Roll Dialog",
          content: html,
          buttons: {
            roll: {
              icon: '<i class="fas fa-dice-d6"></i>',
              label: game.i18n.localize("DIE_RPG.Labels.roll"),
              callback: (html) => rollDialogV1Callback(actor, html),
            },
          },
          default: "roll",
          close: () => resolve(null),
        }).render(true);
      });
}

async function rollDialogV1Callback(actor, html) {
    const form = html[0].querySelector("form");
    const actorRollData = actor.getRollData();
    
    const label = form.label.value;
    const numDice = form.numDice.value;
    const rollDiceFaceSuccess = form.rollDiceFaceSuccess.value;
    let rollFormula = `${numDice}d6`;
    const rollDifficulty = form.rollDifficulty.value;
    const classDie = form.classDie.value;

    if (classDie.length > 0) {
        rollFormula += ` + ${classDie}`;  
    }

    const dicePromises = [];

    let isCriticalFail = false;

    const dicePoolRoll = new Roll(rollFormula, actorRollData);
    await dicePoolRoll.evaluate();
    let rollResult = dicePoolRoll.terms[0].results
    
    if (dicePoolRoll.terms[2]) { // class die?
      rollResult = rollResult.concat(dicePoolRoll.terms[2].results);
    }
    //console.log(rollResult);

    let numSuccesses = 0;
    let singleRolls = []
    let successesAfterDifficulty = 0;
    let oneDiceHasAOne = false;

    for(const result of rollResult) {
        if (result.result >= rollDiceFaceSuccess) {
            numSuccesses += 1;
        }

        if (result.result === 1) {
            oneDiceHasAOne = true;
        }
        singleRolls.push(result.result);
    }
    addShowDicePromise(dicePromises, dicePoolRoll);
    await Promise.all(dicePromises);

    if(numSuccesses > rollDifficulty) {
        successesAfterDifficulty = numSuccesses - rollDifficulty;
    }

    if (successesAfterDifficulty === 0 && oneDiceHasAOne){
        isCriticalFail = true;
    }

    const rollDialogVars = {
        numSuccesses,
        label,
        singleRolls,
        rollDiceFaceSuccess,
        rollDifficulty,
        successesAfterDifficulty,
        isCriticalFail
    }
    renderpoolRollResult(actor,rollDialogVars);
}

export async function renderpoolRollResult(actor, rollResult) {
  const html = await renderTemplate(
    "systems/fvtt-die-rpg/templates/chat/pool-roll-result.hbs",
    rollResult
  );
  ChatMessage.create({
    content: html,
    speaker: ChatMessage.getSpeaker({ actor }),
  });
}