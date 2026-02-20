(function () {
    const loading = document.getElementById("loading");
    const errorEl = document.getElementById("error");
    const weatherEl = document.getElementById("weather");
    const cityNameEl = document.getElementById("city-name");
    const currentTemp = document.getElementById("current-temp");
    const currentDesc = document.getElementById("current-desc");
    const currentFeels = document.getElementById("current-feels");
    const currentWind = document.getElementById("current-wind");
    const tomorrowBlock = document.getElementById("tomorrow-block");
    const tomorrowTemps = document.getElementById("tomorrow-temps");
    const tomorrowDesc = document.getElementById("tomorrow-desc");
    const forecastList = document.getElementById("forecast-list");
    const searchForm = document.getElementById("search-form");
    const cityInput = document.getElementById("city-input");
    const bgLayer = document.getElementById("bg-layer");

    function getQuery() {
        const params = new URLSearchParams(window.location.search);
        return {
            city: params.get("city") || "",
            lat: params.get("lat") || "",
            lon: params.get("lon") || "",
        };
    }

    function buildApiUrl() {
        const q = getQuery();
        const base = "/api/weather";
        if (q.city) return base + "?city=" + encodeURIComponent(q.city);
        if (q.lat && q.lon) return base + "?lat=" + q.lat + "&lon=" + q.lon;
        return base + "?city=Москва";
    }

    function setWeatherTheme(code) {
        document.body.classList.remove(
            "weather-clear", "weather-clouds", "weather-rain", "weather-drizzle",
            "weather-snow", "weather-fog", "weather-mist", "weather-thunderstorm"
        );
        if (code >= 200 && code < 300) document.body.classList.add("weather-thunderstorm");
        else if (code >= 300 && code < 400) document.body.classList.add("weather-drizzle");
        else if (code >= 500 && code < 600) document.body.classList.add("weather-rain");
        else if (code >= 600 && code < 700) document.body.classList.add("weather-snow");
        else if (code >= 700 && code < 800) document.body.classList.add("weather-fog");
        else if (code === 800) document.body.classList.add("weather-clear");
        else if (code > 800) document.body.classList.add("weather-clouds");
        else document.body.classList.add("weather-clear");
    }

    function clearAnimations() {
        bgLayer.querySelectorAll(".snowflake, .raindrop, .cloud, .creature-bird, .creature-squirrel, .creature-hedgehog").forEach(function (el) {
            el.remove();
        });
    }

    function createBirdSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 40 30");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "30");
        svg.setAttribute("class", "creature-svg");
        var body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("cx", "20");
        body.setAttribute("cy", "18");
        body.setAttribute("rx", "8");
        body.setAttribute("ry", "6");
        body.setAttribute("fill", "#4a5568");
        svg.appendChild(body);
        var head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        head.setAttribute("cx", "20");
        head.setAttribute("cy", "10");
        head.setAttribute("r", "5");
        head.setAttribute("fill", "#4a5568");
        svg.appendChild(head);
        var beak = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        beak.setAttribute("points", "20,10 25,12 20,14");
        beak.setAttribute("fill", "#f59e0b");
        svg.appendChild(beak);
        var wing1 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        wing1.setAttribute("cx", "14");
        wing1.setAttribute("cy", "18");
        wing1.setAttribute("rx", "6");
        wing1.setAttribute("ry", "8");
        wing1.setAttribute("fill", "#718096");
        wing1.setAttribute("class", "wing-left");
        svg.appendChild(wing1);
        var wing2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        wing2.setAttribute("cx", "26");
        wing2.setAttribute("cy", "18");
        wing2.setAttribute("rx", "6");
        wing2.setAttribute("ry", "8");
        wing2.setAttribute("fill", "#718096");
        wing2.setAttribute("class", "wing-right");
        svg.appendChild(wing2);
        var eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye.setAttribute("cx", "22");
        eye.setAttribute("cy", "9");
        eye.setAttribute("r", "1.5");
        eye.setAttribute("fill", "#fff");
        svg.appendChild(eye);
        return svg;
    }

    function createSquirrelSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 50 40");
        svg.setAttribute("width", "50");
        svg.setAttribute("height", "40");
        svg.setAttribute("class", "creature-svg");
        var body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("cx", "25");
        body.setAttribute("cy", "25");
        body.setAttribute("rx", "10");
        body.setAttribute("ry", "8");
        body.setAttribute("fill", "#92400e");
        svg.appendChild(body);
        var head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        head.setAttribute("cx", "25");
        head.setAttribute("cy", "15");
        head.setAttribute("r", "7");
        head.setAttribute("fill", "#92400e");
        svg.appendChild(head);
        var tail = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        tail.setAttribute("cx", "12");
        tail.setAttribute("cy", "22");
        tail.setAttribute("rx", "8");
        tail.setAttribute("ry", "12");
        tail.setAttribute("fill", "#78350f");
        tail.setAttribute("class", "tail");
        svg.appendChild(tail);
        var leg1 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        leg1.setAttribute("cx", "18");
        leg1.setAttribute("cy", "32");
        leg1.setAttribute("rx", "3");
        leg1.setAttribute("ry", "5");
        leg1.setAttribute("fill", "#78350f");
        leg1.setAttribute("class", "leg-left");
        svg.appendChild(leg1);
        var leg2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        leg2.setAttribute("cx", "32");
        leg2.setAttribute("cy", "32");
        leg2.setAttribute("rx", "3");
        leg2.setAttribute("ry", "5");
        leg2.setAttribute("fill", "#78350f");
        leg2.setAttribute("class", "leg-right");
        svg.appendChild(leg2);
        var ear1 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ear1.setAttribute("cx", "20");
        ear1.setAttribute("cy", "10");
        ear1.setAttribute("rx", "2");
        ear1.setAttribute("ry", "4");
        ear1.setAttribute("fill", "#78350f");
        svg.appendChild(ear1);
        var ear2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ear2.setAttribute("cx", "30");
        ear2.setAttribute("cy", "10");
        ear2.setAttribute("rx", "2");
        ear2.setAttribute("ry", "4");
        ear2.setAttribute("fill", "#78350f");
        svg.appendChild(ear2);
        var eye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye.setAttribute("cx", "27");
        eye.setAttribute("cy", "14");
        eye.setAttribute("r", "1.5");
        eye.setAttribute("fill", "#000");
        svg.appendChild(eye);
        return svg;
    }

    function createHedgehogSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 45 35");
        svg.setAttribute("width", "45");
        svg.setAttribute("height", "35");
        svg.setAttribute("class", "creature-svg");
        var body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        body.setAttribute("cx", "22");
        body.setAttribute("cy", "20");
        body.setAttribute("rx", "12");
        body.setAttribute("ry", "10");
        body.setAttribute("fill", "#6b7280");
        svg.appendChild(body);
        var spikes = document.createElementNS("http://www.w3.org/2000/svg", "g");
        spikes.setAttribute("class", "spikes");
        for (var i = 0; i < 8; i++) {
            var spike = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var x = 10 + i * 3;
            var y1 = 12 + Math.sin(i * 0.5) * 2;
            var y2 = 8 + Math.sin(i * 0.5) * 2;
            spike.setAttribute("x1", x);
            spike.setAttribute("y1", y1);
            spike.setAttribute("x2", x);
            spike.setAttribute("y2", y2);
            spike.setAttribute("stroke", "#4b5563");
            spike.setAttribute("stroke-width", "1.5");
            spike.setAttribute("stroke-linecap", "round");
            spikes.appendChild(spike);
        }
        svg.appendChild(spikes);
        var head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        head.setAttribute("cx", "22");
        head.setAttribute("cy", "25");
        head.setAttribute("rx", "6");
        head.setAttribute("ry", "5");
        head.setAttribute("fill", "#9ca3af");
        svg.appendChild(head);
        var nose = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        nose.setAttribute("cx", "22");
        nose.setAttribute("cy", "27");
        nose.setAttribute("r", "1.5");
        nose.setAttribute("fill", "#000");
        svg.appendChild(nose);
        var eye1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye1.setAttribute("cx", "19");
        eye1.setAttribute("cy", "24");
        eye1.setAttribute("r", "1");
        eye1.setAttribute("fill", "#000");
        svg.appendChild(eye1);
        var eye2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        eye2.setAttribute("cx", "25");
        eye2.setAttribute("cy", "24");
        eye2.setAttribute("r", "1");
        eye2.setAttribute("fill", "#000");
        svg.appendChild(eye2);
        return svg;
    }

    function addCreatures() {
        var b1 = document.createElement("div");
        b1.className = "creature-bird";
        b1.setAttribute("aria-hidden", "true");
        b1.appendChild(createBirdSVG());
        bgLayer.appendChild(b1);
        var b2 = document.createElement("div");
        b2.className = "creature-bird";
        b2.setAttribute("aria-hidden", "true");
        b2.style.top = "18%";
        b2.style.animationDelay = "-6s";
        b2.style.animationDuration = "22s";
        b2.appendChild(createBirdSVG());
        bgLayer.appendChild(b2);
        var b3 = document.createElement("div");
        b3.className = "creature-bird";
        b3.setAttribute("aria-hidden", "true");
        b3.style.top = "8%";
        b3.style.animationDelay = "-12s";
        b3.style.animationDuration = "20s";
        b3.appendChild(createBirdSVG());
        bgLayer.appendChild(b3);
        var s1 = document.createElement("div");
        s1.className = "creature-squirrel";
        s1.setAttribute("aria-hidden", "true");
        s1.appendChild(createSquirrelSVG());
        bgLayer.appendChild(s1);
        var s2 = document.createElement("div");
        s2.className = "creature-squirrel";
        s2.setAttribute("aria-hidden", "true");
        s2.style.bottom = "18%";
        s2.style.animationDelay = "-10s";
        s2.style.animationDuration = "28s";
        s2.appendChild(createSquirrelSVG());
        bgLayer.appendChild(s2);
        var h1 = document.createElement("div");
        h1.className = "creature-hedgehog";
        h1.setAttribute("aria-hidden", "true");
        h1.appendChild(createHedgehogSVG());
        bgLayer.appendChild(h1);
        var h2 = document.createElement("div");
        h2.className = "creature-hedgehog";
        h2.setAttribute("aria-hidden", "true");
        h2.style.bottom = "9%";
        h2.style.right = "12%";
        h2.style.animationDelay = "-2s";
        h2.appendChild(createHedgehogSVG());
        bgLayer.appendChild(h2);
    }

    function addSnow() {
        var count = 55;
        var frag = document.createDocumentFragment();
        for (var i = 0; i < count; i++) {
            var flake = document.createElement("div");
            flake.className = "snowflake";
            flake.textContent = "❄";
            flake.style.left = Math.random() * 100 + "%";
            flake.style.animationDuration = (8 + Math.random() * 8) + "s";
            flake.style.animationDelay = Math.random() * 5 + "s";
            flake.style.fontSize = (0.6 + Math.random() * 0.8) + "rem";
            frag.appendChild(flake);
        }
        bgLayer.appendChild(frag);
    }

    function addRain() {
        var count = 65;
        var frag = document.createDocumentFragment();
        for (var i = 0; i < count; i++) {
            var drop = document.createElement("div");
            drop.className = "raindrop";
            drop.style.left = Math.random() * 100 + "%";
            drop.style.animationDuration = (0.3 + Math.random() * 0.4) + "s";
            drop.style.animationDelay = Math.random() * 0.5 + "s";
            frag.appendChild(drop);
        }
        bgLayer.appendChild(frag);
    }

    function addClouds() {
        var positions = [
            { top: "10%", w: 80, h: 40, d: 25 },
            { top: "25%", w: 100, h: 50, d: 35 },
            { top: "45%", w: 60, h: 30, d: 20 },
        ];
        positions.forEach(function (p, i) {
            var cloud = document.createElement("div");
            cloud.className = "cloud";
            cloud.style.top = p.top;
            cloud.style.left = (i * 30 - 10) + "%";
            cloud.style.width = p.w + "px";
            cloud.style.height = p.h + "px";
            cloud.style.animationDuration = (40 + i * 10) + "s";
            cloud.style.animationDelay = i * 3 + "s";
            cloud.style.borderRadius = "50%";
            cloud.style.boxShadow = "0 0 30px rgba(255,255,255,0.2)";
            bgLayer.appendChild(cloud);
        });
    }

    function runAnimation(code) {
        clearAnimations();
        setWeatherTheme(code);
        if (code >= 600 && code < 700) addSnow();
        else if ((code >= 500 && code < 600) || (code >= 300 && code < 400) || (code >= 200 && code < 300)) addRain();
        else if (code >= 801 || (code >= 700 && code < 800)) addClouds();
        addCreatures();
    }

    function formatDate(ymd) {
        if (!ymd) return "";
        var parts = ymd.split("-");
        if (parts.length !== 3) return ymd;
        return parts[2] + "." + parts[1];
    }

    function showLoading() {
        loading.hidden = false;
        errorEl.hidden = true;
        weatherEl.hidden = true;
    }

    function showError(msg) {
        loading.hidden = true;
        weatherEl.hidden = true;
        errorEl.hidden = false;
        errorEl.textContent = msg;
    }

    function showWeather(data) {
        loading.hidden = true;
        errorEl.hidden = true;
        weatherEl.hidden = false;

        var code = data.weatherCode != null ? data.weatherCode : 800;
        runAnimation(code);

        cityNameEl.textContent = data.city || "—";

        var cur = data.current || {};
        currentTemp.textContent = (cur.temp != null ? Math.round(cur.temp) + "°C" : "—");
        currentDesc.textContent = cur.description || "—";
        currentFeels.textContent = "Ощущается: " + (cur.feels_like != null ? Math.round(cur.feels_like) + "°C" : "—");
        currentWind.textContent = "Ветер: " + (cur.wind_speed != null ? cur.wind_speed + " м/с" : "—");

        var tom = data.tomorrow;
        if (tom && (tom.temp_min != null || tom.temp_max != null)) {
            tomorrowBlock.hidden = false;
            tomorrowTemps.textContent = Math.round(tom.temp_min) + " / " + Math.round(tom.temp_max) + "°C";
            tomorrowDesc.textContent = tom.description || "—";
        } else {
            tomorrowBlock.hidden = true;
        }

        var list = data.forecast || [];
        forecastList.innerHTML = "";
        list.forEach(function (day) {
            var item = document.createElement("div");
            item.className = "forecast-item";
            item.innerHTML =
                "<span class=\"forecast-date\">" + formatDate(day.date) + "</span>" +
                "<span class=\"forecast-temps\">" + (day.temp_min != null && day.temp_max != null ? Math.round(day.temp_min) + " / " + Math.round(day.temp_max) + "°C" : "—") + "</span>" +
                "<span class=\"forecast-desc\">" + (day.description || "—") + "</span>";
            forecastList.appendChild(item);
        });

        var q = getQuery();
        if (q.city) cityInput.value = q.city;
    }

    function load() {
        showLoading();
        fetch(buildApiUrl())
            .then(function (r) {
                return r.text().then(function (text) {
                    if (!r.ok) {
                        if (text && text.trim().indexOf("<") === 0) {
                            throw new Error("Сервер погоды недоступен. Проверьте контейнер api (docker compose ps).");
                        }
                        throw new Error("Ошибка загрузки: " + r.status);
                    }
                    var data;
                    try {
                        data = JSON.parse(text);
                    } catch (e) {
                        if (text && text.trim().indexOf("<") === 0) {
                            throw new Error("Сервер погоды вернул страницу вместо данных. Запустите: docker compose up -d");
                        }
                        throw new Error("Неверный ответ сервера.");
                    }
                    return data;
                });
            })
            .then(function (data) {
                if (data.error) throw new Error(data.error);
                showWeather(data);
            })
            .catch(function (err) {
                showError(err.message || "Не удалось загрузить погоду.");
            });
    }

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var city = (cityInput.value || "").trim();
        if (!city) return;
        var url = new URL(window.location.href);
        url.searchParams.set("city", city);
        url.searchParams.delete("lat");
        url.searchParams.delete("lon");
        window.location.href = url.toString();
    });

    load();
})();
