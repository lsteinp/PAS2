import React from 'react';
import { 
    Button, 
    View, 
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import BotaoGenerico from '../components/BotaoGenerico';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.titulo}>
                    Login
                </Text>

                <TextInput
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                    placeholder={'email@example.com'}
                    style={styles.input}
                />

                <TextInput
                    autoCapitalize={"none"}
                    placeholder={'password'}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <BotaoGenerico
                    acao={() => console.log('kek')}
                    style={{ marginVertical: 20 }}
                    titulo={'ENTRAR'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 26,
        marginTop: 40,
        marginBottom: 30
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        width: 250,
        marginVertical: 10,
        textAlign: "center"
    }
});