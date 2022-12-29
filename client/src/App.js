import React, { Fragment, useEffect, useState, useContext } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, AllData, NavBar, CreateAccount, Login, Deposit, Withdraw, Transactions } from './Components';
import { UserContext, AuthStatus } from './Context/context';
import './App.css';

function Spa() {

  const ctx                   = useContext(UserContext);
  const auth                  = useContext(AuthStatus);

  return (
      <HashRouter>
        <AuthStatus.Provider value={auth}>
          <UserContext.Provider value={ctx} >
                <NavBar />
                    <Routes>
                      <Fragment>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login/" element={<Login />} />
                        <Route path="/withdraw" element={<Withdraw />} />
                        <Route path="/deposit" element={<Deposit />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/createaccount" element={<CreateAccount />} />
                        <Route path="/alldata" element={<AllData />} />
                    </Fragment>
                  </Routes>
          </UserContext.Provider>
        </AuthStatus.Provider>
      </HashRouter>
  );
}

export default Spa;
