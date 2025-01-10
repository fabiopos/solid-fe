export class NoTokenError extends Error {
    constructor(message: string) {
      super(message);
    }
  }

  export class NoAuthError extends Error {
    constructor(message: string) {
      super(message);
    }
  }