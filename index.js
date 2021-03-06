var fs = require("fs");

module.exports = function(c) {
    fs.readFile(__dirname + "/json/haiku.json", function(e,file) {
        if (e) console.log("Error: ",e);
        var words = JSON.parse(file),
            lines = ["","",""],
            syllables = 5,
            size = 0,
            type = "";
        // Line 1
        while (syllables > 0) {
            // Start with adjective (max 4 syllables)
            if (syllables === 5) {
                type = "adjective";
                size = RandomInt(1,4);
                lines[0] += HaikuWord(words,type,size);
                syllables -= size;
            }
            // Ensure first line ends with noun
            else if (syllables === 1) {
                type = "animal";
                lines[0] += HaikuWord(words,type,syllables);
                syllables -= 1;
            }
            else {
                type = (Math.random() < 0.5) ? "animal" : "adjective";
                size = (type === "animal") ? syllables : RandomInt(1,syllables - 1);
                lines[0] += HaikuWord(words,type,size);
                syllables -= size;
            }
        }
        // Line 2
        syllables = 7;
        while (syllables > 0) {
            // Start with verb (max 4 syllables)
            if (syllables === 7) {
                type = "verb";
                size = RandomInt(1,4);
                lines[1] += HaikuWord(words,type,size);
                syllables -= size;
            }
            else if (type === "verb") {
                type = "adverb";
                size = RandomInt(1,syllables);
                lines[1] += HaikuWord(words,type,size);
                syllables -= size;
            }
            else if (type === "adverb" && syllables > 2) {
                type = "adverb";
                size = RandomInt(2,syllables - 1);
                lines[1] += "and " + HaikuWord(words,type,size);
                syllables -= (size + 1);
            }
            else if (type === "adverb" && syllables < 3) {
                type = "preposition-place";
                size = syllables;
                lines[1] += HaikuWord(words,type,size);
                syllables -= size;
            }
        }
        // Line 3
        syllables = 5;
        while (syllables > 0) {
            // Start with adjective
            if (syllables === 5) {
                type = "adjective";
                size = RandomInt(1,4);
                lines[2] += HaikuWord(words,type,size);
                syllables -= size;
            }
            else {
                type = "emotion";
                size = syllables;
                lines[2] += HaikuWord(words,type,size);
                syllables -= size;
            }
        }
        for (var i in lines) lines[i] = lines[i].slice(0,1).toUpperCase() + lines[i].slice(1).toLowerCase();
        c(lines.join("\n"));
    });
    function RandomInt(min,max) { return Math.floor(Math.random()*(max-min+1)+min); }
    function HaikuWord(words,type,size) { return words[type][size][Math.floor(Math.random()*words[type][size].length)] + " "; }
}