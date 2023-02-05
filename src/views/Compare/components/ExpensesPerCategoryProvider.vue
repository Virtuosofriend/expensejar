<script>
import { unref } from "vue";
import { useGeneralStore } from "@/stores/GeneralStore.js";
import { properNumberRound } from "@/helpers/generalFunctions.js";
export default {
    name: "ExpensesPerCategoryProvider",

    props: {
        totalExpenses: {
            required: true,
            type: Array
        },
        members: {
            required: true,
            type: Array
        },
        monthTotalExpenses: {
            required: true,
            type: Number
        }
    },

    setup(props, ctx) {
        const generalStore = useGeneralStore();
        const categories = generalStore.expense_categories;
        let barGraphSeriesData = [];
        let pieBarSeriesData = [];

        let categoriesForGraph = categories.map(category => category.label_en);

        const totalExpenses = unref(props.totalExpenses);
        const membersIdName = unref(props.members).map(member => {
            return {
                id: member.id,
                name: member.first_name
            }
        });

        membersIdName.forEach(member => {
            let expensesPerMember = totalExpenses.filter(expense => expense.user_created === member.id);
            let amountOfExpenses = reducer(expensesPerMember, categories)
            barGraphSeriesData.push({
                name: member.name,
                data: Object.values(amountOfExpenses)
            });
            pieBarSeriesData.push(amountOfExpenses);
        });
        
        pieBarSeriesData = createPercentageForPieChart(props.monthTotalExpenses, pieBarSeriesData);
        
        return () => ctx.slots.default({
            barGraphData: barGraphSeriesData,
            graphCategories: categoriesForGraph,
            pieGraphData: pieBarSeriesData
        });

        function reducer(expensesArray, categories) {
            let result = {};
            categories.forEach(category => {
                result[category.label_en] = 0;
            });
            expensesArray.reduce((accumulator, cur) => {
                let category = categories.find(category => category.id === cur.category_id).label_en;
                if ( accumulator[category] ) {
                    accumulator[category] = {
                        amount: accumulator[category].amount + cur.amount
                    }
                    result[category] = properNumberRound(accumulator[category].amount);
                } else {
                    accumulator[category] = {
                        amount: cur.amount
                    }
                    result[category] = +cur.amount
                }
                return accumulator;
            }, {});

            return result;
        }

        function createPercentageForPieChart(totalSum, expensePerPerson) {
            return expensePerPerson.reduce((accumulator, current) => {
                if ( accumulator.length === 0 ) {
                    for (let value in current ) {
                        const accumulatorObject = {
                            name: value,
                            y: current[value]
                        };
                        accumulator.push(accumulatorObject);
                    }
                } else {
                    accumulator = accumulator.map(elem => {
                        let sumOfCategory = elem.y += current[elem.name];
                        return {
                            name: elem.name,
                            y: properNumberRound((100 * sumOfCategory)/totalSum)
                        }
                    });
                }
                return accumulator
            },[]);
        }
    }
}
</script>