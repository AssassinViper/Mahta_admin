import React, { Component } from 'react';

class StudentListItem extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con} onClick={this.showInfo}>
                  <div style={s.sec}>{this.props.gift}</div>
                  <div style={s.sec}>{this.props.credit}</div>
                  <div style={s.sec}>{this.props.lastName}</div>
                  <div style={s.sec}>{this.props.firstName}</div>
                  <div style={s.sec}>{this.props.familyCode}</div>
            </div>
         );
    }

    showInfo=()=>{
        
        this.props.history.push('/student');
    }
}

const s = {

    con:{
        display:'flex',
        height: '6%',
        width:'99.9%',
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