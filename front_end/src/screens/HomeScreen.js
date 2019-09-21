import React from 'react';
import { 
    View
} from 'react-native';
import BotaoGenerico from '../components/BotaoGenerico';

export default class HomeScreen extends React.Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center', marginVertical: 50 }}>
                <BotaoGenerico
                    acao={() => navigation.navigate('CadastrarAluno')}
                    titulo={'CADASTRAR ALUNO'}
                    style={{ marginBottom: 20 }}
                />

                <BotaoGenerico
                    acao={() => console.log('cadastrar')}
                    titulo={'CADASTRAR TIME'}
                    style={{ marginBottom: 20 }}
                />

                <BotaoGenerico
                    acao={() => console.log('cadastrar')}
                    titulo={'AVALIAR TIME'}
                    style={{ marginBottom: 20 }}
                />
            </View>
        )
    }
}