import RoutesPublic from './RoutesPublic'
import Navbar from '../components/navbar/Navbar';
import { DataContextProvider } from '../config/context/DataContext';
import "bootstrap/dist/css/bootstrap.min.css";
import 'toastr/build/toastr.css'
import '../custom.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css'

import 'toastr/build/toastr.min.js'

function App() {
    return (
        <>
            <DataContextProvider>
                <Navbar />
                <RoutesPublic />
            </DataContextProvider>
        </>
    );
}

export default App;