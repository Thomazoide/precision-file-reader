import { useEffect, useState } from "react"
import { Button, Container, DropdownButton, Dropdown } from "react-bootstrap"
import jwt_decode from 'jwt-decode'
import useDrivePicker from "react-google-drive-picker/dist"
import GoogleDrivePicker from './gDrivePicker'


export default function GoogleLogin(){
    const [isLogged, setIsLogged] = useState(false)
    const [tokens, setTokens] = useState(null)
    const [credenciales, setCredenciales] = useState()
    const [selection, setSelection] = useState(0)
    const [openPicker, authResponse] = useDrivePicker()


    const oAuthToken = (googleId) => {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: '644315389916-p2prgiic40hvpb51l6ilhhojog62frlv.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
            hint: googleId,
            prompt: '',
            callback: (tknRes) => {
                const Tokens = tknRes
                let at = Tokens.access_token
                setTokens(at)
                console.log(at)
                localStorage.setItem('access_token', at)
                localStorage.setItem('time_of_token_request', Date.now()/1000)
            }
        })
        client.requestAccessToken()
    }

    const handleCallbackResponse = (res) => {
        console.log('JWT: '. res)
        var usrObj = jwt_decode(res.credential)
        setIsLogged(true)
        setCredenciales(usrObj)
        oAuthToken(usrObj.email)
    }

    useEffect( () => {
        google.accounts.id.initialize({
            client_id: '644315389916-p2prgiic40hvpb51l6ilhhojog62frlv.apps.googleusercontent.com',
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: 'outline', size: 'large'}
        )

        if(localStorage.getItem('access_token') != '' || localStorage.getItem('access_token') != 'null' || localStorage.getItem('access_token') != 'undefined'){
            setTokens(localStorage.getItem('access_token'))
            setIsLogged(true)
        }
        let time_of_token_request = localStorage.getItem('time_of_token_request')
        let access_token = localStorage.getItem('access_token')
        if( (time_of_token_request - (Date.now()/1000)) > 3600  || access_token === 'null'){
            localStorage.setItem('access_token', 'null')
            setIsLogged(false)
            setTokens('null')
        }
    }, [] )

    const handleSelect = (e) => {
        console.log(e, tokens)
        setSelection(e)
    }

    const handleOpenPicker = () => {
        openPicker( {
            clientId: '644315389916-p2prgiic40hvpb51l6ilhhojog62frlv.apps.googleusercontent.com',
            developerKey: 'AIzaSyAnR02rEMk7wKmvPv6SXLwQYzPSk3L6zs8',
            viewId: 'SPREADSHEETS',
            token: tokens,
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
    }

    return(
        <>
            {!isLogged ? <Container className="bloque-boton">
                <div id="signInDiv"></div>
            </Container> : null}
            <Container className='bloque-info'>
                {
                    isLogged ?
                    <DropdownButton 
                    variant="info"
                    onSelect={handleSelect}
                    title='Seleccionar opcion'>
                        <Dropdown.Item key={1} eventKey={1}>
                            Seleccionar desde Google Drive
                        </Dropdown.Item>
                        <Dropdown.Item key={2} eventKey={2}>
                            Seleccionar desde tu PC
                        </Dropdown.Item>
                    </DropdownButton>
                    : null
                }
                
            </Container>
            <Container className="bloque-info">
                {
                    isLogged ?
                    <Container className="bloque-info">
                        {
                            selection == 1 ?
                            <Button variant="info" onClick={()=>handleOpenPicker()}>Abrir con Google Drive</Button>
                            :
                            selection == 2 ?
                            <Button variant="info" onClick={()=>handleOpenPicker()}>Abrir con Google Drive</Button>
                            : null
                        }
                    </Container>
                    : null
                }
            </Container>
        </>
    )
    
}