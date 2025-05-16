import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
    // Estado para almacenar la información del perfil del usuario
    const [profile, setProfile] = useState({
        nombre: '',
        apellido: '',
        comidaFavorita: ''
    });
    // Estado para controlar el indicador de carga
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para cargar el perfil cuando el componente se monta
    useEffect(() => {
        loadProfile();  
    }, []);

    // Función para cargar el perfil del usuario desde Firestore
    const loadProfile = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, 'usuarios', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProfile(docSnap.data());
            } else {
                console.log('No existe un perfil para este usuario');
            }
        } catch (error) {
            console.error('Error al cargar el perfil:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para actualizar el perfil del usuario en Firestore
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, 'usuarios', auth.currentUser.uid);
            await setDoc(docRef, profile);
            console.log('Perfil actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Error al actualizar el perfil');
        } finally {
            setIsLoading(false);
        }       
    };
    
    // Función para cerrar sesión del usuario
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation.replace('Login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión');
        }
    };

    // Renderizado condicional basado en el estado de carga
    return isLoading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
    ) : (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Icon
                    name="person"
                    type="material"
                    size={80}
                    color="#007bff"
                    containerStyle={styles.iconContainer}
                />
                <Text h3 style={styles.title}>Mi Perfil</Text>
                
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Nombre"
                        value={profile.nombre}
                        onChangeText={(text) => setProfile({ ...profile, nombre: text })}
                        leftIcon={<Icon name="person-outline" type="material" color="#007bff" />}
                        inputContainerStyle={styles.input}
                    />
                    <Input
                        placeholder="Apellido"
                        value={profile.apellido}
                        onChangeText={(text) => setProfile({ ...profile, apellido: text })}
                        leftIcon={<Icon name="person-outline" type="material" color="#007bff" />}
                        inputContainerStyle={styles.input}
                    />
                    <Input
                        placeholder="Comida Favorita"
                        value={profile.comidaFavorita}
                        onChangeText={(text) => setProfile({ ...profile, comidaFavorita: text })}
                        leftIcon={<Icon name="restaurant" type="material" color="#007bff" />}
                        inputContainerStyle={styles.input}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Actualizar Perfil"
                        onPress={handleUpdate}
                        buttonStyle={styles.updateButton}
                        containerStyle={styles.button}
                        icon={<Icon name="save" type="material" color="white" style={styles.buttonIcon} />}
                    />
                    <Button
                        title="Cerrar Sesión"
                        type="outline"
                        onPress={handleSignOut}
                        buttonStyle={styles.signOutButton}
                        containerStyle={styles.button}
                        icon={<Icon name="logout" type="material" color="#007bff" style={styles.buttonIcon} />}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    iconContainer: {
        marginBottom: 20,
        alignSelf: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        borderBottomWidth: 0,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        marginVertical: 10,
        borderRadius: 8,
    },
    updateButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
    },
    signOutButton: {
        borderColor: '#007bff',
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonIcon: {
        marginRight: 10,
    },
});