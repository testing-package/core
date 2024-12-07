import { Testing } from "../lib";

// Defaults
const defaults = new Testing([]); // true, {'descriptions': 'a', 'expectations': 'b'}, 'auto'

defaults.describe('describe', () => defaults
  .it('it', () => expect('a').toEqual('a'))
  .describe('describe', () => defaults
    .it('it', () => expect(true).toBeTruthy())
  )
);

defaults.describe('describe', () => defaults
  .it('it', () => expect('a').toEqual('a'))
  .it('it', () => expect('a').toEqual('a'))
);

// `false` execute
const t = new Testing([], false);
