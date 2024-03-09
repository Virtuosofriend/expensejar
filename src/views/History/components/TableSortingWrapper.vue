<template>
	<v-menu
		:close-on-content-click="false"
	>
		<template #activator="{ props, isActive }">
			<v-btn
				color="transparent"
				icon="fa-solid fa-arrow-down-a-z"
				size="small"
				v-bind="props"
			/>
		</template>
		<v-sheet
			color="primary"
		>
			<table-sorting-container>
				<template #default="{ sortingButtons, handleButtonClick, selectionSort, selectionOrder }">
					<v-container>
						<v-row>
							<v-col
								v-for="(item, itemValue, index) in sortingButtons"
								:key="index"
								cols="12"
								md="4"
							>  
								<sorting-button-provider
									:selection-sort="selectionSort"
									:buttom-item="itemValue"
									:sorting="selectionOrder"
								>
									<template #default="{ isSelected, sortIcon }">
										<sorting-button @click="handleButtonClick(itemValue)">
											<template #icon>
												<sorting-button-icon
													v-if="isSelected"
													:icon="sortIcon"
												/>
											</template>
											<template #title>
												{{ item.label }}
											</template>
										</sorting-button>
									</template>
								</sorting-button-provider>
							</v-col>
						</v-row>
					</v-container>
				</template>
			</table-sorting-container>
		</v-sheet>
	</v-menu>
</template>

<script>
import { defineAsyncComponent } from "vue";

import TableSortingContainer from "./TableSortingContainer.vue";
import SortingButton from "./SortingButton/SortingButton.vue";
import SortingButtonProvider from "./SortingButton/SortingButtonProvider.vue";

export default {
    name: "TableSortingWrapper",

    components: {
        TableSortingContainer,
        SortingButton,
        SortingButtonProvider,
        SortingButtonIcon: defineAsyncComponent(() => import("./SortingButton/SortingButtonIcon.vue")),
    }
}
</script>