import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { withTheme } from 'styled-components'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';



const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  

    const navigation = useNavigation()

    useEffect(() => {
        const auth = getAuth();
        const unsubcribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home")
            }
        })

        return unsubcribe
    }, [])

    const handleSignup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {

                console.log("certinho!!")
                const user = userCredential.user;
                console.log('Registered  with:', user.email)
            })
            .catch(error => alert(error.message))
    }

    const handLeLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('logged in with:', user.email);

            })
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"


        >

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Passaword"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />


            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={{ handLeLogin }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignup}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,


    },
    buttonContainer: {
        width: "60%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2,

    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16,
    },
})

