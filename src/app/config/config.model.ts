
import { IsNotEmpty, IsString } from "class-validator";

export class ChatBotConfig {

    @IsNotEmpty()
    @IsString()
    public twitchTokenEndpoint: string;

    @IsNotEmpty()
    @IsString()
    public twitchUser: string;

    @IsNotEmpty()
    @IsString()
    public twitchClientId: string;

    @IsNotEmpty()
    @IsString()
    public twitchClientSecret: string;

    @IsNotEmpty()
    @IsString()
    public twitchAuthorizationCode: string;

    @IsNotEmpty()
    @IsString()
    public twitchChannel: string;


    constructor(
        twitchTokenEndpoint: string,
        twitchUsername: string,
        twitchClientId: string,
        twitchClientSecret: string,
        twitchAuthorizationCode: string,
        twitchChannel: string
    ) {
        this.twitchTokenEndpoint = twitchTokenEndpoint;
        this.twitchUser = twitchUsername;
        this.twitchClientSecret = twitchClientSecret;
        this.twitchChannel = twitchChannel;
        this.twitchClientId = twitchClientId;
        this.twitchAuthorizationCode = twitchAuthorizationCode;
    }
}