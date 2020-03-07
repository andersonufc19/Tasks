import React,{Component} from 'react'
import {
    StyleSheet,
    Text,
    View, 
    ImageBackground,
    FlatList,
    Platform,
    TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../fonte_image/imgs/today.jpg' 
import commomStyle from '../commonStyle'
import Tasks from '../components/Tasks'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Agenda extends Component{

    state = {
        tasks:[
            {id: Math.random(), desc: 'Tarefa 5',
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

        ],

        /* Novo atributo */
        visibleTasks: [],
        showDoneTasks: true,
    }



    /* --------------------------------------------------------------------------------
                        Função responsável por filtrar as TASKS
    -----------------------------------------------------------------------------------*/

        filterTasks = () =>{

            let visibleTasks = null;
            
            if(this.state.showDoneTasks){
                visibleTasks = [...this.state.tasks]        // Faz uma copia das tasks
            }else{
                const pending = tasks => tasks.doneAt === null
                visibleTasks = this.state.tasks.filter(pending)     //Só trazenodo as tasks pedentes
            }

            this.setState({visibleTasks})
        }

    /* --------------------------------------------------------------------------------
                        Função que habilita ou não o filtro
    -----------------------------------------------------------------------------------*/

        toggleFilter = () =>{
            this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
        }

        


    /* --------------------------------------------------------------------------------
                        Função que alterna o estado da tarefa
    -----------------------------------------------------------------------------------*/

    toggleTask = id =>{

        const tasks = [...this.state.tasks]

        //Função de manipulação de array
        tasks.forEach(tasks =>{
            if(tasks.id === id){
                tasks.doneAt = tasks.doneAt ? null: new Date()
            }
        })

        this.setState({tasks} , this.filterTasks);
    }

    /* --------------------------------------------------------------------------------*/

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={25}
                            color={commomStyle.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View stylw={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM')}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks}
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
    iconBar:{
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'flex-end',

    }
})