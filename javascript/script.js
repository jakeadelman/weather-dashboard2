
var submitButton = document.getElementById("submitbutton")
submitButton.addEventListener("click", (event) => {
    event.preventDefault()

    // parse cities to side
    var cities = document.getElementById("cities")

    var eachEl = document.createElement("div")
    eachEl.innerHTML = document.getElementById("cityinput").value
    eachEl.classList.add("m-4", "p-4", "bg-gray-800", "text-white", "rounded", 'rounded-xl', "text-center")
    cities.appendChild(eachEl)



    getLatLon()
})


// parse cities to side
var cities = document.getElementById("cities")
var storage = JSON.parse(localStorage.getItem("places"))
console.log(storage)

storage.map((each) => {
    var eachEl = document.createElement("div")
    eachEl.innerHTML = each
    eachEl.classList.add("m-4", "p-4", "bg-gray-800", "text-white", "rounded", 'rounded-xl', "text-center")
    cities.appendChild(eachEl)

    eachEl.addEventListener("click", (event) => {
        event.preventDefault()
        // console.log(event.target.innerHTML)
        getLatLon(event.target.innerHTML)
    })
})




function getLatLon(local) {


    var bottomA = document.getElementById("bottom-area")
    var m = document.getElementById("main")
    m.innerHTML = ""
    bottomA.innerHTML = ""
    var lat;
    var lon;
    var loc;
    if (local) {
        loc = local
    } else {

        loc = document.getElementById("cityinput").value
        console.log(loc)
    }

    let localPlaces = localStorage.getItem("places")
    if (localPlaces == undefined) {
        let array = []
        array.push(loc)
        localStorage.setItem("places", JSON.stringify(array))
    } else {
        let array = JSON.parse(localStorage.getItem("places"))
        let unique = true
        array.map((city) => {
            if (city == loc) {
                unique = false
            }
        })
        if (unique == true) {
            array.push(loc)
            localStorage.setItem("places", JSON.stringify(array))
        }
    }

    var myLocation = "https://api.openweathermap.org/geo/1.0/direct?q=" + loc + "&limit=5&appid=4a2db2ccc383cc9b2720b3f82486d37d"
    console.log(myLocation)
    fetch(myLocation)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            lat = data[0].lat
            lon = data[0].lon
            console.log(lat, lon)

            fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=4a2db2ccc383cc9b2720b3f82486d37d")
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(parseInt(data.current.temp))
                    var currentTemp = parseInt(data.current.temp) - 273.15
                    var currentWind = data.current.wind_speed
                    var currentHum = data.current.humidity
                    var uvi = data.current.uvi
                    currentTemp = currentTemp.toFixed(2)
                    console.log(currentTemp)

                    //Create main location
                    var main = document.getElementById("main")
                    var mainDiv = document.createElement("div")
                    mainDiv.innerHTML = loc.toString() + " "
                    mainDiv.classList.add("text-3xl", "m-4")

                    // create main temp
                    var mainTempDiv = document.createElement("div")
                    mainTempDiv.innerHTML = "Temp: " + currentTemp + "&#176;C"
                    mainTempDiv.classList.add("ml-4")

                    // create main wind
                    var mainWind = document.createElement("div")
                    mainWind.innerHTML = "Wind: " + currentWind
                    mainWind.classList.add("ml-4", "mt-4")

                    // create main hum
                    var mainHum = document.createElement("div")
                    mainHum.innerHTML = "Humidity: " + currentHum + "%"
                    mainHum.classList.add("ml-4", "mt-4")

                    // create main uvi
                    var mainUVI = document.createElement("div")
                    mainUVI.innerHTML = "UV Index: " + uvi
                    mainUVI.classList.add("ml-4", "mt-4")

                    //append elements
                    main.appendChild(mainDiv)
                    main.appendChild(mainTempDiv)
                    main.appendChild(mainWind)
                    main.appendChild(mainHum)
                    main.appendChild(mainUVI)


                    var bottomArea = document.getElementById("bottom-area")
                    var bottom0 = document.createElement("div")
                    var bottom1 = document.createElement("div")
                    var bottom2 = document.createElement("div")
                    var bottom3 = document.createElement("div")
                    var bottom4 = document.createElement("div")
                    var arr = [bottom0, bottom1, bottom2, bottom3, bottom4]

                    arr.map((item, i) => {

                        // Date
                        var current = new Date();
                        var followingDay = new Date(current.getTime() + 86400000);
                        var dateEl = document.createElement("div")
                        dateEl.innerHTML = followingDay.toLocaleDateString()
                        dateEl.classList.add("mb-4", "font-extrabold")
                        item.appendChild(dateEl)
                        item.classList.add("m-2", "text-white", "bg-blue-800", "p-4")

                        // temp
                        var temp = data.daily[i].temp.day - 273.15
                        var tempEl = document.createElement("div")
                        tempEl.innerHTML = "Temp: " + temp.toFixed(2) + "&#176;C"
                        tempEl.classList.add("mb-4")
                        item.appendChild(tempEl)

                        // wind speed
                        var wind = data.daily[i].wind_speed
                        var windEl = document.createElement("div")
                        windEl.innerHTML = "Wind: " + wind + " MPH"
                        windEl.classList.add("mb-4")
                        item.appendChild(windEl)

                        // humidity
                        var humidity = data.daily[i].humidity
                        var humidityEl = document.createElement("div")
                        humidityEl.innerHTML = "Humidity: " + humidity + "%"
                        humidityEl.classList.add("mb-4")
                        item.appendChild(humidityEl)

                        bottomArea.appendChild(item)

                    })




                })
        })



}