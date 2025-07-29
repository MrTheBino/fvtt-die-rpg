import DieRpgItemBase from "./base-item.mjs";

export default class DieRpgClassFallenAbility extends DieRpgItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.selected = new fields.BooleanField({ initial: false });
    

    return schema;
  }
}