import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import useDrivePicker from 'react-google-drive-picker'

export default function GoogleDrivePicker({logStatus}){
    const [accessToken, setAccessToken] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [file, setFile] = useState()
    const [openPicker, authResponse] = useDrivePicker()

    useEffect( () => {
        let verifyToken = localStorage.getItem('access_token')
        if(verifyToken != ''){
            setAccessToken(verifyToken)
            setIsLogged(true)
        }
    } )

    const handleOpenPicker = () => {
        openPicker( {
            clientId: '',
            developerKey: '',
            viewId: 'SPREADSHEETS',
            token: accessToken,
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
                {isLogged ? <Container className='bloque-boton'>
                    <Button variant="info" onClick={()=>handleOpenPicker()} >Seleccionar desde Drive</Button>
                </Container> : null}

            </>
        )
    }
}