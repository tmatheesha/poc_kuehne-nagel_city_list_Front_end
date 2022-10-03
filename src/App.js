/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {Redirect, Route, Switch} from "react-router-dom";
import Tables from "./pages/Tables";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
    return (
        <div className="App">
            <Switch>
                {/*<Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />*/}
                <Main>
                    {/*<Route exact path="/dashboard" component={Home} />*/}
                    <Route exact path="/cities" component={Tables}/>
                    {/*<Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />*/}
                    <Redirect from="*" to="/cities"/>
                </Main>
            </Switch>
        </div>
    );
}

export default App;
