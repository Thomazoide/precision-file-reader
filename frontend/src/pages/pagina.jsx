import { Container, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import './../estilos.css'
import GoogleLogin from "../components/gooAuth";

export default function Pagina(){
    return(
        <>
            <div className="cuerpo">
                <Container className="contenido">
                    <Form.Control type="file"></Form.Control>
                    <hr/>
                    <GoogleLogin/>
                </Container>
            </div>
        </>
    )
}