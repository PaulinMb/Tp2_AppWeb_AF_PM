 import React from 'react';
 import FullCalendar from '@fullcalendar/react'
 import dayGridPlugin from '@fullcalendar/daygrid';

 const Calendrier = ()=>{
     return( <div>
         <FullCalendar
         plugins={[ dayGridPlugin ]}
         initialView="dayGridMonth"
         events={[
             { title: 'Début du TP1', date: '2023-10-13' },
             { title: 'Fin du TP1', date: '2023-11-10' }
           ]}
       />
     </div>);
 }

 export default Calendrier;