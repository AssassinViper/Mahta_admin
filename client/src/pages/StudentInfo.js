import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Label from '../components/Label';
import StudentGPListHandler from '../handlers/StudentGPListHandler';
import ScrollableList from '../components/ScrollableList';

class StudentInfo extends Component {
    state = { gifts:[], purchases:[], invites:[] }

    constructor(props){
        super(props);
        this.student = Dashboard.selectedStudent;
        
    }

    

    componentDidMount(){

        if(this.student.code != undefined){

            StudentGPListHandler({code:this.student.code}, 
                (res)=>{

                    this.gifts = res.gifts;
                    this.purchases = res.purchases;
                    //this.setState()


                },(err)=>{

                    alert(err)
                })
        }
        

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
                            <ScrollableList list={this.gifts}/>
                        </div>
                    </div>
                    <div style={s.scroll_sec}>
                        <div style={s.sc_title}>لیست هدایا</div>
                        <div style={s.sc_con}>
                            <ScrollableList list={this.gifts}/>   
                        </div>
                    </div>
                    <div style={s.scroll_sec}>
                        <div style={s.sc_title}>لیست خریدها</div>
                        <div style={s.sc_con}>
                            <ScrollableList list={this.gifts}/>   
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
        opacity:0.88,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:480,
        width:1100,
        borderRadius:15,
        backgroundColor:'rgb(55, 110, 198)',
    },

    sec1:{
        height:'30%',
        width:'90%',
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'column'
    },

    sec2:{
        display:'flex',
        height:'55%',
        justifyContent:'space-between',
        width:'90%',
    },

    scroll_sec:{

        height:'100%',
        width:'32.5%',
        borderRadius:10,
        borderStyle:'solid',
        borderWidth:2,
        borderColor:'rgba(255,255,255,0.2)'
    },

    sc_title:{

        height:'10%',
        width:"100%",
        fontSize:15,
        fontFamily:'amp',
        color:'rgba(255,255,255,0.7)'
    },

    sc_con:{
        height:'90%',
        width:'100%',
    },
    
    row:{
        display:'flex',
        justifyContent:'space-between',
        height:'48%',
        width:'100%',
    },

    column:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'24.5%',
        borderRadius:8,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'rgba(255,255,255,0.15)'
    }
}
 
export default StudentInfo;