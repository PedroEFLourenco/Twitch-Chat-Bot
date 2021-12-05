export class InvalidTwitchConfigError extends Error {
    name = 'InvalidTwitchConfigError'

    constructor(errorMessage: string) {
        super();
        this.message = errorMessage;
    }
} 

export class NoTwitchResponseError extends Error {
    name = 'NoTwitchResponseError'

    constructor(errorMessage: string) {
        super();
        this.message = errorMessage;
    }
} 

export class InvalidTwitchResponseError extends Error {
    name = 'InvalidTwitchResponseError'

    constructor(errorMessage: string) {
        super();
        this.message = errorMessage;
    }
} 

export class TwitchResponseError extends Error {
    name = 'TwitchResponseError'

    constructor(errorMessage: string) {
        super();
        this.message = errorMessage;
    }
} 

export class MalformedTwitchRequestError extends Error {
    name = 'MalformedTwitchRequestError'

    constructor(errorMessage: string) {
        super();
        this.message = errorMessage;
    }
} 