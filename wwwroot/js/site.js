// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener('DOMContentLoaded', function () {

    var arrayData = arrayBirthdays.concat(arrayHolidays).concat(arrayVacations).concat(arraySessions).concat(arrayOthers);
    var arrayEventTypes = [];
    //console.log(arrayData);

    var calendarEl = document.getElementById('calendar');
    //calendarEl.classList.remove("container");

    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC', // the default (unnecessary to specify)
        handleWindowResize: true,
        customButtons: {
            btnExport: {
                text: 'export',
                click: function () {
                    z
                    exportToExcel("xlsx");
                }
            },
            btnFilter: {
                text: 'filter',
                click: function () {
                    viewFilter();
                }
            }
        },
        headerToolbar: {
            left: 'prev,next today btnFilter',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,dayGridYear,listYear'
        },
        buttonText: {
            multiMonthYear: 'year',
            dayGridMonth: 'month',
            timeGridWeek: 'week',
            timeGridDay: 'day',
            dayGridYear: 'full',
            listYear: "list"
        },
        initialView: "multiMonthYear",
        //initialDate: '2023-01-12',
        weekends: true,

        eventAdd: function () {
            //alert("debe agregar el elemento al array y la BD");
        },
        eventChange: function (arg) {
            //alert("debe modificar el elemento del array y la BD");
            //console.log(arg.event);

            eventColor = arg.event._def.ui.backgroundColor;
            id = arg.event._def.publicId;
            title = arg.event._def.title;
            start = arg.event._instance.range.start;
            end = arg.event._instance.range.end
            allDay = arg.event._def.allDay;
            type = arg.event._def.extendedProps.type;
            description = arg.event._def.extendedProps.description;

            //console.log(type);

            arrayData.forEach((element, index) => {   //remove from initial array (concat) 
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

        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: true,
        select: function (arg) { //add event, click empty space --NEW

            $("#new-event--start").attr("disabled", true);
            $("#new-event--end").attr("disabled", true);

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
            //document.getElementById("edit-event--allDay").value = arg.event.allDay
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

    });


    function evalTypeColor(eventColor) {
        var elementtype = "";
        if (eventColor == '#14A44D') //birthday
            elementtype = "birthday";

        if (eventColor == '#DC4C64') //holiday
            elementtype = "holiday";

        if (eventColor == '#54B4D3') //vacation
            elementtype = "vacation";

        if (eventColor == '#3B71CA') //session
            elementtype = "session";

        if (eventColor == '#FF8C00') //other
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
        var myId = document.getElementById("new-event--id").value;
        var event = calendar.getEventById(myId);
        //console.log(event);

        if (confirm('Are you sure you want to delete this event?')) {
            event.remove(); //remove from calendar

            arrayData.forEach((element, index) => {   //remove from initial array (concat) 
                if (element.id == myId) {
                    arrayData.splice(index, 1);
                    return;
                }
            });

        }

        ////call ajax
        //$.ajax({
        //  type: 'GET',
        //  contentType: 'application/json; charset=utf-8',
        //  url: 'https://localhost:7261/api/calendar/getEventTypesAsync',
        //  headers:{         
        //      'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        //      'Content-Type':'application/json'
        //  },
        //  success: function (data, status, xhr) {

        //    console.log('data Async: ', data);
        //  },
        //  error: function(error){
        //    console.log(error)
        //  }
        //});

        calendar.render();
    });

    async function doAjax(url, params = {}, method = 'POST') {
        return $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            data: params
        });
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

        let max = 0;
        arrayData.forEach(character => {
            if (character.id > max) {
                max = character.id;
            }
        });

        var id = max + 1;

        var type = evalTypeColor(eventColor);


        arrayData.push({ //add to initial array
            'id': id,
            'title': title,
            'start': start,
            'end': end,
            'allDay': allDayBoolean,
            'color': eventColor,
            'textColor': 'white',
            'type': type,
            'description': description,
        });

        calendar.addEvent({  //add to calendar
            id: id,
            title: title,
            start: start_format_date,
            end: end_format_date,
            allDay: allDayBoolean,
            color: eventColor,
            textColor: 'white',
            type: type,
            description: description,

        });


        var data = 
        {
            Id: id,
            Title: title,
            StartDate: start_format_date,
            EndDate: end_format_date,
            AllDay: allDayBoolean,
            Description: description,
            EventTypeId: 1,
            EventTypeName: type,
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

        var eventColor = "";
        if ($("input[type='radio'].radioBtnClassNew").is(':checked')) {
            eventColor = $("input[type='radio'].radioBtnClassNew:checked").val();
        }

        var start_format = document.getElementById("new-event--start").value;
        var end_format = document.getElementById("new-event--end").value;

        var start_format_date = strToDate(start_format);
        var end_format_date = strToDate(end_format);

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

        ////
        var allDay = document.getElementById("new-event--allDay").value;
        var allDayBoolean = (allDay === 'true');
        var type = evalTypeColor(eventColor);

        var data =
        {
            Id: id,
            Title: title,
            StartDate: start_format_date,
            EndDate: end_format_date,
            AllDay: allDayBoolean,
            Description: description,
            EventTypeId: 1,
            EventTypeName: type,
            CalendarTypeId: 1,
            CalendarTypeName: "Squad Los Trovadores",
            UserCreate: '1'

        };

        postEventUpd(data);

        

    });

    function getEventTypes() {
        //call ajax
        $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: 'https://localhost:7261/api/calendar/getEventTypesAsync',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                'Content-Type': 'application/json'
            },
            success: function (data, status, xhr) {
                //arrayEventTypes = data;
                console.log('data Async: ', arrayEventTypes);
            },
            error: function (error) {
                console.log(error)
            }
        });
    }

    function postEventAdd(obj) {
        console.log(obj);
        //call ajax
        $.ajax({
            type: "POST",
            url: 'https://localhost:7261/api/calendar/postEventAddAsync',
            data: JSON.stringify(obj),// now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                alert("success");// write success in " "
            },

            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail' + status.code);
            }
        });

    }

    function postEventUpd(obj) {
        console.log(obj);
        //call ajax
        $.ajax({
            type: "POST",
            url: 'https://localhost:7261/api/calendar/postEventUpdAsync',
            data: JSON.stringify(obj),// now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                alert("success");// write success in " "
            },

            error: function (jqXHR, status) {
                // error handler
                console.log(jqXHR);
                alert('fail' + status.code);
            }
        });

    }

    $(document).ready(function () {

        //getEventTypes();

        $("#new-event").on('shown.bs.modal', function () {
            $(this).find('#new-event--title').focus();
        });

        var eventColor = "";
        if ($("input[type='radio'].radioBtnClassNew").is(':checked'))
            eventColor = $("input[type='radio'].radioBtnClassNew:checked").val();

        $('#datetimepicker1').datetimepicker({
            format: 'DD/MM/YYYY hh:mm:ss a',
        });

        $('#datetimepicker2').datetimepicker({
            format: 'DD/MM/YYYY hh:mm:ss a',
        });

        $("#external-events").draggable({ handle: "header" });
        //$(".external-events").resizable();

        // batch every modification into one re-render
        calendar.batchRendering(() => {
            // remove all events
            calendar.getEvents().forEach(event => event.remove());
            //add events from array concat
            arrayData.forEach(event => calendar.addEvent(event));

        });



    });



    calendar.render();
});

