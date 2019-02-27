import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Link } from 'react-router-dom';
import NeedAuth from './auth/NeedAuth';
import './App.css';
import bg from './assets/svg/bg.svg'

import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import AddStudent from './pages/AddStudent';
import CommitGift from './pages/CommitGift';
import CommitPurchase from './pages/CommitPurchase';
import GroupCommit from './pages/GroupCommit';
import SpendCredit from './pages/SpendCredit';
import Dashboard from './pages/Dashboard';
import StudentInfo from './pages/StudentInfo';
import StudentEdit from './pages/StudentEdit';
import StudentNavbar from './components/StudentNavBar';
import StudentCommitPurchase from './pages/StudentCommitPurchase';
import StudentCommitGift from './pages/StudentCommitGift';
import StudentSpendCredit from './pages/StudentSpendCredit';


class App extends Component {

  constructor(props) {
  super(props);
  this.state = { width: 0, height: 0 };
  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let newState = Object.assign({},this.state);
    newState.width = window.innerWidth;
    newState.height = window.innerHeight;
    this.setState(newState);
  }

  render() {
    return (
      <Router>
        <div className="App" style={{
          height:this.state.height, 
          width:this.state.width,
          minWidth:1200,
          minHeight:600,
          display:'flex',
          flexDirection:'column', 
          alignItems:'center',
          backgroundColor:'rgb(88,88,88)',
          backgroundImage: `url(${bg})`,
          backgroundSize:'cover',
        }}>

          <Route exact path="/auth" component={LoginPage}/>

          <Route path="/admin" component={NeedAuth(Navbar, this.state)}/>
          <Route path="/student" component={NeedAuth(StudentNavbar, this.state)}/>

          <div style={{height:30}}/>
            
          <Route exact path="/admin" component={NeedAuth(Dashboard, this.state)}/>
          <Route exact path="/admin/addstudent" component={NeedAuth(AddStudent, this.state)}/>
          <Route exact path="/admin/commitgift" component={NeedAuth(CommitGift, this.state)}/>
          <Route exact path="/admin/commitpurchase" component={NeedAuth(CommitPurchase, this.state)}/>
          <Route exact path="/admin/groupcommit" component={NeedAuth(GroupCommit, this.state)}/>
          <Route exact path="/admin/spendcredit" component={NeedAuth(SpendCredit, this.state)}/>

          <Route exact path="/student" component={NeedAuth(StudentInfo, this.state)} />
          <Route exact path="/student/edit" component={NeedAuth(StudentEdit, this.state)}/>
          <Route exact path="/student/commitpurchase" component={NeedAuth(StudentCommitPurchase, this.state)}/>
          <Route exact path="/student/commitgift" component={NeedAuth(StudentCommitGift, this.state)}/>
          <Route exact path="/student/spendcredit" component={NeedAuth(StudentSpendCredit, this.state)}/>

        </div>
      </Router>
    );
  }
}

export default App;
