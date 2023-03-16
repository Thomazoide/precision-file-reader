import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import useDrivePicker from 'react-google-drive-picker'

export default function GoogleDrivePicker({token}){
    const accesToken = token
    const [file, setFile] = useState()
    const [openPicker, authResponse] = useDrivePicker()

    const handleOpenPicker = () => {
        openPicker( {
            clientId: '',
            developerKey: '',
            viewId: 'DOCS',
            token: accesToken,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: (data) => {
                if(data.action === 'cancel'){
                    console.log('Accion cancelada por el usuario...')
                }
                console.log(data)
                setFile(data)
            }
        } )

        return(
            <>
                <Container className='bloque-boton'>
                    <Button variant="info" onClick={()=>handleOpenPicker()} >Seleccionar desde Drive</Button>
                </Container>
            </>
        )
    }
}