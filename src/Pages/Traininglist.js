import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import AddTraining from '../components/AddTraining';
import { parseISO, format } from 'date-fns'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

function Traininglist() {

    // useState setit
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = useState('');

    // haku sivun avautuessa
    useEffect(() => {
        fetchTrainings();
    }, [])

    // treenien haku
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    // treenin poisto
    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchTrainings();
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

    // treenin lisäys
    /** 
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    fetchTrainings();
                }
                else {
                    alert('Something went wrong, refresh and try again...');
                }
            })
            .catch(err => console.error(err))
    }
    */

    // taulukon kolumnit
    const columns = [
        {
            field: 'activity',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 240
        },
        
        {
            field: 'date',
            // Päivämäärän formaatti
            valueFormatter(params) {
                return format(parseISO(params.data.date), 'dd.MM.yyyy p');
            },
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 240
        },

        {
            field: 'duration',
            headerName: 'Duration (min)',
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 240
        },

        {
            field: 'name', 
            // Yhdistetään etunimi ja sukunimi samaan ruutuun
            valueGetter(params) {
                return params.data.customer.firstname + ' ' + params.data.customer.lastname;
            },
            sortable: true,
            filter: true,
            floatingFilter: true,
            width: 240
        },

        /** Treenin muokkaus treenisivulla
        {
            headerName: '',
            field: 'links.0.href', // mistä treeni haetaan
            width: 100,
            cellRendererFramework: params =>
                <EditTraining updateTraining={updateTraining} params={params} />
        },
        */
        
        {
            headerName: '',
            field: 'data.id',
            width: 120,
            cellRendererFramework: params =>
                <Button
                    onClick={() => deleteTraining(params.value)}
                    color='error'>
                    Delete
                </Button>
        }
    ]

    return (
        <React.Fragment>
            <br />

            {/**<AddTraining addTraining={addTraining} /> treenin lisäys painike*/}

            <div
                className="ag-theme-material"
                style={{
                    height: 750,
                    width: 1100,
                    margin: 'auto'
                }}>

                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={12}
                    suppressCellSelection={true}
                />

            </div>

            <Snackbar /* ilmoitus onnistuneesta treenin poistosta tai muokkauksesta */
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={msg}
            />

        </React.Fragment>
    );
}
export default Traininglist;