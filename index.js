import fs from 'fs';

const folioInicial = 181
const folioFinal = 200
const moldes = 4
const digitos = 6
const caracterRelleno = '0'
const sobrantes = 3
const rango = folioFinal - folioInicial + 1
const filas = rango / moldes

const file = `./Ffolio ${ folioInicial } al ${ folioFinal } ${moldes} moldes.csv`

function validate(){
    if (folioFinal < folioInicial){
        console.log('Folio inicial debe ser menor que el folio final')
        return false
    } else if (!Number.isInteger(filas)){
        console.log('rango de folios no cuadra con el numero de moldes')
    } else {
        return true
    }
}

function generarFolios() {

    if (validate()) {

        //escribe la primer linea
        fs.writeFileSync(file, linea1())
        
        let i = 0 // recorre filas de folios
        while (i < filas) {
            fs.appendFileSync(file,linea(folioInicial+i, moldes))
            i++
        }
        
        i = 0 // recorre filas de sobrantes
        while (i < sobrantes) {
            fs.appendFileSync(file,lineaSobrante())
            i++
        }
    }
    
}

generarFolios()



//crear linea
function linea(folio, moldes) {

    let linea=''
    let i = 1
    
    while (i<=moldes){
        if (i<moldes){
            linea += `${formatearFolio(folio+filas*(i-1))},`
        } else if (i == moldes){
            linea += `${formatearFolio(folio+filas*(i-1))}\n` //no agrega la ultima "coma" al final
        }
        i++
    }
    return linea
}

// fs.appendFileSync(file,formatearFolio(folio+i))
function formatearFolio(folio) {
    return folio.toString().padStart(digitos,caracterRelleno)
}

function linea1(){
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

function lineaSobrante(){
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