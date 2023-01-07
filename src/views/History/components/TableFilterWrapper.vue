<template>
    <div class="text-center">
        <v-btn
            color="transparent"
            icon="fa-solid fa-filter"
            size="small"
        >
            <v-icon>fa-solid fa-filter</v-icon>
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
                            v-model="category"
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
                                    v-model="member"
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
import { ref, watch } from "vue";
import ExpenseCategoriesDropdown from "@/components/General/ExpenseCategoriesDropdown.vue";
import JarMembersDropdown from "@/components/Jars/JarMembersDropdown.vue";
import TableFilterJarMembersProvider from "./TableFilterJarMembersProvider.vue";

import { useUserStore } from "@/stores/UserStore";

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
        }
    },

    emits: ["update:category_id", "update:user_created"],

    setup(props, { emit }) {
        const dialog = ref(false);
        const category = ref(null);
        const member = ref(null);
        const userStore = useUserStore();
        const activeJar = userStore.active_jar;

        watch(category, emitCategoriesFilter);
        watch(member, emitMemberFilter);

        return {
            activeJar,
            category,
            dialog,
            member,
            updateCategoryModel,
            updateMemberModel
        }

        function emitCategoriesFilter() {
            return emit("update:category_id", category.value);
        }

        function emitMemberFilter() {
            return emit("update:user_created", member.value);
        }

        function updateCategoryModel(ev) {
            category.value = ev.value;
        }

        function updateMemberModel(ev) {
            member.value = ev.value;
        }
    }
}
</script>