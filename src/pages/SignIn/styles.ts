import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
    font-size: 24px;
    line-height: 32px;
    color: #383E71;
    font-family: 'Montserrat-Medium';
    margin: 25px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
    font-family: 'Montserrat-Medium';
    font-size: 16px;
    color: #FFFFFF;
`;

export const CreateAccountButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #130525;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const CreateAccontButtonText = styled.Text`
    font-family: 'Montserrat-Medium';
    font-size: 18px;
    color: #FFFFFF;
`;