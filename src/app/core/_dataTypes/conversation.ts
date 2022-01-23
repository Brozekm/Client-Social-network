import {ClientMessage} from "./client-message";

export class Conversation {
  messages: ClientMessage[];

  constructor(messages?: ClientMessage[]) {
    messages ? this.messages = messages : this.messages = [];
  }

  public addMessage(message: ClientMessage){
    this.messages.push(message);
  }
}
