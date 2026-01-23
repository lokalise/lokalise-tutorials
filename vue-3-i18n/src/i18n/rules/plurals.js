function lvPlurals(choice, _choicesLength, _orgRule) {
  if (choice === 0) return 0
  return new Intl.PluralRules('lv').select(choice) === 'one' ? 1 : 2
}

function frPlurals(choice, _choicesLength, _orgRule) {
  if (choice === 0) return 0
  return new Intl.PluralRules('fr').select(choice) === 'one' ? 1 : 2
}

export default { lv: lvPlurals, fr: frPlurals }