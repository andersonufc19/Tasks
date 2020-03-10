import React , {Component} from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    DatePickerIOS,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import commonStyle from '../commonStyle'

const initialState = {desc: '', data: new Date()}           //Criando o estado inicial do componente(desc: vazio)


/*-------------------------------------------------------------- 
                CRIANDO O COMPONENTE
----------------------------------------------------------------*/

export default class AddTasks extends Component {       

    state = {...initialState}                               //Definindo o estado com o operador '...' para espalhar as propriedades 

    
    save = () => {                                          //
        const data = {...this.state}
        this.props.onSave(data)                             //onSave() vai salvar as informações quando for efetuado um click
        this.setState({...initialState})                    //Restaurando o estado inicial


    }


    render(){
        return(
            <Modal onRequestClose={this.props.onCancel} 
                        visible={this.props.isVisible}  //Vai receber uma propreidade para saber se está visivel ou não
                        animationType='slide' transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={style.offset}></View>
                </TouchableWithoutFeedback>
                
            </Modal>
        )
    }
}