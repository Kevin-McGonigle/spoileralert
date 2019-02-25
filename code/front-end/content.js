function containsKeyWord(text, keywords){
    let upper_text = text.toUpperCase();
    for (let kw of keywords){
        if (upper_text.includes(kw.toUpperCase()))
            return true;
    }
    return false;
}

let paragraphs = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
let matches = [];
for (let p of paragraphs){
    let text = p.innerText;
    if (text.length > 0 && !matches.includes(text) && containsKeyWord(text, ['Russian Doll', 'Netflix']))
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