// Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
const { OpenAIChat } = require('langchain/llms/openai');

// Import the Chains module
const { LLMChain } = require('langchain/chains');

// Import the PromptTemplate module
const { PromptTemplate } = require('langchain/prompts');

const generateComponent = async ({ componentDescription }) => {

    // Instantiante the OpenAI model
    // Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. 
    // The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
    const model = new OpenAIChat({
        openAIApiKey: process.env.CHATGPT_TOKEN,
        temperature: 0.9,
        modelName: 'gpt-3.5-turbo',
    });

    //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input
    //Note the input variables {chat_history} and {input}
    const template = `
        I want you to act as a vue component api. don't include any explanations in your responses. For each request return the requested vue component structured in the following way:
        
        {{
            template: "
                <button @click='handleClick' class='red-button' style='background-color: red; color: white; border: none; padding: 10px 20px; cursor: pointer;'>{{{{buttonText}}}}</button>
            ",
            data: {{
                buttonText: "Click me!"
            }},
            lifecycleHooks: {{
                created() {{
                    console.log('component created');
                }}
            }},
            methods: {{
                handleClick() {{
                    console.log("Button clicked!");
                }}
            }}
        }}
        
        This is how all output should be structured, the provided example is of a red button. All styles should be included in line with the template. All lifecycleHooks should be stored together etc.
        Please do not provide any additional response other than the code itself. Don't include the question in your response either, just code and nothing else.
        Please provide a vue component with the following description: {componentDescription} in the specified structure. Never return any comments in the ouput`;
    
        const sfcTemplate = `
            I want you to act as a vue component api. don't include any explanations in your responses. For each request return a vue sfc as a text string, do not format it as code, the start of the output should be the template tag.
            Please do not provide any additional response other than the code itself. Don't include the question in your response either, just code and nothing else.
            Please provide a vue component with the following description: {componentDescription} in the specified structure. Feel free to add comments to the code.`;

    //Instantiate "PromptTemplate" passing the prompt template string initialized above
    const prompt = PromptTemplate.fromTemplate(template);
    const sfcPrompt = PromptTemplate.fromTemplate(sfcTemplate);

    //Instantiate LLMChain, which consists of a PromptTemplate, an LLM and memory.
    const chain = new LLMChain({ llm: model, prompt });
    const sfcChain = new LLMChain({ llm: model, prompt: sfcPrompt });

    console.log({ componentDescription });

    const [response, sfcResponse] = await Promise.all([chain.call({ componentDescription }), sfcChain.call({ componentDescription })]);
    console.log({ response, sfcResponse });

    return {
        data: response.text,
        code: sfcResponse.text,
    };
};

module.exports = {
    generateComponent,
};
