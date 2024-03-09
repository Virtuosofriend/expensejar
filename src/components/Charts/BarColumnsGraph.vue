<template>
	<highcharts :options="chartOptions" />
</template>
<script>
import { Chart } from "highcharts-vue";
import { colors } from "@/common/constants/graphColors.js";

export default {
    name: "BarColumnsGraph",

    components: {
        highcharts: Chart 
    },

    props: {
        graphData: {
            required: true,
            type:   Array
        },
        graphCategories: {
            required: true,
            type: Array
        },
    },
    /**
    * @todo Same of the settings are common in the graphs. We need to move them to a configuration file
    */
    
    setup(props) {
        const chartOptions = {
            chart: {
                type:               "bar",
                backgroundColor:    "transparent",
                height:             500,
                spacingRight: 10,
                spacingLeft: 20,
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
                categories: props.graphCategories,
                gridLineWidth: 0,
                lineWidth: 0,
                labels: {
                    step:   1,
                    style: {
                        color: "#def1ff",
                        fontSize: "12px",
                    }
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Y axis",
                    enabled: false
                },
                gridLineWidth: 0,
                lineWidth:     0,
                labels: {
                    enabled: false,
                }
            },
            legend: {
                enabled: true,
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
                    enableMouseTracking: false,
                    groupPadding: 0,
                    shadow: false,
                    events: {
                        legendItemClick: function() {
                            return false;
                        }
                    }
                },
                bar: {
                    borderWidth:    0,
                    pointWidth:     10,
                    minPointLength: 2,
                    cropThreshold: 100,
                    groupPadding: 0.1,
                    dataLabels: {
                        enabled:            true,
                        inside:             false,
                        crop:               false,
                        overflow:           "allow",
                        color:              "#def1ff",
                        style: {
                            fontWeight:     "bold",
                            textOutline:    "none",
                            fontSize: "11px"
                        },
                        formatter: function() {
                            if ( this.point.y < 1 ) {
                                return ""
                            }
                            return `${Math.abs(this.point.y)} €`
                        }
                    }
                }
            },
            tooltip: {
                enabled:            false,
            },
            series: props.graphData
        };

        return {
            chartOptions
        }
    }
}
</script>