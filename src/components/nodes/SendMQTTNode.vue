<template>
    <div ref="el">
        <nodeHeader title="Send MQTT" />
        <label>Encoding type :
            <select v-model="selected_encoding_type" placeholder="Select" @change="updateSelect" size="small" df-method>
                <option v-for="(item, index) in encoding_types" :key="index" :value="item">
                    {{ item }}
                </option>
            </select>
        </label>
        <tr></tr>
        <br />
        <label>
            Offset / Scale : <br>
            <ElInput v-model="offset" type="number" min=0 max=255 size="small"/>
            <ElInput v-model="scale" type="number" min=0 max=65535 size="small"/>
        </label>
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
        const nodeId = ref(1);
        const encoding_types = readonly({
            0: 'varuint',
            1: 'varint (zigzag)',
            2: 'float',
        });
        const offset = ref(0);
        const scale  = ref(0);
        const MQTTValueID = ref(0);
        const selected_encoding_type = ref(0);
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
            encoding_types,
            offset, scale, MQTTValueID, selected_encoding_type,
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
