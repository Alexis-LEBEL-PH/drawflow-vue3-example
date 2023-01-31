<template>
    <div ref="el">
        <nodeHeader title="Fetch from Memory" />
        <p>Variable Number</p>
        <el-select v-model="method" placeholder="Select" @change="updateSelect" size="small" df-method>
            <el-option v-for="item in variables" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>
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
    setup() {
        const el = ref(null);
        const nodeId = ref(0);
        let df = null
        const url = ref('');
        const selected_variable = ref(0);
        const dataNode = ref({});
        const variables = readonly(
            // A range from 0 to 15 of numbers only
            Array.from(Array(16).keys())
        );

        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateSelect = (value) => {
            dataNode.value.data.method = value;
            df.updateNodeDataFromId(nodeId.value, dataNode.value);
        }


        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)

            url.value = dataNode.value.data.url;
            // selected_variable = dataNode.value.data.method;
        });

        return {
            el, url, method: selected_variable, variables, updateSelect
        }

    }

})
</script>
