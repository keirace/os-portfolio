import { useEffect, useState, useRef } from "react";
import { Navigation } from "lucide-react";
import { WMO_CODES, MOCK_WEATHER_DATA, COORDINATES, weather_apiURL } from "@constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";

const WeatherWidget = ({ style }) => {
	const [loading, setLoading] = useState(true);
	const [weatherData, setWeatherData] = useState(MOCK_WEATHER_DATA);
	const widgetRef = useRef(null);

	const getBackgroundGradient = (code, isNight) => {
		if (isNight) return "bg-gradient-to-b from-gray-900 to-gray-700 text-white";
		if (code === 0) return "bg-gradient-to-b from-blue-600 to-blue-400"; // Sunny
		if (code >= 51) return "bg-gradient-to-b from-gray-500 to-gray-400"; // Rainy
		return "bg-gradient-to-b from-blue-600 to-blue-400"; // Default
	};

	// Get weather data
	useEffect(() => {
		const fetchWeather = async () => {
			const { latitude: lat, longitude: lon } = COORDINATES;
			try {
				const fetchWeather = await fetch(weather_apiURL(lat, lon));
				const data = await fetchWeather.json();
				setWeatherData(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching weather data:", error);
				setLoading(false);
			}
		};
		fetchWeather();
	}, []);

	useGSAP(() => {
		if (!Draggable) return;
		const [draggable] = Draggable.create(widgetRef.current, {
			bounds: "main",
			inertia: true,
			edgeResistance: 0.65,
			type: "x,y",
			zIndexBoost: false,
			cursor: "default",
			liveSnap: {
				points: (endValue) => {
					const step = 150;
					return {
						x: Math.round(endValue.x / step) * step,
						y: Math.round(endValue.y / step) * step,
					};
				},
			},
		});

		return () => {
			draggable.kill();
		};
	}, []);

	const current = weatherData?.current;
	const daily = weatherData?.daily;
	const isNight = current?.is_day === 0;
	const bgClass = getBackgroundGradient(current?.weather_code, isNight);

	const toInt = (celcius) => {
		return Math.round(celcius);
	};

	return (
		<div ref={widgetRef} className={`${bgClass} ${style} text-white font-semibold select-none rounded-3xl w-42 h-42 flex flex-col justify-between p-4 gap-5 shadow-lg`}>
			{loading ? (
				<div className="h-full flex justify-center items-center">
					<p className="text-foreground text-md">Loading...</p>
				</div>
			) : (
				<>
					<div className="flex flex-col justify-start items-start gap-1 leading-4">
						<span className="inline-flex items-center text-md">
							Boston <Navigation fill="white" className="w-3 h-3 ml-1" />
						</span>
						<p className="text-4xl">{toInt(current?.temperature_2m)}°</p>
					</div>
					<div className="flex flex-col text-sm leading-4 gap-1">
						<img src={`https://maps.gstatic.com/weather/v1/${WMO_CODES[current?.weather_code]}${isNight ? "_dark" : ""}.svg`} alt="weather icon" className="w-4 h-4" />
						{WMO_CODES[current?.weather_code] && <p className="capitalize">{WMO_CODES[current?.weather_code].replace(/_/g, " ")}</p>}
						<div className="flex gap-1">
							<p className="">H: {toInt(daily.temperature_2m_max[0])}°</p>
							<p className="">L: {toInt(daily.temperature_2m_min[0])}°</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default WeatherWidget;
