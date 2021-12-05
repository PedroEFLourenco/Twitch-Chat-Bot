import { TwitchTokenDetails } from './../models/twitchTokenDetails.models';
import { validate } from "class-validator";
import { InvalidTwitchResponseError } from '../models/error.model';
export class TwitchTokenResponseValidator {

    public static async parseResponse(responseBody: string): Promise<TwitchTokenDetails> {
        var tokenResponse = JSON.parse(JSON.stringify(responseBody))

        try {
            console.info("Validating Twitch Response")

            let tokenDetails = new TwitchTokenDetails(
                tokenResponse.access_token,
                tokenResponse.refresh_token,
                tokenResponse.expires_in,
                tokenResponse.scope,
                tokenResponse.token_type
            );
            let completeConfigErrors = await validate(tokenDetails);

            if (completeConfigErrors.length > 0)
                throw new InvalidTwitchResponseError(`The answer from twitch token endpoint is not valid, 
                here are the issues: ${completeConfigErrors.join()}`)

            console.info("Twitch Response is valid.")
            return tokenDetails;

        } catch (err: unknown) {
            if (err instanceof InvalidTwitchResponseError)
                console.log(err.message)
            throw err
        }
    }
}