import { Spec } from "../lib/spec.class";


const spec = new Spec(
  125,
  'Expect the `a` to equal `a`',
  () => (expect('a').toEqual('a')),
  'it',
  false,
  {
    category: 'General',
    log: true,
    // tag: {index: '[index]'},
    template: 'auto',
  }
);

// console.log(spec.asyncExecute());
console.log(spec.execute());

