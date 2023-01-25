<template>
    <div ref="el">
        <nodeHeader title="Store in memory" />
        <div>Stocke dans la mémoire</div>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, nextTick, readonly, onMounted } from 'vue'
import nodeHeader from './nodeHeader.vue'
import { ElMessageBox } from 'element-plus'


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
        const drawer = ref(false);
        const direction = ref('rtl');
        const handleClose = (done) => {
            ElMessageBox.confirm('Are you sure you want to close this?')
                .then(() => {
                    done()
                })
                .catch(() => {
                    // catch error
                })
        }
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
            handleClose,
            textarea,
            updateSelect,
            dataNode,
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
