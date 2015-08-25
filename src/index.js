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
    return {
        help, file, latex
    }
}

var main = () => {
    $f.readLocal('docs/usage.md').then(it => {
        var {
            help, file, latex
        } = getOptions(it);
        if (help) {
            console.log(it)
        } else {
            var ext = 'pdf'
            if (latex) {
                ext = 'tex';
            }
			
            $s.execAsync(`pandoc ${file} --latex-engine=xelatex --template=${__dirname}/beamer-template.tex -t beamer -o ${path.basename(file, '.org')}.${ext}`).then(() => {
                console.log("done.");
            })
        }
    })
}


main()
