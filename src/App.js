import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Messages} from './components/pages/messages/Messages'
import {Feed} from './components/pages/feed/Feed'
import {Materials} from './components/pages/materials/Materials'
import {Sidebar} from './components/Navigation/Sidebar/Sidebar'

import Split from './hoc/Split/Split';
import Auth from './components/pages/auth/Auth';




function App(){

    return(
      <BrowserRouter>
      <Split
      left={
        <Sidebar/>
      }
      right={
        

        <React.Fragment>
        <Layout >
        
          
          <div>
            
            <Switch>
            <Route path="/" exact component={Auth} />
              <Route path="/feed" component={Feed} />
              <Route path="/messages" component={Messages} />
              <Route path="/materials" component={Materials} />
              
            </Switch>
          </div>
        </Layout>
        </React.Fragment>
      }
      /> 
      
      </BrowserRouter>
    )
  }

export default App