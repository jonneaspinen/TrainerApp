import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        name="firstname"
                        value={customer.brand}
                        onChange={inputChanged}
                        margin="dense"
                        label="First name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="lastname"
                        value={customer.model}
                        onChange={inputChanged}
                        margin="dense"
                        label="Last name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="streetaddress"
                        value={customer.color}
                        onChange={inputChanged}
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="postcode"
                        value={customer.year}
                        onChange={inputChanged}
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="city"
                        value={customer.fuel}
                        onChange={inputChanged}
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="email"
                        value={customer.price}
                        onChange={inputChanged}
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="phone"
                        value={customer.price}
                        onChange={inputChanged}
                        margin="dense"
                        label="Phone"
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

export default AddCustomer;