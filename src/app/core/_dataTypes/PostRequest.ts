export enum EnumPostType {
  NORMAL = "NORMAL",
  ANNOUNCEMENT = "ANNOUNCEMENT"
}

export class PostRequest{

  private readonly _message: string;

  private readonly _type: EnumPostType;

  constructor(message: string, type: EnumPostType) {
    this._message = message;
    this._type = type;
  }


  get message(): string {
    return this._message;
  }

  get type(): EnumPostType {
    return this._type;
  }
}
