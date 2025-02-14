// jest.config.js
module.exports = {
  // Usa o preset do ts-jest para ESM (necessário para projetos que utilizam módulos ESM)
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom', // ambiente de browser para testes de componentes React
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // trata importações de CSS
  },
  transform: {
    // Passa a configuração do ts-jest (useESM: true) diretamente na propriedade transform
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
  },
  // Indica ao Jest que os arquivos com extensão .ts e .tsx devem ser tratados como módulos ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // Caso seja necessário transformar algum módulo do node_modules que usa sintaxe ESM, você pode ajustar:
  transformIgnorePatterns: [
    "node_modules/(?!next/navigation)"
  ],
};