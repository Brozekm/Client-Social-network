export enum EnumMessageState {
  OUTGOING,
  INGOING
}

export class ClientMessage {
  state: EnumMessageState;
  message: string;


  constructor(state: EnumMessageState, message: string) {
    this.state = state;
    this.message = message;
  }
}
