import AuthService from "./AuthService";
import ConversationService from "./ConversationServices";
import MessageService from "./Message.service";

const services = {
  auth: new AuthService(),
  conversation: new ConversationService(),
  message: new MessageService(),
};

export default services;
