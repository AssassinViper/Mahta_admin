import React, { Component } from 'react';

import StudentList from '../components/StudentList';
import {GetStudentList} from '../handlers/StudentListHandler';
import SearchBar from '../components/SearchBar';
import {Search} from '../utils/Search';

class Dashboard extends Component {

    static StudentInfoList = [];
    static selectedStudent = {}
    
    state = { }

    componentDidMount(){

        console.log(Dashboard.StudentInfoList)

        if(Dashboard.StudentInfoList.length == 0){

            GetStudentList((res)=>{

                console.log(res);

                Dashboard.StudentInfoList = res;
                
                this.showlist(Dashboard.StudentInfoList);
    
            },(err)=>{
    
                alert(err);
            });

        }else{

            this.showlist(Dashboard.StudentInfoList);
        }
        
    }

    render() { 
        return ( 
            <div style={s.container}>

                <div style={s.space}/>
                
                <div style={s.list_con}>
                    <StudentList getShowList={(showlist)=>this.showlist=showlist} history={this.props.history}/>
                </div>

                <SearchBar searchBtnClick={this.search}/>

            </div>
         );
    }

    search=(searchWord)=>{
        
        if(searchWord != ""){

            this.showlist(Search(searchWord, Dashboard.StudentInfoList));

        }else{

            this.showlist(Dashboard.StudentInfoList);
        }
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