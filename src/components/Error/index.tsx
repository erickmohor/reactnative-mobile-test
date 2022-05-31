import React from "react"
import MessageBox from "../MessageBox"
import MessageButton from "../MessageButton"
import { Container } from "./styles"
import { IError } from "./types"


export default function Error(props: IError) {
    return (
        <Container>
        <MessageBox
            type="error"
            message={props.message}
        />
        <MessageButton
            type="tryAgain"
            onPress={props.onPress}
        />
    </Container>
    )
}