import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import GroupCommitHandler from '../handlers/GroupCommitHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import Dashboard from '../pages/Dashboard';

class GroupCommit extends Component {
    state = { askModal:false, errorModal:false, successModal:false }

    GroupCommitData = {

        number:"",
        price:""
    }

    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>

                <Input height={35} width="20%" placeholder="تعداد دانش آموزان" type="number"
                ref={(ref=>this.numberInput = ref)}
                onChange={(event)=>{this.GroupCommitData.number = event.target.value}}/>

                <Input height={35} width="20%" placeholder="مبلغ هدیه" type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{this.GroupCommitData.price = event.target.value}}/>

                <Button height={50} width="15%" onClick={this.askModalOpen}>ثبت</Button>

                <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                    ثبت گروهی با مشخصات زیر؟
                </YesNoModal>
                
                <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                    خطا
                </ErrorModal>
                
                <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                    عملیات ثبت گروهی با موفقیت انجام شد
                </SuccessModal>

            </div>
         );
    }

    commit = ()=>{

        GroupCommitHandler(this.GroupCommitData, 
            
            (res)=>{

                this.numberInput.clear();
                this.priceInput.clear();

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
        height:520,
        width: 1200,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'blue'
    },

    space:{
        height:'5%',
    }

}
 
export default GroupCommit;