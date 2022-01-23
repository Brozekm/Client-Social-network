export class UserMessage {

  targetUser: string;

  message: string;

  constructor(targetUser: string, message: string) {
    this.targetUser = targetUser;
    this.message = message;
  }
}
