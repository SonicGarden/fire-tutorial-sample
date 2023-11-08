/** @type {import("stylelint").Config} */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'comment-empty-line-before': null,
    'at-rule-no-unknown': null,
  },
  allowEmptyInput: true,
};
