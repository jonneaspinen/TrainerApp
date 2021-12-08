import trainerapp from '../images/trainerapp.png';
import MenuIcon from '@mui/icons-material/Menu';

function Homepage() {
    return (
        <div>
            <br />
            <img src={trainerapp} alt="trainer logo" />
            <h1>Welcome to TrainerApp.</h1>
            <h3>Click the &nbsp; <MenuIcon color='primary' /> &nbsp; icon in the top left corner to navigate the pages.</h3>
        </div>
    );
}

export default Homepage;