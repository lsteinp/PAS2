import React from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity
} from 'react-native';

export default class BotaoGenerico extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={[styles.botao, this.props.style]}
                onPress={() => this.props.acao()}
            >
                <Text style={styles.texto}>
                    {this.props.titulo}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    botao: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: 150,
        height: 50
    },
    texto: {
        fontSize: 18,
        textAlign: 'center'
    }
});