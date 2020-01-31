import React,{Component} from 'react'
import {
    StyleSheet,
    Text,
    View, 
    ImageBackground,
    FlatList} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../fonte_image/imgs/today.jpg' 
import commomStyle from '../commonStyle'
import Tasks from '../components/Tasks'

export default class Agenda extends Component{

    state = {
        tasks:[
            {id: Math.random(), desc: 'Tarefa 1',
            estimateAt: new Date(), doneAt: new Date()
            },
            {id: Math.random(), desc: 'Tarefa 2',
            estimateAt: new Date(), doneAt: null
            },
            {id: Math.random(), desc: 'Tarefa 1',
            estimateAt: new Date(), doneAt: new Date()
            },
            {id: Math.random(), desc: 'Tarefa 2',
            estimateAt: new Date(), doneAt: null
            },
            {id: Math.random(), desc: 'Tarefa 1',
            estimateAt: new Date(), doneAt: new Date()
            },
            {id: Math.random(), desc: 'Tarefa 2',
            estimateAt: new Date(), doneAt: null
            },
            {id: Math.random(), desc: 'Tarefa 1',
            estimateAt: new Date(), doneAt: new Date()
            },
            {id: Math.random(), desc: 'Tarefa 2',
            estimateAt: new Date(), doneAt: null
            },
            {id: Math.random(), desc: 'Tarefa 1',
            estimateAt: new Date(), doneAt: new Date()
            },
            {id: Math.random(), desc: 'Tarefa 2',
            estimateAt: new Date(), doneAt: null
            },
            {id: Math.random(), desc: 'Tarefa 1',
            estimateAt: new Date(), doneAt: new Date()
            },
            {id: Math.random(), desc: 'Tarefa 2',
            estimateAt: new Date(), doneAt: null
            },

        ]
    }

    toggleTask = id =>{
        const tasks = [...this.state.tasks]

        //Função de manipulação de array
        tasks.forEach(tasks =>{
            if(tasks.id === id){
                tasks.doneAt = tasks.doneAt ? null: new Date()
            }
        })

        this.setState({tasks});
    }

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
                    <FlatList data={this.state.tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item})  => <Tasks {...item} toggleTask={this.toggleTask}/>}/>
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