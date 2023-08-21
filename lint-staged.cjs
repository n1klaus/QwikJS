module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'npm run fmt',
        'npm run lint',
        () => 'tsc-files --noEmit',
    ],
    '*.{js,jsx,ts,tsx,json,css,js}': [
        'npm run fmt'
    ],
}