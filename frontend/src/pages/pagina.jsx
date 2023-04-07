import { Container, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import './../estilos.css'
import GoogleLogin from "../components/gooAuth";
import GoogleDrivePicker from "../components/gDrivePicker"

export default function Pagina(){
    return(
        <>
            <div className="cuerpo">
                <Container className="contenido">
                    <GoogleLogin/>
                    <GoogleDrivePicker/>
                </Container>
            </div>
        </>
    )
}