import { GestureResponderEvent } from "react-native"

export interface IError {
    message: string,
    onPress: (event: GestureResponderEvent) => void
}