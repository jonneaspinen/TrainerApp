import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from '../components/AddCustomer';
import EditCustomer from '../components/EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddTraining from '../components/AddTraining';


function Customerlist() {

    // useStatet
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [gridApi, setGridApi] = useState(null);

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
                        console.log(url);
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
    // treenin lisäys
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
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

    // taulukon kolumnit
    const columns = [
        {
            headerName: '',
            field: 'links.0.href',
            width: 240,
            cellRendererFramework: params =>
                <AddTraining addTraining={addTraining} params={params} />
        },
        {
            field: 'firstname',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 140
        },

        {
            field: 'lastname',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 140
        },

        {
            field: 'streetaddress',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 240
        },

        {
            field: 'postcode',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 120
        },

        {
            field: 'city',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 140
        },

        {
            field: 'email',
            sortable: true,
            filter: true,
            floatingFilter:
                true, width: 240
        },

        {
            field: 'phone',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 140
        },

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
        },

    ]

    // CSV Tiedoston exporttaamiseen
    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const onBtnExport = () => {
        gridApi.exportDataAsCsv();
    };

    return (
        <React.Fragment>
            <br />
            <AddCustomer addCustomer={addCustomer} /> { /* asiakkaan lisäys painike */}
            <div
                className="ag-theme-material"
                style={{
                    height: 750,
                    width: 1650,
                    margin: 'auto'
                }}>

                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={12}
                    suppressCellSelection={true}
                    onGridReady={onGridReady}
                />

            </div>
            <Button color='success' variant='contained' onClick={() => onBtnExport()}> Export as CSV </Button>

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