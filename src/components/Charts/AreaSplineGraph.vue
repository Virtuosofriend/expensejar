<template>
    <highcharts :options="chartOptions"></highcharts>
</template>
<script>
import { Chart } from "highcharts-vue";
import { colors } from "@/common/constants/graphColors.js";
import { CONFIG } from "@/common/config";

export default {
    name: "AreaSplineGraph",
    components: {
        highcharts: Chart 
    },
    // props: {
    //     graphData: {
    //         required: true,
    //         type:   Array
    //     },
    //     graphCategories: {
    //         required: true,
    //         type: Array
    //     },
    // },    
    setup(props) {
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
                    month: `${'%b \'%y'}`,
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
                    pointStart: Date.UTC(CONFIG.starting_year, CONFIG.starting_month, 1),
                    pointIntervalUnit: "month"
                },
            },
            tooltip: {
                enabled: false,
                headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>',
            },
            series: [{
                name: "Mine",
                data: [200, 453, 1200, 400, 670, 500,1200, 890, 700, 1230, 400, 450, 560, 1090, 600, 710, 701]
            }]
        };

        return {
            chartOptions
        }
    }
}
</script>