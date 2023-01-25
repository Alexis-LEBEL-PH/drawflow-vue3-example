<template>
    <div ref="el">
        <nodeHeader title="Send MQTT" />
        <div>Encoding type :</div>
        <select v-model="encoding_types[0]" placeholder="Select" @change="updateSelect" size="small" df-method>
            <option v-for="(item, index) in encoding_types" :key="index" :value="item">
                {{item}}
            </option>
        </select>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, nextTick, readonly, onMounted } from 'vue'
import nodeHeader from './nodeHeader.vue'


export default defineComponent({
    components: {
        nodeHeader
    },
    setup() {
        const dataNode = ref({});
        const el = ref(null);
        const textarea = ref('');
        let df = null
        const nodeId = ref(0);
        const encoding_types = readonly({
            0: 'varuint',
            1: 'varint (zigzag)',
            2: 'float',
        })
        const drawer = ref(false);
        const direction = ref('rtl');
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateSelect = (value) => {
            dataNode.value.data.script = value;
            df.updateNodeDataFromId(nodeId.value, dataNode.value);
        }

        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)
            textarea.value = dataNode.value.data.script;
        });

        return {
            el,
            drawer,
            direction,
            textarea,
            updateSelect,
            encoding_types
        }
    },


})
</script>
<style scoped>
p {
    margin: 5px;
    margin-bottom: 10px;
}
</style>
