const domain = "mc.olejka.ru";
theme.current = "dark";
ready(_ => {
    const overlay = el("#overlay");
    data.get(`https://api.mcsrvstat.us/2/${domain}`, m => {
        if (m.online) {
            overlay.remove();

            el("#icon").setAttribute("src", m.icon);
            el("#motd").innerHTML = m.motd.html;
            el("#version").innerHTML = m.version;

            const connect =  el("#connect");
            const data = `${domain}:${m.port}`;
            connect.innerHTML = data;
            connect.onclick = _ => {
                const form = document.createElement("input");
                form.setAttribute("type", "text");
                form.id = "copyPlace";
                document.body.append(form);
                form.value = data;
                form.select();
                document.execCommand("copy");
                form.remove();
                connect.classList.add("copied");
                connect.innerHTML = "Copied!";
                setTimeout(_ => {
                    connect.classList.remove("copied");
                    connect.innerHTML = data;
                }, 500)
            };
            
            if (m.players.online>0) {
                el("#count").innerHTML = `Online ${m.players.online}/${m.players.max}:`;
            } else {
                el("#count").innerHTML = `No one is online :(`;
            };
            
            for(let i in m.players.list) {
                const li = document.createElement("li");
                li.innerHTML = m.players.list[i];
                el("#list").append(li);
            };
        } else {
            overlay.children[0].innerHTML = "Offline<br><span>Can't connect!</span>";
            overlay.classList.remove("loading");
            overlay.classList.add("offline");
        }
    }, "status");
})