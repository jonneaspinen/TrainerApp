import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import add from 'date-fns/add'
import "react-big-calendar/lib/css/react-big-calendar.css";
import fi from 'date-fns/locale/fi'

export default function Calendarpage() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {
                return setTrainings(
                    data.map((d) => ({
                        title: d.activity + ' | ' + d.customer.firstname + ' ' + d.customer.lastname,
                        start: new Date(d.date),
                        end: add(new Date(d.date), { minutes: d.duration })
                    }))
                );
            })
            .then(console.log(trainings))
            .catch(err => console.error(err))
    }

    const locales = {
        'FI': fi,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    return (

        <div>
            <br />
            <Calendar
                localizer={localizer}
                events={trainings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800, width: '90%', margin: 'auto' }}
                defaultView="month"
            />
        </div>
    );
}