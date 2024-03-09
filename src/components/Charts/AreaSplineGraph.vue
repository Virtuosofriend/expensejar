<template>
	<highcharts :options="chartOptions" />
</template>
<script>
import { Chart } from "highcharts-vue";
import { colors } from "@/common/constants/graphColors.js";
import { inject } from "vue";
export default {
    name: "AreaSplineGraph",
    components: {
        highcharts: Chart 
    },
    props: {
        startingPoint: {
            required: true,
            type: String
        },
        graphData: {
            required: true,
            type:   Array
        },
    },    
    setup(props) {
        const $date = inject("date");
        const chartOptions = {
            chart: {
                type:               "areaspline",
                backgroundColor:    "transparent",
                height:             200,
                style: {
                    fontFamily: "Poppins, sans-serif"
                }
            },
            title: {
                text: ""
            },
            accessibility: {
                enabled: false,
            },
            colors,
            xAxis: {
                gridLineWidth: 0,
                lineWidth: 0,
                tickWidth: 0,
                type: "datetime",
                dateTimeLabelFormats: {
                    month: `${"%b '%y"}`,
                },
                labels: {
                    style: {
                        color: "#def1ff",
                        fontSize: "12px",
                    }
                },
            },
            yAxis: {
                title: {
                    text: "Months",
                    enabled: false,
                },
                labels: {
                    enabled: false,
                },
                gridLineWidth: 0,
                lineWidth:     0,
            },
            legend: {
                enabled: false,
                itemStyle: {
                    color: "#def1ff"
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                series: {
                    shadow: false,
                    events: {
                        legendItemClick: function() {
                            return false;
                        }
                    },
                    marker: {
                        enabled: false,
                    },
                },
                areaspline: {
                    fillOpacity: 0.1,
                    pointStart: props.startingPoint,
                    pointIntervalUnit: "month"
                },
            },
            tooltip: {
                enabled: true,
                dateTimeLabelFormats: {
                    month: `${"%b '%y"}`,
                },
                formatter: function () {
                    return `${$date(this.x).format("MMMM YYYY")}<br> <b>${this.y}€</b>`
                }
            },
            series: [{
                name: "Mine",
                data: props.graphData
            }]
        };

        return {
            chartOptions
        }
    }
}
</script>