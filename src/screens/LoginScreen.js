import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Pantalla de inicio de sesión que maneja la autenticación de usuarios
 * @param {Object} navigation - Objeto de navegación de React Navigation
 */
export default function LoginScreen({ navigation }) {
    // Estados para manejar el formulario y la autenticación
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para validar el formulario cuando cambian email o password
    useEffect(() => {
        setFormValid(validateLoginForm());
    }, [email, password]);

    /**
     * Mapea los códigos de error de Firebase a mensajes amigables en español
     * @param {string} errorCode - Código de error de Firebase
     * @returns {string} Mensaje de error traducido
     */
    const getFirebaseErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-credential':
                return 'Correo electrónico o contraseña incorrectos';
            default:
                return 'Error al iniciar sesión. Por favor, intente nuevamente';
        }
    };

    /**
     * Valida los campos del formulario de inicio de sesión
     * @returns {boolean} true si el formulario es válido, false en caso contrario
     */
    const validateLoginForm = () => {
        let errors = {};

        if (!email) errors.email = 'Ingrese su correo electrónico';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'El email ingresado no es válido';

        if (!password) errors.password = 'Ingrese su contraseña';
        else if (password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    /**
     * Maneja el proceso de inicio de sesión con Firebase
     * Realiza la validación del formulario y la autenticación
     */
    const handleLogin = async () => {
        setIsLoading(true);
        if (validateLoginForm()) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigation.replace("Home");
            } catch (error) {
                const errorMessage = getFirebaseErrorMessage(error.code);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }

    // Renderizado condicional basado en el estado de carga
    return isLoading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
    ) : (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {/* Icono y título de la aplicación */}
                <Icon
                    name="restaurant"
                    type="material"
                    size={80}
                    color="#007bff"
                    containerStyle={styles.iconContainer}
                />
                <Text h3 style={styles.title}>Mi Comida Favorita</Text>

                {/* Formulario de inicio de sesión */}
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        errorMessage={formErrors.email}
                        leftIcon={<Icon name="email" type="material" color="#007bff" />}
                        inputContainerStyle={styles.input}
                    />

                    <Input
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        errorMessage={formErrors.password}
                        leftIcon={<Icon name="lock" type="material" color="#007bff" />}
                        inputContainerStyle={styles.input}
                    />
                </View>

                {/* Mensaje de error de autenticación */}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {/* Botones de acción */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Iniciar Sesión"
                        onPress={handleLogin}
                        disabled={!formValid}
                        buttonStyle={styles.loginButton}
                        containerStyle={styles.button}
                        icon={<Icon name="login" type="material" color="white" style={styles.buttonIcon} />}
                    />

                    <Button
                        title="Registrarse"
                        type="outline"
                        onPress={() => navigation.navigate("Register")}
                        buttonStyle={styles.registerButton}
                        containerStyle={styles.button}
                        icon={<Icon name="person-add" type="material" color="#007bff" style={styles.buttonIcon} />}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

// Estilos de la pantalla
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
        marginTop: 50,
        marginBottom: 20,
        alignSelf: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 40,
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
    loginButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
    },
    registerButton: {
        borderColor: '#007bff',
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 8,
    },
    error: {
        color: '#dc3545',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },
    buttonIcon: {
        marginRight: 10,
    },
});
