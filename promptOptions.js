// promptOptions.js

export const promptOptions = [
    {
        type: 'number',
        message: 'Folio inicial:',
        name: 'folioInicial'
    },
    {
        type: 'number',
        message: 'Folio final:',
        name: 'folioFinal'
    },
    {
        type: 'number',
        message: 'Número de moldes:',
        name: 'moldes'
    },
    {
        type: 'number',
        message: 'Cantidad de dígitos:',
        name: 'digitos',
        default: 6
    },
    {
        type: 'input',
        message: 'Carácter de relleno:',
        name: 'caracterRelleno',
        default: '0'
    },
    {
        type: 'number',
        message: 'Número de sobrantes:',
        name: 'sobrantes',
        default: 3
    }
];
