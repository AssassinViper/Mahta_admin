import React, { Component } from 'react';
import Dashboard from '../pages/Dashboard';

class StudentListItem extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con} onClick={()=>{this.showInfo(this.props.studentInfo)}}>
                  <div style={s.sec}>{this.props.studentInfo.gift}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.credit}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.firstName}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.lastName}&emsp;</div>
                  <div style={s.sec}>{this.props.studentInfo.code}&emsp;</div>
            </div>
         );
    }

    showInfo(studentInfo){
        
        Dashboard.selectedStudent = studentInfo;
        
        this.props.history.push('/student');
    }
}

const s = {

    con:{
        display:'flex',
        height: 25,
        width:'99.8%',
        justifyContent:'space-between',
        marginBottom:4,
        borderStyle:"solid",
        borderWidth:1,
        backgroundColor:'white'
    },

    sec:{
        height:'100%',
        width:'19.8%',
        textAlign:'right',
        backgroundColor:'orange'
    }
}
 
export default StudentListItem;