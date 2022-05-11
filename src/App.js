import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ConfirmSignUp from './ConfirmSignUp';
import Dashboard from './Dashboard';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AppContextProvider from './AppContext';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './PrivateRoute';
function App() {

  return (
    <AppContextProvider>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}/>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/confirmSignup" element={<ConfirmSignUp/>}></Route>
          <Route path="/dashboard" element={
              <PrivateRoute><Dashboard/></PrivateRoute>
          }></Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
    </AppContextProvider>
  );
}

export default App;
