import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import AddStudentHandler from '../handlers/AddStudentHandler';
import Select from 'react-select';
import Dashboard from '../pages/Dashboard';
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

  

class AddStudent extends Component {
    state = { askModal:false, errorModal:false, successModal:false }

    AddStudentData = {

        firstName:"",
        lastName:"",
        grade:"نهم",
        field:"ریاضی",
        phone:"",
        code:"",
        inviterCode:""
    }

    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>
                
                <div style={s.sec1}>
                    
                    <Input height={35} width={200} placeholder="نام خانوادگی" type="text"
                    ref={(ref=>this.lastNameInput = ref)}
                    onChange={(event)=>{this.AddStudentData.lastName = event.target.value}}/>

                    <Input height={35} width={200} placeholder="نام"type="text"
                    ref={(ref=>this.firstNameInput = ref)}
                    onChange={(event)=>{this.AddStudentData.firstName = event.target.value}}/>

                </div>
                
                <div style={s.sec1}>

                    <Select options={gradeOptions} styles={customStyles} placeholder="پایه"/>
                    <Select options={fieldOptions} styles={customStyles} placeholder="رشته"/>


                </div>
                
                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="کد معرف" type="number"
                    ref={(ref=>this.inviterCodeInput = ref)}
                    onChange={(event)=>{this.AddStudentData.inviterCode = Number(event.target.value)}}/>

                    <Input height={35} width={200} placeholder="کد خانواده"type="number"
                    ref={(ref=>this.codeInput = ref)}
                    onChange={(event)=>{this.AddStudentData.code = Number(event.target.value)}}/>

                </div>
                
                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="شماره تماس"type="number"
                    ref={(ref=>this.phoneInput = ref)}
                    onChange={(event)=>{this.AddStudentData.phone = Number(event.target.value)}}/>

                </div>
                
                <Button height={50} width="15%" onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                    ثبت دانش آموز با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    خطا
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت دانش آموز با موفقیت انجام شد
                </SuccessModal>

            </div>
        );
    }

    commit = ()=>{

        

        AddStudentHandler(this.AddStudentData,
            (res)=>{

                this.firstNameInput.clear();
                this.lastNameInput.clear();
                this.codeInput.clear();
                this.inviterCodeInput.clear();
                this.phoneInput.clear();

                Dashboard.StudentInfoList = res;

                this.successModalOpen();

            },(err)=>{

                alert(err);
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
        opacity:0.8,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:500,
        width:1200,
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    sec1:{
        height:'15%',
        width:'60%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"2px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'white'
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
        fontFamily:"amp",
      }),
      control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 100,
        display:'flex',
        flexDirection:'row',
        borderStyle:"solid",
        borderRadius:5,
        borderWidth:2,
        paddingLeft:20,
        paddingRight:10,
        fontFamily:"amp",
        borderColor:'white',
        backgroundColor:'white'
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
}
export default AddStudent;