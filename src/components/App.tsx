import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../routes/Login';
import CreateDevicePage from '../routes/CreateDevice';
import DeviceListPage from '../routes/DeviceList';
import PrivateRoute from '../routes/PrivateRoutes';
import AdminRoute from '../routes/AdminRoutes';
import { AuthProvider } from '../context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter> 
            <Route path="/" exact component={LoginPage}/>
            <PrivateRoute path="/devices" exact component={DeviceListPage}/>
            <AdminRoute path="/new-device" exact component={CreateDevicePage}/>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
