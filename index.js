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
    return {
        help: help, file: file
    };
};

var main = function () {
    $f.readLocal("docs/usage.md").then(function (it) {
        var _getOptions = getOptions(it);

        var help = _getOptions.help;
        var file = _getOptions.file;

        if (help) {
            console.log(it);
        } else {
            $s.execAsync("pandoc " + file + " --latex-engine=xelatex --template=" + __dirname + "/beamer-template.tex -t beamer -o " + path.basename(file, ".org") + ".pdf").then(function () {
                console.log("done.");
            });
        }
    });
};

main();
