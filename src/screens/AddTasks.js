import React , {Component} from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    DatePickerIOS,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    DatePickerAndroid,
    Platform
} from 'react-native'
import moment from 'moment'
import commonStyle from '../commonStyle'

const initialState = {desc: '', data: new Date()}           //Criando o estado inicial do componente(desc: vazio)


/*-------------------------------------------------------------- 
                CRIANDO O COMPONENTE ADDTAKS
----------------------------------------------------------------*/

export default class AddTasks extends Component {       

    state = {...initialState}                               //Definindo o estado com o operador '...' para espalhar as propriedades 

    

    /*----------------------------------------------------------
            FUNÇÃO RESPONSÁVEL POR SALVAR UMA TAREFA
    -----------------------------------------------------------*/

    /* Quando eu chamar essa função dentro desse componente(AddTasks) */
    save = () => {
        if(!this.state.desc.trim()){                        // se não estiver setado....(o trim remove os espaço como caracter)
            Alert.alert('Dados inválidos!', 'Informa uma descrição para a tarefa')
            return                                          //Sai da função                         
        }                                

        const data = {...this.state}                        //Clonando o estado atual
        this.props.onSave(data)                             //onSave() vai salvar as informações quando for efetuado um click. 
                                                            //Essa função onSave será recebida via props passando os dados
        this.setState({...initialState})                    //Restaurando o estado inicial --> limpando

    }


    /*---------------------------------------------------------------- 
            FUNÇÃO RESPONSÁVEL POR MANIPULAR AS DATAS NO ANDROID
    ------------------------------------------------------------------*/

    handlerDateAndroidChanged = () => {
        DatePickerAndroid.open({
            date: this.state.data
        }).then( e => {
            if(e.action !== DatePickerAndroid.dismissedAction){
                const momentDate = moment(this.state.data)
                momentDate.date(e.day)
                momentDate.month(e.month)
                momentDate.year(e.year)

                this.setState({data: momentDate.toDate()})
            }
        })
    }

    render(){

        let datePicker = null
        
        if(Platform.OS === 'ios'){
            datePicker = <DatePickerIOS mode='date' date={this.state.data} onDateChange={data => this.setState({ data })}/>
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handlerDateAndroidChanged}>
                    <Text style={styles.date}>
                        {moment(this.state.data).format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }

        return(
            <Modal onRequestClose={this.props.onCancel} 
                        visible={this.props.isVisible}  //Vai receber uma propreidade para saber se está visivel ou não
                        animationType='slide' transparent={true}>


                {/* Parte superior do MODAL */}
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>


                {/* Parte centrar do MODAL */}
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa!</Text>
                    <TextInput placeholder = " Descrição..."           
                    style={styles.input} 
                    onChangeText={desc => this.setState({ desc })} 
                    value={this.state.desc}/>    
                    {datePicker}
                
                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>

                        {/* Botão cancelar */}
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>

                        {/* Botão salvar */}
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>

                    </View>
                </View>


                {/* Parte inferior do MODAL */}
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            
            </Modal>
        )
    }
}


var styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        justifyContent:'space-between',        /* Espaço entre os componetes */

    },
    offset:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button:{
        margin:20,
        marginRight:30,
        color:commonStyle.colors.default,
    },
    header:{
        backgroundColor:commonStyle.colors.today,
        color:commonStyle.colors.secondary,
        textAlign:'center',
        padding:15,
        fontSize:15,                            
    },
    input:{
        width:'90%',                            /* Vai ocupar 90% do espaço */
        height:40,
        marginTop:10,
        marginLeft:20,
        backgroundColor:'white',
        borderWidth:1,                          /* Espessura da borda */
        borderRadius:6,                         /* Arredondando as bordas */
        padding:5,
    },
    date:{
        fontSize:20,
        marginLeft:10,
        marginTop:10,
        textAlign: 'center',
    }
})