import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    
    height: 60px;
    background: #9D25B0;
    box-shadow: 0px 10px 25px #CF99DB;
    border-radius: 8px;
    margin-top: 8px;
    

    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-family: 'Montserrat-Medium';
    font-size: 18px;
    font-style: normal;
    color: #FFFFFF;
`;
