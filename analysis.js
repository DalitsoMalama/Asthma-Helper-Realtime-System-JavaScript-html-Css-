// analysis.js

// Step 1: Data Structure for Collecting Sensor Data
const sensorData = {
    timestamps: [], // Array to store the timestamps
    temperature: [], // Array to store temperature readings
    humidity: [], // Array to store humidity readings
    dustLevel: [], // Array to store dust level readings
    smokeDensity: [], // Array to store smoke density readings
    heartRate: [], // Array to store heart rate readings
    oxygenLevel: [] // Array to store oxygen level readings
};

// Function to add new data
function addSensorData(timestamp, temperature, humidity, dustLevel, smokeDensity, heartRate, oxygenLevel) {
    sensorData.timestamps.push(timestamp);
    sensorData.temperature.push(temperature);
    sensorData.humidity.push(humidity);
    sensorData.dustLevel.push(dustLevel);
    sensorData.smokeDensity.push(smokeDensity);
    sensorData.heartRate.push(heartRate);
    sensorData.oxygenLevel.push(oxygenLevel);
}
//  Fetching Data from Firebase
const dbRef = firebase.database().ref('/sensors'); // Modify the path as per your database structure

dbRef.on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        addSensorData(data.timestamp, data.temperature, data.humidity, data.dustLevel, data.smokeDensity, data.heartRate, data.oxygenLevel);
    });
    
    // After collecting data, render the graph
    renderSensorDataGraph();
});
// Step 3: Render the Graph
function renderSensorDataGraph() {
    const ctx = document.getElementById('sensorDataChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sensorData.timestamps, // X-axis (time)
            datasets: [
                {
                    label: 'Temperature',
                    data: sensorData.temperature,
                    borderColor: 'cyan',
                    fill: false
                },
                {
                    label: 'Humidity',
                    data: sensorData.humidity,
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Dust Level',
                    data: sensorData.dustLevel,
                    borderColor: 'purple',
                    fill: false
                },
                {
                    label: 'Smoke Density',
                    data: sensorData.smokeDensity,
                    borderColor: 'green',
                    fill: false
                },
                {
                    label: 'Heart Rate',
                    data: sensorData.heartRate,
                    borderColor: 'orange',
                    fill: false
                },
                {
                    label: 'Oxygen Level',
                    data: sensorData.oxygenLevel,
                    borderColor: 'red',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Sensor Data Over Time'
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Sensor Value'
                    }
                }
            }
        }
    });
}
