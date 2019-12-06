"use-strict";

class TableTemplate {

    static fillIn(id, dictionary, columnName){
        var element = document.getElementById(id);
        var html = element.innerHTML;

        if (columnName !== undefined){
            var rowElements = element.getElementsByTagName("TR");
            var firstRowElement = rowElements[0];
            var headers = new Cs142TemplateProcessor(firstRowElement.innerHTML);
            firstRowElement.innerHTML = headers.fillIn(dictionary);
            var columns = firstRowElement.getElementsByTagName("TD");
            var columnSelect;

            for (var i=0; i < columns.length; i++) {
                if (columns[i].innerHTML === columnName) {
                    columnSelect = i;
                }
            }
            if (columnSelect !== undefined) {
                for (i=1; i < rowElements.length; i++) {
                    var dataElements = rowElements[i].getElementsByTagName("TD");
                    var data_element = new Cs142TemplateProcessor(dataElements[columnSelect].innerHTML);
                    dataElements[columnSelect].innerHTML = data_element.fillIn(dictionary);
                }
            }
        } else {
            var temp_proc = new Cs142TemplateProcessor(html);
            element.innerHTML = temp_proc.fillIn(dictionary);
        }

        element.style.visibility="";
    }
}