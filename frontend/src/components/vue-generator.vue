<template>
    <div>
        <h1>Intelligent Vue Sandbox</h1>
        <h2>A vue component generator</h2>
        <input v-model="componentDescription" type="text" />
        <span><button :disabled="!componentDescription" @click="sendMessage()">Submit</button></span>
        <div class="messageBox">
            <template v-for="message in messages">
                <div v-if="message.from === 'user'" class="messageFromUser" :key="message.componentDescription">
                    <p><b>Component Description:</b> {{ message.data.componentDescription }}</p>
                </div>
                <div
                    v-if="message.from !== 'user' && !message.isCode"
                    class="messageFromChatGpt"
                    :key="message.componentDescription"
                >
                    <component :is="message.dynamicComponent" />
                </div>
                <div
                    v-if="message.isCode"
                    class="messageFromChatGpt"
                    :key="message.code"
                    v-text="message.code"
                >
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue/dist/vue.js'; // Use the full build

export default {
    name: 'ChatBox',
    data() {
        return {
            messages: [],
            componentDescription: null,
        };
    },

    methods: {
        async sendMessage() {
            const userMessage = `Component Description: ${this.componentDescription}\n`;
            console.log({ userMessage });
            this.messages.push({
                from: 'user',
                data: {
                    componentDescription: this.componentDescription,
                },
            });

            await axios
                .post('/api/vue-generator/generate-component', {
                    componentDescription: this.componentDescription,
                })
                .then((response) => {
                    const rawString = response.data.data;
                    // IMPORTANT: clean out any bad structure
                    const cleanString = rawString.replace(/\n\s+/g, '').replace(/(\r\n|\n|\r)/gm, "");
                    console.log({ cleanString})
                    console.log(cleanString)
                    const dynamicExports = eval('(' + cleanString + ')');
                    console.log({ dynamicExports });
                    console.log(dynamicExports);
                    const dynamicOptions = {
                        // template: `<div>{{ message }}</div>`,
                        template: `<div>${dynamicExports.template}</div>`,
                        computed: dynamicExports.computed || {},
                        methods: dynamicExports.methods || {},
                        data() {
                            return dynamicExports.data || {};
                        },
                        ...dynamicExports.lifecycleHooks,
                        // Handle styles if they are included in dynamicExports
                        // Note: Scoped styles might be trickier to handle
                        style: `<style>${dynamicExports.style}</style>`|| [],
                    };

                    // Safely create the dynamic component
                    const dynamicComponent = Vue.extend(dynamicOptions);
                    this.dynamicComponent = dynamicComponent;
                    this.messages.push({
                        componentDescription: this.componentDescription,
                        dynamicComponent,
                    });
                    console.log(response.data.code)
                    this.messages.push({
                        isCode: true,
                        code: response.data.code
                    })
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input,
select,
h4 > div {
    width: 300px;
    padding: 10px;
}

button {
    height: 40px;
    background-color: powderblue;
    padding: 10px;
}
.messageBox {
    height: 500px;
    background-color: gainsboro;
    margin: 0 15% 0 15%;
    margin-top: 20px;
    padding: 5%;
    overflow-y: auto;
    overflow-x: hidden;
}

.messageFromUser {
    text-align: right;
    background-color: aliceblue;
    border-radius: 10px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 30%;
    margin-left: 70%;
}

.messageFromChatGpt {
    text-align: left;
    background-color: antiquewhite;
    border-radius: 10px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    white-space: pre-wrap;
    overflow: hidden;
}
</style>
