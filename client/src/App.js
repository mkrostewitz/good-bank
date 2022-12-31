import React, { Fragment } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, AllData, CreateAccount, Login, Deposit, Withdraw, Transactions, NavBar, Profile} from './Components';
import { UserContext } from './Context/context';
import { AuthContext } from './Context/authContext'
import './App.css';
export const base_uri              = 'https://goodbank-server.azurewebsites.net'

function Spa() {

  return (
    <AuthContext.Provider value={{isAuthenticated: false, token:{accessToken: '', refreshToken:''}}}>
      <HashRouter>
          <UserContext.Provider value={{user:'', email:'', role:'', account:'', balance: 0}} >
            <NavBar />
                <Routes>
                  <Fragment>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/login/" element={<Login />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/createaccount" element={<CreateAccount />} />
                    <Route path="/alldata" element={<AllData />} />
                </Fragment>
              </Routes>
          </UserContext.Provider>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default Spa;
