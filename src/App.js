import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customerlist from './components/customerlist';
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            TrainerApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Customerlist>

      </Customerlist>
    </div>
  );
}

export default App;
