/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el">
        <nodeHeader title="Can Message" />
        <div class="root">
            <label>Can channel :</label>
            <el-select-v2 v-model="channel" :options="CAN_Channels" placeholder="Select" @change="updateSelect"
                size="small" df-method>
            </el-select-v2>
            <!-- <br><br> -->
            <label>Can ID :</label>
            <el-input v-model="can_id" df- placeholder="Please input" @change="updateValues" size="small">
                <template #prepend>#</template>
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
        const can_id = ref('');
        const channel = ref('1');
        const dataNode = ref({});
        const CAN_Channels = readonly([
            {
                value: '1',
                label: '1'
            },
            {
                value: '2',
                label: '2'
            }
        ]);

        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateValues = () => {
            const reg = /^[0-9a-fA-F]{3,8}$/;
            if(!can_id.value.match(reg)) {
                can_id.value = '';
            }
            dataNode.value.data.channel = channel;
            dataNode.value.data.can_id = can_id;
            df.updateNodeDataFromId(nodeId.value, dataNode.value);
        }

        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)
        });

        return {
            el, channel, CAN_Channels, updateValues, can_id
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