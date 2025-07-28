import DieRpgItemBase from "./base-item.mjs";

export default class DieRpgClassFeatureGod extends DieRpgItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();


    schema.customName = new fields.StringField({ blank: true });
    schema.level = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 9 });
    schema.debt = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 9 });

    return schema;
  }
}