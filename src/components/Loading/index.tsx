import React from "react"
import { ActivityIndicator, Text } from "react-native"
import { Container } from "./styles"
import colors from "../../themes/light"

export default function Loading() {
    return (
        <Container>
                <ActivityIndicator size="large" color={colors.colors.purple} />
            </Container>
    )
}