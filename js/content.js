System.register(["./fmt", "./parser/entry"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var fmt_1, entry_1;
    var settings;
    return {
        setters:[
            function (fmt_1_1) {
                fmt_1 = fmt_1_1;
            },
            function (entry_1_1) {
                entry_1 = entry_1_1;
            }],
        execute: function() {
            settings = {
                language: "German",
                displayAllLanguages: false,
                collapse: {
                    alternativeForms: false,
                    etymology: false,
                    pronunciation: false,
                    homophones: true,
                    rhymes: true,
                    partOfSpeech: false,
                    usageNotes: false,
                    inflection: false,
                    conjugation: false,
                    declension: false,
                    quotations: false,
                    synonyms: false,
                    antonyms: false,
                    coordinateTerms: false,
                    derivedTerms: false,
                    relatedTerms: false,
                    descendants: false,
                    translations: true,
                    anagrams: true,
                    trivia: true,
                    seeAlso: false,
                    references: true,
                    externalLinks: true
                }
            };
            chrome.storage.sync.get(settings, function (items) {
                console.log("got settings from background!", items.displayAllLanguages);
                settings = items;
            });
            chrome.runtime.onConnect.addListener(function (port) {
                var lastWord = undefined;
                document.addEventListener("mouseup", function () {
                    var word = window.getSelection().toString().trim();
                    var repeated = word === lastWord;
                    lastWord = word;
                    if (word && !repeated) {
                        port.postMessage(word);
                    }
                }, false);
                port.onMessage.addListener(function (response) {
                    console.clear();
                    if (response) {
                        console.info("https://en.wiktionary.org/w/index.php?title=" + response.word + "&action=raw");
                        console.info("https://en.wiktionary.org/wiki/" + response.word);
                        var result = entry_1.parseEntry(response.word, response.text);
                        fmt_1.printEntry(settings, result);
                    }
                    else {
                        console.warn("Not found");
                    }
                });
            });
            chrome.storage.onChanged.addListener(function (changes, namespace) {
                if (namespace === "sync") {
                    for (var key in changes) {
                        settings[key] = changes[key].newValue;
                    }
                }
            });
            exports_1("settings", settings);
        }
    }
});
