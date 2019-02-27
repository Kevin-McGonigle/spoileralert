const keywords = ['winter is coming', 'tyrion', 'cersei', 'daenerys', 'game of thrones', 'blackwater', 'jon', 'sansa', 'arya', 'jaime', 'jorah', 'theon', 'samwell', 'sam', 'petyr ', 'littlefinger', 'varys', 'brienne', 'davos', 'bran', 'bronn', 'missandei', 'sandor', 'hound', 'the hound', 'clegane', 'pycelle', 'eddison', 'podrick', 'payne', 'pod', 'melisandre', 'tormund', 'giantsbane', 'grey worm', 'tywin', 'lannister', 'margaery', 'joffery', 'catelyn', 'selmy', 'robb', 'gilly', 'hodor', 'loras', 'shae', 'ramsay', 'roose', 'alliser', 'gendry', 'qyburn', 'daario', 'olenna', 'tommen', 'ygritte', 'jaqen', 'olly', 'meryn trant', 'osha', 'meera', 'lancel', 'janos', 'wun wun', 'maester', 'yara', 'gregor', 'rickon', 'mace', 'benjen', 'bran', 'mccormack', 'jaime', 'tommen', 'jagger', 'grey', 'mordane', 'raven', 'josephine', 'mackenzie', 'juraga', 'loboda', 'andrei', 'loras', 'rintoul', 'septa', 'nonso', 'varma', 'dillane', 'meereen', 'greatjon', 'clegane', 'hanmore', 'akinnuoye', 'tickler', 'oznak', 'eraz', 'rania', 'cleftjaw', 'targaryen', 'sandor', 'brynden', 'rattray', 'greenhands', 'stevron', 'ygritte', 'menzies', 'lysa', 'belicho', 'gerold', 'momoa', 'marsay', 'elyes', 'pryce', 'cooper', 'alice', 'teale', 'robb', 'richard', 'killeen', 'finn', 'joffrey', 'boyd', 'william', 'theon', 'marillion', 'hodor', 'yuri', 'pycelle', 'crompton', 'tomard', 'gibbons', 'melessa', 'vladimir', 'samarra', 'coster', 'shireen', 'prendahl', 'grand', 'birgisson', 'timett', 'acharia', 'red wedding', 'waldau', 'ghezn', 'arya', 'watch', 'umber', 'phil', 'williams', 'tormund', 'melisandre', 'graham', 'andrew', 'nell', 'salladhor', 'leaf', 'furdik', 'egen', 'yezzan', 'irri', 'gemma', 'watters', 'salim', 'caddell', 'baharov', 'arryn', 'colen', 'obara', 'mycah', 'matthos', 'gatt', 'tierney', 'nakloz', 'gregor', 'dornish', 'nevin', 'doran', 'ghost', 'webb', 'heddle', 'oparei', 'brenock', 'farlen', 'sellers', 'nathalie', 'delaney', 'kekilli', 'gwendoline', 'birgitte', 'mackeever', 'ellaria', 'hjort', 'knight', 'bradley', 'marbrand', 'tollett', 'hunter', 'lollys', 'anguy', 'mikken', 'todder', 'lommy', 'kinvara', 'lepkowski', 'kovarro', 'johnson', 'qaggaz', 'kingsguard', 'wayment', 'chaplin', 'powell', 'octavia', 'simpson', 'jhiqui', 'karstark', 'qyburn', 'lowell', 'whatton', 'jojen', 'naufahu', 'lyanna', 'bianca', 'halfhand', 'asghar', 'mopatis', 'spiro', 'bukstein', 'bracken', 'manservant', 'hooley', 'wright', 'kamen', 'ullhor', 'rennick', 'vala', 'khalasar', 'medger', 'mhaegen', 'coakley', 'enzo', 'jodhi', 'steelshanks', 'mandon', 'clive', 'waddingham', 'kolokolnikov', 'pixie', 'greenpools', 'hewkin', 'condron', 'sumpter', 'ashton', 'yoren', 'pypar', 'soteriou', 'kermani', 'gelder', 'wights', 'jeor', 'orell', 'gorman', 'vlahos', 'henderson', 'caleotte', 'richardson', 'qotho', 'nymeria', 'mord', 'crook', 'wharry', 'gerald', 'beric', 'ania', 'hallyne', 'daenerys', 'aegon', 'xaro', 'bianco', 'maggie', 'thorne', 'slavko', 'arnar', 'brea', 'mckeown', 'tyrell', 'dominic', 'davos', 'mirri', 'torrhen', 'greizhen', 'nair', 'harald', 'wolkan', 'harington', 'delia', 'sammut', 'rhodri', 'kraznys', 'tarth', 'dickon', 'gerard', 'waynwood', 'stannis', 'daxos', 'sarita', 'eldon', 'robett', 'yohn', 'ragnar', 'roose', 'hilmarsson', 'meryn', 'kings', 'rhaegar', 'dondarrion', 'tudor', 'tywin', 'qhono', 'msamati', 'bryndÃ£', 'molloy', 'josef', 'gallagher', 'lannister', 'jarrett', 'vaughan', 'meena', 'wildling', 'selmy', 'facioli', 'greyjoy', 'karsi', 'laing', 'jed', 'zalla', 'ingram', 'mckeever', 'ghar', 'tikaram', 'brozho', 'pugh', 'unella', 'ostlere', 'bentley', 'michie', 'mcmahon', 'lynderly', 'zouari', 'willis', 'jon', 'vardis', 'yarwyck', 'viserys', 'guymon', 'maester', 'trystane', 'davies', 'cersei', 'franciosi', 'wilko', 'martell', 'gatiss', 'pascal', 'laurenti', 'styr', 'qorro', 'drogo', 'igg', 'sterne', 'kristofer', 'rickard', 'hoster', 'stahl', 'loraq', 'olenna', 'appleby', 'alexandru', 'petyr', 'eyre', 'aerys', 'joyeuse', 'nairn', 'meera', 'henwick', 'sibel', 'qhorin', 'lalor', 'antonia', 'saleh', 'doreah', 'alisdair', 'dagmer', 'russell', 'forel', 'selyse', 'ilyn', 'deobia', 'rakharo', 'mirelle', 'scolera', 'donachie', 'chuku', 'dinklage', 'payne', 'keisha', 'alfie', 'polliver', 'emilia', 'anderson', 'norvoshi', 'smalljon', 'bowen', 'fawsitt', 'moxley', 'amrita', 'emun', 'aemon', 'dennis', 'carnegie', 'rhalko', 'julian', 'aeron', 'hadi', 'dixon', 'hosking', 'damphair', 'selena', 'sansa', 'paenymion', 'yara', 'woodruff', 'haukur', 'ornela', 'gillen', 'ternesio', 'daario', 'akho', 'christie', 'balon', 'winterfell', 'podrick', 'edmure', 'malko', 'sigur', 'doorgasingh', 'drogon', 'beattie', 'byrne', 'erenford', 'maisie', 'ned', 'zachary', 'rycroft', 'fingleton', 'elezi', 'alliser', 'hildebrand', 'furdo', 'sarine', 'khan', 'tarly', 'baelish', 'dotrice', 'brienne', 'pree', 'hayes', 'hadley', 'brodie', 'clansman', 'razdal', 'wilson', 'eddard', 'eline', 'frey', 'xhoan', 'faye', 'kerr', 'harpy', 'grennell', 'vale', 'giantsbane', 'viserion', 'rickon', 'wun wun', 'littlefinger', 'walder', 'naharis', 'archmaester', 'tycho', 'bastian', 'catelyn', 'rodrik', 'peric', 'rhaella', 'sam', 'laurence', 'kingslayer', 'rhaenys', 'mance', 'oengus', 'willa', 'samantha', 'dyrason', 'blackfish', 'faulkner', 'elisa', 'terys', 'mero', 'myrcella', 'martyn', 'meereenese', 'indira', 'dothraki', 'waif', 'walda', 'slynt', 'doherty', 'euron', 'gemita', 'gendry', 'royce', 'benjen', 'izembaro', 'lasowski', 'ghita', 'gilly', 'skrein', 'jorah', 'elia', 'ivailo', 'plester', 'rhaegal', 'ser', 'jamie', 'marwyn', 'unsullied', 'mercieca', 'hizdahr', 'ramsey', 'georgiou', 'vansittart', 'goldcloak', 'eddison', 'christopher', 'mott', 'keenan', 'rosenkranz', 'barristan', 'septon', 'piotrowski', 'pillai', 'cunningham', 'hopper', 'knite', 'barnhill', 'nikovich', 'pradelska', 'nestoris', 'rankin', 'beckwith', 'oberyn', 'craster', 'bolton', 'natalia', 'maxwell', 'separovic', 'othell', 'lorren', 'sives', 'iggo', 'trant', 'bloodrider', 'olyvar', 'brynjar', 'mossador', 'jozinovic', 'talisa', 'mormont', 'davor', 'missandei', 'rayder', 'endrew', 'tyene', 'mace', 'renly', 'varys', 'samwell', 'khal', 'dayne', 'kaye', 'rayann', 'sofair', 'junade', 'aramayo', 'magee', 'armeca', 'bronson', 'ballance', 'jeffrey', 'bella', 'anozie', 'kane', 'alys', 'houten', 'jaqen', 'mcelhinney', 'hightower', 'white walker', 'white walkers', 'jafer', 'stark', 'janos', 'tena', 'claude', 'struan', 'essie', 'wight', 'bartlett', 'liburd', 'bronn', 'staz', 'kerry', 'mawle', 'waymar', 'aimee', 'baratheon', 'ramon', 'tyrion', 'varly', 'jonos', 'kit', 'yerolemou', 'riddell', 'dontos', 'moelle', 'dormer', 'the mountain', 'rhaego', 'sydow', 'orri', 'callis', 'thoros', 'rosabell', 'tonci', 'barrington', 'mckee', 'verrey', 'shae', 'wyllis', 'jhaqo', 'margaery', 'luwin', 'lemoncloak', 'walker', 'quaithe', 'tommen', 'shaggydog', 'cognoli', 'kristian', 'carice', 'maegyr', 'cilenti', 'broadbent', 'blount', 'seaworth', 'davis', 'silverleaf', 'miltos', 'cerwyn', 'dempsie', 'leifsson', 'randyll', 'rnsson', 'siddig', 'griffiths', 'olly', 'myr', 'mcginley', 'robb', 'tully', 'fairley', 'lhara', 'loane', 'horsham', 'rykker', 'lancel', 'forzho', 'harrag', 'maz', 'syrio', 'howland', 'zanrush', 'illyrio', 'dongo', 'marei', 'ruairÃ£', 'dany', 'hand of the king', 'hella', 'night king', 'hotah', 'brandon', 'north of the wall', 'the lands of always winter', 'cave outside wildling camp', 'wildling camp', 'frostfang mountains', 'the three-eyed raven', 'outside the three-eyed raven', 'fist of the first men', 'wildlings march south', 'nightswatch march south', "craster's keep", 'the haunted forest', 'south to the wall', 'destroyed cabin', 'near nightfort', 'the wall', 'nightfort', 'eastwatch', 'top of the wall', 'castle black', 'outside castle black', "mole's town", 'the gift', 'the north', 'the gift', 'bear island', 'north to the wall', 'deepwood motte', "stannis baratheon's camp", 'the wolfswood', 'outside winterfell', 'winterfell', 'winter town', 'the dreadfort', "the kingsroad south to king's landing", 'moat cailin', 'the neck', 'the shivering sea', 'the vale', 'runestone', 'the eyrie', 'to the eyrie', 'eastern road', 'to the westerlands', 'outside the inn', 'to the vale', 'coast of the vale', 'the iron islands', 'pyke', 'lordsport', 'the sunset sea', 'the westerlands', 'casterly rock', 'outside casterly rock', 'oxcross', 'lannister camp', 'camp of the north', "to king's landing", 'the riverlands', 'the twins', 'away from the twins', 'to the twins', 'to the eyrie', 'lannister camp', 'battlefield', 'camp of the north', 'village', 'the kingsroad', 'forest', 'crossroads inn', 'hollow hill', "east to king's landing", 'riverrun', 'red fork', 'to riverrun', 'north to the red fork', 'to harrenhal', 'harrenhal', 'outside harrenhal', "south to king's landing", 'the narrow sea', 'the crownlands', 'dragonstone', 'castle stokeworth', 'blackwater bay', "king's landing", "outside king's landing", 'the kingswood', 'blackwater rush', 'the stormlands', 'tarth', 'the woods', "storm's end", 'game of thrones', 'the reach', 'highgarden', 'to horn hill', 'horn hill', 'oldtown', 'dorne', 'tower of joy', 'the water gardens', 'pentos', 'pentos to volantis', 'braavos', 'the summer sea', 'volantis', 'volantis to valyria', 'valyria', "slaver's bay", 'the dothraki sea', 'dothraki camp', 'lhazareen village', 'meereen', 'outside meereen', 'yunkai', 'outside yunkai', 'astapor', "slaver's bay", 'vaes dothrak', 'the red waste', 'the desert', 'qarth', "king's landing", 'the wall', 'vaes dothrak', 'episodes', 'winter is coming', 'the kingsroad', 'lord snow', 'cripples, bastards, and broken things', 'the wolf and the lion', 'a golden crown', 'the pointy end', 'baelor', 'fire and blood', 'the north remembers', 'the night lands', 'what is dead may never die', 'garden of bones', 'the ghost of harrenhal', 'the old gods and the new', 'a man without honor', 'the prince of winterfell', 'valar morghulis', 'valar dohaeris', 'dark wings, dark words', 'walk of punishment', 'and now his watch is ended', 'kissed by fire', 'the climb', 'the bear and the maiden fair', 'second sons', 'the rains of castamere', 'mhysa', 'two swords', 'the lion and the rose', 'breaker of chains', 'oathkeeper', 'first of his name', 'the laws of gods and men', 'mockingbird', 'the mountain and the viper', 'the watchers on the wall', 'the children', 'the wars to come', 'the house of black and white', 'high sparrow', 'sons of the harpy', 'kill the boy', 'unbowed, unbent, unbroken', 'the gift', 'hardhome', 'the dance of dragons', "mother's mercy", 'the red woman', 'oathbreaker', 'book of the stranger', 'the door', 'blood of my blood', 'the broken man', 'no one', 'battle of the bastards', 'the winds of winter', 'dragonstone', 'stormborn', "the queen's justice", 'the spoils of war', 'eastwatch', 'beyond the wall', 'the dragon and the wolf', 'episode #8.1', 'episode #8.2', 'episode #8.3', 'episode #8.4', 'episode #8.5', 'episode #8.6']
createOverlays();

/*
let paragraphs = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
let matches = [];
for (let p of paragraphs){
    let text = p.innerText;
    if (text.length > 0 && !matches.includes(text) && containsKeyWord(text, keywords))
        matches.push(p.innerText);
}
if (matches.length > 0){
    let json_matches = JSON.stringify(matches);

    $.ajax({
        type: 'POST',
        url: 'https://18.203.42.106',
        data: json_matches,
        success: function(result){
            alert(result)
        },
        error: function () {
            alert('There was an error sending data to the SpoilerAlert server.');
        }
    });
}
*/

function containsKeyWord(text, keywords){
    let lower_text = text.toLowerCase();
    let prefixes = "\\b"
    let postfixes = "('s)\?\\b"
    for (let kw of keywords){
        let regex = new RegExp(prefixes + kw + postfixes, "i")
        if (regex.test(lower_text))
           return true;
    }
    return false;
}



function createOverlays(){
    //let totalElements = document.getElementsByClassName("twitter-tweet twitter-tweet-rendered");
    let totalElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
    for (i = 0; i < totalElements.length; i++)  // For each element, generate an overlay div, position it, style it and append it to the document
    {   
        if (containsKeyWord(totalElements[i].innerText, keywords))  
        {
            points = findCoordinates(totalElements, i)
            var overlayDiv = document.createElement("Div")      // Create the overlayDiv
            overlayDiv.className = "overlay"


            overlayDiv.style.width = Math.ceil(points[3]) + "px" // set the position of the overlayDiv
            overlayDiv.style.top = Math.ceil(points[0]) + "px"
            overlayDiv.style.left = (Math.ceil(points[1]) - 10) + "px"
            overlayDiv.style.height = Math.ceil(points[2]) + "px"

            overlayDiv.style.border = "2px solid black"     // Style the overlay
            overlayDiv.style.borderRadius = "5px"
            overlayDiv.style.background = "lightgrey" 
            overlayDiv.style.position = "absolute"      // Must be absolute so that the div stays where it should when scrolling
            overlayDiv.style.zIndex = "2"           // Must be set to 2, this places the overlay above the text
            
            document.body.appendChild(overlayDiv)
            turnOneDivOn(overlayDiv)

            var disableButton = document.createElement("button")    // make a button for removing the div
            disableButton.innerHTML = "Reveal"
            disableButton.className = "disable"
            disableButton.style.position = "relative"

            // Style the button
            disableButton.style.right = "75px"
            disableButton.style.width = "65px"
            disableButton.style.height = "25px"
            disableButton.style.background = "salmon"

            disableButton.onclick = function() {removeOverlay(this)}    // When the reveal button is pressed, call the removeOverlay function on the button
            overlayDiv.appendChild(disableButton)
        }
    }
}

/*
function isTweet(div){
    console.log(div.className)
    if (div == null)
        return false;
    else if (div.className == "twitter-tweet twitter-tweet-rendered")
        return [true, div];
    else
        return isTweet(div.parentElement)
}
*/

function getTotalElements(){
    const elements = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "p"]
    var totalElements = []
    for (i = 0; i < elements.length; i++)  // Get all the html tags that can contain text that we can block
    {
        var list = document.getElementsByTagName(elements[i])
        totalElements.push.apply(totalElements, list)
    }
    return totalElements
}

function removeOverlay(button){
    button.parentElement.style.visibility = "hidden"        // Get the parent div of the button and set visibility to hidden
}


function findCoordinates(list, index){
    var rect = list[index].getBoundingClientRect()
    var height = rect.bottom - rect.top
    var width = rect.right - rect.left
    return [rect.top, rect.left, height, width];
}

function turnOneDivOn(div) {
    div.style.display = "block"
}

function disableBlocking(){     // Stops all blocking of text
    var list = document.getElementsByClassName("overlay")   // Every overlay div is given the class "overlay" in the createOverlays function above
    for (i = 0; i < list.length; i++)
    {
        list[i].style.visibility = "hidden"
    }
}

module.exports.containsKeyWord = containsKeyWord;