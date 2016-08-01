var h2regex = /(?:\s\s\-\-\-\-\s\s)?\=\=([^\=]+)\=\=\s/g;
var h3regex = /\=\=\=([^\=]+)\=\=\=\s/g;
var h4regex = /\=\=\=\=([^\=]+)\=\=\=\=\s/g;
function parseSection(header, text) {
    function collectSections(header, text, regexs) {
        if (regexs.length === 0) {
            return {
                header: header,
                body: text,
                subs: []
            };
        }
        else {
            var result = {
                header: header,
                body: text,
                subs: []
            };
            var splittedChunks = text.split(regexs[0]);
            var index = 0;
            for (var _i = 0, splittedChunks_1 = splittedChunks; _i < splittedChunks_1.length; _i++) {
                var chunk = splittedChunks_1[_i];
                if (index === 0) {
                    result.body = chunk;
                }
                if (index % 2 === 1) {
                    result.subs.push(collectSections(chunk, splittedChunks[index + 1], _.tail(regexs)));
                }
                index++;
            }
            return result;
        }
    }
    return collectSections(header, text, [h2regex, h3regex, h4regex]);
}
function split(text, regex) {
    var splitted = text.split(regex);
    var result = {
        paragraph: "",
        sections: []
    };
    var index = 0;
    for (var _i = 0, splitted_1 = splitted; _i < splitted_1.length; _i++) {
        var header = splitted_1[_i];
        if (index === 0) {
            result.paragraph = splitted[0];
        }
        if (index % 2 === 1) {
            result.sections.push({
                header: header,
                body: splitted[index + 1]
            });
        }
        index++;
    }
    return result;
}
function parseEntry(response) {
    return parseSection(response.word, response.text);
}