function cross(task_id) {

    let task = document.getElementById(task_id);

    let cr = task.getAttribute("data-info");
    let inp = task_id.match("[^:]*$");

    if (cr === "not-crossed") {
        task.innerHTML = `<span id="task:${inp}" data-info="crossed"><del>${inp}</del></span>`;
        task.setAttribute("data-info", "crossed");
    }

    else {
        task.innerHTML = `<span id="task:${inp}" data-info="not-crossed">${inp}</span>`;
        task.setAttribute("data-info", "not-crossed");
    }
}

function deleteTask(task) {
    document.getElementById(task).remove();
}

function putTask() {

    let task = document.getElementById("ToDoInput").value;

    if (task.length !== 0) {
        let ap = document.createElement("div");
        ap.setAttribute("class", "d-flex align-items-center border-bottom py-2");
        ap.setAttribute("id", `but:${task}`);

        ap.innerHTML = `
                <input class="form-check-input m-0" type="checkbox" data-info="not-crossed", onclick="cross('cr:${task}')">
                <div class="w-100 ms-3">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <span id="cr:${task}" data-info="not-crossed">${task}</span>
                        <button class="btn btn-sm" onclick="deleteTask('but:${task}')"><i class="fa fa-times"></i></button>
                    </div>
                </div>
        `;
        document.getElementById("ToDoList").appendChild(ap);
        document.getElementById("ToDoInput").value = "";
    }

}


document.getElementById("ToDoInput").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        putTask();
    }
});

function SearchBar() {
    let inp = document.getElementById("SearchBar").value;

    window.location.href = "barInfo.html?message=" + encodeURIComponent(inp);
}

document.getElementById("SearchBar").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        SearchBar();
    }
});

window.onload = function() {
    let url = window.location.href;

    let bar_name = url.match("[^=]*$");
    bar_name = String(bar_name);
    bar_name = bar_name.replaceAll("%20", " ");
    loadPage(bar_name);
    let sl = document.getElementById("Bars");

    for (let i = 0; i < list_bars.length; ++i) {
        let new_doc = document.createElement("option");
        new_doc.setAttribute("value", list_bars[i].desc_cliente);
        sl.appendChild(new_doc);
    }

}


function loadPage(bar_name) {

    let i = 0; 

    while (list_bars[i].desc_cliente !== bar_name) ++i;
    let inf = document.getElementById("InfoBar");
    inf.innerHTML = "";

    let plot_info = document.createElement("div");
    plot_info.setAttribute("class", "testimonial-item text-center")

    let last, next;

    let j = 0;

    const today = new Date();
    while (j < list_bars[i].fecha_prediccion.length && new Date(list_bars[i].fecha_prediccion[j]).getTime() < today.getTime()) ++j;

    if (j === 0) {
        last = "No se tiene constancia";
        next = list_bars[i].fecha_prediccion[j].substring(0,10);
    }

    else if (j === list_bars[i].fecha_prediccion.length) {
        next = "No se tiene constancia";
        last = list_bars[i].fecha_prediccion[j - 1].substring(0,10);
    }

    else {
        last = list_bars[i].fecha_prediccion[j - 1].substring(0,10);
        next = list_bars[i].fecha_prediccion[j].substring(0,10);
    }

    plot_info.innerHTML = `
    <img class="img-fluid rounded-circle mx-auto mb-4" src="img/images.jpeg" style="width: 100px; height: 100px;">
    <h5 class="mb-1">Salvador Solé</h5>
    <p>Gerente</p>
    <p class="mb-0">Teléfono: +34 620 176 204</p>
    <p class="mb-0">${list_bars[i].direccion}</p>
    <p class="mb-0"><b><font color='white'>Ultima Llamada: ${last}</font></b></p>
    <p class="mb-0"><b><font color='white'>Siguiente Llamada: ${next}</font></b></p>
    `;

    inf.appendChild(plot_info);

    let widget = document.getElementById("WidgetMaps");
    let map = document.createElement("div");
    map.setAttribute("class", "bg-secondary rounded h-100 p-4");

    map.innerHTML = `
    <iframe class="position-relative rounded w-100 h-100"
    src="https://www.google.com/maps?&q=${list_bars[i].direccion}&output=embed" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0" style="filter: grayscale(100%) invert(92%) contrast(83%); border: 0;"></iframe>
    `;

    widget.appendChild(map);

}




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


    let url = window.location.href;
    let bar_name = url.match("[^=]*$");
    bar_name = String(bar_name);
    bar_name = bar_name.replaceAll("%20", " ");

    let i = 0;
    while (list_bars[i].desc_cliente !== bar_name) ++i;

    let pred_dates = list_bars[i].fecha_prediccion;
    pred_dates = pred_dates.map((x) => new Date(String(x)));

    let dic = {};
    for (const f of list_bars[i].fecha_pedido) {
        const year = f.substring(0,4);
        if (dic[year] === undefined) {
            dic[year] = {
                total: 1,
                mes: [0,0,0,0,0,0,0,0,0,0,0,0]
            }
        }
        else {
            ++dic[year].total;
            ++dic[year].mes[Number(f.substring(5,7)) - 1];
        }
    }

    let ds = [];

    for (const y of Object.keys(dic)) {
        ds.push({
            label: y,
            data: dic[y].mes,
            backgroundColor: `rgba(235, 22, 22, .${Math.floor(Math.random() * (9-1+1)+1)})`,
            fill: true
        });
    }



    $('#calender').datetimepicker({
        inline: true,
        format: 'L',
        locale: 'es',
        disabledDates: pred_dates
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });

    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: ds 
            },
        options: {
            responsive: true
        }
    });

})(jQuery);

