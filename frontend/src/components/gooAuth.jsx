import { useEffect, useState } from "react"
import { Button, Container, DropdownButton, Dropdown } from "react-bootstrap"
import jwt_decode from 'jwt-decode'
import GoogleDrivePicker from './gDrivePicker'


export default function GoogleLogin(){
    const [isLogged, setIsLogged] = useState(false)
    const [tokens, setTokens] = useState(null)
    const [credenciales, setCredenciales] = useState()
    const [slection, setSelection] = useState(0)

    /* global google */
    useEffect( () => {
        if(localStorage.getItem('access_token') != '' || localStorage.getItem('access_token') != 'null' || localStorage.getItem('access_token') != 'undefined'){
            setTokens(localStorage.getItem('access_token'))
            setIsLogged(true)
        }
    }, [] )

    const oAuthToken = (googleId) => {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: '644315389916-p2prgiic40hvpb51l6ilhhojog62frlv.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
            hint: googleId,
            prompt: '',
            callback: (tknRes) => {
                const Tokens = tknRes
                setTokens(Tokens)
                console.log(Tokens)
                localStorage.setItem('access_token', Tokens.access_token)
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
    }, [] )

    const handleSelect = (e) => {
        setSelection(e)
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
                    onSelect={()=>null}
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
        </>
    )
    
}