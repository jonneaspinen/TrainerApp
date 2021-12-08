import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {

    // useState setit
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');

    // haku sivun avautuessa
    useEffect(() => {
        fetchCustomers();
    }, [])

    // asiakkaiden haku
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    // asiakkaan poisto
    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchCustomers();
                        setMsg('Successfully deleted!');
                        setOpen(true);
                    }
                    else {
                        alert('Something went wrong');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    // asiakkaan lisäys
    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    fetchCustomers();
                }
                else {
                    alert('Something went wrong, refresh and try again...');
                }
            })
            .catch(err => console.error(err))
    }

    // asiakkaan muokkaus
    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    fetchCustomers();
                    setMsg('Successfully edited!');
                    setOpen(true);
                }
                else {
                    alert('Editing failed');
                }
            })
            .catch(err => console.error(err))
    }

    // taulukon kolumnit
    const columns = [
        { field: 'firstname',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 140 },

        { field: 'lastname',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 140 },

        { field: 'streetaddress',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 240 },

        { field: 'postcode',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 120 },

        { field: 'city',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 140 },

        { field: 'email',
        sortable: true,
        filter: true,
        floatingFilter:
        true, width: 240 },

        { field: 'phone',
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 140 },

        {
            headerName: '',
            field: 'links.0.href', // mistä asiakas haetaan
            width: 100,
            cellRendererFramework: params =>
                <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '',
            field: 'links.0.href',
            width: 120,
            cellRendererFramework: params =>
                <Button
                    onClick={() => deleteCustomer(params.value)}
                    color='error'>
                    Delete
                </Button>
        }
    ]

    return (
        <React.Fragment>
            <br/>
            <AddCustomer addCustomer={addCustomer} /> { /* asiakkaan lisäys painike */ }
            <div className="ag-theme-material" style={{ height: 800, width: 1400, margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={25}
                    suppressCellSelection={true}
                />

            </div>

            <Snackbar /* ilmoitus onnistuneesta asiakkaan poistosta tai muokkauksesta */
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={msg}
            />

        </React.Fragment>
    );
}

export default Customerlist;