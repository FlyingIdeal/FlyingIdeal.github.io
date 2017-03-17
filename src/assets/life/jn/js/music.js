var note_id = 0;
var pop_up_note_mode = true;

music_player = new Audio();

function music_init()
{
    setTimeout("music_init_async()", 100);
}

function music_init_async()
{
    create_music();
}

// ---------------------------------------------------------------------
// music

var bplay = 0;              
function switchsound()
{
    au = music_player
    ai = objid('sound_image');
    if(au.paused)
    {
        bplay = 1;
        au.play();
        ai.src = "js/music_note_big.png";
        pop_up_note_mode = true;
        popup_note();
        objid("music_txt").innerHTML = "打开";
        objid("music_txt").style.visibility = "visible";
        setTimeout(function(){objid("music_txt").style.visibility="hidden"}, 2500);
    }
    else
    {
        bplay = 0;
        pop_up_note_mode = false;
        au.pause();
        ai.src = "js/music_note_big.png";
        objid("music_txt").innerHTML = "关闭";
        objid("music_txt").style.visibility = "visible";
        setTimeout(function(){objid("music_txt").style.visibility="hidden"}, 2500);
    }
}

function play_music()
{
    if(typeof(music_data) != 'undefined')
    {
        music = music_data.music;

        if(music_data.replace_music != '#replace_music#')
        {
            music = music_data.replace_music;
        }

        music_player.src = music;
        music_player.loop = 'loop';
        music_player.play();
        bplay = 1;
    }
}

function create_music()
{
    play_music();

    sound_div = document.createElement("div");
    sound_div.setAttribute("ID", "cardsound");
    sound_div.style.cssText = "position:fixed;right:20px;bottom:25px; width:45px; height:45px; z-index:50000;visibility:visible;";
    sound_div.onclick = switchsound;
    bg_htm = "<img id='sound_image' style='width:45px; height:45px' src='js/music_note_big.png'>";
    box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:0px;top:-80px'></div>";
    txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-40px;top:30px;width:60px'></div>"
    sound_div.innerHTML = bg_htm + box_htm + txt_htm;
    document.body.appendChild(sound_div);

    setTimeout("popup_note()", 100);
}

function on_pop_note_end(event)
{
    note = event.target;
    
    if(note.parentNode == objid("note_box"))
    {
        objid("note_box").removeChild(note);
    }
}

function popup_note()
{
    box = objid("note_box");
    
    note = document.createElement("span");
    note.style.cssText = "visibility:visible;position:absolute;background-image:url('js/music_note_small.png');width:15px;height:25px";
    note.style.left = Math.random() * 20 + 20;
    note.style.top = "75px";
    this_node = "music_note_" + note_id;
    note.setAttribute("ID", this_node);
    note_id += 1;
    scale = Math.random() * 0.4 + 0.4;
    note.style.webkitTransform = "rotate(" + Math.floor(360 * Math.random()) + "deg) scale(" + scale + "," + scale + ")";
    note.style.webkitTransition = "top 2s ease-in, opacity 2s ease-in, left 2s ease-in";
    note.addEventListener("webkitTransitionEnd", on_pop_note_end);
    box.appendChild(note);

    setTimeout("document.getElementById('" + this_node + "').style.left = '0px';", 100);
    setTimeout("document.getElementById('" + this_node + "').style.top = '0px';", 100);
    setTimeout("document.getElementById('" + this_node + "').style.opacity = '0';", 100);
    
    if(pop_up_note_mode)
    {
        setTimeout("popup_note()", 600);
    }   
}

// ---------------------------------------------------------------------
function objid(id)
{
    return document.getElementById(id);
}


