// folioGenerator.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtiene la ruta del directorio actual en entornos ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Genera el archivo de folios y los escribe en un archivo CSV
export function generarFolios({ folioInicial, folioFinal, moldes, digitos, caracterRelleno, sobrantes }) {
    const rango = folioFinal - folioInicial + 1;
    const filas = rango / moldes;
    const folderName = path.join(__dirname, 'folios');  // Crea la carpeta 'folios' en la raíz del proyecto
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName); // Crea la carpeta si no existe
    const fileName = `${folderName}/Folio_${folioInicial}_a_${folioFinal}_${moldes}_moldes_${Date.now()}.csv`;

    if (validate({ folioInicial, folioFinal, moldes })) {
        fs.writeFileSync(fileName, linea1(moldes));

        for (let i = 0; i < filas; i++) {
            fs.appendFileSync(fileName, linea(folioInicial + i, moldes, filas, digitos, caracterRelleno));
        }

        for (let i = 0; i < sobrantes; i++) {
            fs.appendFileSync(fileName, lineaSobrante(moldes));
        }

        console.log(`${fileName} creado exitosamente`);
    } else {
        console.log('Error en los parámetros proporcionados.');
    }
}

// Función para validar los parámetros de entrada
function validate({ folioInicial, folioFinal, moldes }) {
    const rango = folioFinal - folioInicial + 1;
    const filas = rango / moldes;
    if (folioFinal < folioInicial) {
        console.log('Error: El folio inicial debe ser menor que el folio final.');
        return false;
    }
    if (!Number.isInteger(filas)) {
        console.log('Error: El rango de folios no cuadra con el número de moldes.');
        return false;
    }
    return true;
}

// Función para crear una línea con los folios correspondientes
function linea(folio, moldes, filas, digitos, caracterRelleno) {
    let linea = '';
    for (let i = 1; i <= moldes; i++) {
        linea += i < moldes
            ? `${formatearFolio(folio + filas * (i - 1), digitos, caracterRelleno)},`
            : `${formatearFolio(folio + filas * (i - 1), digitos, caracterRelleno)}\n`;
    }
    return linea;
}

// Función para formatear el folio con ceros o caracteres de relleno
function formatearFolio(folio, digitos, caracterRelleno) {
    return folio.toString().padStart(digitos, caracterRelleno);
}

// Función para la primera línea del archivo
function linea1(moldes) {
    return Array.from({ length: moldes }, (_, i) => i + 1).join(',') + '\n';
}

// Función para crear líneas sobrantes en blanco
function lineaSobrante(moldes) {
    return Array.from({ length: moldes }, () => ' ').join(',') + '\n';
}
