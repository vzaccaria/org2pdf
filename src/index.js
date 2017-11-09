/* eslint quotes: [0], strict: [0] */
var {
    $d, $o, $f, $s
} = require('zaccaria-cli')

var path = require('path')

var getOptions = doc => {
    "use strict"
    var o = $d(doc)
    var help = $o('-h', '--help', false, o)
    var file = $o('-f', '--file', null, o)
    var latex = $o('-t', '--latex', false, o)
    var beamer = $o('-b', '--beamer', false, o)
    return {
        help, file, latex, beamer
    }
}

var main = () => {
    $f.readLocal('docs/usage.md').then(it => {
        var {
            help, file, latex, beamer
        } = getOptions(it);
        if (help) {
            console.log(it)
        } else {
            var ext = 'pdf'
            if (latex) {
                ext = 'tex';
            }
            let command = ""
            if(!beamer) {
                command = `emacsclient --eval '(progn (find-file \"${path.resolve(file)}\") (org-latex-export-to-pdf))'`
            } else {
                command = `emacsclient --eval '(progn (find-file \"${path.resolve(file)}\") (org-beamer-export-to-pdf))'`
            }
            console.log(command);
            $s.execAsync(command).then(() => {
                console.log("done.");
            });
        }
    })
}


main()
