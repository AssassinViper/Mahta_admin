import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import CommitPurchaseHandler from '../handlers/CommitPurchaseHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';

class CommitPurchase extends Component {
    state = { askModal:false, errorModal:false, successModal:false, usefrom:'gift'}
    
    errorMassage="خطا در شبکه"
    
    CommitPurchaseData = {

        code:Dashboard.selectedStudent.code,
        price:0,
        percent:0,
        info:""
    }
    render() { 

        if(Dashboard.selectedStudent.code === undefined){

            return(<Redirect to="/admin" />);

        }else{
        
            return ( 
                <div style={{opacity:0.85,
                    display:'flex',
                    height:'78vh',
                    minHeight:440,
                    width:'80vw',
                    minWidth:900,
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'space-around',
                    borderRadius:15,
                    backgroundColor:'rgb(55, 110, 198)'}}>

                    <div style={s.space}/>

                    <div style={s.sec1}>

                    <Input height={35} width={200} placeholder="(مبلغ خرید(تومان"  type="number"
                    ref={(ref=>this.priceInput = ref)}
                    onChange={(event)=>{this.CommitPurchaseData.price = Number(event.target.value)}}/>

                    <Input height={35} width={200} placeholder="درصد خانواده" type="number" max={100}
                    ref={(ref=>this.percentInput = ref)}
                    onChange={(event)=>{this.CommitPurchaseData.percent = Number(event.target.value)}}/>
                    
                    </div>

                    <div style={s.sec2}>

                    <div style={s.sec3}>
                        <label style={s.usefrom_con}>
                        ({Dashboard.selectedStudent.credit})از اعتبار&emsp;
                            <input type="radio" value="credit" name="credit" 
                                checked={this.state.usefrom === "credit"}
                                onChange={this.onUseFromChanged} name="usefrom"/>
                        </label>
                    </div>

                    <div style={s.sec3}>
                        <label style={s.usefrom_con}>
                        ({Dashboard.selectedStudent.gift})از هدیه&emsp;
                            <input type="radio" value="gift" name="gift"
                                checked={this.state.usefrom === "gift"}
                                onChange={this.onUseFromChanged}name="usefrom"/>
                        </label>
                    </div>

                    </div>

                    <PlainText height={90} width="24%" placeholder="توضیحات"
                    ref={(ref=>this.infoPlainText = ref)} 
                    onChange={(event)=>{this.CommitPurchaseData.info = event.target.value}}/>

                    <Button height={50} width="15%" fontColor={"rgba(55, 110, 198,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                    <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                        ثبت خرید با مشخصات زیر؟
                    </YesNoModal>

                    <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                        {this.errorMassage}
                    </ErrorModal>

                    <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                        عملیات ثبت خرید با موفقیت انجام شد
                    </SuccessModal>

                </div>
            );
        }
    }

    commit = ()=>{

        this.CommitPurchaseData.useFrom = this.state.usefrom;

        CommitPurchaseHandler(this.CommitPurchaseData,
            (res)=>{

                this.priceInput.clear();
                this.percentInput.clear();
                this.infoPlainText.clear();

                Dashboard.StudentInfoList = [];
                
                this.successModalOpen();
            },
            (err)=>{

                this.errorMassage = err;
                this.errorModalOpen();
            }
        );
    }

    onUseFromChanged =(event)=>{
        let newState = Object.assign({},this.state);
        newState.usefrom = event.currentTarget.value;
        this.setState(newState);
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
        backgroundColor:'rgb(55, 110, 198)',
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

    sec2:{
        height:'13%',
        width:'40%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:"1px",
        borderStyle:"solid",
        borderRadius:8,
        borderColor:'rgba(255,255,255,0.1)'
    },

    sec3:{

        height:'30%',
        width:'50%',
        display:'inline',
        alignItems:'center',
        justifyContent:'center',
    },

    usefrom_con:{
        fontFamily:'amp',
        fontSize:18,
        color:'white',
        display:'inline',
        height:'5%',
        width:'20%',
    },

    space:{
        height:'5%',
    }

}
 
export default CommitPurchase;