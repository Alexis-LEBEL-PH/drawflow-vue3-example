/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el">
        <nodeHeader title="Send MQTT" />
        <!-- cloud in svg path -->
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="5em" height="5em" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-cloud">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
        </div>

        <!-- <label>Encoding type :
            <select v-model="selected_encoding_type" placeholder="Select" size="small" df-method @change="selectChange">
                <option v-for="(item, index) in encoding_types" :key="index" :value="item">
                    {{ item }}
                </option>
            </select>
        </label> -->
        <tr></tr>
        <br />
        <!-- <label>
            Offset / Scale : <br>
            <ElInput v-model="offset" type="number" min=0 max=255 size="small" @change="selectChange"/>
            <ElInput v-model="scale" type="number" min=0 max=65535 size="small" @change="selectChange"/>
            Time resolution (us) : <br>
            <ElInput v-model="time_resolution" type="number" min=0 max=4000000000 size="small" @change="selectChange"/>
        </label> -->
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
        const dataNode = ref({
            data: {
                offset: 0,
                scale: 0,
                MQTTValueID: 0,
                encoding_type: 0,
                time_resolution: 0
            }
        });
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
        const time_resolution = ref(0);
        const scale = ref(0);
        const MQTTValueID = ref(0);
        const selected_encoding_type = ref(0);
        const drawer = ref(false);
        const direction = ref('rtl');
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)
        });

        return {
            el,
            drawer,
            direction,
            textarea,
            encoding_types,
            offset, scale, MQTTValueID, selected_encoding_type, dataNode, df, nodeId, time_resolution
        }
    },
    methods: {
        selectChange() {
            // This stores the memory space in the node data for export
            this.dataNode.data.offset = this.offset;
            this.dataNode.data.scale = this.scale;
            this.dataNode.data.MQTTValueID = this.MQTTValueID;
            this.dataNode.data.encoding_type = this.selected_encoding_type;
            this.dataNode.data.time_resolution = this.time_resolution;
            this.df.updateNodeDataFromId(this.nodeId, this.dataNode);
        }
    }


})
</script>
<style scoped>
p {
    margin: 5px;
    margin-bottom: 10px;
}

.icon {
    height: 5em;
    width: 5em;
    /* display: block; */
    margin: auto;
    justify-content: center;
    align-items: center;
}

svg {
    height: 5em;
    width: 5em;
    /* fill: #fff; */
    margin: auto;
    align-items: center;
    justify-content: center;
    stroke: #fff;
}

path {
    height: 5em;
    width: 5em;
    margin: auto;
    /* scale: 2; */
}
</style>
