import React from 'react';
import { 
    View,
    StyleSheet,
    TextInput,
    Text
} from 'react-native';
import BotaoGenerico from '../components/BotaoGenerico';

export default class CadastrarAlunoScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.titulo}>
                    Cadastrar Aluno
                </Text>

                <TextInput
                    autoCapitalize={"sentences"}
                    placeholder={'Nome'}
                    style={styles.input}
                />

                <TextInput
                    autoCapitalize={"sentences"}
                    placeholder={'Sobrenome'}
                    style={styles.input}
                />

                <TextInput
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                    placeholder={'E-mail'}
                    style={styles.input}
                />

                <TextInput
                    autoCapitalize={"none"}
                    placeholder={'Senha'}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <TextInput                    
                    autoCapitalize={"sentences"}
                    placeholder={'Curso'}
                    style={styles.input}
                />

                <BotaoGenerico
                    acao={() => console.log('kek')}
                    style={{ marginVertical: 20 }}
                    titulo={'CADASTRAR'}
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