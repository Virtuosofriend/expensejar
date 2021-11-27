<template>
    <highcharts 
		:options="chartOptions"
	></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue"
import categories from "@/helpers/expensesCategories";
import { constructData } from "@/helpers/arrayHelperFunctions";
import { mapGetters } from "vuex";

export default {
    name: "StackedBarCategories",

    props: {
        chartData: { required: true}
    },

    computed: {
        ...mapGetters({
            usersList: "general/getUsers"
        }),

        chartOptions() {            
            let owner = this.chartData.owner;
            let secondary_user = this.chartData.secondary ? 
                this.chartData.secondary
                : [];

            const ownerData = constructData(owner).map(elem => elem.amount);
            const secondaryUserData = secondary_user.length > 0 ? constructData(secondary_user).map(elem => elem.amount) : [];

            return {
                chart: {
                    type:               "bar",
                    backgroundColor:    "transparent",
                    height:             320,
                },
                title: {
                    text:                   ""
                },
                xAxis: {
                    categories:             categories,
                    gridLineWidth:          0,
					lineWidth:              0,
                    labels: {
                        step:   1,
                        style: {
                            color:            "#596EA4",
                            fontSize:         "11px",
                            fontWeight:       "bold"
                        }
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text:               "Y axis",
                        enabled:            false
                    },
                    gridLineWidth:        0,
					lineWidth:            0,
                    labels: {
                        enabled:    false,
						formatter: function () {
                            return Math.abs(this.value);
                        },
                        style: {
                                fontSize:         "10px",
                                color:            "#727c86"
                            }
					}
                },
                legend: {
					enabled:              true
				},
                credits: {
					enabled:              false
				},
				exporting: {
					enabled:              false
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
                    bar: {
                        borderWidth:    0,
                        pointWidth:     14,
                        minPointLength: 2,
                        dataLabels: {
                            enabled:            true,
                            inside:             false,
                            crop:               false,
                            overflow:           "none",
                            color:              "#3154AC",
                            style: {
                                fontWeight:     "bold",
                                textOutline:    "none"
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
                    backgroundColor:    "#727c86",
                    borderColor:        "#727c86",
                    useHTML:            true,
                    enabled:            false,
                    formatter: function() {
                        return `<div style="height: 36px">
                                    <p style="font-size: 12px";> 
                                        <strong>${ this.series.name }: ${this.point.category}</strong>
                                        <span style="display:block; font-size: 12px; margin-top: 6px; margin-bottom: 6px;">
                                            ${this.series.yAxis.axisTitle.textStr }: ${ Math.floor(Math.abs(this.point.y)) }
                                        </span>
                                    </p>
                                </div>`

                    }
                },

                series: [{
                    name:   this.usersList.find(elem => elem.id === this.chartData.users.owner).username,
                    color:  "#5a6fd0",
                    data:   ownerData,
                }, {
                    name:   this.usersList.find(elem => elem.id === this.chartData.users.secondary_user).username,
                    color:  "#f7ac1a",
                    data:   secondaryUserData,
                }]
            }
        }
    },

    components: {
        highcharts: Chart 
    },
}
</script>
