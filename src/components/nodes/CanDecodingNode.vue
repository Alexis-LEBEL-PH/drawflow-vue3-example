/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el">
        <nodeHeader title="Can Decoding" />
        <div class="root">
            <label>Start bit :</label>
            <el-input v-model="start_bit" df- placeholder="Please input" @change="updateValues" size="small" min="0"
                max="63" type="number">
            </el-input>
            <label>End bit :</label>
            <el-input v-model="end_bit" df- placeholder="Please input" @change="updateValues" size="small" min="0"
                max="63" type="number">
            </el-input>
        </div>
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
        let df = null;
        const start_bit = ref('');
        const end_bit = ref('');
        const dataNode = ref({});

        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateValues = () => {
            dataNode.value.data.start_bit = start_bit;
            dataNode.value.data.end_bit = end_bit;
            df.updateNodeDataFromId(nodeId.value, dataNode.value);
        }

        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)
        });

        return {
            el, updateValues, start_bit, end_bit
        }
    }

})
</script>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}
</style>