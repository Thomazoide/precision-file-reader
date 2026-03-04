import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import useDrivePicker from 'react-google-drive-picker/dist'

export default function GoogleDrivePicker({token}){
    const [accessToken, setAccessToken] = useState(token)
    const [isLogged, setIsLogged] = useState(false)
    const [file, setFile] = useState()
    const [openPicker, authResponse] = useDrivePicker()

    useEffect( () => {
        let verifyToken = localStorage.getItem('access_token')
        if(verifyToken != ''){
            setAccessToken(verifyToken)
            console.log(accessToken)
            setIsLogged(true)
        }
    }, [] )

    const handleOpenPicker = () => {
        openPicker( {
            clientId: 'ID',
            developerKey: 'devKey',
            viewId: 'SPREADSHEETS',
            token: accessToken,
            showUploadView: false,
            showUploadFolders: false,
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
                    <p>opcion 1</p>
                    <button onClick={()=>handleOpenPicker()}></button>
                </Container> 

            </>
        )
    }
}
