import React, {createContext, useCallback, useState,useContext,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';



interface AuthState {
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData{
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signUp(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    
}
 const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

const AuthProvider: React.FC = ({children}) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
        useEffect(() => {
            async function loadStorageData(): Promise<void>{
                const user = await AsyncStorage.getItem('@Estudo:user');    

                //if (user[1]){
                 // setData({user: JSON.parse(user[1])});
                //}
            }
            loadStorageData();
        }
    )

    
    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('email/sigIn', {
            email,
            password,
        })
        const user = response.data;
        
        await AsyncStorage.setItem('@Estudo:user',JSON.stringify(user));
        setData({user});
    },[]);

    const signUp = useCallback(async ({email, password}) => {
        const response = await api.post('email/sigUp', {
            email,
            password,
        })
        const user = response.data;
        

        await AsyncStorage.setItem('@Estudo:user',JSON.stringify(user));
        setData({user});
    },[]);

    const signOut = useCallback(async() => {
        await AsyncStorage.removeItem('@Estudo:user');   

        setData({} as AuthState);
    },[])
    
    return(
        <AuthContext.Provider value={{user: data.user, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}
function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
return context;
} 
export { AuthProvider, useAuth};    



