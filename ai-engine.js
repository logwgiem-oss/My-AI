// Import the official Web-LLM core engine directly from a verified module source
import * as webllm from "https://esm.run";

export class BrowserAI {
    static async init(modelUrl, progressCallback) {
        console.log("[Engine] Initializing connection to custom GGUF:", modelUrl);
        
        // Extract the filename from your Hugging Face link
        const modelId = modelUrl.split('/').pop().replace('.gguf', '');

        // Spin up the native browser compilation engine targeting your custom file structure
        const engine = await webllm.CreateMLCEngine(modelId, {
            initProgressCallback: (report) => {
                if (progressCallback) progressCallback(report.text);
            },
            appConfig: {
                model_list: [
                    {
                        model: modelUrl,
                        model_id: modelId,
                        // Links directly to the official browser execution bundle for Qwen 1.5B
                        model_lib: "https://githubusercontent.com"
                    }
                ]
            }
        });
        return engine;
    }
}
