//CalendarByCity
// https://api.aladhan.com/v1/calendarByCity?city=Dubai&country=Egypt&month=10&year=2017
//timingsByCity
// http://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt

const timesInfoEle = document.querySelector(".timing-info")
const prayerTimesEle = document.querySelector(".prayer-times")
const dateEle = document.querySelector(".date-ele")
const cityEle = document.querySelector(".city-ele")
//Inputs
const cityInput = document.querySelector("#city")
const dateInput = document.querySelector("#custom-date")



//Today is date
const monthes = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const currentDay = new Date().getDate()
const currentMonth =monthes [new Date().getMonth()]
const currentYear = new Date().getFullYear()
/////////
let cityValue=[];
let dateValue;
cityInput.addEventListener("change",(e)=>{
    cityValue = e.target.value.split("-");
    const [city,country] = cityValue;

    if(cityInput.value !== "" && dateInput.value !== ""){
        console.log("cityandtime");
        let [year,month,day] = dateValue;
        getTimesByCityAndDate(city,country,year,month,day)
    }else{
        console.log("city");
        getTimesByCity(city,country)
    }
})

function getTimesByCity(city="Mecca",country="saudi aribia"){
    const firstUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
    fetchTimes(firstUrl)
    
}
//Run at the start of app
getTimesByCity()

dateInput.addEventListener("change",(e)=>{
    if(dateInput.value !== ""){
        dateValue = e.target.value.split("-");
        let [year,month,day] = dateValue;
        const [city,country] = cityValue;
        getTimesByCityAndDate(city,country,year,month,day)
    }
})

function getTimesByCityAndDate(city="mecca",country="saudi aribia",year,month,day){
    const secondUrl = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&month=${month}&year=${year}`
    //Modifies day from 01 => 1;
    if(day.startsWith("0")){
        day = day.split('')[1]
    }
    fetchTimes(secondUrl,day)
}


async function fetchTimes(url,day){
    try {
        const dataObject = await (await fetch(url)).json()
        let {code,status,data} = dataObject;
        if(code === 200 && status === 'OK'){
            displayPrayerTimers(data,day)
        }else{
            throw Error("error")
        }
    } catch (error) {
        console.log(error,"error");
        // alret("Please check your network");
    }
}

const sunriseEle = document.querySelector(".sunrise span.prayer-time")
const fajrEle = document.querySelector(".fajr span.prayer-time")
const dhuhrEle = document.querySelector(".dhuhr span.prayer-time")
const asrEle = document.querySelector(".asr span.prayer-time")
const magharibEle = document.querySelector(".maghrib span.prayer-time")
const ishaEle = document.querySelector(".isha span.prayer-time")

function displayPrayerTimers(data,day){
    let timings;
    cityEle.innerHTML=`${cityValue[0]== undefined ?"Mecca":cityValue[0]}`
    if(day!==undefined){
        const updatedDate = data[--day].date.readable.split(" ")
        let [newDay,newMonth,newYear] = updatedDate;

        if(newDay.startsWith("0")){
            newDay = newDay.split('')[1]
        }

        timings = data[day].timings
        const weekDay = data[day].date.gregorian.weekday.en;
        dateEle.innerHTML=`
        <span>${newMonth} / ${newDay} / ${newYear}</span>  
        <span class='week-day'>${weekDay}</span>
        `
    }else{
        // Defined Date and City at start 
        timings = data.timings;
        const weekDay = data.date.gregorian.weekday.en;
        dateEle.innerHTML=`
        <span>${currentMonth} / ${currentDay} / ${currentYear}</span>
        <span class='week-day'>${weekDay}</span>
        `
    }
    sunriseEle.innerHTML=changeDateFormat(timings.Sunrise.split(" ")[0])
    fajrEle.innerHTML=changeDateFormat(timings.Fajr.split(" ")[0])
    dhuhrEle.innerHTML=changeDateFormat(timings.Dhuhr.split(" ")[0])
    asrEle.innerHTML= changeDateFormat(timings.Asr.split(" ")[0])
    magharibEle.innerHTML=changeDateFormat(timings.Maghrib.split(" ")[0])
    ishaEle.innerHTML=changeDateFormat(timings.Isha.split(" ")[0])
}

function changeDateFormat(time){
    let flag =" AM";
    let [hour,minutes] = time.split(":");
    let modifiedHour;
    if(hour > 12){
        hour -= 12;
        modifiedHour=hour
        flag = " PM"
    }
    if(hour == 12){
        flag =" PM"
    }
    let fullTime = `${modifiedHour < 10 ? '0'+hour :hour}:${minutes}  ${flag}`
    return fullTime
}

//Slide Show
let count=0;
function slideShow(){
    const arrayOsSrcs = ["img-1.jpg","img-2.jpg","img-3.jpg","img-4.jpg","img-5.jpg","img-6.jpg","img-7.jpg","img-8.jpg","img-9.jpg","img-10.jpg","img-11.jpg"]
    document.body.style.backgroundImage=`url(./images/${arrayOsSrcs[count]}) `
    document.body.style.backgroundSize=`cover`
    count++
    //Reset
    if(count >= arrayOsSrcs.length){
        count = 0;
    }
    setTimeout(() => {
        slideShow()
    },15000);
}

slideShow()









