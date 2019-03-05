function createOverlays(elements, indexes){
    for (let i of indexes)  // For each element, generate an overlay div, position it, style it and append it to the document
    {
        let e = elements[i];

        // Create the overlay
        let overlay = document.createElement("div");
        overlay.className = "overlay";

        // Set the position of the overlay
        overlay.style.top = $(e).offset().top + "px";
        overlay.style.left = ($(e).offset().left - 10) + "px";
        overlay.style.height = $(e).height() + "px";
        overlay.style.width = $(e).width() + "px";

        // Style the overlay
        overlay.style.display = "block";
        overlay.style.background = "#ff0000";
        overlay.style.position = "absolute";
        overlay.style.zIndex = "2";  // Must be set to 2, this places the overlay above the text

        document.body.appendChild(overlay);

        let disableButton = document.createElement("button"); // Make a button for removing the div
        disableButton.innerText = "Reveal";

        disableButton.className = "disable";
        disableButton.style.position = "relative";

        //Style the button
        disableButton.style.right = "75px";
        disableButton.style.width = "65px";
        disableButton.style.height = "25px";
        disableButton.style.background = "#00ff00";

        disableButton.onclick = function () {
            disableButton.parentElement.style.visibility = "hidden";
        };
        overlay.appendChild(disableButton);
    }
}

function disableBlocking() {
    for (let o of document.getElementsByClassName("overlay"))
        o.style.visibility = "hidden";
}


const keywords = ["winter is coming", "tyrion", "cersei", "daenerys", "game of thrones", "blackwater", "jon", "sansa", "arya", "jaime", "jorah", "theon", "samwell", "sam", "petyr", "littlefinger", "varys", "brienne", "davos", "bran", "bronn", "missandei", "sandor", "hound", "the hound", "clegane", "pycelle", "eddison", "podrick", "payne", "pod", "melisandre", "tormund", "giantsbane", "grey worm", "tywin", "lannister", "margaery", "joffery", "catelyn", "selmy", "robb", "gilly", "hodor", "loras", "shae", "ramsay", "roose", "alliser", "gendry", "qyburn", "daario", "olenna", "tommen", "ygritte", "jaqen", "olly", "meryn trant", "osha", "meera", "lancel", "janos", "wun wun", "maester", "yara", "gregor", "rickon", "mace", "benjen", "bran", "mccormack", "jaime", "tommen", "jagger", "grey", "mordane", "raven", "josephine", "mackenzie", "juraga", "loboda", "andrei", "loras", "rintoul", "septa", "nonso", "varma", "dillane", "meereen", "greatjon", "clegane", "hanmore", "akinnuoye", "tickler", "oznak", "eraz", "rania", "cleftjaw", "targaryen", "sandor", "brynden", "rattray", "greenhands", "stevron", "ygritte", "menzies", "lysa", "belicho", "gerold", "momoa", "lem", "marsay", "elyes", "pryce", "cooper", "alice", "teale", "robb", "richard", "killeen", "finn", "joffrey", "boyd", "william", "theon", "marillion", "hodor", "yuri", "pycelle", "crompton", "tomard", "gibbons", "melessa", "vladimir", "samarra", "coster", "shireen", "prendahl", "grand", "birgisson", "timett", "acharia", "red wedding", "waldau", "ghezn", "arya", "umber", "phil", "williams", "tormund", "melisandre", "graham", "andrew", "nell", "salladhor", "leaf", "furdik", "egen", "yezzan", "irri", "gemma", "watters", "salim", "caddell", "baharov", "arryn", "colen", "obara", "mycah", "matthos", "gatt", "tierney", "nakloz", "gregor", "dornish", "nevin", "doran", "ghost", "webb", "heddle", "oparei", "brenock", "farlen", "sellers", "nathalie", "delaney", "kekilli", "gwendoline", "birgitte", "mackeever", "ellaria", "hjort", "knight", "bradley", "marbrand", "tollett", "hunter", "lollys", "anguy", "mikken", "todder", "lommy", "kinvara", "lepkowski", "kovarro", "johnson", "qaggaz", "kingsguard", "wayment", "chaplin", "powell", "octavia", "simpson", "jhiqui", "karstark", "qyburn", "lowell", "whatton", "jojen", "naufahu", "lyanna", "bianca", "halfhand", "asghar", "mopatis", "spiro", "bukstein", "bracken", "manservant", "hooley", "wright", "kamen", "ullhor", "rennick", "vala", "khalasar", "medger", "mhaegen", "coakley", "enzo", "jodhi", "steelshanks", "mandon", "clive", "waddingham", "kolokolnikov", "pixie", "greenpools", "hewkin", "condron", "sumpter", "ashton", "yoren", "pypar", "soteriou", "kermani", "gelder", "wights", "jeor", "orell", "gorman", "vlahos", "henderson", "caleotte", "richardson", "qotho", "nymeria", "mord", "crook", "wharry", "gerald", "beric", "ania", "hallyne", "daenerys", "aegon", "xaro", "bianco", "maggie", "thorne", "slavko", "arnar", "brea", "mckeown", "tyrell", "dominic", "davos", "mirri", "torrhen", "greizhen", "nair", "harald", "wolkan", "harington", "delia", "sammut", "rhodri", "kraznys", "tarth", "dickon", "gerard", "waynwood", "stannis", "daxos", "sarita", "eldon", "robett", "yohn", "ragnar", "roose", "hilmarsson", "meryn", "kings", "rhaegar", "dondarrion", "tudor", "tywin", "qhono", "msamati", "brynd\u00c3\u00a3", "molloy", "josef", "gallagher", "lannister", "jarrett", "vaughan", "meena", "wilding", "selmy", "facioli", "greyjoy", "karsi", "laing", "jed", "zalla", "ingram", "mckeever", "ghar", "tikaram", "brozho", "pugh", "unella", "ostlere", "bentley", "lena", "michie", "mcmahon", "lynderly", "zouari", "willis", "jon", "vardis", "yarwyck", "viserys", "guymon", "maester", "trystane", "davies", "cersei", "franciosi", "wilko", "martell", "gatiss", "pascal", "laurenti", "styr", "qorro", "drogo", "igg", "sterne", "kristofer", "rickard", "hoster", "stahl", "loraq", "olenna", "appleby", "alexandru", "petyr", "eyre", "aerys", "joyeuse", "nairn", "meera", "henwick", "sibel", "qhorin", "lalor", "antonia", "saleh", "doreah", "alisdair", "dagmer", "russell", "forel", "selyse", "ilyn", "deobia", "rakharo", "mirelle", "scolera", "donachie", "chuku", "dinklage", "payne", "keisha", "alfie", "polliver", "emilia", "anderson", "norvoshi", "smalljon", "bowen", "fawsitt", "moxley", "amrita", "emun", "aemon", "dennis", "carnegie", "rhalko", "julian", "aeron", "hadi", "dixon", "hosking", "damphair", "selena", "sansa", "paenymion", "yara", "woodruff", "haukur", "ornela", "gillen", "ternesio", "daario", "akho", "christie", "balon", "winterfell", "podrick", "edmure", "portan", "malko", "sigur", "doorgasingh", "drogon", "beattie", "byrne", "erenford", "maisie", "ned", "zachary", "rycroft", "fingleton", "elezi", "alliser", "hildebrand", "furdo", "sarine", "khan", "tarly", "baelish", "dotrice", "brienne", "pree", "hayes", "hadley", "brodie", "clansman", "razdal", "wilson", "iona", "eddard", "eline", "frey", "xhoan", "faye", "kerr", "harpy", "grennell", "vale", "giantsbane", "viserion", "rickon", "wun", "littlefinger", "walder", "naharis", "archmaester", "tycho", "bastian", "catelyn", "rodrik", "peric", "rhaella", "sam", "laurence", "kingslayer", "rhaenys", "mance", "oengus", "willa", "samantha", "dyrason", "blackfish", "faulkner", "elisa", "terys", "mero", "myrcella", "martyn", "meereenese", "indira", "dothraki", "waif", "walda", "slynt", "doherty", "euron", "gemita", "gendry", "royce", "benjen", "izembaro", "lasowski", "ghita", "gilly", "skrein", "jorah", "elia", "ivailo", "plester", "rhaegal", "ser", "jamie", "marwyn", "unsullied", "mercieca", "hizdahr", "ramsey", "georgiou", "vansittart", "goldcloak", "eddison", "christopher", "mott", "keenan", "rosenkranz", "barristan", "septon", "piotrowski", "pillai", "cunningham", "hopper", "knite", "barnhill", "nikovich", "pradelska", "nestoris", "rankin", "beckwith", "oberyn", "craster", "bolton", "natalia", "maxwell", "separovic", "othell", "lorren", "sives", "iggo", "trant", "bloodrider", "olyvar", "brynjar", "mossador", "jozinovic", "talisa", "mormont", "davor", "missandei", "rayder", "endrew", "tyene", "mace", "renly", "varys", "samwell", "khal", "dayne", "kaye", "rayann", "sofair", "junade", "aramayo", "magee", "armeca", "bronson", "ballance", "jeffrey", "bella", "anozie", "kane", "alys", "houten", "bermingham", "crossbowmen", "jaqen", "mcelhinney", "hightower", "white", "jafer", "stark", "janos", "mcshane", "pedro", "tena", "claude", "struan", "essie", "wight", "taylor", "bartlett", "liburd", "bronn", "staz", "kerry", "mawle", "waymar", "marsh", "rivers", "aimee", "baratheon", "ramon", "tyrion", "varly", "jonos", "despondent", "kit", "yerolemou", "riddell", "dontos", "moelle", "dormer", "mountain", "rhaego", "sydow", "orri", "callis", "thoros", "rosabell", "tonci", "barrington", "mckee", "verrey", "shae", "wyllis", "jhaqo", "margaery", "luwin", "lemoncloak", "walker", "quaithe", "tommen", "shaggydog", "cognoli", "militant", "kristian", "carice", "madden", "maegyr", "cilenti", "broadbent", "blount", "seaworth", "davis", "silverleaf", "miltos", "cerwyn", "dempsie", "leifsson", "randyll", "annette", "carter", "deserter", "rnsson", "siddig", "griffiths", "olly", "myr", "mcginley", "rob", "tully", "fairley", "dwarf", "lhara", "loane", "horsham", "rykker", "noi", "van", "lancel", "forzho", "harrag", "maz", "syrio", "howland", "zanrush", "illyrio", "dongo", "marei", "ruair\u00c3\u00a3", "dany", "sam", "hand of the king", "hella", "night king", "ros", "hotah", "brandon", "north of the wall", "the lands of always winter", "cave outside wildling camp", "wildling camp", "frostfang mountains", "the three-eyed raven", "outside the three-eyed raven", "fist of the first men", "wildlings march south", "nightswatch march south", "hardhome", "craster's keep", "the haunted forest", "south to the wall", "destroyed cabin", "near nightfort", "the wall", "nightfort", "eastwatch", "top of the wall", "castle black", "outside castle black", "mole's town", "the gift", "the north", "the gift", "bear island", "north to the wall", "deepwood motte", "stannis baratheon's camp", "the wolfswood", "outside winterfell", "winterfell", "winter town", "the dreadfort", "the kingsroad south to king's landing", "moat cailin", "the neck", "the shivering sea", "the vale", "runestone", "the eyrie", "to the eyrie", "eastern road", "to the westerlands", "outside the inn", "to the vale", "coast of the vale", "the iron islands", "pyke", "lordsport", "the sunset sea", "the westerlands", "casterly rock", "outside casterly rock", "oxcross", "lannister camp", "camp of the north", "to king's landing", "the riverlands", "the twins", "away from the twins", "to the twins", "to the eyrie", "lannister camp", "battlefield", "camp of the north", "village", "the kingsroad", "forest", "crossroads inn", "hollow hill", "east to king's landing", "riverrun", "red fork", "to riverrun", "north to the red fork", "to harrenhal", "harrenhal", "outside harrenhal", "south to king's landing", "the narrow sea", "the crownlands", "dragonstone", "castle stokeworth", "blackwater bay", "king's landing", "outside king's landing", "the kingswood", "blackwater rush", "the stormlands", "tarth", "the woods", "storm's end", "the reach", "highgarden", "to horn hill", "horn hill", "oldtown", "dorne", "tower of joy", "the water gardens", "pentos", "pentos to volantis", "braavos", "the summer sea", "volantis", "volantis to valyria", "valyria", "slaver's bay", "the dothraki sea", "dothraki camp", "lhazareen village", "meereen", "outside meereen", "yunkai", "outside yunkai", "astapor", "slaver's bay", "vaes dothrak", "the red waste", "the desert", "qarth", "king's landing", "the wall", "vaes dothrak", "episodes", "winter is coming", "the kingsroad", "lord snow", "cripples, bastards, and broken things", "the wolf and the lion", "a golden crown", "the pointy end", "baelor", "fire and blood", "the north remembers", "the night lands", "what is dead may never die", "garden of bones", "the ghost of harrenhal", "the old gods and the new", "a man without honor", "the prince of winterfell", "valar morghulis", "valar dohaeris", "dark wings, dark words", "walk of punishment", "and now his watch is ended", "kissed by fire", "the climb", "the bear and the maiden fair", "second sons", "the rains of castamere", "mhysa", "two swords", "the lion and the rose", "breaker of chains", "oathkeeper", "first of his name", "the laws of gods and men", "mockingbird", "the mountain and the viper", "the watchers on the wall", "the children", "the wars to come", "the house of black and white", "high sparrow", "sons of the harpy", "kill the boy", "unbowed, unbent, unbroken", "the gift", "hardhome", "the dance of dragons", "mother's mercy", "the red woman", "oathbreaker", "book of the stranger", "the door", "blood of my blood", "the broken man", "no one", "battle of the bastards", "the winds of winter", "dragonstone", "stormborn", "the queen's justice", "the spoils of war", "eastwatch", "beyond the wall", "the dragon and the wolf", "episode #8.1", "episode #8.2", "episode #8.3", "episode #8.4", "episode #8.5", "episode #8.6"];
const kw_regex = new RegExp("\\b(" + keywords.join("|") + ")\\b", "i");
console.log(kw_regex.toString());

$(document).ready(function () {
    // Remove all twitter widget scripts
    $("script[src=\"https://platform.twitter.com/widgets.js\"]").remove();

    // Find keyword matches in text elements and store those elements that match in an array
    let matches = $.map($('p, h1, h2, h3, h4, h5, h6, td, th, li'), function (element) {
        if (kw_regex.test(element.innerText))
            return element;
        return null;
    });

    for (let m of matches){
        console.log(kw_regex.exec(m.innerText)[0]);
    }
    // Send the matches to the back-end server for classification
    if (matches.length > 0){
        $.ajax({
            type: 'POST',
            url: 'https://spoiler.bogpeople.com',
            data: JSON.stringify($.map(matches, function (element) { return element.innerText; })),
            success: function(indexes){
                createOverlays(matches, JSON.parse(indexes));
            },
            error: function () {
                alert('There was an error sending data to the SpoilerAlert server.');
            }
        });
    }
});
