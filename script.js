// Function to fetch weather data from OpenWeather API
async function getWeather(event) {
    // Trigger only when a user presses enter key
    if (event.key === "Enter") {
        const city = document.getElementById("city").value;
        const apiKey = "e37159cbbe62c9124caae3cc3c1ca29d"; // Replace with your OpenWeather API Key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Check if city is found
            if (data.cod === 200) {
                // Extracting necessary data from the API response
                const temp = data.main.temp;
                const condition = data.weather[0].description;
                const time = getTimeInIndia(); // Use this function to get time in IST
                const icon = data.weather[0].icon;
                
                // Displaying weather info
                document.getElementById("temperature").textContent = `Temperature: ${temp}°C`;
                document.getElementById("weather-condition").textContent = `Condition: ${condition}`;
                document.getElementById("time").textContent = `Time: ${time}`;

                // Optional: Adding weather icon
                const weatherIcon = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
                document.getElementById("weather-condition").innerHTML += weatherIcon;

                // Change background color based on weather
                updateBackgroundColor(condition);
            } else {
                alert("City not found! Please try again.");
            }
        } catch (error) {
            alert("Error fetching weather data. Please try again.");
        }
    }
}

// Function to update background color based on weather condition
function updateBackgroundColor(condition) {
    const body = document.body;
    
    // Remove previous weather classes
    body.classList.remove("sunny", "cloudy", "rainy", "clear");

    // Add new class based on condition
    if (condition.includes("clear") || condition.includes("sunny")) {
        body.classList.add("sunny");
    } else if (condition.includes("cloud")) {
        body.classList.add("cloudy");
    } else if (condition.includes("rain")) {
        body.classList.add("rainy");
    } else {
        body.classList.add("clear");
    }
}

// Function to get the current time in India (IST)
function getTimeInIndia() {
    const options = { timeZone: "Asia/Kolkata", hour12: true };
    const indiaTime = new Date().toLocaleTimeString("en-IN", options);
    return indiaTime;
}
