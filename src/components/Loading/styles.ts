import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get("screen")

export const Container = styled.View`
    width: 100%;
    height: ${height * 0.65}px;
    align-items: center;
    justify-content: center;
`;