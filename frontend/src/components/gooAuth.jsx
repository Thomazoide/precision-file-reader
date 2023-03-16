import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import jwt_decode from 'jwt-decode'
import GoogleDrivePicker from './gDrivePicker'


export default function GoogleLogin(){
    const [isLogged, setIsLogged] = useState(false)
    const [tokens, setTokens] = useState()
    const [credenciales, setCredenciales] = useState()

    /* global google */
    

    const oAuthToken = (googleId) => {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: '644315389916-p2prgiic40hvpb51l6ilhhojog62frlv.apps.googleusercontent.com',
            scope: 'http://www.googleapis.com/auth/userinfo.profile',
            hint: googleId,
            prompt: '',
            callback: (tknRes) => {
                const Tokens = tknRes
                setTokens(Tokens)
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
            client_id: '',
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('loginBtn'),
            {theme: 'outline', size: 'large'}
        )
    }, [] )

    return(
        <>
            <Container className="bloque-boton">
                <div id="loginBtn"></div>
            </Container>
            <hr/>
            <Container className="bloque-boton">
                { isLogged ? <GoogleDrivePicker token={tokens.access_token}/> : null}
            </Container>
        </>
    )
    
}