import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Label from '../components/Label';
import ScrollableList from '../components/ScrollableList';

class StudentInfo extends Component {
    state = {  }

    constructor(props){
        super(props);
        this.student = Dashboard.selectedStudent;
        
    }
    render() { 

        if(this.student.code === undefined){

            return(
                <Redirect to="/admin" />
            );
        }else{

        return ( 
            
            <div style={s.container}>
                <div style={s.sec1}>
                    <div style={s.row}>
                        <div style={s.column}>
                            <Label text={this.student.grade} label="پایه"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.field} label="رشته"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.lastName} label="نام خانوادگی"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.firstName} label="نام "/>
                        </div>
                    </div>
                    <div style={s.row}>
                    <div style={s.column}>
                            <Label text={this.student.phone} label="شماره تماس"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.gift} label="هدیه"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.credit} label="اعتبار"/>
                        </div>
                        <div style={s.column}>
                            <Label text={this.student.code} label="کد خانواده"/>
                        </div>
                    </div>
                        
                </div>

                <div style={s.sec2}>

                    <div style={s.scroll_sec}>
                        <div style={s.sc_title}>لیست دعوت ها</div>
                        <div style={s.sc_con}>
                            <ScrollableList/>
                        </div>
                    </div>
                    <div style={s.scroll_sec}>
                        <div style={s.sc_title}>لیست هدایا</div>
                        <div style={s.sc_con}>
                            <ScrollableList/>   
                        </div>
                    </div>
                    <div style={s.scroll_sec}>
                        <div style={s.sc_title}>لیست خریدها</div>
                        <div style={s.sc_con}>
                            <ScrollableList/>   
                        </div>
                    </div>


                </div>

            </div>
        );
        }
    }
}

const s = {

    container:{
        opacity:0.8,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:500,
        width:1200,
        borderRadius:15,
        backgroundColor:'rgb(55, 110, 198)',
    },

    sec1:{
        height:'35%',
        width:'90%',
        backgroundColor:'#5a7'
    },

    sec2:{
        display:'flex',
        height:'55%',
        justifyContent:'space-between',
        width:'90%',
        backgroundColor:'#198'
    },

    scroll_sec:{

        height:'100%',
        width:'33%',
        backgroundColor:'#a66'
    },

    sc_title:{

        height:'10%',
        width:"100%",
        backgroundColor:'#26f'
    },

    sc_con:{

        height:'90%',
        width:'100%',
    },
    
    row:{
        display:'flex',
        height:'50%',
        width:'100%',
    },

    column:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'25%',
        borderStyle:'solid',
        borderWidth:1
    }
}
 
export default StudentInfo;