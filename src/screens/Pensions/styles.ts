import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { PensionsStyle } from './types';

const { height } = Dimensions.get("screen")

export const Container = styled.View<PensionsStyle>`
    width: 100%;
    height: ${height * 0.65}px;
    align-items: ${({ horizontalAlign }) => horizontalAlign ? horizontalAlign : "center"};
    justify-content: ${({ verticalAlign }) => verticalAlign ? verticalAlign : null};
`;