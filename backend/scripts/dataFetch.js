const fs = require("fs");
const fetch = require("cross-fetch");

const getData = async () => {
	const res = await fetch("http://www.SkiReg.com/api/search");
	const json = await res.json();
	// console.log(json);
	const page = await json.MatchingEvents.map((e) => {
		return {
			categoryName: e.EventTypes[0],
			name: e.EventName,
			website: e.EventWebsite,
			state: e.EventState,
			lat: e.Latitude,
			long: e.Longitude,
			distance: e.Distance,
			startsAt: e.EventDate,
			endsAt: e.EventEndDate,
			capacity: Math.floor(Math.random() * 100) + 50,
		};
	});
	return page;
};

(async () => {
	const eventList = await getData();

	fs.writeFile("./events.json", JSON.stringify(eventList), function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});
})();

//drop region, add event website
