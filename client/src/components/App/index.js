import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import {
//   TherapyType,
//   NotFound,
//   Glossary,
//   Profile,
//   Header,
//   Signup,
//   About,
//   Home,
// } from '../pages';
import FilterResult from '../common/FilterResult';
import 'antd/dist/antd.css';
import './style.css';

export default () => {
  return (
    // <BrowserRouter>
    //   <Header />
    //   <main className="container">
    //     <Switch>
    //       <Route exact path="/" component={Home} />
    //       <Route path="/signup" component={Signup} />
    //       <Route path="/About" component={About} />
    //       <Route path="/glossary" component={Glossary} />
    //       <Route exact path="/profile/:id" component={Profile} />
    //       <Route path="/types" component={TherapyType} />
    //       <Route path="/404" component={NotFound} />
    //     </Switch>
    //   </main>
    // </BrowserRouter>
    <FilterResult />
  );
};
