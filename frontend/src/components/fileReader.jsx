import { useState, useEffet } from "react"
import {Container, Form, Button} from 'react-bootstrap'
import * as xlsx from 'xlsx'

export default function fileReader(){
    const [filename, setFilename] = useState('')
    const [columnas, setColumnas] = useState([])
    const [filas, setFilas] = useState([])
    const [archivo, setArchivo] = useState([])
    const [smpFile, setSmpFile] = useState([])
    const [sabanas, setSabanas] = useState([])
    const [isReaded, setIsReaded] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    const importFile = (e) => {
        setArchivo([])
        setIsSelected(false)
        setColumnas([])
        setFilas([])
        setFilename('')
        setSabanas([])
        console.log(e)
        let nombreArchivo = e.target.value
        nombreArchivo = `${nombreArchivo.split("\\").pop()}`
        setFilename(nombreArchivo)
        let extension = nombreArchivo.split('.').pop()
        if(extension != 'xls' || extension != 'xlsx'){
            return(<></>)
        }
        const arch = e.target.files[0]
        const lector = new FileReader()
        lector.onload = (event) => {
            const bstr = event.target.result
            const wb = xlsx.read(bstr, {type:'binary'})
            const wsn = wb.SheetNames
            
            let sheets = []
            let simpleSheets = []
            wsn.forEach( (sheet) => {
                let ws = wb.Sheets[sheet]
                let data = xlsx.utils.sheet_to_json(ws, {raw:'false', dateNF: 'dd-mm-yyyy'})
                let rowDefs = []
                let colDefs = []
                let cols = Object.keys(data[0])
                console.log(data, cols)
                data.forEach( (row) => {
                    rowDefs.push(row)
                } )
                cols.forEach( (col) => {
                    colDefs.push({
                        accessorKey: col,
                        header: col
                    })
                } )
                let smpRows = []
                
            } )
            setSabanas(sheets)
        }
    }
}