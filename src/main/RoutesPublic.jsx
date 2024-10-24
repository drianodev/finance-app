import { Routes, Route } from 'react-router-dom'
import Login from '../views/Login';
import UserRegistration from '../views/UserRegistration';
import Home from '../views/Home';
import LaunchQuery from '../views/LaunchQuery';
import LaunchRegister from '../views/LaunchRegister';
import RoutePrivate from './RoutePrivate';
import AccountSettings from '../views/AccountSettings';

function RoutesPublic() {

    const routes = [
        {
            path: '/',
            component: <Login />,
            isPrivate: false
        },
        {
            path: '/register-user',
            component: <UserRegistration />,
            isPrivate: false
        },
        {
            path: '/home',
            component: <Home />,
            isPrivate: true
        },
        {
            path: '/my-launch',
            component: <LaunchQuery />,
            isPrivate: true
        },
        {
            path: '/register-launch',
            component: <LaunchRegister />,
            isPrivate: true
        },
        {
            path: '/account-settings',
            component: <AccountSettings />,
            isPrivate: true
        },
    ]


    return (
        <Routes>
            {routes.map((item, index) => (
                <Route key={index}
                    path={item.path}
                    element={
                        <RoutePrivate isPrivate={item.isPrivate}>
                            {item.component}
                        </RoutePrivate>
                    } />
            ))}
            {/* <Route path='/' element={<Login />} />
            <Route path='/home' element={
                <RoutePrivate>
                    <Home />
                </RoutePrivate>
            } />
            <Route path='/register-user' element={<UserRegistration />} />
            <Route path='/my-launch' element={<LaunchQuery />} />
            <Route path='/register-launch' element={<LaunchRegister />} /> */}
        </Routes>
    );
}

export default RoutesPublic;