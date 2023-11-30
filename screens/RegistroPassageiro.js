import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { db } from '../firebase'
import { ref, set } from 'firebase/database'

const AddData = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // function to add data to firebase realtime db
    const dataAddOn = () => {
        set(ref(db, 'posts/' + 'newPosts/' + title), {
            title: title,
            body: body,
        });
        setTitle('')
        setBody('')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ReatlTim Db & Expo</Text>
            <TextInput 
            placeholder='Title'
            value={title}
            onChangeText = {(text) => setTitle(text)}
            style={styles.input}
            />
            <TextInput 
            placeholder='Body'
            value={body}
            onChangeText = {(text) => setBody(text)}
            style={styles.input}
            />
            <Button
            title='Add Data'
            onPress={dataAddOn}/>
        </View>
    )
}

export default AddData


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header:{
        fontSize:30,
        textAlign:'center',
        marginTop:100,
        fontWeight:'bold'
    },
    input:{
        borderWidth:1,
        borderColor:'black',
        margin:10,
        padding:10,
        fontSize:18,
        borderRadius:6
    }
});