import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyle from '../commonStyle'
import Swipeable from 'react-native-swipeable'

export default props => {

    let check = null

    if( props.doneAt !== null){
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={commomStyle.colors.secondary}/>
            </View>
        )
    }else{
        check = <View style={styles.pending}/>
    }

    const descStyle = props.doneAt !== null ?   //Se a data de concluido for diferente de null
    {textDecorationLine: 'line-through'} : {}

    //Movimento da esquerda para direita 
    //Conteúdo do lado esquerdo
    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF'/>
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )

    const rightContent = (
        <TouchableOpacity style={[styles.exclude, {justifyContent: 'flex-start' , padding:20, }]} 
        onPress={() => props.onDelete(props.id)}>
            <Icon name='trash' size={30} color='#FFF'/>
        </TouchableOpacity>
    )

    return (
        <Swipeable leftActionActivationDistance={150} onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent} rightButtons={rightContent} >
            <View style={styles.container}>
                
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>   
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description , descStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}</Text>
                </View>
            </View>

        </Swipeable>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        color: commomStyle.colors.mainText,
        fontSize: 15,
    },
    date: {
        color: commomStyle.colors.subText,
        fontSize: 12,
    },
    exclude:{
        flex:1,
        backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    excludeText:{
        color:'#FFF',
        fontSize: 20,
        margin: 10,

    }
})