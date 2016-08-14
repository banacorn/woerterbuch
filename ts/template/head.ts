import * as _ from "lodash";
import { AST, Fmt } from "../type";
import { sortParams } from "../template";
import * as F from "../fmt";
import { inspect } from "util";

// const debug = (s: any, color = "cyan") => console.log(inspect(s, false, null)[color]);

// https://en.wiktionary.org/wiki/Template:head
// {{IPA|pronunciation 1|pronunciation 2|pronunciation 3|lang=en}}
function head(word: string, raw: AST.Parameter[]): Fmt {
    const {named, unnamed} = sortParams(raw, word);

    let result = [];

    const headword = _.find(named, ["name", "head"]);

    // displayed headword
    if (headword && F.extractText(headword.value))
        result = F.add(result, `${F.extractText(headword.value)}`, false, true);
    else
        result = F.add(result, `${word}`, false, true);

    // display undealt parameters
    let undealt = `{{head`;
    unnamed.slice(2).forEach((value) => {
        undealt += `|${F.extractText(value)}`;
    });

    const dealtNamed = [
        { name: "head" }
    ];
    _.pullAllBy(named, dealtNamed, "name").forEach((pair: AST.Parameter) => {
        undealt += `|${pair.name} = ${F.extractText(F.fold([], pair.value, word))}`;
    })
    undealt += `}}`;

    return result
}

export default head;
