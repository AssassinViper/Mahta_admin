import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import GroupGiftHandler from '../handlers/GroupGiftHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from '../pages/Dashboard';
import Select from 'react-select';

const gradeOptions=[
    {value:"all", label:"تمامی پایه ها"},
    {value:"هفتم", label:"هفتم"},
    {value:"هشتم", label:"هشتم"},
    {value:"نهم", label:"نهم"},
    {value:"دهم", label:"دهم"},
    {value:"یازدهم", label:"یازدهم"},
    {value:"دوازدهم", label:"دوازدهم"},
    {value:"فارغ التحصیل", label:"فارغ التحصیل"}
]

const fieldOptions=[
    {value:"all", label:"تمامی رشته ها"},
    {value:"ریاضی", label:"ریاضی"},
    {value:"تجربی", label:"تجربی"},
    {value:"هنر", label:"هنر"},
    {value:"انسانی", label:"انسانی"},
]

class GroupGift extends Component {

    state = { askModal:false, errorModal:false, successModal:false }

    errorMassage="خطا در شبکه"

    GroupGiftData = {

        school:"all",
        field:"all",
        grade:"all",
        price:0
    }

    render() { 
        return ( 
            <div style={{opacity:0.85,
                display:'flex',
                height:(this.props.height*(0.78)),
                minHeight:440,
                width:(this.props.width*(0.86)),
                minWidth:900,
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-around',
                borderRadius:15,
                backgroundColor:'rgb(216,92,32)'}}>

                <div style={s.space}/>

                <div style={s.sec1}>

                    
                    <Select options={fieldOptions} styles={customStyles} placeholder="تمامی رشته ها" onChange={(e)=>{
                        this.GroupGiftData.field = e.value;
                    }}/>

                    <Input height={35} width={200} placeholder="همه مدارس"type="text"
                        ref={(ref=>this.schoolInput = ref)}
                        onChange={(event)=>{this.GroupGiftData.school = event.target.value}}/>

                    <Select options={gradeOptions} styles={customStyles} placeholder="تمامی پایه ها" onChange={(e)=>{
                        this.GroupGiftData.grade = e.value;
                    }}/>

                </div>

                <Input height={35} width={200} placeholder="مبلغ هدیه" type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{this.GroupGiftData.price = Number(event.target.value)}}/>

                <PlainText height={90} width="24%" placeholder="توضیحات"
                ref={(ref=>this.infoPlainText = ref)} 
                onChange={(event)=>{this.GroupGiftData.info = event.target.value}}/>


                <Button height={50} width="15%" fontColor={"rgba(216,92,32,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                    ثبت گروهی هدایا انجام شود؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    {this.errorMassage}
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت گروهی هدایا با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    commit = ()=>{

        GroupGiftHandler(this.GroupGiftData, 
            
            (res)=>{

                this.schoolInput.clear();
                this.priceInput.clear();

                Dashboard.StudentInfoList = [];
                
                this.successModalOpen();
            },
            (err)=>{

                this.errorMassage = err;
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
        opacity:0.85,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around',
        height:480,
        width:1100,
        borderRadius:15,
        backgroundColor:'rgb(216,92,32)',
    },

    space:{
        height:'5%',
    },

    sec1:{
        height:'15%',
        width:'60%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"1px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
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
        width: 150,
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
 
export default GroupGift;