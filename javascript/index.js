let ipAddressInputEl = document.getElementById("ipAddressInput")
let searchButtonEl = document.getElementById("searchButton")

let mapEl = document.getElementById("map")

let ipAddressEl = document.getElementById("ipAddress")
let locationEl = document.getElementById("location")
let timezoneEl = document.getElementById("timezone")
let ispEl = document.getElementById("isp")

let url = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_7V3CzjZQOK4Lytv9jUHm8aqz628n2&ipAddress="

function findingLocation(lat, lng){
    var map = L.map('map').setView([lat, lng], 15);

	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: ''
	}).addTo(map);

    var iconOptions = {
        iconUrl: '../images/icon-location.svg',
        iconSize: [30, 40]
    }

    var customIcon = L.icon(iconOptions);

    var markerOptions = {
        title: "MyLocation",
        clickable: true,
        draggable: false,
        icon: customIcon
    }

	var marker = L.marker([lat, lng], markerOptions).addTo(map)

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent('You clicked the map at ' + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);
}

function displayResults(urll){
    fetch(urll)
       .then(response => response.json())
       .then(data => {
            ipAddressEl.textContent = data.ip
            locationEl.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`
            timezoneEl.textContent = `UTC ${data.location.timezone}`
            ispEl.textContent = data.isp

            console.log(data.proxy)

            findingLocation(data.location.lat, data.location.lng)
        })
}

displayResults(url)


searchButtonEl.addEventListener("click", () => {
    let ipAddressUrl = url + ipAddressInputEl.value
    map.remove()
     
    let mapContainer = document.createElement("div")
    mapContainer.classList.add("map-container")
    mapContainer.id = "map"
    document.getElementById("mainContainer").appendChild(mapContainer)

    displayResults(ipAddressUrl)
})