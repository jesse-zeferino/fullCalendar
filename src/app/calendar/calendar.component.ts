import { ChangeDetectorRef, Component,ViewChild, } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi,EventInput,EventChangeArg,
   } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import esLocale from "@fullcalendar/core/locales/es";
import { FullCalendarComponent } from '@fullcalendar/angular';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent | any;
  calendarVisible = true;
   eventGuid = 0;
 TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
 eventos: EventInput[] = [];

  ///OPCIONES DE CALENDARIO
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: "",
      center: "",
      right: "",
    },
    initialView: "timeGridDay",
  
    weekends: true,
    editable: false,
    selectable: true,
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin],
     locale: esLocale,
    selectMirror: false,
  
    slotLabelInterval: 30,
    droppable: true,
    dayMaxEvents: true,
    slotMinTime: "08:00 ",
    slotMaxTime: "20:00 ",
    businessHours: {
      startTime: "8:00",
      endTime: "20:00",
    },
    contentHeight: "auto",
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange: this.eventChange.bind(this),
    
    events: this.eventos,
    customButtons: {
      addEventButton: {
        text: "botone",
        click: this.ocultarCalendario.bind(this),
      },
    },
        slotLabelFormat(arg) {
      let texto:any;
      if(arg.date.hour == 9 && arg.date.minute == 0){
        texto= "Mañana";
      }
      if(arg.date.hour == 12  && arg.date.minute == 0){
        texto= "Mediodía";
      }
      if(arg.date.hour == 14  && arg.date.minute == 0){
        texto= "Tarde";
      }
      
      return texto;
    },
     
    
  };
  //FIN OPCIONES CALENDARIO
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {
  }
  ocultarCalendario(event?: MouseEvent): void {
    console.log('evento', event)
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }
  eventChange(arg: EventChangeArg) {
    console.log(arg);
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
  Guardar(){

  }
  cerrarModal(){

  }
  onClickPrev(){

  }
  onClickNext(){
    
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  createEventId() {
    return String(this.eventGuid++);
  }

}
