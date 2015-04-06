/*global ace, LabEG*/

(function () {
    "use strict";

    /**
     * Editor
     */
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/html");

    /**
     * XMLDOCFormatter Initialization
     */
    var xmldocformatter = new LabEG.Lib.XMLDOCFormatter();

    /**
     * Buttons click bind event
     */
    document.getElementById("format").addEventListener("click", function () {

        xmldocformatter.options.charsBetweenTags = JSON.parse(JSON.stringify(document.getElementById("opt-charbeetwtag").value).replace(/\\\\/g, "\\"));
        xmldocformatter.options.charsForTabs = JSON.parse(JSON.stringify(document.getElementById("opt-charforoffset").value).replace(/\\\\/g, "\\"));
        xmldocformatter.options.notPairedTags = document.getElementById("opt-nopairetag").value;

        if (document.getElementById("opt-multiline-atr-yes").checked) {
            xmldocformatter.options.isMultilineAttributes = true;
        } else {
            xmldocformatter.options.isMultilineAttributes = false;
        }

        editor.setValue(xmldocformatter.format(editor.getValue()));
        xmldocformatter.clear();
    });

    /**
     * Styles
     */
    var styles = {
        html: {
            charbeetwtag: "\\r\\n",
            charoffset: "    ",
            multilineatr: false,
            notparetag: "link, meta, input, br"
        },
        advancehtml: {
            charbeetwtag: "\\r\\n\\r\\n",
            charoffset: "    ",
            multilineatr: true,
            notparetag: "link, meta, input, br"
        },
        xml: {
            charbeetwtag: "\\r\\n",
            charoffset: "    ",
            multilineatr: false,
            notparetag: ""
        },
        php: {
            charbeetwtag: "\\r\\n",
            charoffset: "    ",
            multilineatr: false,
            notparetag: ""
        },
        jsp: {
            charbeetwtag: "\\r\\n",
            charoffset: "    ",
            multilineatr: false,
            notparetag: ""
        }
    };


    document.getElementById("opt-style").addEventListener("change", function (event) {

        document.getElementById("opt-charbeetwtag").value = styles[event.srcElement.value].charbeetwtag;
        document.getElementById("opt-charforoffset").value = styles[event.srcElement.value].charoffset;
        document.getElementById("opt-nopairetag").value = styles[event.srcElement.value].notparetag;

        if (styles[event.srcElement.value].multilineatr) {
            document.getElementById("opt-multiline-atr-no").checked = true;
        } else {
            document.getElementById("opt-multiline-atr-yes").checked = true;
        }

    });

    /**
     * Load sample
     */
    if (window.location.search.indexOf("demo=") > -1) {
        var file = window.location.search.match(/demo=([^&]*)/)[1];

        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, true);
        xhr.onreadystatechange = function () {

            if (xhr.readyState !== 4){
                return;
            }

            editor.setValue(xhr.responseText);
        };

        xhr.send();
    }

}());