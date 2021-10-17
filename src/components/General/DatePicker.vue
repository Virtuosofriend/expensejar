<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dateValue"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="dateValue"
                prepend-inner-icon="far fa-calendar"
                readonly
                dark
                hide-details
                solo
                background-color="primary"
                color="secondary"
                flat
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="dateValue"
            no-title
            scrollable
        >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="menu = false"
            >
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="saveDate()"
            >
                OK
            </v-btn>
        </v-date-picker>
      </v-menu>
</template>

<script>
export default {
    name: "General__datepicker",

    data() {
        return {
            dateValue: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false
        }
    },

    methods: {
        saveDate() {
            this.menu = false;
            this.$refs.menu.save(this.dateValue)
            this.$emit("input", this.dateValue);
        }
    },

    mounted() {
        this.saveDate();
    }
}
</script>

<style lang="scss" scoped>

</style>