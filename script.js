const now = new Date();

const date = now.getDate();

const days =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
const day = days[now.getDay()];
let month = now.getMonth();

let year = now.getFullYear();

const daysInWeek = document.getElementById('days');
const setMonthYearBox = document.getElementById('set-month-year');
//box 1
const date_box = document.getElementById('date');
date_box.innerHTML ="";
date_box.innerHTML += day + ", " + months[month] +" "+ date;


//render calendar
const renderCalendar = (month, year) => {
    const calendar_body = document.getElementById('calendar-body');
    calendar_body.innerHTML="";
    calendar_body.style.display="";

    const date_month_year = document.getElementById('date-month-year');
    date_month_year.innerHTML ="";
    date_month_year.innerHTML += months[month] + " " + year;

    const prevMonthDays = new Date(year,month,0).getDate();
    
    const daysInMonth = new Date(year, month+1,0).getDate();
    const firstDayOfMonth = new Date(year, month,1).getDay();
    let row = document.createElement('tr');

    let numRow = 0;
    //cac ngay cua thang truoc
    for(let i = firstDayOfMonth; i>0;i--) {
        let cell = document.createElement('td');
        cell.className = "dayOfOtherMonths"
        cell.innerHTML = prevMonthDays - i + 1;
        row.appendChild(cell);
    }
    //cac ngay trong thang
    for(let i = 1; i<= daysInMonth; i++ ){
        if(row.children.length === 7){
            numRow++;
            calendar_body.appendChild(row);
            row = document.createElement('tr');
        }
        let cell = document.createElement('td');
        if(i === now.getDate() && month === now.getMonth() && year === now.getFullYear()){
            cell.classList.add("today");
        }
        cell.innerHTML = i;
       
        row.appendChild(cell);
    }
    // cac ngay cua thang sau
    let nextDay = 1
    // while(numRow < 6){
    //     let cell = document.createElement('td');
    //     cell.innerHTML = nextDay;
    //     row.appendChild(cell);
    //     if(row.children.length === 7){
    //         calendar_body.appendChild(row);
    //         numRow++;
    //     }
    //     nextDay++;
    // }
    if(row.children.length >= 7){
        calendar_body.appendChild(row);
        row = document.createElement('tr');
        numRow++;
    }
    console.log("truowcs : "+ numRow);
    while(true){
        if(numRow >= 6){break;}
        cell = document.createElement('td');
        cell.innerHTML = nextDay;
        cell.className ="dayOfOtherMonths";
        row.appendChild(cell);
        nextDay++;
        if(row.children.length >= 7){
            numRow++;
            
            calendar_body.appendChild(row);
            row = document.createElement('tr');
        }
        console.log(numRow);
        
    }
    calendar_body.appendChild(row);
    
}
// xử lí button
const prev_month = () =>{
    month--;
    if(month === 0){
        month = 11;
        year--;
    }
    renderCalendar(month,year);
}
const next_month = () => {
    month++;
    if(month === 12){
        month = 0;
        year++;
    }
    renderCalendar(month,year);
}

const setYear = () => {
    const daysInWeek = document.getElementById('days');
    // daysInWeek.style.visibility = 'hidden';
    const calendar_body = document.getElementById('calendar-body');
    // calendar_body.innerHTML="";
    setMonthYearBox.style.display='grid';
    setMonthYearBox.innerHTML="";
    

    for(let i = 1971 ; i<=2050; i++){
        const row = document.createElement("tr");
        const cell = document.createElement("div");
        cell.id = i;
        cell.innerHTML = i;
        cell.className = "year";
        cell.onclick = function(){
            year = this.id;
            renderCalendar(month,year);
            setMonthYearBox.style.display='none';

        }
        row.appendChild(cell);
        setMonthYearBox.appendChild(cell);
    }
    
}
const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]
// setMonthYearBox.addEventListener('mouseout',()=>{setMonthYearBox.style.display='none'});
const setMonth = () => {
    // calendar_body.innerHTML="";
    setMonthYearBox.innerHTML ="";
    setMonthYearBox.style.display="grid";

    for(let i = 0; i<12; i++){
        
        const cell = document.createElement("div");
        cell.id = months[i];
        cell.innerHTML = shortMonths[i];
        cell.className="months";
      
        // if(row.children.length == 4){
        //     setMonthYearBox.appendChild(row);
        //     row = document.createElement('');
        // }
        setMonthYearBox.appendChild(cell);
        cell.onclick = () =>{
            month = i;
            setYear();
            isNone = false;
        };
        
    }
    // calendar_body.style.display="grid";
    // calendar_body.style.gridTemplateColumns="auto auto auto auto"
    // calendar_body.style.gridTemplateRows="auto"
}
const renderDateNow =() => {
    renderCalendar(now.getMonth(),now.getFullYear());
}
// xu ly thoat setMonthYearBox
let isNone = false;
document.getElementById('calendar-box').addEventListener('click',()=>setMonthYearBox.style.display='none');


document.getElementById('date').addEventListener('click',()=>setMonthYearBox.style.display='none');


document.getElementById('date-month-year').addEventListener('click', () =>{
   if(isNone){
    setMonthYearBox.style.display='none';
    console.log(isNone);
    isNone = false;
   }
   else {
    setMonthYearBox.style.display='grid';
    console.log(isNone);
    isNone = true;
   }
});

const calendar_box = document.getElementById('calendar-box')

//minimize calendar
const miniCalendar = () =>{
    
        calendar_box.style.display="none";
        document.getElementById('date-month-year-line').style.display='none';
        document.getElementById('mini').style.display='none';
        document.getElementById('maxi').style.display="flex";
    };
const maxiCalendar =() => {
        calendar_box.style.display="";
        document.getElementById('date-month-year-line').style.display="";
        document.getElementById('mini').style.display='';
        document.getElementById('maxi').style.display="none";
    };

// render Calendar
renderCalendar(month, year);