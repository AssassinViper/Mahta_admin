import React, { Component } from 'react';

import StudentList from '../components/StudentList';
import {GetStudentList} from '../handlers/StudentListHandler';
import SearchBar from '../components/SearchBar';
import {Search} from '../utils/Search';
import {Sort} from '../utils/Sort';

class Dashboard extends Component {

    static StudentInfoList = [];
    static selectedStudent = {}
    
    state = { sortBy:"code", sortOrder:"A" }

    componentDidMount(){

        console.log(Dashboard.StudentInfoList)

        if(Dashboard.StudentInfoList.length == 0){

            GetStudentList((res)=>{

                console.log(res);

                Dashboard.StudentInfoList = res;

                this.showlist(Sort(Dashboard.StudentInfoList,this.state.sortBy, this.state.sortOrder));
    
            },(err)=>{
    
                alert(err);
            });

        }else{

            this.showlist(Sort(Dashboard.StudentInfoList,this.state.sortBy, this.state.sortOrder));
        }
        
    }

    render() { 
        return ( 
            <div style={s.bg}>
                <div style={{opacity:0.85,
                            display:'flex',
                            height:(this.props.height*(0.78)),
                            minHeight:440,
                            width:(this.props.width*(0.86)),
                            minWidth:900,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            borderRadius:15,
                            backgroundColor:'rgb(216,92,32)',}}>

                    <div style={s.space}/>
                    
                    <div style={s.list_con}>
                        <StudentList getShowList={(showlist)=>this.showlist=showlist} history={this.props.history}
                            sortByName={()=>{this.sortBy("name")}} sortByCode={()=>{this.sortBy("code")}}/>
                    </div>

                    <SearchBar searchBtnClick={this.search}/>

                </div>
            </div>
         );
    }

    search=(searchWord)=>{
        
        if(searchWord != ""){

            let list = Search(searchWord, Dashboard.StudentInfoList)
            list = Sort(list,this.state.sortBy, this.state.sortOrder)
            this.showlist(list);

        }else{

            Sort(Dashboard.StudentInfoList,this.state.sortBy, this.state.sortOrder)
            this.showlist(Sort(Dashboard.StudentInfoList,this.state.sortBy, this.state.sortOrder));
        }
    }

    sortBy= (by)=>{

        let newState = Object.assign({}, this.state);
        
        if(newState.sortBy == by){
            
            if(newState.sortOrder == "A"){
                newState.sortOrder = "D";
            }else{
                newState.sortOrder = "A";
            }
        }else{
            newState.sortBy = by;
            newState.sortOrder = "A";
        }

        this.setState(newState);
        this.showlist(Sort(Dashboard.StudentInfoList,newState.sortBy, newState.sortOrder));
    }
}

const s = {

    bg:{

        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    container:{
        
        opacity:0.85,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:'70%',
        width:'80%',
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    list_con:{
        
        height:'80%',
        width:'95%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12,
        backgroundColor:'white'
    },

    space:{
        height:'1%'
    }
}
 
export default Dashboard;