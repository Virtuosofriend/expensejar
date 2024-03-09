<template>
	<highcharts :options="chartOptions" />
</template>
<script>
import { Chart } from "highcharts-vue";
import { colors } from "@/common/constants/graphColors.js";

export default {
    name: "PieGraph",

    components: {
        highcharts: Chart 
    },

    props: {
        graphData: {
            required: true,
            type:   Array
        }
    },

    setup(props) {
        const chartOptions = {
            chart: {
                type:               "pie",
                backgroundColor:    "transparent",
                height:             300,
                spacingRight: 10,
                spacingLeft: 10,
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
                    pointPadding: 0,
                    groupPadding: 0,
                    shadow: false,
                    events: {
                        legendItemClick: function() {
                            return false;
                        }
                    }
                },
                pie: {
                    allowPointSelect: false,
                    borderWidth:    0,
                    pointWidth:     10,
                    minPointLength: 2,
                    showInLegend: true,
                    size: 220,
                    dataLabels: {
                        enabled:            true,
                        crop:               false,
                        useHTML:            true,
                        distance:          -1,
                        color:              "#def1ff",
                        formatter: function() {
                            if ( this.point.y < 1 ) {
                                return ""
                            }
                            return `<div class="graph__label text-xxs">
                                    <span class="d-inline-block text-truncate">${ this.point.name }</span> 
                                    <p class="ml-1 font-weight-bold">
                                        ${Math.abs(this.point.y)}%
                                    </p>
                                </div>`
                        }
                    }
                }
            },

            tooltip: {
                backgroundColor:    "#727c86",
                borderColor:        "#727c86",
                useHTML:            true,
                enabled:            false,
            },
            series: [{
                data: props.graphData

            }]          
        };

        return {
            chartOptions
        }
    }
}
</script>

<style lang="scss">
.graph__label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(7, 33, 59, .8);
    border-radius: 6px;
    padding: 6px;
    width: 80px;

    span {
        max-width: 65px;
    }
}
</style>