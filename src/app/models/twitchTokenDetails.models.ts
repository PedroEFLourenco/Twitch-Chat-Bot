import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TwitchTokenDetails {

    @IsNotEmpty()
    @IsString()
    access_token: string;

    @IsNotEmpty()
    @IsString()
    refresh_token: string;

    @IsNotEmpty()
    @IsNumber()
    expires_in_secs: number;

    @IsNotEmpty()
    @IsArray()
    scope: string[];

    @IsNotEmpty()
    @IsString()
    token_type: string;

    constructor(
        access_token: string,
        refresh_token: string,
        expires_in_secs: number,
        scope: string[],
        token_type: string
    ) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in_secs = expires_in_secs;
        this.scope = scope;
        this.token_type = token_type;

    }

}