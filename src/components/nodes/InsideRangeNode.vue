/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el" v-on:mouseenter="focusIn" :key="component_key">
        <nodeHeader title="Inside Range" />
        <!--- svg router icon -->
        <div class="icon">
            <svg version="1.1">
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <!-- <g> -->
                <g transform="scale(0.00500000,-0.00500000) translate(16500, -5000)" fill="#ffffff">
                    <path fill="ffffff"
                        d="M4541.6,5009.8c-600.3-59.5-1169.9-222.5-1726-500.5c-500.6-247.4-901.4-538.9-1300.3-941.6c-400.8-404.7-663.6-774.8-916.7-1290.7c-241.7-489-377.8-928.2-464.1-1486.3c-46-308.8-46-1033.7,0-1342.5C220.8-1110,357-1549.1,596.7-2038.2c257-521.6,542.8-920.5,955.1-1327.1c404.6-400.8,774.8-663.6,1290.7-916.7c489-241.6,928.2-377.8,1486.3-464.1c308.8-46,1033.7-46,1342.5,0c558.1,86.3,997.3,222.5,1486.3,462.2c521.6,257,920.5,542.7,1327.1,955.1c757.5,763.3,1210.1,1676.2,1380.8,2777c46,308.8,46,1033.7,0,1342.5C9643,2228.9,8893.2,3418,7704.1,4213.9c-120.8,82.5-366.3,220.5-546.6,308.8c-485.2,235.9-932.1,375.9-1467.1,458.4C5448.8,5017.4,4792.9,5032.8,4541.6,5009.8z M5489,4605.1c701.9-69,1451.8-343.3,2042.5-747.9C8618.9,3111.1,9317,1972,9480,677.4c36.4-285.8,36.4-830.4,0-1116.2c-257-2052.1-1869.9-3665-3921.9-3921.9c-285.8-36.4-830.4-36.4-1116.2,0C2389.9-4103.7,777-2490.8,520-438.7c-36.4,285.7-36.4,830.4,0,1116.2C796.2,2882.9,2635.4,4561,4856.2,4632C5044.1,4637.7,5243.6,4630,5489,4605.1z" />
                    <path
                        d="M4409.3,3335.5c-515.9-515.9-579.2-586.9-579.2-640.6c0-166.8,143.8-262.7,283.8-189.9c28.8,15.3,193.7,170.7,368.2,345.2l316.4,318.4l9.6-978.1l9.6-978.1l51.8-49.9c70.9-71,189.9-71,260.8,0l51.8,49.9l5.8,981.9l5.8,980l339.4-337.5c207.1-203.3,360.6-341.4,393.1-349c126.6-32.6,243.6,59.5,243.6,189.9c0,76.7-9.6,86.3-579.2,657.8c-320.3,320.3-584.9,581.1-590.7,581.1C4994.3,3916.6,4729.6,3655.8,4409.3,3335.5z" />
                    <path
                        d="M2742.7,1266.2c-57.5-26.9-107.4-140-92.1-203.3c7.7-30.7,145.8-186,347.1-387.4c184.1-186,333.7-343.3,333.7-351c0-5.8-441.1-15.4-980-17.3l-980-5.7l-46-53.7c-30.7-36.4-46-76.7-46-128.5c0-51.8,15.3-92.1,46-128.5l46-53.7l980-5.8c538.9-1.9,980-11.5,980-17.3c0-7.7-149.6-164.9-333.7-351c-360.6-362.4-387.4-400.8-329.9-508.2c55.6-101.6,170.7-134.2,276.2-78.6c28.8,15.3,301.1,278.1,607.9,584.9l556.2,558.1l-527.4,529.3c-289.6,291.5-561.9,554.2-602.2,584.9C2900,1291.1,2819.5,1302.6,2742.7,1266.2z" />
                    <path
                        d="M7042.5,1252.8c-30.7-19.2-303-283.8-604.1-584.9l-546.6-548.5L6419.2-410c567.7-569.6,648.2-640.5,730.7-640.5c124.7,0,228.2,115.1,199.5,226.3c-7.7,30.7-145.7,186-347.1,387.4c-184.1,186-333.7,343.3-333.7,351c0,5.8,441.1,15.4,980,17.3l980,5.8l46,53.7c30.7,36.4,46,76.7,46,128.5c0,51.8-15.3,92.1-46,128.5l-46,53.7l-980,5.7c-538.9,1.9-980,11.5-980,17.3c0,7.7,149.6,164.9,333.7,351c360.5,362.5,387.4,400.8,329.8,508.2C7274.5,1291.1,7147.9,1319.9,7042.5,1252.8z" />
                    <path
                        d="M4950.1-872.2c-23-3.8-61.4-28.8-86.3-55.6l-46-49.9l-5.8-978.1l-5.8-980l-339.4,337.5c-207.1,203.3-360.6,341.4-393.2,349c-126.6,32.6-243.6-59.4-243.6-189.8c0-76.7,9.6-86.3,584.9-663.6l584.9-584.9l584.9,584.9c521.7,521.6,584.9,592.6,584.9,646.3c0,166.9-143.8,262.8-283.8,189.9c-28.8-15.4-193.7-170.7-368.2-345.2L5201.4-2930l-9.6,978.1l-9.6,978.1l-47.9,46C5084.4-879.8,5017.3-860.6,4950.1-872.2z" />
                </g>
                <!-- </g> -->
            </svg>
        </div>
        <div class="col-divider">
            <div class="line-divider">
                <p>High Value</p>
                <el-select-v2 ref="elSelectV2" v-model="high_value" :options="memory_spaces" clearable
                    @change="selectChange" size="small">
                </el-select-v2>
                <p>Low Value</p>
                <el-select-v2 ref="elSelectV2" v-model="low_value" :options="memory_spaces" clearable
                    @change="selectChange" size="small">
                </el-select-v2>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="line-divider">
                <p>True</p>
                <p>False</p>
            </div>
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
    watch: {
        memory_spaces: function () {
            console.log("memory_spaces changed");
        }
    },
    setup() {
        const el = ref(null);
        const component_key = ref(0);
        const nodeId = ref(0);
        let df = null
        const dataNode = ref({
            data: {
                high_value: "",
                low_value: "",
            }
        });
        var memory_spaces = [{
            value: "1",
            label: "1"
        }];
        const high_value = ref("1");
        const low_value = ref('1');
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        onMounted(async () => {
            await nextTick();
            if (sessionStorage.getItem("memory_spaces"))
                memory_spaces = JSON.parse(sessionStorage.getItem("memory_spaces"));
            nodeId.value = el.value.parentElement.parentElement.id.slice(5);
            dataNode.value = df.getNodeFromId(nodeId.value);
        });

        return {
            el, memory_spaces, high_value, low_value, component_key, dataNode, df, nodeId
        }

    },
    methods: {
        focusIn() {
            if (sessionStorage.getItem("memory_spaces")) {
                this.memory_spaces = JSON.parse(sessionStorage.getItem("memory_spaces"));
                this.component_key++;
            }
        },
        selectChange() {
            // This stores the memory space in the node data for export
            this.dataNode.data.high_value = this.high_value;
            this.dataNode.data.low_value = this.low_value;
            this.df.updateNodeDataFromId(this.nodeId, this.dataNode);
        }
    },

})
</script>

<style scoped>
.icon {
    height: 3em;
    width: 3em;
}

.col-divider {
    display: flex;
    flex-direction: line;
    justify-content: center;
    align-items: center;
    /* height: 4em; */
    /* margin-top: -0.5em; */
}

.line-divider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.2em;
    gap: 0.2em;
    margin-top: 1em;
    /* height: 4em; */
    /* margin-top: -0.5em; */
}
</style>