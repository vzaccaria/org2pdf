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
    var beamer = $o("-b", "--beamer", false, o);
    return {
        help: help, file: file, latex: latex, beamer: beamer
    };
};

var main = function () {
    $f.readLocal("docs/usage.md").then(function (it) {
        var _getOptions = getOptions(it);

        var help = _getOptions.help;
        var file = _getOptions.file;
        var latex = _getOptions.latex;
        var beamer = _getOptions.beamer;

        if (help) {
            console.log(it);
        } else {
            var ext = "pdf";
            if (latex) {
                ext = "tex";
            }
            var command = "";
            if (!beamer) {
                command = "emacsclient --eval '(progn (find-file \"" + path.resolve(file) + "\") (org-latex-export-to-pdf))'";
            } else {
                command = "emacsclient --eval '(progn (find-file \"" + path.resolve(file) + "\") (org-beamer-export-to-pdf))'";
            }
            console.log(command);
            $s.execAsync(command).then(function () {
                console.log("done.");
            });
        }
    });
};

main();
