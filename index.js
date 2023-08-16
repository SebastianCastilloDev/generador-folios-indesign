#!/usr/bin/env node

import fs from 'fs';
import inquirer from 'inquirer'

    const answers = inquirer.prompt([
        {
            type: 'number',
            message: 'Folio inicial',
            name:'folioInicial'
        },
        {
            type: 'number',
            message: 'Folio Final',
            name:'folioFinal'
        },
        {
            type: 'number',
            message: 'Moldes',
            name:'moldes'
        },
        {
            type: 'number',
            message: 'Digitos',
            name:'digitos',
            default: 6
        },
        {
            type: 'input',
            message: 'Caracter de relleno',
            name:'caracterRelleno',
            default: '0'
        },
        {
            type: 'number',
            message: 'Sobrantes',
            name:'sobrantes',
            default: 3
        }
    ]).then((answers) => {
        generarFolios(answers)
    })
    
function generarFolios(answers) {
    const {folioInicial, folioFinal, moldes, digitos,caracterRelleno, sobrantes} = answers

    const rango = folioFinal - folioInicial + 1
    const filas = rango / moldes
    const folderName = '/Users/sebastiancastillo/Library/CloudStorage/OneDrive-Personal/trabajos-talonarios'
    const file = `${folderName}/Ffolio ${ folioInicial } al ${ folioFinal } ${moldes} moldes ${Date.now()}.csv`
    
    if (validate(answers)) {

        //escribe la primer linea
        fs.writeFileSync(file, linea1(moldes))
        
        let i = 0 // recorre filas de folios
        while (i < filas) {
            fs.appendFileSync(file,linea(folioInicial+i, moldes, filas, digitos, caracterRelleno))
            i++
        }
        
        i = 0 // recorre filas de sobrantes
        while (i < sobrantes) {
            fs.appendFileSync(file,lineaSobrante(moldes))
            i++
        }
        console.log(`${file} creado exitosamente`)
    }
}

//crear linea
function linea(folio, moldes, filas, digitos, caracterRelleno) {
    let linea=''
    let i = 1
    
    while (i<=moldes){
        if (i<moldes){
            linea += `${formatearFolio(folio+filas*(i-1), digitos, caracterRelleno)},`
        } else if (i == moldes){
            linea += `${formatearFolio(folio+filas*(i-1), digitos, caracterRelleno)}\n` //no agrega la ultima "coma" al final
        }
        i++
    }
    return linea
}

// fs.appendFileSync(file,formatearFolio(folio+i))
function formatearFolio(folio, digitos, caracterRelleno) {
    return folio.toString().padStart(digitos,caracterRelleno)
}

function linea1(moldes){
    let linea=''
    let i = 1
    while (i<=moldes){
        if (i<moldes){
            linea += `${i.toString()},`
        } else if (i == moldes){
            linea += `${i.toString()}\n` //no agrega la ultima "coma" al final
        }
        i++
        // console.log(linea)
    }
    return linea
}

function lineaSobrante(moldes){
    let linea=''
    let i = 1
    while (i<=moldes){
        if (i<moldes){
            linea += ` ,`
        } else if (i == moldes){
            linea += ` \n` //no agrega la ultima "coma" al final
        }
        i++
        // console.log(linea)
    }
    return linea
}

function validate(answers){
    const {folioInicial, folioFinal, moldes} = answers

    const rango = folioFinal - folioInicial + 1
    const filas = rango / moldes

    if (folioFinal < folioInicial){
        console.log('Folio inicial debe ser menor que el folio final')
        return false
    } else if (!Number.isInteger(filas)){
        console.log('rango de folios no cuadra con el numero de moldes')
    } else {
        return true
    }
}
