#!/usr/bin/env node
/* eslint quotes: [0], strict: [0] */
"use strict";

var _require = require("zaccaria-cli");

var $d = _require.$d;
var $o = _require.$o;
var $f = _require.$f;
var $s = _require.$s;

var path = require("path");

var getOptions = function (doc) {
    "use strict";
    var o = $d(doc);
    var help = $o("-h", "--help", false, o);
    var file = $o("-f", "--file", null, o);
    var latex = $o("-t", "--latex", false, o);
    return {
        help: help, file: file, latex: latex
    };
};

var main = function () {
    $f.readLocal("docs/usage.md").then(function (it) {
        var _getOptions = getOptions(it);

        var help = _getOptions.help;
        var file = _getOptions.file;
        var latex = _getOptions.latex;

        if (help) {
            console.log(it);
        } else {
            var ext = "pdf";
            if (latex) {
                ext = "tex";
            }

            $s.execAsync("cat " + file + " | sed -e 's/file://g' | pandoc -f org --latex-engine=xelatex --template=" + __dirname + "/beamer-template.tex -t beamer -o " + path.basename(file, ".org") + "." + ext).then(function () {
                console.log("done.");
            });
        }
    });
};

main();
