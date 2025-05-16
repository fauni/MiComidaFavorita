import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Pantalla de registro que permite a los usuarios crear una nueva cuenta
 * utilizando email y contraseña a través de Firebase Authentication
 */
export default function RegisterScreen({ navigation }) {
    // Estados para manejar los campos del formulario y la UI
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para validar el formulario cada vez que cambian los campos
    useEffect(() => {
        setFormValid(validateForm());
    }, [email, password, confirmPassword]);

    /**
     * Valida que la contraseña cumpla con los requisitos de seguridad
     * @param {string} password - La contraseña a validar
     * @returns {boolean} - true si la contraseña cumple con los requisitos
     */
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    /**
     * Valida todos los campos del formulario y establece los errores correspondientes
     * @returns {boolean} - true si el formulario es válido
     */
    const validateForm = () => {
        let errors = {};

        if (!email) errors.email = 'El email es requerido';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'El email no es válido';

        if (!password) errors.password = 'La contraseña es requerida';
        else if (!validatePassword(password)) {
            errors.password = 'Debe tener al menos 8 caracteres, mayúscula, minúscula, número y símbolo';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    /**
     * Maneja el proceso de registro del usuario
     * Crea una nueva cuenta en Firebase Authentication
     */
    const handleRegister = async () => {
        setIsLoading(true);
        if (validateForm()) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigation.replace('Home');
            } catch (error) {
                setError('Error al registrarse: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Muestra un indicador de carga mientras se procesa el registro
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    // Renderizado del formulario de registro
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Icon
                    name="person-add"
                    type="material"
                    size={80}
                    color="#007bff"
                    containerStyle={styles.iconContainer}
                />
                <Text h3 style={styles.title}>Registro</Text>

                {/* Contenedor de campos de entrada */}
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        leftIcon={<Icon name="email" type="material" color="#007bff" />}
                        errorMessage={formErrors.email}
                        inputContainerStyle={styles.input}
                    />
                    <Input
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        leftIcon={<Icon name="lock" type="material" color="#007bff" />}
                        errorMessage={formErrors.password}
                        inputContainerStyle={styles.input}
                    />
                    <Input
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        leftIcon={<Icon name="lock-outline" type="material" color="#007bff" />}
                        errorMessage={formErrors.confirmPassword}
                        inputContainerStyle={styles.input}
                    />
                </View>

                {/* Mensaje de error general */}
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {/* Contenedor de botones */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Registrarse"
                        onPress={handleRegister}
                        disabled={!formValid}
                        buttonStyle={styles.registerButton}
                        containerStyle={styles.button}
                        icon={<Icon name="how-to-reg" type="material" color="white" style={styles.buttonIcon} />}
                    />
                    <Button
                        title="Volver al Login"
                        type="outline"
                        onPress={() => navigation.navigate('Login')}
                        buttonStyle={styles.backButton}
                        containerStyle={styles.button}
                        icon={<Icon name="arrow-back" type="material" color="#007bff" style={styles.buttonIcon} />}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

// Estilos del componente
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
    registerButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
    },
    backButton: {
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
