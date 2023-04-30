import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const StocksIn = React.lazy(() => import('./Components/Project/Projects'));
const Login = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));
const AdminCreation = React.lazy(() => import('./Components/AdminCreation/AdminCreation'));

const routes = [
    { path: '/Dashboard', exact: true, name: 'Default', component:Dashboard },
    { path: '/PROJECT_MANAGEMENT', exact: true, name: 'Default', component:StocksIn },
    { path: '/Login', exact: true, name: 'Default', component:Login } ,
    { path: '/USER_MANAGEMENT', exact: true, name: 'Default', component:AdminCreation },

];

export default routes;