const ERR_KEY = "_toy_lc_err_";

export class LcErr {
  private readonly _key: string;
  private readonly _scopes: string[];
  private readonly _message: string;

  constructor(msg: string) {
    this._key = ERR_KEY;
    this._scopes = [];
    this._message = msg;
  }

  get key(): string {
    return this._key;
  }

  get scopes(): string[] {
    return [...this._scopes];
  }

  get message(): string {
    return this._message;
  }

  static isToyLcErr(obj: any): boolean {
    return obj && obj.key === ERR_KEY;
  }
}
