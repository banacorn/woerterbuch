System.register(["./fmt", "./template/de-noun", "./template/etyl"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var fmt_1, de_noun_1, etyl_1;
    function sortParams(params, word) {
        var unnamed = [];
        var named = [];
        params.forEach(function (param) {
            var valueFmt = fmt_1.fold([], param.value, word);
            if (param.name === "") {
                unnamed.push(valueFmt);
            }
            else {
                named.push({
                    name: param.name,
                    value: valueFmt
                });
            }
        });
        return {
            named: named,
            unnamed: unnamed
        };
    }
    // https://en.wiktionary.org/wiki/Template:de-noun
    function transclude(word, template) {
        switch (template.name) {
            case "de-noun": return de_noun_1.default(word, template.params);
            case "etyl": return etyl_1.default(word, template.params);
        }
        return undefined;
    }
    return {
        setters:[
            function (fmt_1_1) {
                fmt_1 = fmt_1_1;
            },
            function (de_noun_1_1) {
                de_noun_1 = de_noun_1_1;
            },
            function (etyl_1_1) {
                etyl_1 = etyl_1_1;
            }],
        execute: function() {
            exports_1("transclude", transclude);
            exports_1("sortParams", sortParams);
        }
    }
});