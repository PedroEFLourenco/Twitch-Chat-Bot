import { ChatBotConfig } from './../config/config.model';
import { TwitchTokenDetails } from './../models/twitchTokenDetails.models';
import { TwitchTokenResponseValidator } from './../utils/TwitchTokenResponseValidator';
import { MalformedTwitchRequestError, NoTwitchResponseError, TwitchResponseError } from '../models/error.model';


export class TwitchChatBot {

    tmi = require('tmi.js');

    public twitchClient: any;
    private tokenDetails!: TwitchTokenDetails;

    constructor(private config: ChatBotConfig) { }

    async launch() {
        this.tokenDetails = await this.fetchAccessToken();
        this.twitchClient = new this.tmi.Client(
            this.buildConnectionConfig(
                this.config.twitchChannel,
                this.config.twitchUser,
                this.tokenDetails.access_token)
        );
        this.setupBotBehavior();
        this.twitchClient.connect();
    }

    private async fetchAccessToken(): Promise<TwitchTokenDetails> {
        const axios = require('axios');
        console.log("Fetching Twitch OAuth Token");
        return axios({
            method: 'post',
            url: this.config.twitchTokenEndpoint,
            params: {
                client_id: this.config.twitchClientId,
                client_secret: this.config.twitchClientSecret,
                code: this.config.twitchAuthorizationCode,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost'

            },
            responseType: 'json'
        }).then(async function (response: any) {
            // handle success
            return await TwitchTokenResponseValidator.parseResponse(response.data);
        }).catch(function (error: any) {
            console.log("Failed to get Twitch OAuth Token");
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new TwitchResponseError(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw new NoTwitchResponseError(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new MalformedTwitchRequestError(error.request);
            }
        })
    }

    refreshTokenIfNeeded() {
        //TODO if needed - twitch apparently only requires the token on login so it is good enough for now to just get a token on start-up.
    }

    private setupBotBehavior() {
        this.twitchClient.on('message', (channel: any, tags: any, message: any, self: any) => {
            let helloCommand = "!hello"

            //! means a command is coming by, and we check if it matches the command we currently support
            if (message.startsWith('!') && message === helloCommand)
                this.sayHelloToUser(channel,tags);
        });
    }

    private sayHelloToUser(channel: any, tags: any) {
            this.twitchClient.say(channel, `Hello, ${ tags.username }! Welcome to the channel.`);
    }

    private buildConnectionConfig(channel: string, username: string, accessToken: string) {
        return {
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: `${username}`,
                password: `oauth:${accessToken}`
            },
            channels: [`${channel}`]
        };
    }
}


