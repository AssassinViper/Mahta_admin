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

            alert("is 0")

            GetStudentList((res)=>{

                console.log(res);

                Dashboard.StudentInfoList = res;

                this.showlist(Sort(Dashboard.StudentInfoList,this.state.sortBy, this.state.sortOrder));
    
            },(err)=>{
    
                alert(err);
            });

        }else{

            alert("not 0");
            
            this.showlist(Sort(Dashboard.StudentInfoList,this.state.sortBy, this.state.sortOrder));
        }
        
    }

    render() { 
        return ( 
            <div style={s.container}>

                <div style={s.space}/>
                
                <div style={s.list_con}>
                    <StudentList getShowList={(showlist)=>this.showlist=showlist} history={this.props.history}
                        sortByName={()=>{this.sortBy("name")}} sortByCode={()=>{this.sortBy("code")}}/>
                </div>

                <SearchBar searchBtnClick={this.search}/>

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

    container:{
        
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:520,
        width:1200,
        backgroundColor:'#002'
    },

    list_con:{
        
        height:'80%',
        width:'95%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'pink'

    },

    space:{
        height:'1%'
    }
}
 
export default Dashboard;