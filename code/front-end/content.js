function createOverlays(elements, indexes){
    for (let i of indexes)  // For each element, generate an overlay div, position it, style it and append it to the document
    {
        elements[i].setAttribute("aria-hidden", "true")         // Hides text from screen readers, currently untested 
        let e = elements[i];
        let h = $(e).innerHeight();
        let w = $(e).innerWidth();

        // Wrapper
        let wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        $(e).wrap(wrapper);

        // Overlay
        let overlay = document.createElement("div");
        overlay.className = "sa-overlay";
        overlay.style.height = h + "px";
        overlay.style.width = w + "px";
        overlay.style.lineHeight = h - 4 + "px";

        // Logo
        let logo = document.createElement("img");
        logo.className = "sa-logo";
        logo.src = chrome.extension.getURL("images/logo.png");
        logo.alt = "Logo for SpoilerAlert";

        // Reveal
        let reveal = document.createElement("input");
        reveal.className = "sa-reveal";
        reveal.type = "image";
        reveal.src = chrome.extension.getURL("images/reveal-eye.png");
        reveal.alt = "Reveal";
        reveal.onclick = function () {
            $(overlay).hide();
        };

        if (h >= 22 && w >= 40) {
            if (h < 40) {
                if (w >= 100) {
                    overlay.innerHTML = "Spoiler Alert";
                    overlay.style.fontSize = h - 4 + "px";
                }
            }
            else {
                logo.style.left = "5px";
                if (w < 80){
                    logo.style.width = w - 10 + "px";
                    logo.style.display = "block";
                }
                else{
                    reveal.style.right = "5px";
                    logo.style.width = (Math.min.apply(Math, [h, w]) / 2 - 10) + "px";
                    reveal.style.width = (Math.min.apply(Math,[h, w]) / 2 - 10) + "px";
                    if (w >= 180)
                        overlay.innerText = "Spoiler Alert";
                }
            }
        }

        $(e.parentElement).append(overlay);
        $(overlay).append(logo);
        $(overlay).append(reveal);
    }
}

chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "RemoveOverlays" ) {
         disableBlocking();
             }
      }
    );

function disableBlocking() {
    for (let o of document.getElementsByClassName("sa-overlay"))
        $(o).hide();
}


function send(elements){
    $.ajax({
        type: 'POST',
        url: 'https://spoiler.bogpeople.com',
        data: JSON.stringify($.map(elements, function (element) {
            return element.innerText;
        })),
        success: function (indexes) {
            createOverlays(elements, JSON.parse(indexes));
        },
        error: function () {
            alert('There was an error sending data to the SpoilerAlert server.');
        }
    });
}

const keywords = ['winter is coming', 'tyrion', 'cersei', 'daenerys', 'game of thrones', 'blackwater', 'jon', 'sansa', 'arya', 'jaime', 'jorah', 'theon', 'samwell', 'sam', 'petyr', 'littlefinger', 'varys', 'brienne', 'davos', 'bran', 'bronn', 'missandei', 'sandor', 'hound', 'clegane', 'pycelle', 'eddison', 'podrick', 'payne', 'pod', 'melisandre', 'tormund', 'giantsbane', 'tywin', 'lannister', 'margaery', 'joffery', 'catelyn', 'selmy', 'robb', 'gilly', 'hodor', 'loras', 'shae', 'ramsay', 'roose', 'alliser', 'gendry', 'qyburn', 'daario', 'olenna', 'tommen', 'ygritte', 'jaqen', 'olly', 'osha', 'meera', 'lancel', 'janos', 'maester', 'yara', 'gregor', 'rickon', 'mace', 'benjen', 'mccormack', 'jagger', 'grey worm', 'mordane', 'raven', 'josephine', 'mackenzie', 'juraga', 'loboda', 'andrei', 'rintoul', 'septa', 'nonso', 'varma', 'dillane', 'meereen', 'greatjon', 'hanmore', 'akinnuoye', 'tickler', 'oznak', 'eraz', 'rania', 'cleftjaw', 'targaryen', 'brynden', 'rattray', 'greenhands', 'stevron', 'menzies', 'lysa', 'belicho', 'gerold', 'momoa', 'lem', 'marsay', 'elyes', 'pryce', 'cooper', 'alice', 'teale', 'richard', 'killeen', 'finn', 'joffrey', 'boyd', 'william', 'marillion', 'yuri', 'crompton', 'tomard', 'gibbons', 'melessa', 'vladimir', 'samarra', 'coster', 'shireen', 'prendahl', 'grand', 'birgisson', 'timett', 'acharia', 'red wedding', 'waldau', 'ghezn', 'umber', 'phil', 'williams', 'graham', 'andrew', 'nell', 'salladhor', 'leaf', 'furdik', 'egen', 'yezzan', 'irri', 'gemma', 'watters', 'salim', 'caddell', 'baharov', 'arryn', 'colen', 'obara', 'mycah', 'matthos', 'gatt', 'tierney', 'nakloz', 'dornish', 'nevin', 'doran', 'ghost', 'webb', 'heddle', 'oparei', 'brenock', 'farlen', 'sellers', 'nathalie', 'delaney', 'kekilli', 'gwendoline', 'birgitte', 'mackeever', 'ellaria', 'hjort', 'knight', 'bradley', 'marbrand', 'tollett', 'hunter', 'lollys', 'anguy', 'mikken', 'todder', 'lommy', 'kinvara', 'lepkowski', 'kovarro', 'johnson', 'qaggaz', 'kingsguard', 'wayment', 'chaplin', 'powell', 'octavia', 'simpson', 'jhiqui', 'karstark', 'lowell', 'whatton', 'jojen', 'naufahu', 'lyanna', 'bianca', 'halfhand', 'asghar', 'mopatis', 'spiro', 'bukstein', 'bracken', 'manservant', 'hooley', 'wright', 'kamen', 'ullhor', 'rennick', 'vala', 'khalasar', 'medger', 'mhaegen', 'coakley', 'enzo', 'jodhi', 'steelshanks', 'mandon', 'clive', 'waddingham', 'kolokolnikov', 'pixie', 'greenpools', 'hewkin', 'condron', 'sumpter', 'ashton', 'yoren', 'pypar', 'soteriou', 'kermani', 'gelder', 'wights', 'jeor', 'orell', 'gorman', 'vlahos', 'henderson', 'caleotte', 'richardson', 'qotho', 'nymeria', 'mord', 'crook', 'wharry', 'gerald', 'beric', 'ania', 'hallyne', 'aegon', 'xaro', 'bianco', 'maggie', 'thorne', 'slavko', 'arnar', 'brea', 'mckeown', 'tyrell', 'dominic', 'mirri', 'torrhen', 'greizhen', 'nair', 'harald', 'wolkan', 'harington', 'delia', 'sammut', 'rhodri', 'kraznys', 'tarth', 'dickon', 'gerard', 'waynwood', 'stannis', 'daxos', 'sarita', 'eldon', 'robett', 'yohn', 'ragnar', 'hilmarsson', 'meryn', 'kings', 'rhaegar', 'dondarrion', 'tudor', 'qhono', 'msamati', 'bryndÃ£', 'molloy', 'josef', 'gallagher', 'jarrett', 'vaughan', 'meena', 'wilding', 'facioli', 'greyjoy', 'karsi', 'laing', 'jed', 'zalla', 'ingram', 'mckeever', 'ghar', 'tikaram', 'brozho', 'pugh', 'unella', 'ostlere', 'bentley', 'lena', 'michie', 'mcmahon', 'lynderly', 'zouari', 'willis', 'vardis', 'yarwyck', 'viserys', 'guymon', 'trystane', 'davies', 'franciosi', 'wilko', 'martell', 'gatiss', 'pascal', 'laurenti', 'styr', 'qorro', 'drogo', 'igg', 'sterne', 'kristofer', 'rickard', 'hoster', 'stahl', 'loraq', 'appleby', 'alexandru', 'eyre', 'aerys', 'joyeuse', 'nairn', 'henwick', 'sibel', 'qhorin', 'lalor', 'antonia', 'saleh', 'doreah', 'alisdair', 'dagmer', 'russell', 'forel', 'selyse', 'ilyn', 'deobia', 'rakharo', 'mirelle', 'scolera', 'donachie', 'chuku', 'dinklage', 'keisha', 'alfie', 'polliver', 'emilia', 'anderson', 'norvoshi', 'smalljon', 'bowen', 'fawsitt', 'moxley', 'amrita', 'emun', 'aemon', 'dennis', 'carnegie', 'rhalko', 'julian', 'aeron', 'hadi', 'dixon', 'hosking', 'damphair', 'selena', 'paenymion', 'woodruff', 'haukur', 'ornela', 'gillen', 'ternesio', 'akho', 'christie', 'balon', 'winterfell', 'edmure', 'portan', 'malko', 'sigur', 'doorgasingh', 'drogon', 'beattie', 'byrne', 'erenford', 'maisie', 'ned', 'zachary', 'rycroft', 'fingleton', 'elezi', 'hildebrand', 'furdo', 'sarine', 'khan', 'tarly', 'baelish', 'dotrice', 'pree', 'hayes', 'hadley', 'brodie', 'clansman', 'razdal', 'wilson', 'iona', 'eddard', 'eline', 'frey', 'xhoan', 'faye', 'kerr', 'harpy', 'grennell', 'vale', 'viserion', 'wun', 'walder', 'naharis', 'archmaester', 'tycho', 'bastian', 'rodrik', 'peric', 'rhaella', 'laurence', 'kingslayer', 'rhaenys', 'mance', 'oengus', 'willa', 'samantha', 'dyrason', 'blackfish', 'faulkner', 'elisa', 'terys', 'mero', 'myrcella', 'martyn', 'meereenese', 'indira', 'dothraki', 'waif', 'walda', 'slynt', 'doherty', 'euron', 'gemita', 'royce', 'izembaro', 'lasowski', 'ghita', 'skrein', 'elia', 'ivailo', 'plester', 'rhaegal', 'ser', 'jamie', 'marwyn', 'unsullied', 'mercieca', 'hizdahr', 'ramsey', 'georgiou', 'vansittart', 'goldcloak', 'christopher', 'mott', 'keenan', 'rosenkranz', 'barristan', 'septon', 'piotrowski', 'pillai', 'cunningham', 'hopper', 'knite', 'barnhill', 'nikovich', 'pradelska', 'nestoris', 'rankin', 'beckwith', 'oberyn', 'craster', 'bolton', 'natalia', 'maxwell', 'separovic', 'othell', 'lorren', 'sives', 'iggo', 'trant', 'bloodrider', 'olyvar', 'brynjar', 'mossador', 'jozinovic', 'talisa', 'mormont', 'davor', 'rayder', 'endrew', 'tyene', 'renly', 'khal', 'dayne', 'kaye', 'rayann', 'sofair', 'junade', 'aramayo', 'magee', 'armeca', 'bronson', 'ballance', 'jeffrey', 'bella', 'anozie', 'kane', 'alys', 'houten', 'bermingham', 'crossbowmen', 'mcelhinney', 'hightower', 'white', 'jafer', 'stark', 'mcshane', 'pedro', 'tena', 'claude', 'struan', 'essie', 'wight', 'taylor', 'bartlett', 'liburd', 'staz', 'kerry', 'mawle', 'waymar', 'marsh', 'rivers', 'aimee', 'baratheon', 'ramon', 'varly', 'jonos', 'despondent', 'kit', 'yerolemou', 'riddell', 'dontos', 'moelle', 'dormer', 'mountain', 'rhaego', 'sydow', 'orri', 'callis', 'thoros', 'rosabell', 'tonci', 'barrington', 'mckee', 'verrey', 'wyllis', 'jhaqo', 'luwin', 'lemoncloak', 'walker', 'quaithe', 'shaggydog', 'cognoli', 'militant', 'kristian', 'carice', 'madden', 'maegyr', 'cilenti', 'broadbent', 'blount', 'seaworth', 'davis', 'silverleaf', 'miltos', 'cerwyn', 'dempsie', 'leifsson', 'randyll', 'annette', 'carter', 'deserter', 'rnsson', 'siddig', 'griffiths', 'myr', 'mcginley', 'rob', 'tully', 'fairley', 'dwarf', 'lhara', 'loane', 'horsham', 'rykker', 'noi', 'van', 'forzho', 'harrag', 'maz', 'syrio', 'howland', 'zanrush', 'illyrio', 'dongo', 'marei', 'ruairÃ£', 'dany', 'hand of the king', 'hella', 'night king', 'ros', 'hotah', 'brandon', 'lands of always winter', 'wildling camp', 'frostfang mountains', 'outside the three-eyed raven', 'fist of the first men', "night's watch", 'march south', 'hardhome', 'haunted forest', 'destroyed cabin', 'near nightfort', 'the wall', 'nightfort', 'eastwatch', 'castle black', "mole's town", 'the north', 'bear island', 'deepwood motte', 'wolfswood', 'winter town', 'dreadfort', 'moat cailin', 'the neck', 'shivering sea', 'runestone', 'eyrie', 'eastern road', 'outside the inn', 'iron islands', 'pyke', 'lordsport', 'the sunset sea', 'the westerlands', 'casterly rock', 'oxcross', 'riverlands', 'the twins', 'battlefield', 'village', 'kingsroad', 'forest', 'crossroads inn', 'hollow hill', 'red fork', 'riverrun', 'harrenhal', 'narrow sea', 'crownlands', 'dragonstone', 'castle stokeworth', "king's landing", 'kingswood', 'stormlands', 'the woods', "storm's end", 'the reach', 'highgarden', 'horn hill', 'oldtown', 'dorne', 'tower of joy', 'the water gardens', 'pentos', 'braavos', 'the summer sea', 'volantis', 'valyria', "slaver's bay", 'dothraki camp', 'yunkai', 'astapor', 'vaes dothrak', 'the red waste', 'the desert', 'qarth', 'episodes', 'lord snow', 'cripples, bastards, and broken things', 'the wolf and the lion', 'a golden crown', 'the pointy end', 'baelor', 'fire and blood', 'the night lands', 'what is dead may never die', 'garden of bones', 'the old gods and the new', 'a man without honor', 'valar morghulis', 'valar dohaeris', 'dark wings, dark words', 'walk of punishment', 'and now his watch is ended', 'kissed by fire', 'the climb', 'the bear and the maiden fair', 'second sons', 'the rains of castamere', 'mhysa', 'two swords', 'the lion and the rose', 'breaker of chains', 'oathkeeper', 'first of his name', 'the laws of gods and men', 'mockingbird', 'the children', 'the wars to come', 'high sparrow', 'kill the boy', 'unbowed, unbent, unbroken', 'the gift', 'the dance of dragons', "mother's mercy", 'the red woman', 'oathbreaker', 'book of the stranger', 'the door', 'blood of my blood', 'the broken man', 'no one', 'battle of the bastards', 'the winds of winter', 'stormborn', "the queen's justice", 'the spoils of war', 'the dragon and the wolf', 'episode #8.1', 'episode #8.2', 'episode #8.3', 'episode #8.4', 'episode #8.5', 'episode #8.6', 'spider'];
const kw_regex = new RegExp("\\b(" + keywords.join("|") + ")\\b", "i");


$(document).ready(function () {
    let stylesheet = document.createElement("link");
    stylesheet.href = chrome.extension.getURL("sa_styles.css");
    stylesheet.rel = "stylesheet";
    stylesheet.type = "text/css";
    $(document.head).append(stylesheet);

    // Find keyword matches in text elements and store those elements that match in an array
    let matches = $.map($('p, h1, h2, h3, h4, h5, h6, td, th, li'), function (element) {
        //if (kw_regex.test(element.innerText))
            return element;
        //  return null;
    });

    send(matches)
});
