let dates = {};
function filterBar() {
    let ciudad = document.getElementById("select_district").value;
    const all_key = "Todos los barrios";

    let list = document.getElementById("bar_list")
    list.innerHTML = "";


    let filt_list = list_bars.filter((x) => (x.ciudad === ciudad || ciudad === all_key));

    for (let i = 0; i < filt_list.length; ++i) {

        const b = filt_list[i];
        let new_bar = document.createElement("tr");
        let ref = (b.desc_cliente).replaceAll(" ", "%20");

        let next;

        let j = 0;
        dates[list_bars[i].desc_cliente] = new Date("12/31/9999");

        let today = new Date()
        today.setHours(0,0,0,0);
        while (j < list_bars[i].fecha_prediccion.length && new Date(list_bars[i].fecha_prediccion[j]).getTime() < today.getTime()) ++j;

        if (j === list_bars[i].fecha_prediccion.length) {
            next = "No se tiene constancia";
        }

        else {

            next = list_bars[i].fecha_prediccion[j].substring(0,10);
            dates[list_bars[i].desc_cliente] = new Date(next);
        }

        new_bar.innerHTML = `
            <th scope="row">${i+1}</th>
            <td><a href="barInfo.html?message=${ref}">${b.desc_cliente}</a></td>
            <td>${b.direccion}</td>
            <td>Salvador Solé</td>
            <td>${next}</td>
            <td>${b.ciudad}</td>
        `;

        list.appendChild(new_bar);
    }

}

let sortedAsc = true;
let sortedName = true;
let sortedDist = true;

function sortList(opt) {
    
    if (opt === "date") {

        if (sortedAsc) {
            list_bars.sort((a,b) => {
                if (dates[a.desc_cliente] > dates[b.desc_cliente]) return 1;
                else if (dates[a.desc_cliente] < dates[b.desc_cliente]) return -1;
                else return 0;
            }
            );
        }

        else {
            list_bars.sort((a,b) => {
                if (dates[a.desc_cliente] < dates[b.desc_cliente]) return 1;
                else if (dates[a.desc_cliente] > dates[b.desc_cliente]) return -1;
                else return 0;
            }
            );
        }

        sortedAsc = !sortedAsc;

    }

    else if (opt === "local") {

        if (sortedName) {
            list_bars.sort((a,b) => {
                if (a.desc_cliente < b.desc_cliente) return 1;
                else if (a.desc_cliente > b.desc_cliente) return -1;
                else return 0;
            }
            );
        }

        else {
            list_bars.sort((a,b) => {
                if (a.desc_cliente > b.desc_cliente) return 1;
                else if (a.desc_cliente < b.desc_cliente) return -1;
                else return 0;
            }
            );
        }
        sortedName = !sortedName;
    }

    else if (opt === "district") {

        if (sortedDist) {
            list_bars.sort((a,b) => {
                if (a.ciudad < b.ciudad) return 1;
                else if (a.ciudad > b.ciudad) return -1;
                else return 0;
            }
            );
        }

        else {
            list_bars.sort((a,b) => {
                if (a.ciudad > b.ciudad) return 1;
                else if (a.ciudad < b.ciudad) return -1;
                else return 0;
            }
            );
        }
        sortedDist = !sortedDist;
    }

    filterBar();
}

function SearchBar() {
    let inp = document.getElementById("SearchBar").value;

    window.location.href = "barInfo.html?message=" + encodeURIComponent(inp);
}

document.getElementById("SearchBar").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        SearchBar();
    }
});


window.onload = () => {
    let sl = document.getElementById("Bars");
    let dic = {};

    for (let i = 0; i < list_bars.length; ++i) {
        let new_doc = document.createElement("option");
        new_doc.setAttribute("value", list_bars[i].desc_cliente);
        sl.appendChild(new_doc);

        if (dic[list_bars[i].ciudad] === undefined) dic[list_bars[i].ciudad] = 0;
    }

    const kys = Object.keys(dic);

    for (const dist of kys) {
        let nd = document.createElement("option");
        nd.setAttribute("value", dist);
        nd.innerHTML = dist;
        document.getElementById("select_district").appendChild(nd);
    }
}








document.addEventListener("DOMContentLoaded", function() {
    filterBar();
});

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);

