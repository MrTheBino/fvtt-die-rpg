import DieRpgItemBase from "./base-item.mjs";

export default class DieRpgEmotion extends DieRpgItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.activated = new fields.BooleanField({ initial: false });
    schema.emotion_lvl1 = new fields.StringField({ blank: true });
    schema.emotion_lvl2 = new fields.StringField({ blank: true });
    schema.emotion_lvl3 = new fields.StringField({ blank: true });
    schema.emotion_lvl4 = new fields.StringField({ blank: true });

    return schema;
  }
}