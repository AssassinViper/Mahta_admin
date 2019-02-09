import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Input from '../components/Input';
import Button from '../components/Button';
import AddStudentHandler from '../handlers/AddStudentHandler';
import DeleteStudentHandler from '../handlers/DeleteStudentHandler';
import Select from 'react-select';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';

const gradeOptions=[
    {value:"9", label:"نهم"},
    {value:"10", label:"دهم"},
    {value:"11", label:"یازدهم"},
    {value:"12", label:"دوازدهم"},
]

const fieldOptions=[
    {value:"riazi", label:"ریاضی"},
    {value:"tajrobi", label:"تجربی"},
    {value:"honar", label:"هنر"},
    {value:"ensani", label:"انسانی"},
]


  

class StudentEdit extends Component {
    state = { askModal:false, errorModal:false, successModal:false }

    constructor(props){

        super(props);
        this.AddStudentData = Object.assign({},Dashboard.selectedStudent);
        this.defaultGrade = "";
        this.defaultField = "";
    }

    render() {

        if(this.AddStudentData.name === undefined){

            return(<Redirect to="/admin" />);

        }else{

            return ( 
                <div style={s.con}>

                    <div style={s.delete_btn}>
                        <Button onClick={this.deleteStudent}>حذف</Button>
                    </div>

                    <div style={s.space}/>
                    
                    <div style={s.sec1}>
                        
                        <Input height={35} width={200} placeholder="نام خانوادگی" type="text"
                        value={this.AddStudentData.name.lastName}
                        ref={(ref=>this.lastNameInput = ref)}
                        onChange={(event)=>{this.AddStudentData.lastName = event.target.value}}/>

                        <Input height={35} width={200} placeholder="نام"type="text"
                        value={this.AddStudentData.name.firstName}
                        ref={(ref=>this.firstNameInput = ref)}
                        onChange={(event)=>{this.AddStudentData.firstName = event.target.value}}/>

                    </div>
                    
                    <div style={s.sec1}>

                        <Select options={gradeOptions} styles={customStyles} defaultValue={{value:"ensani", label:"انسانی"}} placeholder="پایه"/>
                        <Select options={fieldOptions} styles={customStyles} placeholder="رشته"/>

                    </div>
                    
                    <div style={s.sec1}>

                        <Input height={35} width={200} placeholder="کد خانواده"type="number"
                        value={this.AddStudentData.mahtaCode}
                        ref={(ref=>this.familyCodeInput = ref)}
                        onChange={(event)=>{this.AddStudentData.familyCode = event.target.value}}/>

                    </div>
                    
                    <div style={s.sec1}>

                        <Input height={35} width={200} placeholder="شماره تماس"type="number"
                        value={this.AddStudentData.phone}
                        ref={(ref=>this.phoneNumberInput = ref)}
                        onChange={(event)=>{this.AddStudentData.phoneNumber = event.target.value}}/>

                    </div>
                    
                    <Button height={50} width="15%" onClick={this.askModalOpen}>ثبت</Button>

                    <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                        ثبت تغییرات با مشخصات زیر؟
                    </YesNoModal>
                    
                    <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                        خطا
                    </ErrorModal>
                    
                    <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                        عملیات ثبت تغییرات با موفقیت انجام شد
                    </SuccessModal>

                </div>
            );
        }
    }

    deleteStudent = ()=>{

        DeleteStudentHandler({code:this.AddStudentData.familyCode},
            (res)=>{

                Dashboard.StudentInfoList = res; 
            },
            (err)=>{
                
                alert(err);
            });
    }

    commit = ()=>{

        AddStudentHandler({params:this.AddStudentData},
            (res)=>{

                this.firstNameInput.clear();
                this.lastNameInput.clear();
                this.familyCodeInput.clear();
                this.phoneNumberInput.clear();
                
                this.successModalOpen();

            },(err)=>{

                this.errorModalOpen();
            }
        );
    }

    askModalCommit = ()=>{

        this.askModalClose();
        this.commit();
    }

    askModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.askModal =true;
        this.setState(newState);
    }

    askModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.askModal =false;
        this.setState(newState);
    }

    errorModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal =true;
        this.setState(newState);
    }

    errorModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.errorModal =false;
        this.setState(newState);
    }

    successModalOpen = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =true;
        this.setState(newState);
    }

    successModalClose = ()=>{

        let newState = Object.assign({}, this.state);
        newState.successModal =false;
        this.setState(newState);
    }
}

const s = {

    con:{
        height:520,
        width: 1200,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#861'
    },

    delete_btn:{

        position:'absolute',
        top:120,
        right:150
    },

    sec1:{
        height:'15%',
        width:'60%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"2px",
        borderStyle:"solid",
    },

    space:{
        height:'5%',
    },
}

const customStyles = {

    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 100,
        display:'flex',
        flexDirection:'row',
        borderStyle:"solid",
        borderWidth:3,
        borderRadius:0,
        
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
}

const setDefaultGrade = (grade)=>{
    
    
}
export default StudentEdit;