import React, { useRef,useCallback} from 'react';
import {Image, ScrollView,KeyboardAvoidingView, Platform, View,Alert, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, BackToSignIn,BackToSignInText} from './styles';
import getValidationErrors from '../../utils/getValidationsErros';
import logoImg from '../../assets/logo.png';

interface SignUpFromData{
    name: string;
    email: string;
    password: string;
}


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback (async (data: SignUpFromData) => {
        try{
          formRef.current?.setErrors({})
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('E-mail obrigatório').email('Informe um e-mail valido'),
            password: Yup.string().min(6,'minimo 6 digitos'),
          })
          await schema.validate(data, {
            abortEarly: false,
          });
          await api.post('/email',data);          
          navigation.goBack();
          //history.push('/');
        } catch(err) {
          if (err instanceof Yup.ValidationError){
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors)
            console.log(data);
            return;
          }
          Alert.alert(
            'Erro no cadastro',
            'Ocorreu um erro ao fazer cadastro, tente novamente',
            
        );
        }
        
      },[navigation]);  
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
                        <View>
                            <Title>Crie sua conta</Title>
                        </View> 
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input 
                                autoCapitalize="words" 
                                name="name" 
                                icon="user" 
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current?.focus()}
                            />
                            <Input 
                                ref= {emailInputRef}
                                keyboardType="email-address" 
                                autoCorrect={false} 
                                autoCapitalize="none"
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()}
                            />
                            <Input 
                                ref={passwordInputRef}
                                secureTextEntry 
                                name="password" 
                                icon="lock" 
                                placeholder="Senha"
                                textContentType="newPassword"    
                                returnKeyType="send"
                                onSubmitEditing={()=> formRef.current?.submitForm()}
                            />
                            <Button onPress={()=> formRef.current?.submitForm()} >Cadastrar</Button>
                        </Form>   
                    </Container>
                </ScrollView>    
            </KeyboardAvoidingView>    
            <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInText>Voltar para SingIn</BackToSignInText>
            </BackToSignIn>
        </>    
    );    
};
export default SignUp;