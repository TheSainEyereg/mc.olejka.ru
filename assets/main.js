const domain = "mc.olejka.ru";

document.querySelector("footer span").textContent = new Date().getFullYear();

const overlay = document.querySelector("#overlay");
fetch(`https://api.mcsrvstat.us/2/${domain}`).then(async res => {
	const info = await res.json();

	if (info.online) {
		overlay.remove();

		document.querySelector("#icon").src = info.icon || "/assets/icons/noicon.png";
		document.querySelector("#motd").innerHTML = info.motd.html;
		document.querySelector("#version").textContent = info.version;

		const connect = document.querySelector("#connect");
		const data = `${domain}:${info.port}`;
		connect.textContent = data;
		connect.onclick = async _ => {
			await navigator.clipboard.writeText(data);

			connect.classList.add("copied");
			connect.innerHTML = "Copied!";

			setTimeout(_ => {
				connect.classList.remove("copied");
				connect.innerHTML = data;
			}, 500)
		};
		
		const count = document.querySelector("#count");
		count.textContent = info.players.online > 0 ? `Online ${info.players.online}/${info.players.max}:` : `No one is online :(`;

		info.players.online && info.players.list.forEach(player => {
			const li = document.createElement("li");
			li.textContent = player;
			document.querySelector("#list").append(li);
		});

	} else {
		overlay.children[0].innerHTML = "Offline<br><span>Can't connect!</span>";
		overlay.classList.remove("loading");
		overlay.classList.add("offline");
	}
})