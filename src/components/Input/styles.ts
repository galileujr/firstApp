import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
    width: 100%;
    height: 55px;
    padding: 0 16px;
    background: #FAF5FF;;
    border-radius: 10px;
    margin-bottom: 8px;

    flex-direction: row;
    align-items: center;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #383E71;
    font-size: 16px;
    font-family: 'Montserrat-Medium';
`;

export const Icon = styled.TextInput`
    margin-right: 16px;
    color: #383E71;
`