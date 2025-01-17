/*
 *   Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 *   All rights reserved.
 */
<template>

  <el-container>
    <el-header class="header">
      <h3>Samsys Edge Process Creator</h3>
      <div>
        <el-button type="primary" @click="exportEditor">Export</el-button>
        <el-button type="primary" @click="sendRequestToParser">Send</el-button>
      </div>
    </el-header>
    <el-container class="container">
      <el-aside width="250px" class="column">
        <ul>
          <li v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)"
            class="drag-drawflow">
            <div class="node" :style="`background: ${n.color}`">{{ n.name }}</div>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
      </el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="dialogVisible" title="Export" width="50%">
    <span>Data:</span>
    <pre><code>{{ dialogData }}</code></pre>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>

import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css'
import style from '../assets/style.css'
import { onMounted, shallowRef, h, getCurrentInstance, render, readonly, ref } from 'vue'
import minify from '../minify_export.js'
import Node2 from './nodes/SendCloudNode.vue'
import Node3 from './nodes/MemoryStoreNode.vue'
import Node5 from './nodes/SumNode.vue'
import Node6 from './nodes/DifferenceNode.vue'
import Node7 from './nodes/DivideNode.vue'
import Node8 from './nodes/ProductNode.vue'
import Node9 from './nodes/InsideRangeNode.vue'
import Node10 from './nodes/TimeNode.vue'
import Node11 from './nodes/CanMessageNode.vue'
import Node12 from './nodes/NativeSignalNode.vue'
import Node13 from './nodes/CanDecodingNode.vue'
import axios from 'axios'



export default {
  name: 'drawflow',
  setup() {
    const listNodes = readonly([
      {
        name: 'Can Message',
        block_type: 0,
        color: '#49494970',
        item: 'Node11',
        input: 0,
        output: 1
      },
      {
        name: 'Can Decoding',
        block_type: 1,
        color: '#49494970',
        item: 'Node13',
        input: 1,
        output: 1
      },
      {
        name: 'Native Signal',
        block_type: 2,
        color: '#49494970',
        item: 'Node12',
        input: 0,
        output: 1
      },
      {
        name: 'Send to Cloud',
        block_type: 3,
        color: 'blue',
        item: 'Node2',
        input: 1,
        output: 0
      },
      {
        name: 'Store in Memory',
        block_type: 4,
        color: '#C077CC',
        item: 'Node3',
        input: 1,
        output: 1,
      },
      {
        name: 'Inside Range',
        block_type: 5,
        color: '#ff9999',
        item: 'Node9',
        input: 1,
        output: 2
      },
      {
        name: 'Product',
        block_type: 6,
        color: '#ff9900',
        item: 'Node8',
        input: 1,
        output: 1
      },
      {
        name: 'Division',
        block_type: 7,
        color: '#ff9900',
        item: 'Node7',
        input: 1,
        output: 1
      },
      {
        name: 'Sum',
        block_type: 8,
        color: '#ff9900',
        item: 'Node5',
        input: 1,
        output: 1
      },
      {
        name: 'Difference',
        block_type: 9,
        color: '#ff9900',
        item: 'Node6',
        input: 1,
        output: 1
      },
      {
        name: 'Time',
        block_type: 10,
        color: '#ff9900',
        item: 'Node10',
        input: 0,
        output: 1
      },
    ])

    const editor = shallowRef({})
    const dialogVisible = ref(false)
    const dialogData = ref({})
    const Vue = { version: 3, h, render };
    const internalInstance = getCurrentInstance()
    internalInstance.appContext.app._context.config.globalProperties.$df = editor;

    function exportEditor() {
      dialogData.value = editor.value.export();
      dialogVisible.value = true;
    }

    function sendRequestToParser() {
      const exportedData = editor.value.export();
      const minifiedData = minify.minify(exportedData, listNodes);
      axios.post('http://localhost:8081/api/v1/graph/samsasm', minifiedData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    const drag = (ev) => {
      if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
      } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      }
    }
    const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if (parentdrawflow != null) {
          addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }

    }
    const allowDrop = (ev) => {
      ev.preventDefault();
    }

    let mobile_item_selec = '';
    let mobile_last_move = null;
    function positionMobile(ev) {
      mobile_last_move = ev;
    }

    function addNodeToDrawFlow(name, pos_x, pos_y) {
      pos_x = pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
      pos_y = pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));

      const nodeSelected = listNodes.find(ele => ele.item == name);
      editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, nodeSelected.data || {}, name, 'vue');

    }


    onMounted(() => {

      var elements = document.getElementsByClassName('drag-drawflow');
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchend', drop, false);
        elements[i].addEventListener('touchmove', positionMobile, false);
        elements[i].addEventListener('touchstart', drag, false);
      }

      const id = document.getElementById("drawflow");
      editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
      editor.value.start();

      editor.value.registerNode('Node2', Node2, {}, {});
      editor.value.registerNode('Node3', Node3, {}, {});
      editor.value.registerNode('Node5', Node5, {}, {});
      editor.value.registerNode('Node6', Node6, {}, {});
      editor.value.registerNode('Node7', Node7, {}, {});
      editor.value.registerNode('Node8', Node8, {}, {});
      editor.value.registerNode('Node9', Node9, {}, {});
      editor.value.registerNode('Node10', Node10, {}, {});
      editor.value.registerNode('Node11', Node11, {}, {});
      editor.value.registerNode('Node12', Node12, {}, {});
      editor.value.registerNode('Node13', Node13, {}, {});

      editor.value.import({ "drawflow": { "Home": { "data": { "4": { "id": 4, "name": "Node8", "data": {}, "class": "Node8", "html": "Node8", "typenode": "vue", "inputs": { "input_1": { "connections": [] } }, "outputs": { "output_1": { "connections": [{ "node": "5", "output": "input_2" }] } }, "pos_x": 611.5714285714286, "pos_y": 268 }, "5": { "id": 5, "name": "Node7", "data": {}, "class": "Node7", "html": "Node7", "typenode": "vue", "inputs": { "input_1": { "connections": [{ "node": "4", "input": "output_1" }] } }, "outputs": { "output_1": { "connections": [{ "node": "6", "output": "input_1" }] } }, "pos_x": 1045.4285714285713, "pos_y": 208 }, "6": { "id": 6, "name": "Node3", "data": {}, "class": "Node3", "html": "Node3", "typenode": "vue", "inputs": { "input_1": { "connections": [{ "node": "5", "input": "output_1" }] } }, "outputs": {}, "pos_x": 1526, "pos_y": 206.42857142857142 } } } } });


    })

    return {
      exportEditor, listNodes, drag, drop, allowDrop, dialogVisible, dialogData, sendRequestToParser
    }

  }
}

</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #494949;
}

.container {
  min-height: calc(100vh - 100px);
}

.column {
  border-right: 1px solid #494949;
}

.column ul {
  padding-inline-start: 0px;
  padding: 10px 10px;

}

.column li {
  background: transparent;
}

.node {
  border-radius: 8px;
  border: 2px solid #494949;
  display: block;
  height: 60px;
  line-height: 40px;
  padding: 10px;
  margin: 10px 0px;
  cursor: move;

}

#drawflow {
  width: 100%;
  height: 100%;
  text-align: initial;
  background: #2b2c30;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);

}
</style>