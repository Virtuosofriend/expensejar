<script lang="ts">
// @ts-ignore
import { fetchJars } from "../api/jarsApi";
// @ts-ignore
import { useApi } from "@/api/composables/useApi";

export default {
    name: "HomeView",

    setup() {
        const {
            data,
            status,
            exec: fetchData,
            fetchJarsStatusSuccess,
            fetchJarsStatusError,
            fetchJarsStatusIdle,
            fetchJarsStatusPending
        } = useApi("fetchJars", fetchJars);

        fetchData();
        console.log(useApi("fetchJars", fetchJars))
        return {
            data,
            status,
            fetchData,
            fetchJarsStatusSuccess,
            fetchJarsStatusError,
            fetchJarsStatusIdle,
            fetchJarsStatusPending
        }
    },
}
</script>

<template>
  <main>
    <h2>
        Welcome
    </h2>
    <p v-if="fetchJarsStatusSuccess">
        {{ data.data.data }}
    </p>
    <code>
        {{ status }}
    </code>
  </main>
</template>
