import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import CommitGiftHandler from '../handlers/CommitGiftHandler';
import YesNoModal from '../components/YesNoModal';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';


class CommitGift extends Component {
    state = { askModal:false, errorModal:false, successModal:false }

    CommitGiftData = {

        code:Dashboard.selectedStudent.code,
        price:"",
        info:""
    }


    render() {
        
        if(Dashboard.selectedStudent.mahtaCode === undefined){

            return(<Redirect to="/admin" />);

        }else{
            
            return ( 
                <div style={s.con}>

                    <div style={s.space}/>

                    <Input height={35} width="20%" placeholder="(مبلغ خرید(تومان"  type="number"
                    ref={(ref=>this.priceInput = ref)}
                    onChange={(event)=>{this.CommitGiftData.price = event.target.value}}/>

                    <PlainText height={90} width="20%" placeholder="توضیحات"
                    ref={(ref=>this.infoPlainText = ref)} 
                    onChange={(event)=>{this.CommitGiftData.info = event.target.value}}/>

                    <Button height={50} width="15%" onClick={this.askModalOpen}>ثبت</Button>

                    <YesNoModal open={this.state.askModal} commit={this.askModalCommit} cancel={this.askModalClose}>
                        ثبت هدیه با مشخصات زیر؟
                    </YesNoModal>

                    <ErrorModal open={this.state.errorModal} onClose={this.errorModalClose}>
                        خطا
                    </ErrorModal>

                    <SuccessModal open={this.state.successModal} onClose={this.successModalClose}>
                        عملیات ثبت هدیه با موفقیت انجام شد
                    </SuccessModal>

                </div>
            );
        }
    }

    commit = ()=>{

        CommitGiftHandler(this.CommitGiftData,
            (res)=>{

                this.priceInput.clear();
                this.infoPlainText.clear();

                Dashboard.StudentInfoList = res;
                
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
        backgroundColor:'#88a'
    },

    space:{
        height:'5%',
    }
}
 
export default CommitGift;