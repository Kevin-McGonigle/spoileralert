function containsKeyWord(text){
    let keywords = ['Russian Doll', 'Netflix'];
    let upper_text = text.toUpperCase();
    for (var kw of keywords){
        if (upper_text.includes(kw.toUpperCase()))
            return true;
    }
    return false;
}

let paragraphs = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
let matches = [];
for (var p of paragraphs){
    let text = p.innerText;
    if (text.length > 0 && !matches.includes(text) && containsKeyWord(text))
        matches.push(p.innerText);
}

console.log(matches);