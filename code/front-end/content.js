function containsKeyWord(text, keywords){
    let noSpoilerPatt = /No Spoilers/i
        let spoilerPatt = /Spoilers/i
        if (noSpoilerPatt.test(text))
            return false
        if (spoilerPatt.test(text))
            return true
    for (let kw of keywords){
        if (kw.test(text)){
            return true;
        }
    }
    return false;
}

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

function getInnerTextArray(elements){
    let text = [];
    for (let e of elements)
        text.push(e.innerText.trim());
    return text;
}

//module.exports = {containsKeyWord};

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "disableBlocking"){
        console.log("Disable blocking method found")
    }
});
*/

chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "RemoveOverlays" ) {
         disableBlocking();
             }
      }
    );

$(document).ready(function () {
    const keywords_regex = [/\bwinter is coming\b/i, /\btyrion\b/i, /\bcersei\b/i, /\bdaenerys\b/i, /\bgame of thrones\b/i, /\bblackwater\b/i, /\bjon\b/i, /\bsansa\b/i, /\barya\b/i, /\bjaime\b/i, /\bjorah\b/i, /\btheon\b/i, /\bsamwell\b/i, /\bsam\b/i, /\bpetyr\b/i, /\blittlefinger\b/i, /\bvarys\b/i, /\bbrienne\b/i, /\bdavos\b/i, /\bbran\b/i, /\bbronn\b/i, /\bmissandei\b/i, /\bsandor\b/i, /\bhound\b/i, /\bthe hound\b/i, /\bclegane\b/i, /\bpycelle\b/i, /\beddison\b/i, /\bpodrick\b/i, /\bpayne\b/i, /\bpod\b/i, /\bmelisandre\b/i, /\btormund\b/i, /\bgiantsbane\b/i, /\bgrey worm\b/i, /\btywin\b/i, /\blannister\b/i, /\bmargaery\b/i, /\bjoffery\b/i, /\bcatelyn\b/i, /\bselmy\b/i, /\brobb\b/i, /\bgilly\b/i, /\bhodor\b/i, /\bloras\b/i, /\bshae\b/i, /\bramsay\b/i, /\broose\b/i, /\balliser\b/i, /\bgendry\b/i, /\bqyburn\b/i, /\bdaario\b/i, /\bolenna\b/i, /\btommen\b/i, /\bygritte\b/i, /\bjaqen\b/i, /\bolly\b/i, /\bmeryn trant\b/i, /\bosha\b/i, /\bmeera\b/i, /\blancel\b/i, /\bjanos\b/i, /\bwun wun\b/i, /\bmaester\b/i, /\byara\b/i, /\bgregor\b/i, /\brickon\b/i, /\bmace\b/i, /\bbenjen\b/i, /\bbran\b/i, /\bmccormack\b/i, /\bjaime\b/i, /\btommen\b/i, /\bjagger\b/i, /\bgrey\b/i, /\bmordane\b/i, /\braven\b/i, /\bjosephine\b/i, /\bmackenzie\b/i, /\bjuraga\b/i, /\bloboda\b/i, /\bandrei\b/i, /\bloras\b/i, /\brintoul\b/i, /\bsepta\b/i, /\bnonso\b/i, /\bvarma\b/i, /\bdillane\b/i, /\bmeereen\b/i, /\bgreatjon\b/i, /\bclegane\b/i, /\bhanmore\b/i, /\bakinnuoye\b/i, /\btickler\b/i, /\boznak\b/i, /\beraz\b/i, /\brania\b/i, /\bcleftjaw\b/i, /\btargaryen\b/i, /\bsandor\b/i, /\bbrynden\b/i, /\brattray\b/i, /\bgreenhands\b/i, /\bstevron\b/i, /\bygritte\b/i, /\bmenzies\b/i, /\blysa\b/i, /\bbelicho\b/i, /\bgerold\b/i, /\bmomoa\b/i, /\blem\b/i, /\bmarsay\b/i, /\belyes\b/i, /\bpryce\b/i, /\bcooper\b/i, /\balice\b/i, /\bteale\b/i, /\brobb\b/i, /\brichard\b/i, /\bkilleen\b/i, /\bfinn\b/i, /\bjoffrey\b/i, /\bboyd\b/i, /\bwilliam\b/i, /\btheon\b/i, /\bmarillion\b/i, /\bhodor\b/i, /\byuri\b/i, /\bpycelle\b/i, /\bcrompton\b/i, /\btomard\b/i, /\bgibbons\b/i, /\bmelessa\b/i, /\bvladimir\b/i, /\bsamarra\b/i, /\bcoster\b/i, /\bshireen\b/i, /\bprendahl\b/i, /\bgrand\b/i, /\bbirgisson\b/i, /\btimett\b/i, /\bacharia\b/i, /\bred wedding\b/i, /\bwaldau\b/i, /\bghezn\b/i, /\barya\b/i, /\bumber\b/i, /\bphil\b/i, /\bwilliams\b/i, /\btormund\b/i, /\bmelisandre\b/i, /\bgraham\b/i, /\bandrew\b/i, /\bnell\b/i, /\bsalladhor\b/i, /\bleaf\b/i, /\bfurdik\b/i, /\begen\b/i, /\byezzan\b/i, /\birri\b/i, /\bgemma\b/i, /\bwatters\b/i, /\bsalim\b/i, /\bcaddell\b/i, /\bbaharov\b/i, /\barryn\b/i, /\bcolen\b/i, /\bobara\b/i, /\bmycah\b/i, /\bmatthos\b/i, /\bgatt\b/i, /\btierney\b/i, /\bnakloz\b/i, /\bgregor\b/i, /\bdornish\b/i, /\bnevin\b/i, /\bdoran\b/i, /\bghost\b/i, /\bwebb\b/i, /\bheddle\b/i, /\boparei\b/i, /\bbrenock\b/i, /\bfarlen\b/i, /\bsellers\b/i, /\bnathalie\b/i, /\bdelaney\b/i, /\bkekilli\b/i, /\bgwendoline\b/i, /\bbirgitte\b/i, /\bmackeever\b/i, /\bellaria\b/i, /\bhjort\b/i, /\bknight\b/i, /\bbradley\b/i, /\bmarbrand\b/i, /\btollett\b/i, /\bhunter\b/i, /\blollys\b/i, /\banguy\b/i, /\bmikken\b/i, /\btodder\b/i, /\blommy\b/i, /\bkinvara\b/i, /\blepkowski\b/i, /\bkovarro\b/i, /\bjohnson\b/i, /\bqaggaz\b/i, /\bkingsguard\b/i, /\bwayment\b/i, /\bchaplin\b/i, /\bpowell\b/i, /\boctavia\b/i, /\bsimpson\b/i, /\bjhiqui\b/i, /\bkarstark\b/i, /\bqyburn\b/i, /\blowell\b/i, /\bwhatton\b/i, /\bjojen\b/i, /\bnaufahu\b/i, /\blyanna\b/i, /\bbianca\b/i, /\bhalfhand\b/i, /\basghar\b/i, /\bmopatis\b/i, /\bspiro\b/i, /\bbukstein\b/i, /\bbracken\b/i, /\bmanservant\b/i, /\bhooley\b/i, /\bwright\b/i, /\bkamen\b/i, /\bullhor\b/i, /\brennick\b/i, /\bvala\b/i, /\bkhalasar\b/i, /\bmedger\b/i, /\bmhaegen\b/i, /\bcoakley\b/i, /\benzo\b/i, /\bjodhi\b/i, /\bsteelshanks\b/i, /\bmandon\b/i, /\bclive\b/i, /\bwaddingham\b/i, /\bkolokolnikov\b/i, /\bpixie\b/i, /\bgreenpools\b/i, /\bhewkin\b/i, /\bcondron\b/i, /\bsumpter\b/i, /\bashton\b/i, /\byoren\b/i, /\bpypar\b/i, /\bsoteriou\b/i, /\bkermani\b/i, /\bgelder\b/i, /\bwights\b/i, /\bjeor\b/i, /\borell\b/i, /\bgorman\b/i, /\bvlahos\b/i, /\bhenderson\b/i, /\bcaleotte\b/i, /\brichardson\b/i, /\bqotho\b/i, /\bnymeria\b/i, /\bmord\b/i, /\bcrook\b/i, /\bwharry\b/i, /\bgerald\b/i, /\bberic\b/i, /\bania\b/i, /\bhallyne\b/i, /\bdaenerys\b/i, /\baegon\b/i, /\bxaro\b/i, /\bbianco\b/i, /\bmaggie\b/i, /\bthorne\b/i, /\bslavko\b/i, /\barnar\b/i, /\bbrea\b/i, /\bmckeown\b/i, /\btyrell\b/i, /\bdominic\b/i, /\bdavos\b/i, /\bmirri\b/i, /\btorrhen\b/i, /\bgreizhen\b/i, /\bnair\b/i, /\bharald\b/i, /\bwolkan\b/i, /\bharington\b/i, /\bdelia\b/i, /\bsammut\b/i, /\brhodri\b/i, /\bkraznys\b/i, /\btarth\b/i, /\bdickon\b/i, /\bgerard\b/i, /\bwaynwood\b/i, /\bstannis\b/i, /\bdaxos\b/i, /\bsarita\b/i, /\beldon\b/i, /\brobett\b/i, /\byohn\b/i, /\bragnar\b/i, /\broose\b/i, /\bhilmarsson\b/i, /\bmeryn\b/i, /\bkings\b/i, /\brhaegar\b/i, /\bdondarrion\b/i, /\btudor\b/i, /\btywin\b/i, /\bqhono\b/i, /\bmsamati\b/i, /\bbrynd\u00c3\u00a3\b/i, /\bmolloy\b/i, /\bjosef\b/i, /\bgallagher\b/i, /\blannister\b/i, /\bjarrett\b/i, /\bvaughan\b/i, /\bmeena\b/i, /\bwilding\b/i, /\bselmy\b/i, /\bfacioli\b/i, /\bgreyjoy\b/i, /\bkarsi\b/i, /\blaing\b/i, /\bjed\b/i, /\bzalla\b/i, /\bingram\b/i, /\bmckeever\b/i, /\bghar\b/i, /\btikaram\b/i, /\bbrozho\b/i, /\bpugh\b/i, /\bunella\b/i, /\bostlere\b/i, /\bbentley\b/i, /\blena\b/i, /\bmichie\b/i, /\bmcmahon\b/i, /\blynderly\b/i, /\bzouari\b/i, /\bwillis\b/i, /\bjon\b/i, /\bvardis\b/i, /\byarwyck\b/i, /\bviserys\b/i, /\bguymon\b/i, /\bmaester\b/i, /\btrystane\b/i, /\bdavies\b/i, /\bcersei\b/i, /\bfranciosi\b/i, /\bwilko\b/i, /\bmartell\b/i, /\bgatiss\b/i, /\bpascal\b/i, /\blaurenti\b/i, /\bstyr\b/i, /\bqorro\b/i, /\bdrogo\b/i, /\bigg\b/i, /\bsterne\b/i, /\bkristofer\b/i, /\brickard\b/i, /\bhoster\b/i, /\bstahl\b/i, /\bloraq\b/i, /\bolenna\b/i, /\bappleby\b/i, /\balexandru\b/i, /\bpetyr\b/i, /\beyre\b/i, /\baerys\b/i, /\bjoyeuse\b/i, /\bnairn\b/i, /\bmeera\b/i, /\bhenwick\b/i, /\bsibel\b/i, /\bqhorin\b/i, /\blalor\b/i, /\bantonia\b/i, /\bsaleh\b/i, /\bdoreah\b/i, /\balisdair\b/i, /\bdagmer\b/i, /\brussell\b/i, /\bforel\b/i, /\bselyse\b/i, /\bilyn\b/i, /\bdeobia\b/i, /\brakharo\b/i, /\bmirelle\b/i, /\bscolera\b/i, /\bdonachie\b/i, /\bchuku\b/i, /\bdinklage\b/i, /\bpayne\b/i, /\bkeisha\b/i, /\balfie\b/i, /\bpolliver\b/i, /\bemilia\b/i, /\banderson\b/i, /\bnorvoshi\b/i, /\bsmalljon\b/i, /\bbowen\b/i, /\bfawsitt\b/i, /\bmoxley\b/i, /\bamrita\b/i, /\bemun\b/i, /\baemon\b/i, /\bdennis\b/i, /\bcarnegie\b/i, /\brhalko\b/i, /\bjulian\b/i, /\baeron\b/i, /\bhadi\b/i, /\bdixon\b/i, /\bhosking\b/i, /\bdamphair\b/i, /\bselena\b/i, /\bsansa\b/i, /\bpaenymion\b/i, /\byara\b/i, /\bwoodruff\b/i, /\bhaukur\b/i, /\bornela\b/i, /\bgillen\b/i, /\bternesio\b/i, /\bdaario\b/i, /\bakho\b/i, /\bchristie\b/i, /\bbalon\b/i, /\bwinterfell\b/i, /\bpodrick\b/i, /\bedmure\b/i, /\bportan\b/i, /\bmalko\b/i, /\bsigur\b/i, /\bdoorgasingh\b/i, /\bdrogon\b/i, /\bbeattie\b/i, /\bbyrne\b/i, /\berenford\b/i, /\bmaisie\b/i, /\bned\b/i, /\bzachary\b/i, /\brycroft\b/i, /\bfingleton\b/i, /\belezi\b/i, /\balliser\b/i, /\bhildebrand\b/i, /\bfurdo\b/i, /\bsarine\b/i, /\bkhan\b/i, /\btarly\b/i, /\bbaelish\b/i, /\bdotrice\b/i, /\bbrienne\b/i, /\bpree\b/i, /\bhayes\b/i, /\bhadley\b/i, /\bbrodie\b/i, /\bclansman\b/i, /\brazdal\b/i, /\bwilson\b/i, /\biona\b/i, /\beddard\b/i, /\beline\b/i, /\bfrey\b/i, /\bxhoan\b/i, /\bfaye\b/i, /\bkerr\b/i, /\bharpy\b/i, /\bgrennell\b/i, /\bvale\b/i, /\bgiantsbane\b/i, /\bviserion\b/i, /\brickon\b/i, /\bwun\b/i, /\blittlefinger\b/i, /\bwalder\b/i, /\bnaharis\b/i, /\barchmaester\b/i, /\btycho\b/i, /\bbastian\b/i, /\bcatelyn\b/i, /\brodrik\b/i, /\bperic\b/i, /\brhaella\b/i, /\bsam\b/i, /\blaurence\b/i, /\bkingslayer\b/i, /\brhaenys\b/i, /\bmance\b/i, /\boengus\b/i, /\bwilla\b/i, /\bsamantha\b/i, /\bdyrason\b/i, /\bblackfish\b/i, /\bfaulkner\b/i, /\belisa\b/i, /\bterys\b/i, /\bmero\b/i, /\bmyrcella\b/i, /\bmartyn\b/i, /\bmeereenese\b/i, /\bindira\b/i, /\bdothraki\b/i, /\bwaif\b/i, /\bwalda\b/i, /\bslynt\b/i, /\bdoherty\b/i, /\beuron\b/i, /\bgemita\b/i, /\bgendry\b/i, /\broyce\b/i, /\bbenjen\b/i, /\bizembaro\b/i, /\blasowski\b/i, /\bghita\b/i, /\bgilly\b/i, /\bskrein\b/i, /\bjorah\b/i, /\belia\b/i, /\bivailo\b/i, /\bplester\b/i, /\brhaegal\b/i, /\bser\b/i, /\bjamie\b/i, /\bmarwyn\b/i, /\bunsullied\b/i, /\bmercieca\b/i, /\bhizdahr\b/i, /\bramsey\b/i, /\bgeorgiou\b/i, /\bvansittart\b/i, /\bgoldcloak\b/i, /\beddison\b/i, /\bchristopher\b/i, /\bmott\b/i, /\bkeenan\b/i, /\brosenkranz\b/i, /\bbarristan\b/i, /\bsepton\b/i, /\bpiotrowski\b/i, /\bpillai\b/i, /\bcunningham\b/i, /\bhopper\b/i, /\bknite\b/i, /\bbarnhill\b/i, /\bnikovich\b/i, /\bpradelska\b/i, /\bnestoris\b/i, /\brankin\b/i, /\bbeckwith\b/i, /\boberyn\b/i, /\bcraster\b/i, /\bbolton\b/i, /\bnatalia\b/i, /\bmaxwell\b/i, /\bseparovic\b/i, /\bothell\b/i, /\blorren\b/i, /\bsives\b/i, /\biggo\b/i, /\btrant\b/i, /\bbloodrider\b/i, /\bolyvar\b/i, /\bbrynjar\b/i, /\bmossador\b/i, /\bjozinovic\b/i, /\btalisa\b/i, /\bmormont\b/i, /\bdavor\b/i, /\bmissandei\b/i, /\brayder\b/i, /\bendrew\b/i, /\btyene\b/i, /\bmace\b/i, /\brenly\b/i, /\bvarys\b/i, /\bsamwell\b/i, /\bkhal\b/i, /\bdayne\b/i, /\bkaye\b/i, /\brayann\b/i, /\bsofair\b/i, /\bjunade\b/i, /\baramayo\b/i, /\bmagee\b/i, /\barmeca\b/i, /\bbronson\b/i, /\bballance\b/i, /\bjeffrey\b/i, /\bbella\b/i, /\banozie\b/i, /\bkane\b/i, /\balys\b/i, /\bhouten\b/i, /\bbermingham\b/i, /\bcrossbowmen\b/i, /\bjaqen\b/i, /\bmcelhinney\b/i, /\bhightower\b/i, /\bwhite\b/i, /\bjafer\b/i, /\bstark\b/i, /\bjanos\b/i, /\bmcshane\b/i, /\bpedro\b/i, /\btena\b/i, /\bclaude\b/i, /\bstruan\b/i, /\bessie\b/i, /\bwight\b/i, /\btaylor\b/i, /\bbartlett\b/i, /\bliburd\b/i, /\bbronn\b/i, /\bstaz\b/i, /\bkerry\b/i, /\bmawle\b/i, /\bwaymar\b/i, /\bmarsh\b/i, /\brivers\b/i, /\baimee\b/i, /\bbaratheon\b/i, /\bramon\b/i, /\btyrion\b/i, /\bvarly\b/i, /\bjonos\b/i, /\bdespondent\b/i, /\bkit\b/i, /\byerolemou\b/i, /\briddell\b/i, /\bdontos\b/i, /\bmoelle\b/i, /\bdormer\b/i, /\bmountain\b/i, /\brhaego\b/i, /\bsydow\b/i, /\borri\b/i, /\bcallis\b/i, /\bthoros\b/i, /\brosabell\b/i, /\btonci\b/i, /\bbarrington\b/i, /\bmckee\b/i, /\bverrey\b/i, /\bshae\b/i, /\bwyllis\b/i, /\bjhaqo\b/i, /\bmargaery\b/i, /\bluwin\b/i, /\blemoncloak\b/i, /\bwalker\b/i, /\bquaithe\b/i, /\btommen\b/i, /\bshaggydog\b/i, /\bcognoli\b/i, /\bmilitant\b/i, /\bkristian\b/i, /\bcarice\b/i, /\bmadden\b/i, /\bmaegyr\b/i, /\bcilenti\b/i, /\bbroadbent\b/i, /\bblount\b/i, /\bseaworth\b/i, /\bdavis\b/i, /\bsilverleaf\b/i, /\bmiltos\b/i, /\bcerwyn\b/i, /\bdempsie\b/i, /\bleifsson\b/i, /\brandyll\b/i, /\bannette\b/i, /\bcarter\b/i, /\bdeserter\b/i, /\brnsson\b/i, /\bsiddig\b/i, /\bgriffiths\b/i, /\bolly\b/i, /\bmyr\b/i, /\bmcginley\b/i, /\brob\b/i, /\btully\b/i, /\bfairley\b/i, /\bdwarf\b/i, /\blhara\b/i, /\bloane\b/i, /\bhorsham\b/i, /\brykker\b/i, /\bnoi\b/i, /\bvan\b/i, /\blancel\b/i, /\bforzho\b/i, /\bharrag\b/i, /\bmaz\b/i, /\bsyrio\b/i, /\bhowland\b/i, /\bzanrush\b/i, /\billyrio\b/i, /\bdongo\b/i, /\bmarei\b/i, /\bruair\u00c3\u00a3\b/i, /\bdany\b/i, /\bsam\b/i, /\bhand of the king\b/i, /\bhella\b/i, /\bnight king\b/i, /\bros\b/i, /\bhotah\b/i, /\bbrandon\b/i, /\bnorth of the wall\b/i, /\bthe lands of always winter\b/i, /\bcave outside wildling camp\b/i, /\bwildling camp\b/i, /\bfrostfang mountains\b/i, /\bthe three-eyed raven\b/i, /\boutside the three-eyed raven\b/i, /\bfist of the first men\b/i, /\bwildlings march south\b/i, /\bnightswatch march south\b/i, /\bhardhome\b/i, /\bcraster's keep\b/i, /\bthe haunted forest\b/i, /\bsouth to the wall\b/i, /\bdestroyed cabin\b/i, /\bnear nightfort\b/i, /\bthe wall\b/i, /\bnightfort\b/i, /\beastwatch\b/i, /\btop of the wall\b/i, /\bcastle black\b/i, /\boutside castle black\b/i, /\bmole's town\b/i, /\bthe gift\b/i, /\bthe north\b/i, /\bthe gift\b/i, /\bbear island\b/i, /\bnorth to the wall\b/i, /\bdeepwood motte\b/i, /\bstannis baratheon's camp\b/i, /\bthe wolfswood\b/i, /\boutside winterfell\b/i, /\bwinterfell\b/i, /\bwinter town\b/i, /\bthe dreadfort\b/i, /\bthe kingsroad south to king's landing\b/i, /\bmoat cailin\b/i, /\bthe neck\b/i, /\bthe shivering sea\b/i, /\bthe vale\b/i, /\brunestone\b/i, /\bthe eyrie\b/i, /\bto the eyrie\b/i, /\beastern road\b/i, /\bto the westerlands\b/i, /\boutside the inn\b/i, /\bto the vale\b/i, /\bcoast of the vale\b/i, /\bthe iron islands\b/i, /\bpyke\b/i, /\blordsport\b/i, /\bthe sunset sea\b/i, /\bthe westerlands\b/i, /\bcasterly rock\b/i, /\boutside casterly rock\b/i, /\boxcross\b/i, /\blannister camp\b/i, /\bcamp of the north\b/i, /\bto king's landing\b/i, /\bthe riverlands\b/i, /\bthe twins\b/i, /\baway from the twins\b/i, /\bto the twins\b/i, /\bto the eyrie\b/i, /\blannister camp\b/i, /\bbattlefield\b/i, /\bcamp of the north\b/i, /\bvillage\b/i, /\bthe kingsroad\b/i, /\bforest\b/i, /\bcrossroads inn\b/i, /\bhollow hill\b/i, /\beast to king's landing\b/i, /\briverrun\b/i, /\bred fork\b/i, /\bto riverrun\b/i, /\bnorth to the red fork\b/i, /\bto harrenhal\b/i, /\bharrenhal\b/i, /\boutside harrenhal\b/i, /\bsouth to king's landing\b/i, /\bthe narrow sea\b/i, /\bthe crownlands\b/i, /\bdragonstone\b/i, /\bcastle stokeworth\b/i, /\bblackwater bay\b/i, /\bking's landing\b/i, /\boutside king's landing\b/i, /\bthe kingswood\b/i, /\bblackwater rush\b/i, /\bthe stormlands\b/i, /\btarth\b/i, /\bthe woods\b/i, /\bstorm's end\b/i, /\bthe reach\b/i, /\bhighgarden\b/i, /\bto horn hill\b/i, /\bhorn hill\b/i, /\boldtown\b/i, /\bdorne\b/i, /\btower of joy\b/i, /\bthe water gardens\b/i, /\bpentos\b/i, /\bpentos to volantis\b/i, /\bbraavos\b/i, /\bthe summer sea\b/i, /\bvolantis\b/i, /\bvolantis to valyria\b/i, /\bvalyria\b/i, /\bslaver's bay\b/i, /\bthe dothraki sea\b/i, /\bdothraki camp\b/i, /\blhazareen village\b/i, /\bmeereen\b/i, /\boutside meereen\b/i, /\byunkai\b/i, /\boutside yunkai\b/i, /\bastapor\b/i, /\bslaver's bay\b/i, /\bvaes dothrak\b/i, /\bthe red waste\b/i, /\bthe desert\b/i, /\bqarth\b/i, /\bking's landing\b/i, /\bthe wall\b/i, /\bvaes dothrak\b/i, /\bepisodes\b/i, /\bwinter is coming\b/i, /\bthe kingsroad\b/i, /\blord snow\b/i, /\bcripples, bastards, and broken things\b/i, /\bthe wolf and the lion\b/i, /\ba golden crown\b/i, /\bthe pointy end\b/i, /\bbaelor\b/i, /\bfire and blood\b/i, /\bthe north remembers\b/i, /\bthe night lands\b/i, /\bwhat is dead may never die\b/i, /\bgarden of bones\b/i, /\bthe ghost of harrenhal\b/i, /\bthe old gods and the new\b/i, /\ba man without honor\b/i, /\bthe prince of winterfell\b/i, /\bvalar morghulis\b/i, /\bvalar dohaeris\b/i, /\bdark wings, dark words\b/i, /\bwalk of punishment\b/i, /\band now his watch is ended\b/i, /\bkissed by fire\b/i, /\bthe climb\b/i, /\bthe bear and the maiden fair\b/i, /\bsecond sons\b/i, /\bthe rains of castamere\b/i, /\bmhysa\b/i, /\btwo swords\b/i, /\bthe lion and the rose\b/i, /\bbreaker of chains\b/i, /\boathkeeper\b/i, /\bfirst of his name\b/i, /\bthe laws of gods and men\b/i, /\bmockingbird\b/i, /\bthe mountain and the viper\b/i, /\bthe watchers on the wall\b/i, /\bthe children\b/i, /\bthe wars to come\b/i, /\bthe house of black and white\b/i, /\bhigh sparrow\b/i, /\bsons of the harpy\b/i, /\bkill the boy\b/i, /\bunbowed, unbent, unbroken\b/i, /\bthe gift\b/i, /\bhardhome\b/i, /\bthe dance of dragons\b/i, /\bmother's mercy\b/i, /\bthe red woman\b/i, /\boathbreaker\b/i, /\bbook of the stranger\b/i, /\bthe door\b/i, /\bblood of my blood\b/i, /\bthe broken man\b/i, /\bno one\b/i, /\bbattle of the bastards\b/i, /\bthe winds of winter\b/i, /\bdragonstone\b/i, /\bstormborn\b/i, /\bthe queen's justice\b/i, /\bthe spoils of war\b/i, /\beastwatch\b/i, /\bbeyond the wall\b/i, /\bthe dragon and the wolf\b/i, /\bepisode #8.1\b/i, /\bepisode #8.2\b/i, /\bepisode #8.3\b/i, /\bepisode #8.4\b/i, /\bepisode #8.5\b/i, /\bepisode #8.6\b/i];

    let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, td, th, li');
    let matches = [];
    for (let e of elements)
        if (e.innerText.length > 0 && !matches.includes(e.innerText) && containsKeyWord(e.innerText, keywords_regex))
            matches.push(e);

    if (matches.length > 0){
        $.ajax({
            type: 'POST',
            url: 'https://spoiler.bogpeople.com',
            data: JSON.stringify(getInnerTextArray(matches)),
            success: function(indexes){
                createOverlays(matches, JSON.parse(indexes));
            },
            error: function () {
                alert('There was an error sending data to the SpoilerAlert server.');
            }
        });
    }

});


