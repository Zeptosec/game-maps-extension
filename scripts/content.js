async function GetAllPlayedMaps() {
	const rs = await fetch('https://l4d2.vercel.app/api/getplayed');
	if (rs.ok) {
		return (await rs.json()).played;
	} else {
		console.log("failed to fetch")
		return null;
	}
}

async function MarkPlayed() {
	const listItems = document.getElementsByClassName('list-item');
	if (listItems.length === 0) {
		console.log('no maps found on page');
		return;
	}
	let playedMaps = [];
	const lastFetch = localStorage.getItem('last_fetch');
	if (!localStorage.getItem('played_map_ids') || !lastFetch || lastFetch + 1000 * 3600 * 20 < new Date().getTime()) {
		playedMaps = await GetAllPlayedMaps();
		if (playedMaps) {
			localStorage.setItem('played_map_ids', JSON.stringify(playedMaps));
			localStorage.setItem('last_fetch', new Date().getTime());
		} else {
			if (localStorage.getItem('played_map_ids')) {
				playedMaps = JSON.parse(localStorage.getItem('played_map_ids'));
			}
		}
	} else {
		playedMaps = JSON.parse(localStorage.getItem('played_map_ids'));
	}
	//replacing color or someting else to incidate its played
	for (let i = 0; i < listItems.length; i++) {
		if (playedMaps.includes(listItems[i].getAttribute('data-id'))) {
			listItems[i].style.backgroundColor = "blue";
		}
	}
	console.log("done");
}

const funtxts = ['Sad 4 Dead 2', "Never 4 Dead 2", "Melsk 4 Dead 2", "Rip 4 Dead 2", "Left 4 Nothing 2", "Nustok 4 Melst 2", "Nenustok 4 Melst 2", "Classic 4 Dead 2", "Ismelstas 4 Ir dead 2", "Kinieciai 4 Wack 2", "Never 4 Kinieciai 2", "Nepavesk 4 Tu 2", "Nustebink 4 Dead 2", "Sluota 4 Dead 2"];
function FunStuff() {
	// last touch up button-strip-button no-style
	const roll = Math.round();
	if (roll > 0.25) return;
	const butns = document.getElementsByClassName('button-strip-button');
	if (butns.length > 0) {
		butns[0].firstElementChild.textContent = funtxts[Math.floor(Math.random() * funtxts.length)];
	}
}
FunStuff();
MarkPlayed();