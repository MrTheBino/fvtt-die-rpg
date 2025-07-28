import DieRpgItemBase from "./base-item.mjs";

export default class DieRpgClassFeatureNeo extends DieRpgItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.activated = new fields.BooleanField({ initial: false });
    

    return schema;
  }
}