import OpenAI from "openai";
import config from 'config'
import {createReadStream} from 'fs'

class OpenAIClass {

    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system'
    }

    constructor(apiKey) {
        this.openai = new OpenAI({
            apiKey,
        });
    }

    async chat(messages) {
        console.log(messages, 'messages')
        try {
            const res = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages
            });
            console.log(res, 444)
            return res.choices[0].message

        } catch (e) {
            console.log('Error while gpt chat', e.message)
        }
    }

    async transcription(filePath) {
        try {
            const response = await this.openai.audio.transcriptions.create({
                file: createReadStream(filePath),
                model: 'whisper-1'
            })
            return response.text

        } catch (e) {
            console.log('Error while transcription', e.message)
        }
    }
}

export const openai = new OpenAIClass(config.get('OPENAI_KEY'))