import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import CommitPurchaseHandler from '../handlers/CommitPurchaseHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from '../pages/Dashboard';

class CommitPurchase extends Component {
    state = { askModal:false, errorModal:false, successModal:false }
    
    CommitPurchaseData = {

        code:"",
        price:"",
        percent:"",
        info:""
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

                    <Input height={35} width={200} placeholder="(مبلغ خرید(تومان"  type="number"
                    ref={(ref=>this.priceInput = ref)}
                    onChange={(event)=>{this.CommitPurchaseData.price = event.target.value}}/>

                    <Input height={35} width={200} placeholder="درصد خانواده" type="number" max={100}
                    ref={(ref=>this.percentInput = ref)}
                    onChange={(event)=>{this.CommitPurchaseData.percent = event.target.value}}/>
                    
                </div>

                <Input height={35} width={200} placeholder="کد خانواده" type="number"
                ref={(ref=>this.codeInput = ref)}
                onChange={(event)=>{this.CommitPurchaseData.code = event.target.value}}/>

                <PlainText height={90} width="24%" placeholder="توضیحات"
                ref={(ref=>this.infoPlainText = ref)} 
                onChange={(event)=>{this.CommitPurchaseData.info = event.target.value}}/>

                <Button height={50} width="15%" fontColor={"rgba(216,92,32,0.9)"} onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                    ثبت اعتبار با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    خطا
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت اعتبار با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    commit = ()=>{

        CommitPurchaseHandler(this.CommitPurchaseData,
            (res)=>{

                this.codeInput.clear();
                this.priceInput.clear();
                this.percentInput.clear();
                this.infoPlainText.clear();

                Dashboard.StudentInfoList = res;
                
                this.successModalOpen();
            },
            (err)=>{

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

    space:{
        height:'5%',
    }

}
 
export default CommitPurchase;