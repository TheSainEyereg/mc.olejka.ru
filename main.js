get.json('https://api.mcsrvstat.us/2/mc.olejka.pw').then((m) => {
    if (m.online) {
        $('#s_name').html(m.motd.html);
        $('#s_name').prepend($('<img></img><br>').attr('src', m.icon));
        $('#s_ip').text(window.location.hostname);
        $('#s_port').text(m.port);
        $('#s_ver').text(m.version);
        $('#s_players').text(m.players.online+'/'+m.players.max);
        for (let i in m.players.list) {
            $('#p_list').append($('<li></li>').text(m.players.list[i]));
        };
    } else {$('#s_name').parent().siblings().remove(); $('#s_name').html('<span style="color: #CC0000; font-size: 50px;">Server offline</span>')}
})