<template>
    <div ref="el">
        <nodeHeader title="Sum" />
        <!--- + icon centered in the container with svg path -->
        <svg class="icon" viewBox="-2350 255 4096 4096" xmlns="http://www.w3.org/2000/svg" width="150" height="150">
            <path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448z" fill="#ffffff" p-id="1000"></path>
            <path d="M512 320c-17.664 0-32 14.336-32 32v320c0 17.664 14.336 32 32 32s32-14.336 32-32V352c0-17.664-14.336-32-32-32z" fill="#ffffff" p-id="1001"></path>
            <path d="M352 480c-17.664 0-32 14.336-32 32s14.336 32 32 32h320c17.664 0 32-14.336 32-32s-14.336-32-32-32H352z" fill="#ffffff" p-id="1002"></path>
        </svg>
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
        const dataNode = ref({});

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
            // method.value = dataNode.value.data.method;
        });

        return {
            el, url,  updateSelect
        }

    }

})
</script>
