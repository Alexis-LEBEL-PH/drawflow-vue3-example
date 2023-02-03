/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el">
        <nodeHeader title="Native Signal" />
        <div class="root">
            <label>Signal :</label>
            <el-select-v2 v-model="signal" :options="NativeSignals" placeholder="Select" @change="updateSelect"
                size="small" df-method>
            </el-select-v2>
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
        const can_id = ref('');
        const signal = ref('1');
        const dataNode = ref({});
        const NativeSignals = readonly([
            {
                value: '1',
                label: '1'
            },
            {
                value: '2',
                label: '2'
            }
            // Those will be gathered via API feed (because hard-coding those signals is UGLY)
        ]);

        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateValues = () => {
            const reg = /^[0-9a-fA-F]{3,8}$/;
            if(!can_id.value.match(reg)) {
                can_id.value = '';
            }
            dataNode.value.data.channel = signal;
            df.updateNodeDataFromId(nodeId.value, dataNode.value);
        }

        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)
        });

        return {
            el, signal, NativeSignals, updateValues, can_id
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