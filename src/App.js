import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customerlist from './Pages/Customerlist';
import DrawerComponent from './components/DrawerComponent';
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Traininglist from './Pages/Traininglist';
import Calendarpage from './Pages/Calendarpage';
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

function App() {

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <DrawerComponent />
          <Typography variant="h6">
            TrainerApp
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/customers' element={<Customerlist />} />
        <Route path='/trainings' element={<Traininglist />} />
        <Route path='/calendar' element={<Calendarpage />} />
      </Routes>

    </div>
  );
}

export default App;
