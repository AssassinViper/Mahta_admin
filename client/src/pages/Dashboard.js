import React, { Component } from 'react';

import StudentList from '../components/StudentList';
import list from '../data/studentList';

import SearchBar from '../components/SearchBar';
class Dashboard extends Component {
    
    state = { StudentList:list }

    componentDidMount(){
        this.showlist(list);
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

            let newList = [];
            this.showlist(newList);

        }else{

            this.showlist(list);
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