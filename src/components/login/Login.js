import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Background from '../../elements/Background';
import Logo from '../../elements/Logo';
import Header from '../../elements/Header';
import TextInput from '../../elements/TextInput';
import { emailValidator, passwordValidator } from '../../core/until';
import Button from '../../elements/Button';
import { LoginContext } from '../../APIS/LoginAPI';
import { useTheme } from 'react-native-paper';
import { setLoading } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function Login({ navigation, setLoggedIn }) {

    const { colors } = useTheme();
    const styles = stylesR(colors);

    const dispatch = useDispatch();

    const { login } = useContext(LoginContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);

    const _onLoginPressed = () => {
        const emailError = emailValidator(email);
        const passwordError = passwordValidator(password);

        if (emailError || passwordError) {
            setError(true);
            return;
        }
        dispatch(setLoading(true));
        login({ email: email, password: password })
            .then(() => { dispatch(setLoading(false)); setLoggedIn(true); })
            .catch((err) => { dispatch(setLoading(false)); setError(err) });
        //   navigation.navigate('Home');
    };

    return (
        <Background>
            <View style={styles.container}>
                <Logo />
                <Header>.ברוכים הבאים</Header>
                <Text style={styles.error}>{error}</Text>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email || ""}
                    inputStyle={styles.input}
                    labelStyle={styles.labelStyle}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    inputStyle={styles.input}
                    labelStyle={styles.labelStyle}
                    value={password || ""}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <Button title={"היכנס"} onPress={_onLoginPressed} />
            </View>
        </Background>
    )
}

const stylesR = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: "22vw",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        fontSize: "1vw",
        color: colors.error
    },
    input: {
        backgroundColor: colors.backgroundSections,
        borderRadius: "0.5vw",
        paddingHorizontal: "1.2vw",
        fontSize: "1.1vw",
        flex: 1,
        color: colors.text,
        outlineStyle: "none",
        fontWeight: "bold",
    },
    labelStyle: {
        color: colors.text,
        fontWeight: "400"
    },
})