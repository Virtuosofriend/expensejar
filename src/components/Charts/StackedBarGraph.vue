<template>
    <figure>
        <div class="chart__wrapper">
            <div class="chart">
                <span class="block" title="Category A" style="width: 40%">
                <!-- <span class="value">40%</span> -->
                </span>
                <span class="block" title="Category B" style="width: 20%">
                <!-- <span class="value">50%</span> -->
                </span>
                <span class="block" title="Category C">
                </span>
            </div>
        </div>
    </figure>
</template>
<script>
/**
* @todo The block with the biggest percentage, should have the lowest z-index.
*/

import { colors } from "@/common/constants/graphColors.js";

export default {
    name: "StackedBarGraph",
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
        const colorsOfChart = {
            one: colors[0],
            two: colors[1],
            full: "#1e3955",
        };

        return {
            colorsOfChart
        }
    }
}
</script>

<style scoped>
figure {
	margin: 0 12px 12px 12px;
	max-width: 1100px;
	position: relative;
}
@keyframes expand {
	from {width: 0%;}
	to {width: 100%;}
}
@media screen and (min-width: 768px) {
	@keyframes expand {
		from {width: 0%;}
		to {width: calc(100% - 75px);}
	}
}
.chart {
	overflow: hidden;
	width: 0%;
	animation: expand 1.5s ease forwards;
    height: 8px;
}
.block {
	display: block;
	height: 8px;
	color: #fff;
	font-size: .75em;
	float: left;
	background-color: v-bind('colorsOfChart.one');
	overflow: hidden;
	opacity: 1;
	transition: opacity, .3s ease;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
}
.block:nth-of-type(2) {
	background-color: v-bind('colorsOfChart.two');
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}
.block:nth-of-type(3) {
	background-color: v-bind('colorsOfChart.full');
    z-index: -1;
    width: 100%;
    position: absolute;
    border-radius: 16px;
}
.value {
	display: block;
	line-height: .2em;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%);
}
@media screen and (min-width: 768px) {
	.block {
		font-size: 1em;
	}
}
</style>