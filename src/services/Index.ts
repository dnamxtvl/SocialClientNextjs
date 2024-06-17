import AuthService from "./AuthService";
import ConversationService from "./ConversationServices";

const services = {
  auth: new AuthService(),
  conversation: new ConversationService(),
};

export default services;
