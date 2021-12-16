import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: props.params.value
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    // Estää käyttäjää syöttämästä päivämäärää manuaalisesti
    const handleDateChangeRaw = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle><br />
                <DialogContent>

                    {/** Päivämäärä */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(params) => <TextField {...params} />}
                            label="Choose date and time &rarr;"
                            inputFormat="dd/MM/yyyy HH:mm"
                            value={training.date}
                            minDateTime={new Date()}
                            ampm={false}
                            onChange={(date) => {
                                setTraining({ ...training, date: date });
                            }}
                            onChangeRaw={handleDateChangeRaw}
                        />
                    </LocalizationProvider>

                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="duration (min)"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="activity"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;