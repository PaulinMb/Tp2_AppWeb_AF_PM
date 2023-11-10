import React,{useEffect,useState} from 'react';
import './css/stylesCalendrier.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import Axios from 'axios'; //npm install axios au tout premier dossier parent Tp2_App...M
import PropTypes from 'prop-types';
Axios.defaults.withCredentials = true;


const Calendrier = (props) => {

    const [messageErreur,setMessageErreur] = useState('');
    const [messageErreur2,setMessageErreur2] = useState('');
    const [newEventDate,setNewEventDate] = useState('');
    const [newEventTitre,setNewEventTitre] = useState('');
    const [eventsTable,setEventsTable] = useState([]);

    useEffect(()=>{
        getEvents();
    },[]);

    const createEvent = ()=>{
        let event = {
            titre : newEventTitre,
            date : newEventDate
        }
        if(newEventTitre!==''&&newEventDate!==''){
            Axios.post(props.url+"/api/createEvent",event).then(response=>{
            if(response.data.message!==undefined){
                setMessageErreur(response.data.message);
                getEvents();
            }
        }).catch(error => {
                if(error){
                    setMessageErreur(error)
                }
        });
        }
        else{
            setMessageErreur("Les champs doivent être remplis")
        }
    }

    const deleteEvent = (titleEv,dateEv)=>{
        //console.log("delete")
        let paramsB = {
            title : titleEv,
            date : dateEv
        }
        Axios.delete(props.url+"/api/deleteEvent",{params:paramsB}).then(response=>{
            setMessageErreur2(response.data.message)
            getEvents();
        }).catch(error=>{
            setMessageErreur2(error)
        })
        
    }

    const getEvents = () =>{
        Axios.get(props.url+"/api/getEvents").then(response=>{
           // console.log(response.data.array)
            setEventsTable(response.data.array);
        }).catch(error=>{

        })
    }

    return (<div>
        <div className="create-event-section">
            <h1>Create event</h1>
            <label>Titre : </label>
            <input type='text' className='custom' value={newEventTitre} name='titre' onChange={(e)=>setNewEventTitre(e.target.value)}></input>
            <label>Date : </label>
            <input type='date'  className='custom' value={newEventDate} name='date' onChange={(e)=>setNewEventDate(e.target.value)}></input>
            <button onClick={createEvent}  className='custom'>Create</button>
            {messageErreur}
        </div>

        <div className="delete-event-section">
            <br/><h1>Delete events</h1>
            {eventsTable.map((ev,index)=>{
                return(< div
                    key={index}><br/><label>{ev.title} - </label><label>{ev.date}</label><br/>
                    <button onClick={()=>deleteEvent(ev.title,ev.date)}>Delete</button>
                </div>)
            })}
            {messageErreur2}
        </div>
        <div className="full-calendar-container">
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventsTable}
        />
        </div>
    </div>);
}

Calendrier.propTypes = {
    messageErreur: PropTypes.string,
    messageErreur2: PropTypes.string,
    newEventDate: PropTypes.string,
    newEventTitre: PropTypes.string,
    eventsTable: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
      })
    ),
    setNewEventDate: PropTypes.func,
    setNewEventTitre: PropTypes.func,
  };
  

export default Calendrier;