//CalendarByCity
// https://api.aladhan.com/v1/calendarByCity?city=Dubai&country=Egypt&month=10&year=2017
//timingsByCity
// http://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt

/// Craete and Fill Options
const cityInput = document.querySelector("#city-select")
const dateInput = document.querySelector("#custom-date")

let cities = [
    {
        cityName:"makkah",
        countryName:"SA"
    },
    {
        cityName:"madina",
        countryName:"SA"
    },
    {
        cityName:"cairo",
        countryName:"egypt"
    },
    {
        cityName:"istanbul",
        countryName:"turkey"
    },
    {
        cityName:"dubai",
        countryName:"UAE"
    },
    {
        cityName:"paris",
        countryName:"france"
    },
    {
        cityName:"london",
        countryName:"endland"
    },
    {
        cityName:"jerusalem",
        countryName:"palastine "
    },
    {
        cityName:"los angeles",
        countryName:"America"
    },
    {
        cityName:"new york",
        countryName:"America"
    },
]
cities.forEach(function(city){
    const option = document.createElement('option')
    option.value=city.cityName;
    option.innerHTML=city.cityName;
    cityInput.append(option)
})


const timesInfoEle = document.querySelector(".timing-info")
const prayerTimesEle = document.querySelector(".prayer-times")
const dateEle = document.querySelector(".date-ele")
const cityEle = document.querySelector(".city-ele")

/////////

let countryName;
let cityName;
let dateValue;
cityInput.addEventListener("change",(e)=>{
    cityEle.innerHTML=e.target.value;
    let currentCity = cities.find(city=>city.cityName === e.target.value);
    cityName =currentCity.cityName;
    countryName = currentCity.countryName;
    
    if(cityInput.value !== "" && dateInput.value !== ""){
        let [year,month,day] = dateValue;
        getTimesByCityAndDate(cityName,countryName,year,month,day)
    }else{
        getTimesByCity(cityName,countryName)
    }
})

dateInput.addEventListener("change",(e)=>{
    dateValue = e.target.value.split("-");
    let [year,month,day] = dateValue;
    getTimesByCityAndDate(cityName,countryName,year,month,day)
})

function getTimesByCity(city="makkah",country="SA"){
    const firstUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
    fetchTimes(firstUrl)
    
}
//Default city is Makkah
getTimesByCity()


function getTimesByCityAndDate(city="makkah",country="SA",year,month,day){
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



function displayPrayerTimers(data,day){
    let timings;
   
    if(day!==undefined){
        //Prayer Times By City And Date
        const updatedDate = data[--day].date.gregorian
        setTimeAndDate(updatedDate)
        timings = data[day].timings
    }else{
        //Prayer Times By City
        const updatedDate_ = data.date.gregorian
        setTimeAndDate(updatedDate_)
        timings = data.timings;
        
    }
    fillPrayerTime("sunrise-time",timings.Sunrise)
    fillPrayerTime("fajr-time",timings.Fajr)
    fillPrayerTime("dhuhr-time",timings.Dhuhr)
    fillPrayerTime("asr-time",timings.Asr)
    fillPrayerTime("maghrib-time",timings.Maghrib)
    fillPrayerTime("isha-time",timings.Isha)
}

function setTimeAndDate(date){
    const {day,month,weekday,year} = date;
    dateEle.innerHTML=`
    <span> ${day} ${month.en} ${year}</span>
    <span class='week-day'>${weekday.en}</span>
    `
}

function fillPrayerTime(id,time){
    const ele = document.querySelector(`#${id} span.prayer-time`)
    return ele.innerHTML = changeDateFormat(time.split(" ")[0])
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
        // slideShow()
    },15000);
}

slideShow()









