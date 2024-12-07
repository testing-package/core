/**
 * @description A type representing the configuration for a `TestingCounter`.
 * It can either be a boolean or an object with optional `active` and `description` properties.
 * @export
 * @typedef {boolean | { active?: Active, description?: Description }} CounterConfig
 * @template {boolean} [Active=boolean] - A boolean indicating the active state of the counter.
 * @template {boolean} [Description=boolean] - A boolean indicating whether the counter has a description.
 */
export type CounterConfig = boolean | {active?: boolean, description?: boolean};
