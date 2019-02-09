import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import SpendCreditHandler from '../handlers/SpendCreditHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';

class SpendCredit extends Component {
    state = { usefrom:"credit", askModal:false, errorModal:false, successModal:false }

    SpendCreditData = {

        familyCode:this.props.familyCode,
        price:"",
    }

    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>
                

                <Input height={35} width="20%" placeholder="(مبلغ خرید(تومان"  type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{this.SpendCreditData.price = event.target.value}}/>

                
                <label style={s.usefrom_con}>
                از اعتبار&emsp;
                    <input type="radio" value="credit" name="credit" 
                        checked={this.state.usefrom === "credit"}
                        onChange={this.onUseFromChanged} name="usefrom"/>
                </label>

                <label style={s.usefrom_con}>
                از هدیه&emsp;
                    <input type="radio" value="gift" name="gift" 
                        checked={this.state.usefrom === "gift"}
                        onChange={this.onUseFromChanged}name="usefrom"/>
                </label>
                
                <Button height={50} width="15%" onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                    ثبت مصرف اعتبار با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    خطا
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت مصرف اعتبار با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    onUseFromChanged = (event)=>{

        this.setState({usefrom:event.currentTarget.value});
    }

    commit = ()=>{

        this.SpendCreditData.useFrom = this.state.usefrom;

        SpendCreditHandler({params:this.SpendCreditData},
            (res)=>{

                this.priceInput.clear();
                
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
        alignItems:'center',
        backgroundColor:'#2fb'
    },

    space:{
        height:'5%',
    },

    usefrom_con:{
        height:'5%',
        width:'20%',
    }

}
 
export default SpendCredit;