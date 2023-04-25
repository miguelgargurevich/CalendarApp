// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener('DOMContentLoaded', function () {

    var host = document.getElementById('hostName').value;

    var arrayData = arrayHolidays; //arrayBirthdays.concat(arrayHolidays).concat(arrayVacations).concat(arraySessions).concat(arrayOthers);

    //console.log(arrayData);

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC', // the default (unnecessary to specify)
        handleWindowResize: true,
        customButtons: {
            btnExport: {
                text: '',
                click: function () {
                    exportToExcel("xlsx");
                }
            },
            btnFilter: {
                text: '',
                click: function () {
                    viewFilter();
                }
            }
        },
        headerToolbar: {
            left: 'prev,next today btnFilter btnExport',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridDay,listYear',

        },
        buttonText: {
            multiMonthYear: '',
            dayGridMonth: '',
            //dayGridYear: 'month',
            timeGridWeek: '',
            timeGridDay: '',
            listYear: ''
        },
        buttonIcons: {
            //multiMonthYear: 'calendar',
            //dayGridMonth: 'chevron-left',
            //dayGridYear: 'chevron-left',
            //timeGridWeek: 'chevron-left',
            //timeGridDay: 'chevron-left',
            //listYear: ""
        },
        initialView: "multiMonthYear",
        //initialDate: '2023-01-12',
        weekends: true,

        eventAdd: function () {
            //alert("debe agregar el elemento al array y la BD");
        },
        eventChange: function (arg) {
            eventColor = arg.event._def.ui.backgroundColor;
            id = arg.event._def.publicId;
            title = arg.event._def.title;
            start = arg.event._instance.range.start;
            end = arg.event._instance.range.end
            allDay = arg.event._def.allDay;
            type = arg.event._def.extendedProps.type;
            description = arg.event._def.extendedProps.description;

            arrayData.forEach((element, index) => {  
                if (element.id == id) {

                    element.color = eventColor;
                    element.title = title;
                    element.start = start;
                    element.end = end;
                    element.allDay = allDay;
                    element.description = description;
                    element.type = evalTypeColor(eventColor)

                    return;
                }
            });

            calendar.render();

        },
        eventRemove: function () {
            //alert("debe remover el elemento del array y la BD");
        },
        eventDrop: function (arg) {
            eventColor = arg.event._def.ui.backgroundColor;
            id = arg.event._def.publicId;
            title = arg.event._def.title;
            start = arg.event._instance.range.start;
            end = arg.event._instance.range.end
            allDay = arg.event._def.allDay;
            type = arg.event._def.extendedProps.type;
            description = arg.event._def.extendedProps.description;

            var data =
            {
                id: id,
                title: title,
                start: start,
                end: end,
                allDay: allDay,
                description: description,
                EventTypeId: 1,
                type: type,
                CalendarTypeId: 1,
                CalendarTypeName: "Squad Los Trovadores",
                UserCreate: '1'

            };

            postEventUpd(data);
        },  
        eventResize: function (arg) {

            eventColor = arg.event._def.ui.backgroundColor;
            id = arg.event._def.publicId;
            title = arg.event._def.title;
            start = arg.event._instance.range.start;
            end = arg.event._instance.range.end
            allDay = arg.event._def.allDay;
            type = arg.event._def.extendedProps.type;
            description = arg.event._def.extendedProps.description;

            var data =
            {
                id: id,
                title: title,
                start: start,
                end: end,
                allDay: allDay,
                description: description,
                EventTypeId: 1,
                type: type,
                CalendarTypeId: 1,
                CalendarTypeName: "Squad Los Trovadores",
                UserCreate: '1'

            };

            postEventUpd(data);
        }, 
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: true,
        select: function (arg) { //add event, click empty space --NEW

            $("#new-event--start").attr("disabled", false);
            $("#new-event--end").attr("disabled", false);

            document.getElementById("btnAgregar").style.display = "block";
            document.getElementById("btnActualizar").style.display = "none";
            document.getElementById("btnEliminar").style.display = "none";


            if (arg.event == undefined) {
                var startStrFormat = moment(arg.start).utc().format('DD/MM/YYYY hh:mm:ss a');
                var endStrFormat = moment(arg.end).utc().format('DD/MM/YYYY hh:mm:ss a');

                var startStr = arg.startStr;
                var endStr = arg.endStr;

                document.getElementById("new-event--title").value = "";
                document.getElementById("new-event--start").value = startStrFormat;
                document.getElementById("new-event--start-h").value = startStr;
                document.getElementById("new-event--end").value = endStrFormat;
                document.getElementById("new-event--end-h").value = endStr;
                document.getElementById("new-event--allDay").value = arg.allDay;
                document.getElementById("new-event--description").value = "";

                $("input[name=event-tag][value=" + "#54B4D3" + "]").prop('checked', true);

                $('#new-event').modal('show');

            }
            /*
            calendar.unselect()
            */
        },
        eventClick: function (arg) { //select event --EDIT
            $("#new-event--start").attr("disabled", false);
            $("#new-event--end").attr("disabled", false);

            document.getElementById("btnAgregar").style.display = "none";
            document.getElementById("btnActualizar").style.display = "block";
            document.getElementById("btnEliminar").style.display = "block";

            document.getElementById("new-event--id").value = arg.event._def.publicId;
            document.getElementById("new-event--title").value = arg.event._def.title //startStr fecha str
            document.getElementById("new-event--allDay").value = arg.event.allDay
            document.getElementById("new-event--start-h").value = arg.event.startStr; //fecha str
            document.getElementById("new-event--end-h").value = arg.event.endStr //startStr fecha str\

            var startStrFormat = moment(arg.event.start).utc().format('DD/MM/YYYY hh:mm:ss a');
            var endStrFormat = moment(arg.event.end).utc().format('DD/MM/YYYY hh:mm:ss a');
            if (endStrFormat == 'Invalid date') {
                var fecha = new Date(arg.event.start);
                var dias = 1;
                fecha.setDate(fecha.getDate() + dias);
                endStrFormat = moment(fecha).utc().format('DD/MM/YYYY hh:mm:ss a');
            }

            document.getElementById("new-event--start").value = startStrFormat;
            document.getElementById("new-event--end").value = endStrFormat;
            document.getElementById("new-event--description").value = arg.event._def.extendedProps.description;

            let colorValue = arg.event._def.ui.backgroundColor;
            $("input[name=event-tag][value=" + colorValue + "]").prop('checked', true);

            $('#new-event').modal('show');

        },
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        displayEventTime: false,
        nowIndicator: true,
        viewDidMount: function (event, element) {
            evalCalendarView();

            
            //console.log(obj)
        },
        eventDidMount: function (event, element) {
            // Add icon before the title
            setIconsHeader();

        },
        dayCellDidMount: function (arg) {
            // Add icon before the title
            
            setIconsHeader();
            
            //if (arg.el.classList.contains("fc-day-future")) {
            //    var theElement = arg.el.querySelectorAll(".fc-daygrid-day-frame > .fc-daygrid-day-events")[0]
            //    setTimeout(function () {
            //        if (theElement.querySelectorAll(".fc-daygrid-event-harness").length === 0) { // check there's no event
            //            //theElement.innerHTML = theElement.innerHTML + '<div class="text-center"><i class="calendar-icon fas fa-plus"></i></span></div>';
            //        }
            //    }, 10)
            //}
            
        }
        //textColor: 'white',

    });

    function setIconsHeader() {
        // Create the icon
        var obj = document.getElementsByClassName("fc-header-toolbar")[0];
        obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[2].innerHTML = '<i class="fa-solid fa-clock-o" aria-hidden="true"></i>';
        obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[3].innerHTML = '<i class="fa-solid fa-filter" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[4].innerHTML = '<i class="fa-solid fa-floppy-o" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';

        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[0].innerHTML = '<i class="fa-solid fa-calendar" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[1].innerHTML = '<i class="fa-solid fa-calendar-week" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[2].innerHTML = '<i class="fa-solid fa-calendar-day" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[3].innerHTML = '<i class="fa-solid fa-list" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';

    }

    function evalTypeColor(eventColor) {
        var elementtype = "";
        if (eventColor == '#14A44D') //birthday
            elementtype = "birthday";

        if (eventColor == '#DC4C64') //holiday
            elementtype = "holiday";

        if (eventColor == '#1e81b0') //vacation
            elementtype = "vacation";

        if (eventColor == '#0042FF') //session
            elementtype = "session";

        if (eventColor == '#844CBF') //other
            elementtype = "other";

        return elementtype;
    }

    function viewFilter() {
        var pnl = document.getElementById("external-events");
        pnl.style.display = pnl.style.display === 'none' ? '' : 'none';
    }

    function exportToExcel(type, fn, dl) {
        //fc-multimonth-header-table
        //fc-scrollgrid
        //fc-scrollgrid
        //fc-list-table
        var elt = document.getElementsByClassName("fc-list-table")[0];
        if (elt === undefined)
            elt = document.getElementsByClassName("fc-scrollgrid")[0];
        if (elt === undefined)
            elt = document.getElementsByClassName("fc-list-table")[0];

        //console.log(elt);

        if (elt !== undefined) {
            console.log(elt);
            //var elt = document.getElementById('tbl_exporttable_to_xls');
            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return dl ?
                XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
                XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
        }

    }

    function strToDate(dtStr) {
        if (!dtStr) return null
        let dateParts = dtStr.split("/");
        //console.log(dateParts);

        let timeParts = dateParts[2].split(" ")[1].split(":");
        dateParts[2] = dateParts[2].split(" ")[0];

        var ampm = dtStr.split(' ')[2];

        var hh = timeParts[0];
        var mm = timeParts[1];
        if (ampm == 'pm' && hh < 12)
            hh = parseInt(timeParts[0]) + 12;

        //new Date( Date.parse("05/12/05 11:11:11") );
        //console.log(hh);
        // month is 0-based, that's why we need dataParts[1] - 1
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], hh, mm, timeParts[2]);
        //console.log(dateObject);
        var dateObj = new Date(dateObject);
        var ret = moment(dateObj).local().format('DD/MM/YYYY HH:mm:ss');


        var localTime = moment(dateObj).format('YYYY-MM-DD'); // store localTime
        var proposedDate = localTime + "THH:MM:00Z";
        proposedDate = proposedDate.replace("HH", hh).replace("MM", mm)

        return proposedDate; //ret;
    }

    function evalCheckedTypes() {

        let isCheckedHolidays = $('#event-tag-chk-holiday')[0].checked;
        //console.log(isCheckedHolidays);
        let isCheckedBirthdays = $('#event-tag-chk-birthday')[0].checked;
        let isCheckedVacations = $('#event-tag-chk-vacation')[0].checked;
        let isCheckedSessions = $('#event-tag-chk-session')[0].checked;
        let isCheckedOthers = $('#event-tag-chk-other')[0].checked;

        //var events = calendar.getEvents();

        var data_arrHolidays = arrayData.filter(function (x) { return x.type == "holiday"; });
        var data_arrBirthdays = arrayData.filter(function (x) { return x.type == "birthday"; });
        var data_arrVacations = arrayData.filter(function (x) { return x.type == "vacation"; });
        var data_arrSessions = arrayData.filter(function (x) { return x.type == "session"; });
        var data_arrOthers = arrayData.filter(function (x) { return x.type == "other"; })

        // remove all events
        calendar.getEvents().forEach(event => event.remove());

        if (isCheckedHolidays == true) {
            calendar.batchRendering(() => {
                data_arrHolidays.forEach(event => calendar.addEvent(event));
            });
        }

        if (isCheckedBirthdays == true) {
            calendar.batchRendering(() => {
                data_arrBirthdays.forEach(event => calendar.addEvent(event));
            });
        }

        if (isCheckedVacations == true) {
            calendar.batchRendering(() => {
                data_arrVacations.forEach(event => calendar.addEvent(event));
            });
        }

        if (isCheckedSessions == true) {
            calendar.batchRendering(() => {
                data_arrSessions.forEach(event => calendar.addEvent(event));
            });
        }

        if (isCheckedOthers == true) {
            calendar.batchRendering(() => {
                data_arrOthers.forEach(event => calendar.addEvent(event));
            });
        }

    }

    function getCalendarAsync() {
        var urlApi = host + "api/calendar/getCalendarAsync";
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: urlApi,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                'Content-Type': 'application/json'
            },
            success: function (data, status, xhr) {
                arrayData = arrayData.concat(data) ;
                //console.log('data Async: ', arrayCalendarList);

                // batch every modification into one re-render
                calendar.batchRendering(() => {
                    // remove all events
                    //calendar.getEvents().forEach(event => event.remove());
                    //add events from array concat
                    arrayData.forEach(event => calendar.addEvent(event));

                    $('input#event-tag-chk-holiday').prop('checked', false);
                    $("input#event-tag-chk-holiday").removeAttr('checked');
                    evalCheckedTypes();

                });

            },
            error: function (error) {
                console.log(error)
            }
        });
    }

    function postEventAdd(obj) {
        var urlApi = host + "api/calendar/postEventAddAsync";
        $.ajax({
            type: "POST",
            url: urlApi,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                //console.log(data);

                var id = data.id;
                arrayData.push({ //add to initial array
                    'id': id,
                    'title': obj.title,
                    'start': obj.start,
                    'end': obj.end,
                    'allDay': obj.allDay,
                    'color': obj.color,
                    'type': obj.type,
                    'description': obj.description,
                });

                calendar.addEvent({  //add to calendar
                    id: id,
                    title: obj.title,
                    start: obj.start,
                    end: obj.end,
                    allDay: obj.allDay,
                    color: obj.color,
                    type: obj.type,
                    description: obj.description,

                });

            },

            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail' + status.code);
            }
        });

    }

    function postEventUpd(obj) {
        //console.log(obj);

        var urlApi = host + "api/calendar/postEventUpdAsync";
        $.ajax({
            type: "POST",
            url: urlApi,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                //alert("success");// write success in " "
            },

            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail: ' + status.code);
            }
        });

    }

    function postEventDel(obj) {
        var urlApi = host + "api/calendar/postEventDelAsync";
        $.ajax({
            type: "POST",
            url: urlApi,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                //alert("success");// write success in " "
            },

            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail' + status.code);
            }
        });

    }

    function evalCalendarView() {
        var type = calendar.currentData.currentViewType;
        var arrView = ["multiMonthYear", "dayGridYear", "timeGridWeek", "timeGridDay", "dayGridMonth"];
        var res = arrView.filter(function (x) { return x == type; });
        //console.log(res.length);

        var obj = document.getElementsByClassName("fc-header-toolbar")[0];
        if (res.length == 1)
            obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[4].style.display = 'none';
        else
            obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[4].style.display = '';


        // Add icon before the title
        /*
        var obj = document.getElementsByClassName("fc-header-toolbar")[0];
        obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[2].innerHTML = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
        obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[3].innerHTML = '<i class="fa fa-filter" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[0].getElementsByClassName("fc-button")[4].innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';

        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[0].innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[1].innerHTML = '<i class="fa fa-calendar-o" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[2].innerHTML = '<i class="fa fa-list-alt" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        obj.getElementsByTagName("div")[4].getElementsByClassName("fc-button")[3].innerHTML = '<i class="fa fa-list" aria-hidden="true"></i>'; //'<i class = "fa fa-spinner fa-spin"></i> Please wait...';
        */

    }


    $('#event-tag-chk-holiday').change(function () {
        evalCheckedTypes();
    });

    $('#event-tag-chk-birthday').change(function () {
        evalCheckedTypes();
    });

    $('#event-tag-chk-vacation').change(function () {
        evalCheckedTypes();
    });

    $('#event-tag-chk-session').change(function () {
        evalCheckedTypes();
    });

    $('#event-tag-chk-other').change(function () {
        evalCheckedTypes();
    });

    $('#btnEliminar').click(function () {
        var id = document.getElementById("new-event--id").value;
        var event = calendar.getEventById(id);
        //console.log(event);

        if (confirm('Are you sure you want to delete this event?')) {
            event.remove(); //remove from calendar

            arrayData.forEach((element, index) => {   //remove from initial array (concat) 
                if (element.id == id) {
                    arrayData.splice(index, 1);
                    return;
                }
            });

        }

        ////call ajax
        var data =
        {
            Id: id
        };

        postEventDel(data);

        calendar.render();
    });

    function sumarDias(myfecha, dias) {
        var fecha = new Date(myfecha);
        fecha.setDate(fecha.getDate() + dias);

        var dd = formatDate(fecha);
        
        return dd;
    }

    function padLeft(n) {
        return ("00" + n).slice(-2);
    }

    function formatDate(d) {
        dformat = [padLeft(d.getDate()), padLeft(d.getMonth() + 1), d.getFullYear()].join('/');
    return dformat
    }

    $('#btnAgregar').click(function () {
        var start_format = document.getElementById("new-event--start").value;
        var end_format = document.getElementById("new-event--end").value;

        var start = document.getElementById("new-event--start-h").value;
        var end = document.getElementById("new-event--end-h").value;
        var allDay = document.getElementById("new-event--allDay").value;
        var allDayBoolean = (allDay === 'true');
        var title = document.getElementById("new-event--title").value;
        var description = document.getElementById("new-event--description").value;

        var eventColor = "";
        if ($("input[type='radio'].radioBtnClassNew").is(':checked'))
            eventColor = $("input[type='radio'].radioBtnClassNew:checked").val();


        var start_format_date = strToDate(start_format);
        var end_format_date = strToDate(end_format);

        if (start_format_date > end_format_date) {
            alert("Invalid range");
            return false;
        }

        //test MFG
        var strEndAddDay = sumarDias(end_format_date, 1);
        console.log(strEndAddDay);
        //test MFG

        let max = 0;
        arrayData.forEach(character => {
            if (character.id > max) {
                max = character.id;
            }
        });

        var id = max + 1;

        var type = evalTypeColor(eventColor);

        //console.log(type);

        var data =
        {
            id: 0,
            title: title,
            start: start_format_date,
            end: end_format_date,
            allDay: allDayBoolean,
            description: description,
            color: eventColor,
            EventTypeId: 1,
            type: type,
            CalendarTypeId: 1,
            CalendarTypeName: "Squad Los Trovadores",
            UserCreate: '1'

        };

        postEventAdd(data);
        //console.log(response);


    });

    $('#btnActualizar').click(function () {

        var id = document.getElementById("new-event--id").value;
        var event = calendar.getEventById(id);

        var title = document.getElementById("new-event--title").value;
        var description = document.getElementById("new-event--description").value;
        var allDay = document.getElementById("new-event--allDay").value;
        var allDayBoolean = (allDay === 'true');

        var eventColor = "";
        if ($("input[type='radio'].radioBtnClassNew").is(':checked')) {
            eventColor = $("input[type='radio'].radioBtnClassNew:checked").val();
        }

        var start = document.getElementById("new-event--start").value;
        var end = document.getElementById("new-event--end").value;

        var start_format_date = strToDate(start);
        var end_format_date = strToDate(end);

        if (start_format_date > end_format_date) {
            alert("Invalid range");
            return false;
        }
        if (start_format_date == end_format_date) {
            alert("The dates are the same");
            return false;
        }

        event.setProp('title', title);
        event.setProp('color', eventColor)
        event.setStart(start_format_date);
        event.setEnd(end_format_date);
        event.setExtendedProp('description', description)
        //event.setProp('allDay', allDayBoolean);


        var type = evalTypeColor(eventColor);

        var data =
        {
            id: id,
            title: title,
            start: start_format_date,
            end: end_format_date,
            allDay: allDayBoolean,
            description: description,
            EventTypeId: 1,
            type: type,
            CalendarTypeId: 1,
            CalendarTypeName: "Squad Los Trovadores",
            UserCreate: '1'

        };

        postEventUpd(data);


    });
    
    $(document).ready(function () {

        //getEventTypes();

        $("#new-event").on('shown.bs.modal', function () {
            $(this).find('#new-event--title').focus();
        });
        /*
        var eventColor = "";
        if ($("input[type='radio'].radioBtnClassNew").is(':checked'))
            eventColor = $("input[type='radio'].radioBtnClassNew:checked").val();
        */
        $('#datetimepicker1').datetimepicker({
            format: 'DD/MM/YYYY hh:mm:ss a',
        });

        $('#datetimepicker2').datetimepicker({
            format: 'DD/MM/YYYY hh:mm:ss a',
        });

        $("#external-events").draggable({ handle: "header" });
        //$(".external-events").resizable();

        getCalendarAsync(); 

        //console.log(calendar.currentData.currentViewType);


    });



    calendar.render();

    evalCalendarView();

});

