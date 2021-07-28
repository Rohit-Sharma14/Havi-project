import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Admin from './components/screens/Admin'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import { reducer, initalstate } from './reducer/userReducer'





export const userContext = createContext()

//--------------------to use history outside the brroeser router-----------------------------------//

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })

    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Signin">
        <Signin />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>

    </Switch>
  )
}





//---------------------------------------------------------------------------------------------------//
function App() {
  const [state, dispatch] = useReducer(reducer, initalstate)

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
