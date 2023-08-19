module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'npm run fmt',
        'npm run lint',
        'npm run test --bail --watchAll=false --findRelatedTests --passWithNoTests',
        () => 'tsc-files --noEmit',
    ],
    '*.{js,jsx,ts,tsx,json,css,js}': [
        'prettier --write'
    ],
}