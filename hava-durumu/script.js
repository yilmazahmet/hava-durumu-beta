window.addEventListener('DOMContentLoaded', (event) => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');

    searchBtn.addEventListener('click', getWeatherData);
    cityInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getWeatherData();
        }
    });
});

function getWeatherData() {
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value;

    fetch(`burayaaldığınızAPIKEYgelecek`)
        .then(response => response.json())
        .then(data => {
            const weatherIcon = document.getElementById('weather-icon');
            weatherIcon.style.backgroundImage = `url('http://openweathermap.org/img/wn/${data.weather[0].icon}.png')`;

            const temperature = document.getElementById('temperature');
            temperature.textContent = `${Math.round(data.main.temp)} °C`;

            const description = document.getElementById('description');
            const turkishDescription = translateWeatherDescription(data.weather[0].description);
            description.textContent = turkishDescription;

            playWeatherAnimation(data.weather[0].main);
        })
        .catch(error => {
            console.log('Hava durumu bilgileri alınırken bir hata oluştu:', error);
        });
}

function translateWeatherDescription(description) {
    const translations = {
        'clear sky': 'Açık Hava',
        'few clouds': 'Az Bulutlu',
        'scattered clouds': 'Parçalı Bulutlu',
        'broken clouds': 'Kısmen Bulutlu',
        'shower rain': 'Sağanak Yağış',
        'light rain': 'Hafif Yağmur',
        'rain': 'Yağmur',
        'thunderstorm': 'Gök Gürültülü Fırtına',
        'snow': 'Kar',
        'mist': 'Sis'
    };

    return translations[description] || description;
}

function playWeatherAnimation(weatherType) {
    const animationContainer = document.getElementById('animation-container');
    animationContainer.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animationContainer.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (weatherType === 'Rain') {
        const drops = [];

        function createDrop() {
            const x = Math.random() * canvas.width;
            const y = 0;
            const length = Math.random() * 20 + 10;
            const speed = Math.random() * 4 + 2;

            drops.push({ x, y, length, speed });
        }

        function drawDrops() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            context.strokeStyle = '#00F';
            context.lineWidth = 2;

            drops.forEach(drop => {
                context.beginPath();
                context.moveTo(drop.x, drop.y);
                context.lineTo(drop.x, drop.y + drop.length);
                context.stroke();
            });
        }

        function updateDrops() {
            drops.forEach(drop => {
                drop.y += drop.speed;

                if (drop.y > canvas.height) {
                    drop.y = 0;
                }
            });
        }

        function animate() {
            requestAnimationFrame(animate);

            createDrop();
            drawDrops();
            updateDrops();
        }

        animate();
    } else if (weatherType === 'Snow') {
        const flakes = [];

        function createFlake() {
            const x = Math.random() * canvas.width;
            const y = 0;
            const size = Math.random() * 5 + 2;
            const speed = Math.random() * 2 + 1;

            flakes.push({ x, y, size, speed });
        }

        function drawFlakes() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#FFF';

            flakes.forEach(flake => {
                context.beginPath();
                context.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                context.fill();
            });
        }

        function updateFlakes() {
            flakes.forEach(flake => {
                flake.y += flake.speed;

                if (flake.y > canvas.height) {
                    flake.y = 0;
                }
            });
        }

        function animate() {
            requestAnimationFrame(animate);

            createFlake();
            drawFlakes();
            updateFlakes();
        }

        animate();
    } else if (weatherType === 'Mist') {
        const particles = [];

        function createParticle() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 5 + 2;
            const speed = Math.random() * 2 + 1;

            particles.push({ x, y, size, speed });
        }

        function drawParticles() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = 'rgba(255, 255, 255, 0.2)';

            particles.forEach(particle => {
                context.beginPath();
                context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                context.fill();
            });
        }

        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.speed;

                if (particle.x > canvas.width) {
                    particle.x = 0;
                }
            });
        }

        function animate() {
            requestAnimationFrame(animate);

            createParticle();
            drawParticles();
            updateParticles();
        }

        animate();
    } else {
        // İstenilen hava durumu animasyonları buraya eklenir.
        // Örneğin, güneşli hava için bir animasyon ekleyebilirsiniz.
    }
}
