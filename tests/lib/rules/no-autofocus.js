'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/no-autofocus')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

const errorMessage = `The autofocus attribute should not be used, as it can
  reduce usability and accessibility for users.`

const ignoreNonDOMSchema = [
  {
    ignoreNonDOM: true,
  },
];

tester.run('no-autofocus', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div></div></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><foo bar></foo></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><foo autofocus></foo></template>',
      options: ignoreNonDOMSchema,
    },
    {
      filename: 'test.vue',
      code: '<template><foo v-bind:autofocus="true"></foo></template>',
      options: ignoreNonDOMSchema,
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div autoFocus /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-bind:autoFocus="true" /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-bind:autoFocus="false" /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-bind:autoFocus="undefined" /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><div autoFocus="true" /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><div autoFocus="false" /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><input autoFocus /></template>',
      errors: [errorMessage]
    },
    {
      filename: 'test.vue',
      code: '<template><Foo autoFocus /></template>',
      errors: [errorMessage]
    },
  ]
})
