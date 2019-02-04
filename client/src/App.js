import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Link } from 'react-router-dom';
import NeedAuth from './auth/NeedAuth';
import './App.css';

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
  render() {
    return (
      <Router>

        <div className="App" style={s.container}>

          <Route exact path="/auth" component={LoginPage}/>

          <Route path="/admin" component={NeedAuth(Navbar)}/>
          <Route path="/student" component={StudentNavbar}/>.
            
          <Route exact path="/admin" component={NeedAuth(Dashboard)}/>
          <Route exact path="/admin/addstudent" component={AddStudent}/>
          <Route exact path="/admin/commitgift" component={CommitGift}/>
          <Route exact path="/admin/commitpurchase" component={CommitPurchase}/>
          <Route exact path="/admin/groupcommit" component={GroupCommit}/>
          <Route exact path="/admin/spendcredit" component={SpendCredit}/>

          <Route exact path="/student" component={StudentInfo} />
          <Route exact path="/student/edit" component={StudentEdit}/>
          <Route exact path="/student/commitpurchase" component={StudentCommitPurchase}/>
          <Route exact path="/student/commitgift" component={StudentCommitGift}/>
          <Route exact path="/student/spendcredit" component={StudentSpendCredit}/>

        </div>
      </Router>
    );
  }
}

const s = {

  container:{

    display:'flex',
    flexDirection:'column', 
    alignItems:'center',
    justifyContent:'center',
    height:'auto',
    width:'100%',
    backgroundColor:'#fff',

  },

  pageContainer:{

    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:520,
    width: 1200,
    backgroundColor:'#003',

  }
}

export default App;
