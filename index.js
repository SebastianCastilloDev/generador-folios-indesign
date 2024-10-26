// index.js
import inquirer from 'inquirer';
import { generarFolios } from './folioGenerator.js';
import { promptOptions } from './promptOptions.js';

inquirer
    .prompt(promptOptions)
    .then((answers) => {
        generarFolios(answers);
    });
