import { ChatBotConfig } from './src/app/config/config.model';
import { ConfigValidator } from './src/app/config/config-validator';
import { TwitchChatBot } from './src/app/chatBot/chatbot';


ConfigValidator.readConfig(('./config.json'))
.then((config: ChatBotConfig) =>  new TwitchChatBot(config).launch());














