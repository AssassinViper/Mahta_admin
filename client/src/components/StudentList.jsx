import React, { Component } from 'react';

import StudentListItem from './StudentListItem';
import sort from '../assets/icons/sort.png'

class StudentList extends Component {
    state = { studentList:[]}

    componentDidMount(){

        this.props.getShowList(this.showList);
    }

    render() { 
        return ( 

            <div style={s.con}>

                <div style={s.header_con}>
                    
                    <div style={s.header}> مقدار هدیه </div>
                    <div style={s.header}> مقدار اعتبار </div>
                    <div style={s.header}> نام </div>
                    <div style={s.header} onClick={this.props.sortByName}>  نام خانوادگی <img style={s.sort_ic} src={sort}/> </div>
                    <div style={s.header} onClick={this.props.sortByCode}> کد خانواده <img style={s.sort_ic} src={sort}/></div>
                    <div style={s.space}></div>
                
                </div>

                <div style={s.list_con}>
                
                    <div style={{height:'auto'}}>
                        {this.state.studentList}
                    </div>

                </div>

            </div>
        );
    }

    showList = (list)=>{

        let studentList = [];
        let i = 1;

        list.forEach(element => {
            
            studentList.push(

                <StudentListItem key={i} history={this.props.history} studentInfo={element}/>
            )

            i++;
            console.log(i);
            
        });
        
        this.state.studentList= studentList;
        this.setState(this.state);
    }
}

const s = {

    con:{
        display:'flex',
        flexDirection:'column',
        height:'95%',
        width:'98%',
    },

    space:{
        width:"1.45%"
    },

    list_con:{
        display:'flex',
        flexDirection:'column',
        height:'95%',
        width:'100%',
        overflowY:'scroll',
    },

    header_con:{
        display:'flex',
        justifyContent:'space-between',
        height:30,
        width:'100%',
        marginBottom:8,
        backgroundColor:'white'
    },

    header:{
        width:'19.55%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        backgroundColor:'rgb(80,80,80)',
        textAlign:'center',
        color:'white',
        fontFamily:'amp',
    },

    sort_ic:{

        height:'80%',
        margin:6,
        cursor:'pointer'
    }


}
 
export default StudentList;
