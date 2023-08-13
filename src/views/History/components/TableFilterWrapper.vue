<template>
    <div class="text-center">
        <v-btn
            color="transparent"
            icon="fa-solid fa-filter"
            size="small"
        >
            <v-icon 
                :color="isFilterActive ? 'secondary' : null"
            >
                fa-solid fa-filter
            </v-icon>
            <v-dialog
                v-model="dialog"
                activator="parent"
            >
                <v-card
                    color="accent"
                >
                    <v-card-text>
                        <p class="text-primary mb-2 font-weight-bold">
                            {{ $t( `History.filterByCategory` ) }}
                        </p>
                        <expense-categories-dropdown
                            :model-value="category"
                            :clearable="true"
                            @update:modelValue="updateCategoryModel"
                        ></expense-categories-dropdown>
                    </v-card-text>
                    <v-card-text>
                        <p class="text-primary mb-2 font-weight-bold">
                            {{ $t( `History.filterByMember` ) }}
                        </p>
                        <table-filter-jar-members-provider
                            :members-array="jarMembers"
                        >
                            <template #default="{ users }">
                                <jar-members-dropdown
                                    :model-value="member"
                                    :members="users"
                                    @update:modelValue="updateMemberModel"
                                ></jar-members-dropdown>
                            </template>
                        </table-filter-jar-members-provider>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">
                            {{ $t( `General.close` ) }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";
import JarMembersDropdown from "@/components/Jars/JarMembersDropdown.vue";
import TableFilterJarMembersProvider from "./TableFilterJarMembersProvider.vue";

import { useJarStore } from "@/stores/JarStore";

export default {
    name: "HistoryTableFiltersWrapper",

    components: {
        ExpenseCategoriesDropdown,
        JarMembersDropdown,
        TableFilterJarMembersProvider,
    },

    props: {
        jarMembers: {
            required: true,
            type: Array
        },
        isFilterActive: {
            required: false,
            type: Boolean,
            default: false,
        }
    },

    emits: ["update:category_id", "update:user_created"],

    setup() {
        const dialog = ref(false);
        const jarStore = useJarStore();
        const category = computed(() => jarStore.filterCategory);
        const member = computed(() => jarStore.filterMember);

        return {
            category,
            dialog,
            member,
            updateCategoryModel,
            updateMemberModel,
        }

        function updateCategoryModel(ev) {
            jarStore.setFilterCategory(ev);
        }

        function updateMemberModel(ev) {
            jarStore.setFilterMember(ev);
        }
    }
}
</script>