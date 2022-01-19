
import './App.css';
import RoutingPages from './routes/RoutingPages'
import {useSelector} from 'react-redux'
import { Login } from './pages/pages';

function App() {
  const isLoggedin=useSelector((state)=> state.userLogin)
  return (
    <div>
      {
        isLoggedin?
        <RoutingPages/>:
        <Login/>
      }
      
    </div>
  );
}

export default App;
