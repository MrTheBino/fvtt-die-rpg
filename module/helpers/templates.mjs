/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/fvtt-die-rpg/templates/actor/parts/actor-features.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-items.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-spells.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-effects.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-the-godbinder.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-the-neo.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-the-fool.hbs',
    'systems/fvtt-die-rpg/templates/actor/parts/actor-stats.hbs',
    // Item partials
    'systems/fvtt-die-rpg/templates/item/parts/item-effects.hbs',
  ]);
};
