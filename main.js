get.json('https://api.mcsrvstat.us/2/mc.olejka.pw').then((m) => {
    $('#s_name').html(m.motd.html);
    $('#s_players').html(m.players.online+'/'+m.players.max);
    for (let i in m.players.list) {
        $('#p_list').append($('<li></li>').text(m.players.list[i]))
    }
})