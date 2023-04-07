export default class ChartHelper {
    #document;

    constructor(document){
        this.#document = document;
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.font.family = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.color = '#858796';
    }

    displayBarChart(id, titulo, labelChart, dataX, dataY){
        const padre = this.#document.getElementById(id);
        const chartDiv = this.#document.createElement("div");
        chartDiv.innerHTML = `
        <div class="card shadow mb-4 col-xl-8 col-lg-7">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">${titulo}</h6>
            </div>
            <div class="card-body">
                <div class="chart-bar"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                    <canvas id="${id}-bar-chart" width="362" height="160" style="display: block; width: 362px; height: 160px;" class="chartjs-render-monitor"></canvas>
                </div>
                <hr>
                Se muestran los gastos del usuario consolidados por mes.
            </div>
        </div>
        `;
        padre.append(chartDiv);

        new Chart(document.getElementById(`${id}-bar-chart`),
         {
            type: 'bar',
            data: {
                labels: dataX,
                datasets: [
                    {
                    label: labelChart,
                    backgroundColor: "#4e73df",
                    hoverBackgroundColor: "#2e59d9",
                    borderColor: "#4e73df",
                    data: dataY,
                    }
                ],
            }
        });
    }

    displayDonutChart(id, titulo, labelChart, dataX, dataY){
        //console.log("displayDonutChart");
        const padre = this.#document.getElementById(id);
        const chartDiv = this.#document.createElement("div");
        chartDiv.innerHTML = `
        <div class="card shadow mb-4 col-xl-8 col-lg-7">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">${titulo}</h6>
            </div>
            <div class="card-body">
                <div class="chart-pie"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                    <canvas id="${id}-donut-chart" width="362" height="160" style="display: block; width: 362px; height: 160px;" class="chartjs-render-monitor"></canvas>
                </div>
                <hr>
                Se muestran la distribución de gastos entre los diferentes grupos al que pertenece el usuario.
            </div>
        </div>
        `;
        padre.append(chartDiv);

        const backgroundColor = dataX.map(e => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})` );
        new Chart(document.getElementById(`${id}-donut-chart`),
        {
           type: 'doughnut',
           data: {
               labels: dataX,
               datasets: [
                   {
                   label: labelChart,
                   backgroundColor,
                   //hoverBackgroundColor: "#2e59d9",
                   //borderColor: "#4e73df",
                   data:  dataY,
                   }
               ],
           }
       });
    }

    


}
