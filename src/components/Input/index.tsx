import React, {useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback} from 'react';
import { TextInputProps } from 'react-native';
import {Container,TextInput,Icon } from './styles';
import {useField} from '@unform/core';
import { VoidFunctionComponent } from 'react';


interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef,InputProps> = ({name, icon, ...rest},ref) => {
    const inputElementRef = useRef<any>(null);
    
    const {registerField, defaultValue = '', fieldName, error} = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: 'defaultValue'});
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    },[]);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value); //se tiver valor nesta variavel, recebe TRUE senão FALSE
    },[]);

    useImperativeHandle(ref,() =>({
        focus() {
            inputElementRef.current.focus();
        }
    }))
    
    useEffect(() =>{
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value){
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({text: value});
            },
            clearValue(){
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        });
    },[fieldName,registerField ])

    return (
        <Container isFocused={isFocused} isErrored={!!error}>
        <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#383E71'}/>
        <TextInput 
            ref={inputElementRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            keyboardAppearance="dark"
            placeholderTextColor="#383E71"
            defaultValue={defaultValue}
            onChangeText={(value) => {
                inputValueRef.current.value = value;
            }}
            {...rest}            
            />

        </Container>
    );
};
export default forwardRef(Input);