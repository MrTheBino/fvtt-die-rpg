import DieRpgActorBase from "./base-actor.mjs";

export default class DieRpgCharacter extends DieRpgActorBase {
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.classType = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.level = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.classDie = new fields.StringField({ blank: true });
    schema.fairGold = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.foolDieFace = new fields.ArrayField(new fields.NumberField({ required: true, initial: 0 }));

    schema.cheatTokens = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.emotionSelected = new fields.StringField({ blank: true });
    schema.emotionScale = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.isFallen = new fields.BooleanField({ initial: false });

    schema.attributes = new fields.SchemaField({
      strength: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      }),
      dexterity: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      }),
      constitution: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      }),
      wisdom: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      }),
      intelligence: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      }),
      charisma: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    /*
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.DIE_RPG.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      });
      return obj;
    }, {}));*/

    return schema;
  }

  prepareDerivedData() {
    /*
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor((this.abilities[key].value - 10) / 2);
      // Handle ability label localization.
      this.abilities[key].label = game.i18n.localize(CONFIG.DIE_RPG.abilities[key]) ?? key;
    }*/
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    /*if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;*/

    return data;
  }
}
