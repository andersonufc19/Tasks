import React,{Component} from 'react'
import {StyleSheet, Text, View, ImageBackground} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../fonte_image/imgs/today.jpg' 
import commomStyle from '../commonStyle'
import Tasks from '../components/Tasks'

export default class Agenda extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View stylw={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM')}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <Tasks desc='Tarefa pendente' estimateAt={new Date()} doneAt={null}/>
                    <Tasks desc='Tarefa concluida' estimateAt={new Date()} doneAt={new Date()}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    background:{
        flex:3,
        paddingTop:50,
    },

    titleBar:{
        flex:1,
        justifyContent:'flex-end',
    },

    title:{
        color: commomStyle.colors.secondary,
        fontSize:50,
        marginLeft: 20,
        marginBottom: 10,

    },

    subtitle:{
        color: commomStyle.colors.secondary,
        fontSize:20,
        marginLeft:20,
        marginBottom:10,
    },

    taskContainer:{
        flex: 7,
    },
})