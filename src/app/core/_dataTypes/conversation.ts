import {ClientMessage} from "./client-message";

export class Conversation {
  private _messages: ClientMessage[];

  constructor(messages?: ClientMessage[]) {
    messages ? this._messages = messages : this._messages = [];
  }

  public addMessage(message: ClientMessage){
    this._messages.push(message);
  }


  get messages(): ClientMessage[] {
    return this._messages;
  }


  set messages(value: ClientMessage[]) {
    this._messages = value;
  }
}
