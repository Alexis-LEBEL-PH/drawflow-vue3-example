/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>
    <div ref="el" v-on:mouseenter="focusIn" :key="component_key">
        <nodeHeader title="Time Block" />
        <!--- svg router icon -->
        <div class="icon">
            <svg version="1.1">
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g inkscape:groupmode="layer" id="layer2" style="display:inline"
                    transform="translate(-496, -370) scale(2.5, 2.5)" fill="#ffffff">
                    <g id="g6173" transform="translate(1.5152288,1.4628182)">
                        <path id="path2221"
                            d="M 256.51786,158.83539 C 256.51786,165.07003 251.45786,170.13003 245.22322,170.13003 C 238.98858,170.13003 233.92858,165.07003 233.92858,158.83539 C 233.92858,152.60075 238.98858,147.54075 245.22322,147.54075 C 251.45786,147.54075 256.51786,152.60075 256.51786,158.83539 z "
                            style="fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:0.76499999;stroke-linecap:butt;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1"
                            transform="matrix(0.8126682,0,0,0.8126682,40.714891,29.174561)" />
                        <path sodipodi:nodetypes="cc" id="path2225" d="M 240.08929,158.52289 L 236.11606,154.50503"
                            style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
                        <path sodipodi:nodetypes="cc" id="path2229" d="M 245.70288,152.71822 L 239.77133,158.78518"
                            style="fill:none;fill-rule:evenodd;stroke:#ffffff;stroke-width:0.67472529px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
                    </g>
                </g>
            </svg>
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