/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el" v-on:mouseenter="focusIn" :key="component_key">
        <nodeHeader title="Product" />
        <!--- product x icon centered in the container with svg path -->
        <div class="icon_container">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em">
                <path
                    d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448z"
                    fill="#ffffff" p-id="1000"></path>
                <!-- / -->
                <path
                    d="M512 320c-17.664 0-32 14.336-32 32v320c0 17.664 14.336 32 32 32s32-14.336 32-32V352c0-17.664-14.336-32-32-32z"
                    fill="#ffffff" p-id="1001"></path>
                <!-- \ -->
                <path
                    d="M352 480c-17.664 0-32 14.336-32 32s14.336 32 32 32h320c17.664 0 32-14.336 32-32s-14.336-32-32-32H352z"
                    fill="#ffffff" p-id="1002"></path>
            </svg>
        </div>
        <p>Memory Slot</p>
        <el-select-v2 ref="elSelectV2" v-model="memory_space" :options="memory_spaces" clearable>
        </el-select-v2>
    </div>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance, readonly, ref, nextTick } from 'vue'
import nodeHeader from './nodeHeader.vue'

export default defineComponent({
    components: {
        nodeHeader
    },
    setup() {
        const el = ref(null);
        const nodeId = ref(0);
        // let df = null
        const dataNode = ref({});
        const component_key = ref(0);
        var memory_spaces = ref([{
            value: "1",
            label: "1"
        }]);
        const memory_space = ref("1");

        onMounted(async () => {
            await nextTick();
            if (sessionStorage.getItem("memory_spaces"))
                memory_spaces = JSON.parse(sessionStorage.getItem("memory_spaces"));
        });

        return {
            el, memory_spaces, memory_space, component_key
        }

    },
    methods: {
        focusIn() {
            if (sessionStorage.getItem("memory_spaces")) {
                this.memory_spaces = JSON.parse(sessionStorage.getItem("memory_spaces"));
                this.component_key++;
            }
        },
    },

})
</script>

<style scoped>
.icon_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4em;
    margin-top: -0.5em;
}
</style>