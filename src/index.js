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
    return {
        help, file
    }
}

var main = () => {
    $f.readLocal('docs/usage.md').then(it => {
        var {
            help, file
        } = getOptions(it);
        if (help) {
            console.log(it)
        } else {
            $s.execAsync(`pandoc ${file} --latex-engine=xelatex --template=${__dirname}/beamer-template.tex -t beamer -o ${path.basename(file, '.org')}.pdf`).then(() => {
                console.log("done.");
            })
        }
    })
}


main()
