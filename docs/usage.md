Usage:
    org2pdf -f FILE [ -t ] [ -b ]
    org2pdf ( -h | --help )

Options:
    -t, --latex             generates plain tex
    -h, --help              help for org2pdf
    -f, --file FILE         input file
    -b, --beamer            use beamer templates

Description:
    Without options, this program uses emacs to export FILE to pdf
    by using `org-latex-export-to-pdf`. Option --beamer forces emacs to use
    `org-beamer-export-to-pdf`.

    Options `-t` bypasses pdf generation.
