import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import Select from 'react-select';

const AddStudentData = {

    firstName:"",
    lastName:"",
    grade:"",
    field:"",
    phoneNumber:"",
    familyCode:"",
    inviterCode:""
}

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
    state = {  }
    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>
                
                <div style={s.sec1}>
                    
                    <Input height={35} width={200} placeholder="نام خانوادگی" type="text"
                    ref={(ref=>this.lastNameInput = ref)}
                    onChange={(event)=>{AddStudentData.lastName = event.target.value}}/>

                    <Input height={35} width={200} placeholder="نام"type="text"
                    ref={(ref=>this.firstNameInput = ref)}
                    onChange={(event)=>{AddStudentData.firstName = event.target.value}}/>

                </div>
                
                <div style={s.sec1}>

                    <Select options={gradeOptions} styles={customStyles} placeholder="پایه"/>
                    <Select options={fieldOptions} styles={customStyles} placeholder="رشته"/>


                </div>
                
                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="کد معرف" type="number"
                    ref={(ref=>this.inviterCodeInput = ref)}
                    onChange={(event)=>{AddStudentData.inviterCode = event.target.value}}/>

                    <Input height={35} width={200} placeholder="کد خانواده"type="number"
                    ref={(ref=>this.familyCodeInput = ref)}
                    onChange={(event)=>{AddStudentData.familyCode = event.target.value}}/>

                </div>
                
                <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="شماره تماس"type="number"
                    ref={(ref=>this.phoneNumberInput = ref)}
                    onChange={(event)=>{AddStudentData.phoneNumber = event.target.value}}/>

                </div>
                
                <Button height={50} width="15%" onClick={this.commit}>ثبت</Button>

            </div>
         );
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
        backgroundColor:'#820'
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
export default AddStudent;