/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el">
        <nodeHeader title="Store in Memory" />
        <p>Memory Slot</p>
        <el-select-v2 v-model="memory_space" :options="memory_spaces" clearable allow-create filterable
            @change="selectChange">
        </el-select-v2>
        <!-- <br><br> -->
        <!-- <el-input v-model="url" df-url placeholder="Please input" size="small">
            <template #prepend>https://</template>
        </el-input> -->
    </div>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance, readonly, ref, nextTick } from 'vue'
import nodeHeader from './nodeHeader.vue'

export default defineComponent({
    components: {
        nodeHeader
    },
    methods: {
        selectChange() {
            // This stores the memory space in the node data for export
            this.dataNode.data.memory_space = this.memory_space;
            this.df.updateNodeDataFromId(this.nodeId, this.dataNode);
            // See if it needs to add the memory space to the list
            if (this.memory_space == "" || this.memory_space == null)
                return;
            // If the user has entered a new memory space, add it to the list
            for (var i = 0; i < this.memory_spaces.length; i++) {
                if (this.memory_spaces[i].value == this.memory_space) {
                    return;
                }
            }
            this.memory_spaces.push({ value: this.memory_space, label: this.memory_space });
            sessionStorage.memory_spaces = JSON.stringify(this.memory_spaces);
        },
    },
    setup() {
        const el = ref(null);
        const nodeId = ref(0);
        let df = null
        const url = ref('');
        const selected_variable = ref(0);
        const dataNode = ref({
            data: {
                memory_space: ""
            }
        });
        var memory_spaces = [{
            value: "1",
            label: "1"
        }];
        const memory_space = ref("");

        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        onMounted(async () => {
            await nextTick();
            // getting memory spaces from sessionStorage
            if (sessionStorage.getItem('memory_spaces')) {
                memory_spaces = JSON.parse(sessionStorage.getItem('memory_spaces'));
            }
            nodeId.value = el.value.parentElement.parentElement.id.slice(5);
            dataNode.value = df.getNodeFromId(nodeId.value);
        });

        return {
            el, url, selected_variable, memory_spaces, memory_space, dataNode, df, nodeId
        }

    }

})
</script>
