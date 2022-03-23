<style>
    input[type="text"],
    textarea {
        max-width: 100%;
    }
</style>
<script>
var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
function doIt(form){
	form.output.value = eval(form.input.value);
	form.input.focus();
	form.input.select();
}
function sortText(a, b) {
    return ((a.name < b.name) ? -1 : 1)
}
function showProps(form) {
    var objName = form.inspector.value
    var obj = eval(objName)
    var msg1 = "PROPERTIES\n", msg2 = "\nMETHODS\n"
    var delim = "="
    var data = new Array()
    for (var i in obj) {
        status = i
        // work around bug in IE
        switch (i) {
            case "domain" :
                data[data.length] = {name:(objName + "." + i), value:"unknown", type:"unknown"}
                break
            case "parentRule" :
                data[data.length] = {name:(objName + "." + i), value:"unknown", type:"unknown"}
                break
            default :
                data[data.length] = {name:(objName + "." + i), value:obj[i], type:typeof obj[i]}
        }
    }
    data.sort(sortText)
    for (var j=0; j < data.length; j++) {
        if (data[j].type == "function") {
            msg2 += data[j].name + "=function " + data[j].name + "()\n"
        } else {
            msg1 += data[j].name + "=" + data[j].value + " |" + data[j].type +"|\n"
        }
    }
    form.output.value = msg1 + msg2
    if (typeof form.output.scrollTop != "undefined") {
    	form.output.scrollTop = 0;
    }
}
function evalIfReady(form, evt) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	if (evt) {
		var theKey = (evt.which) ? evt.which : evt.keyCode;
		if (theKey == 13) {
			doIt(form);
			return false;
		}
	}
	return true;
}
function showPropsIfReady(form, evt) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	if (evt) {
		var theKey = (evt.which) ? evt.which : evt.keyCode;
		if (theKey == 13) {
			showProps(form);
			return false;
		}
	}
	return true
}
</script>

<form onsubmit="return false" style="line-height: 2.5;">
    <p>Введите выражение для вычисления:<br>
        <input type="text" name="input" size="80" onkeypress="return evalIfReady(this.form, event)">
        <input type="button" value="Вычислить" onclick="doIt(this.form)">
    </p>
    <p>
        Результат:<br>
        <textarea name="output" cols="80" rows="6" wrap="soft"></textarea>
    </p>
    <p>Введите объект для просмотра его свойств:<br>
        <input type="text" name="inspector" size="80" onkeypress="return showPropsIfReady(this.form, event)">
        <input type="button" value="Просмотр свойств" onClick="showProps(this.form)">
    </p>
</form>
