import React,{useEffect,useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import Axios from 'axios'; //npm install axios au tout premier dossier parent Tp2_App...M
import PropTypes from 'prop-types';
Axios.defaults.withCredentials = true;


const Calendrier = () => {

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
            Axios.post("http://localhost:5000/api/createEvent",event).then(response=>{
            if(response.data.message!==undefined){
                setMessageErreur(response.data.message);
            }
        }).catch(error => {
                if(error){
                    setMessageErreur(error)
                }
        });
        window.location.reload();
        }
        else{
            setMessageErreur("Les champs doivent être remplis")
        }
    }

    const deleteEvent = (titleEv,dateEv)=>{
        console.log("delete")
        let paramsB = {
            title : titleEv,
            date : dateEv
        }
        Axios.delete("http://localhost:5000/api/deleteEvent",{params:paramsB}).then(response=>{
            setMessageErreur2(response.data.message)
        }).catch(error=>{
            setMessageErreur2(error)
        })
        window.location.reload();
    }

    const getEvents = () =>{
        Axios.get("http://localhost:5000/api/getEvents").then(response=>{
            console.log(response.data.array)
            setEventsTable(response.data.array);
        }).catch(error=>{

        })
    }

    return (<div>
        <div style={{border:"1px solid black",width:"fit-content",padding:"15px",marginTop:"5px"}}>
            <h1>Create event</h1>
            <label>Titre : </label>
            <input type='text' className='custom' value={newEventTitre} name='titre' onChange={(e)=>setNewEventTitre(e.target.value)}></input>
            <label>Date : </label>
            <input type='date'  className='custom' value={newEventDate} name='date' onChange={(e)=>setNewEventDate(e.target.value)}></input>
            <button onClick={createEvent}  className='custom'>Create Event</button>
            {messageErreur}
        </div>
        <div style={{border:"1px solid black",width:"fit-content",padding:"15px",marginTop:"5px"}}>
            <h1>Delete events</h1>
            {eventsTable.map((ev,index)=>{
                return(< div key={index}><label>{ev.title}   -  </label><label>{ev.date}   </label><button onClick={()=>deleteEvent(ev.title,ev.date)}>Delete</button></div>)
            })}
            {messageErreur2}
        </div>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventsTable}
        />
    </div>);
}

Calendrier.propTypes = {
    messageErreur: PropTypes.string.isRequired,
    messageErreur2: PropTypes.string.isRequired,
    newEventDate: PropTypes.string.isRequired,
    newEventTitre: PropTypes.string.isRequired,
    eventsTable: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    setNewEventDate: PropTypes.func.isRequired,
    setNewEventTitre: PropTypes.func.isRequired,
  };
  

export default Calendrier;