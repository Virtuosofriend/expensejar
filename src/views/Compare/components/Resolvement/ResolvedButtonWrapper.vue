<template>
	<div
		class="d-flex align-center pointer-cursor "
		@click="dialog = true"
	>
		<v-icon
			color="secondary"
			size="small"
			class="mr-2"
		>
			fa-solid fa-circle-check
		</v-icon> 
		<p class="text-secondary font-weight-bold">
			{{ $t( `Compare.monthResolved` ) }}
		</p>
		<v-dialog
			v-model="dialog"
		>
			<v-card>
				<v-card-text>
					{{ filteredDate }} by {{ resolvedByUser }}
				</v-card-text>
				<v-card-actions>
					<v-btn 
						color="primary" 
						block 
						@click="dialog = false"
					>
						{{ $t( `General.close` ) }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { ref, computed, inject } from "vue";
export default {
    name: "ResolvedButtonWrapper",

    props: {
        dateResolved: {
            type: String,
            default: ""
        },
        resolvedByUser: {
            type: String,
            default: ""
        }
    },

    setup(props) {
        const dialog = ref(false);
        const $date = inject("date");

        const filteredDate = computed(() => $date(props.dateResolved).format("dddd, DD.MM.YYYY"));

        return {
            dialog,
            filteredDate
        }
    }
}
</script>