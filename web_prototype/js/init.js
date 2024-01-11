

function SearchBar() {
    let inp = document.getElementById("SearchBar").value;

    window.location.href = "barInfo.html?message=" + encodeURIComponent(inp);
}

document.getElementById("SearchBar").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        SearchBar();
    }
});

function changeState(name) {
    let st = document.getElementById(name);

    if (st.innerHTML === "Pendiente") st.innerHTML = "Llamado";
    else st.innerHTML = "Pendiente";
} 



window.onload = () => {
    let list = document.getElementById("BarInit");

    let bars_today = 0;
    let lit_today = 0;

    let today = new Date();
    today.setHours(0,0,0,0);

    for (const bar of list_bars) {
        let t = document.createElement("tr");

        let ref = (bar.desc_cliente).replaceAll(" ", "%20");

        let j = 0;
        while (j < bar.fecha_prediccion.length && new Date(bar.fecha_prediccion[j]).getTime() < today.getTime()) ++j;
        
        const dt = j !== bar.fecha_prediccion.length ? new Date(bar.fecha_prediccion[j]) : new Date("12/31/9999");


        if (dt.getTime() !== today.getTime()) continue;
        ++bars_today;
        lit_today += bar.litros_pedidos_cliente[j];

        t.innerHTML = `
        <td><input class="form-check-input" type="checkbox"></td>
        <td>${bar.id_cliente}</td>
        <td><a href="barInfo.html?message=${ref}">${bar.desc_cliente}</a></td>
        <td>${bar.litros_pedidos_cliente[bar.litros_pedidos_cliente.length - 1]}L</td>
        `;

        list.appendChild(t);
    }

    let sl = document.getElementById("Bars");
    document.getElementById("llam_hoy").innerHTML = bars_today;
    document.getElementById("lit_hoy").innerHTML = lit_today;

    let lit_este = 0;

    for (let i = 0; i < list_bars.length; ++i) {

        const dt = new Date(list_bars[i].fecha_prediccion[list_bars[i].fecha_prediccion.length - 1]);

        if (dt.getTime() < today.getTime() && dt.getMonth() === today.getMonth()) lit_este += list_bars[i].litros_pedidos_cliente[list_bars[i].litros_pedidos_cliente.length - 1]
        let new_doc = document.createElement("option");
        new_doc.setAttribute("value", list_bars[i].desc_cliente);
        sl.appendChild(new_doc);
    }

    document.getElementById("lit_mes").innerHTML = lit_este;
}
(function ($) {


    let dic = {};
    let dic2 = {};

    for (const bar of list_bars) {

        if (dic[bar.ciudad] === undefined) dic[bar.ciudad] = 1;
        else ++dic[bar.ciudad];

        for (const f of bar.fecha_pedido) {
            const year = f.substring(0,4);
            if (dic2[year] === undefined) {
                dic2[year] = {
                    total: 1,
                    mes: [0,0,0,0,0,0,0,0,0,0,0,0]
                }
            }
            else {
                ++dic2[year].total;
                ++dic2[year].mes[Number(f.substring(5,7)) - 1];
            }
        }
    }

    delete dic2["2021"];

    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: Object.keys(dic),
            datasets: [{
                label: "Zonas",
                backgroundColor: [
                    "rgba(235, 22, 22, .7)"
                ],
                data: Object.values(dic)
            }]
        },
    });

    let ds = [];

    for (const y of Object.keys(dic2)) {
        ds.push({
            label: y,
            data: dic2[y].mes,
            backgroundColor: `rgba(235, 22, 22, .${Math.floor(Math.random() * (9-1+1)+1)})`,
            fill: true
        });
    }


    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            datasets: ds 
            },
    });
})(jQuery);
