var arrayBirthdays = [{
    id: 2000,
    title  : 'Cumple Miguel',
    start  : 'YYYY-06-25 12:00:00',
    end  : 'YYYY-06-26 12:00:00',
    color: '#14A44D', 
    textColor: 'white', 
    type: "birthday",
    allDay: true,
    description: "",
  },
  {
    id: 2001,
    title  : 'Cumple Juan',
    start  : 'YYYY-08-06 12:00:00',
    end  : 'YYYY-08-07 12:00:00',
    color: '#14A44D', 
    textColor: 'white',
    type: "birthday",
    allDay: true,
    description: "",
  }];

  var today = new Date();
  var year = today.getFullYear();
  arrayBirthdays.forEach(element => element.start = element.start.replace('YYYY',year));
  arrayHolidays.forEach(element => element.end = element.end.replace('YYYY',year));