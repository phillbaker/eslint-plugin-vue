'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('../utils')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const errorMessage = `The autofocus attribute should not be used, as it can
  reduce usability and accessibility for users.`

module.exports = {
  meta: {
    docs: {
      description: 'the autofocus attribute should not be used',
      category: 'assible',
      url: 'https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-autofocus.md'
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          ignoreNonDOM: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create (context) {
    // Determine if ignoreNonDOM is set to true
    // If true, then do not run rule.
    const options = context.options[0] || {}
    const ignoreNonDOM = !!options.ignoreNonDOM

    /**
     * Check the given element for the `autofocus` attributes.
     * @param {ASTNode} element The element node to check.
     */
    function checkAttribute (attribute) {
      if (ignoreNonDOM) {
        if (utils.isCustomComponent(attribute.parent.parent)) return
      }

      context.report({
        node: attribute.parent,
        loc: attribute.parent.loc,
        message: errorMessage
      })
    }

    return utils.defineTemplateBodyVisitor(context, {
      "VAttribute[key.name='autofocus']" (node) {
        checkAttribute(node)
      },
      "VAttribute[directive=true][key.name='bind'][key.argument='autofocus']" (node) {
        checkAttribute(node)
      }
    })
  }
}
