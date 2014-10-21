function showTree(jsonStr) {
    var a = document.createElement("ol"), e = document.createElement("li"), d = "_" + Math.random().toString(36).substr(2, 9);
    e.innerHTML = "<label for='" + d + "' class='lbl_obj'>&nbsp;</label> <input type='checkbox' checked id='" + d + "' />";
    d = document.createElement("ol");
    e.appendChild(d);
    a.appendChild(e);
    buildTree(jsonStr, 0, d);
    $("#data").html(a)
}
function buildTable(a) {
    var e = document.createElement("table"), d, b;
    if (isArray(a))
        return buildArray(a);
    for (var c in a)
        "object" != typeof a[c] || isArray(a[c]) ? "object" == typeof a[c] && isArray(a[c]) ? (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildArray(a[c]), !1).html() + "</table>") : (d = e.insertRow(-1), b = d.insertCell(-1), b.innerHTML = "<div class='td_head'>" + encodeText(c) + "</div>", d = d.insertCell(-1), d.innerHTML = "<div class='td_row_even'>" + 
        encodeText(a[c]) + "</div>") : (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildTable(a[c]), !1).html() + "</table>");
    return e
}
function buildArray(a) {
    var e = document.createElement("table"), d, b, c = !1, n = !1, l = {}, g = -1, m = 0, k;
    k = "";
    if (0 == a.length)
        return "<div></div>";
    d = e.insertRow(-1);
    for (var f = 0; f < a.length; f++)
        if ("object" != typeof a[f] || isArray(a[f]))
            n || (g += 1, n = !0, b = d.insertCell(g), l.empty = g, b.innerHTML = "<div class='td_head'>&nbsp;</div>");
        else
            for (var h in a[f])
                k = "-" + h, k in l || (c = !0, g += 1, b = d.insertCell(g), l[k] = g, b.innerHTML = "<div class='td_head'>" + encodeText(h) + "</div>");
    c || e.deleteRow(0);
    m = g + 1;
    for (f = 0; f < a.length; f++)
        if (d = e.insertRow(-1), 
        td_class = isEven(f) ? "td_row_even" : "td_row_odd", "object" != typeof a[f] || isArray(a[f]))
            if ("object" == typeof a[f] && isArray(a[f]))
                for (g = l.empty, c = 0; c < m; c++)
                    b = d.insertCell(c), b.className = td_class, k = c == g ? '<table style="width:100%">' + $(buildArray(a[f]), !1).html() + "</table>" : " ", b.innerHTML = "<div class='" + td_class + "'>" + encodeText(k) + "</div>";
            else
                for (g = l.empty, c = 0; c < m; c++)
                    b = d.insertCell(c), k = c == g ? a[f] : " ", b.className = td_class, b.innerHTML = "<div class='" + td_class + "'>" + encodeText(k) + "</div>";
        else {
            for (c = 0; c < m; c++)
                b = 
                d.insertCell(c), b.className = td_class, b.innerHTML = "<div class='" + td_class + "'>&nbsp;</div>";
            for (h in a[f])
                c = a[f], k = "-" + h, g = l[k], b = d.cells[g], b.className = td_class, "object" != typeof c[h] || isArray(c[h]) ? "object" == typeof c[h] && isArray(c[h]) ? b.innerHTML = '<table style="width:100%">' + $(buildArray(c[h]), !1).html() + "</table>" : b.innerHTML = "<div class='" + td_class + "'>" + encodeText(c[h]) + "</div>" : b.innerHTML = '<table style="width:100%">' + $(buildTable(c[h]), !1).html() + "</table>"
        }
    return e
}
function encodeText(a) {
    return $("<div />").text(a).html()
}
function isArray(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
}
function isEven(a) {
    return 0 == a % 2
}
function buildTree(a, e, d) {
    e += 1;
    if ("undefined" === typeof a)
        log("undef!!", e);
    else
        for (var b in a)
            if ("object" == typeof a[b]) {
                var c = addTree(b, d, isArray(a[b]));
                buildTree(a[b], e, c)
            } else
                addLeaf(b, a, d)
}
function addTree(a, e, d) {
    var b = "lbl_obj";
    d && (b = "lbl_array");
    var c = "_" + Math.random().toString(36).substr(2, 9);
    d = document.createElement("li");
    d.innerHTML = "<label for='" + c + "' class='" + b + "'>" + encodeText(a) + "</label> <input type='checkbox' checked id='" + c + "' />";
    a = document.createElement("ol");
    d.appendChild(a);
    null != e && e.appendChild(d);
    return a
}
function addLeaf(a, e, d) {
    var b = "";
    isArray(e) || (b = a + ":");
    b += e[a];
    Math.random().toString(36).substr(2, 9);
    a = document.createElement("li");
    a.className = "file";
    a.innerHTML = "<a>" + encodeText(b) + "</a>";
    d.appendChild(a)
}