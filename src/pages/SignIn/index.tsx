import React,{useCallback,useRef} from 'react';
import {Image, ScrollView,KeyboardAvoidingView, Platform, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, ForgotPassword, ForgotPasswordText,CreateAccountButton,CreateAccontButtonText} from './styles';
import logoImg from '../../assets/logo.png';


const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    formRef.current?.setFieldValue

    const handleSignIn = useCallback((data: object) => {
        console.log(data);
    },[]);
    return (
        <>
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled>
                <ScrollView 
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{flex: 1}}>    
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Olá, seja bem-vindo!</Title>
                        </View>    
                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input 
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={()=>{
                                    passwordInputRef.current?.focus();
                                }}    
                            />
                            <Input 
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password" 
                                icon="lock" 
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={()=>{
                                    formRef.current?.submitForm();
                                }}
                            />
                            <Button onPress={()=>{
                                formRef.current?.submitForm();
                            }} >Entrar</Button>
                        </Form>
                        <ForgotPassword onPress={() => {}}> 
                        <ForgotPasswordText>Esqueceu seu login ou senha? Clique aqui </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>    
            </KeyboardAvoidingView>    
            <CreateAccountButton onPress={() =>navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccontButtonText>Criar uma conta</CreateAccontButtonText>
            </CreateAccountButton>
        </>    
    );    
};
export default SignIn;