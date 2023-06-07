import urlcat from "urlcat";
import { WEBSOCKET_URL } from "./serverUrl";
import { store } from "@redux/store";
/**
 * data = {
 *       url: "ws/chat",
 *       queryParams: {
 *           params1: "a",
 *           params2: "b"
 *       }
 *    }
 */
export class WebSocketClient {
  constructor(data) {
    this.url = data.url;
    this.queryParams = data.queryParams || {};
    this.store = store;
    this.websocket = null;
    this.onMessageHandler = null;
  }

  connect() {
    const url = this.constructUrlWithParams();
    if (url) {
      this.websocket = new WebSocket(url);
      this.websocket.onopen = this.onOpen.bind(this);
      this.websocket.onerror = this.onError.bind(this);
      this.websocket.onmessage = this.handleMessage.bind(this);
      this.websocket.onclose = this.onClose.bind(this);
    }
  }

  constructUrlWithParams() {
    const {
      currentUser: { id, sessionId },
    } = this.store.getState().auth;
    if (id && sessionId) {
      return urlcat(WEBSOCKET_URL, this.url, {
        ...this.queryParams,
        sid: sessionId,
        uid: id,
      });
    }
  }

  onOpen(event) {
    console.log("Websocket connection opened");
  }

  onError(event) {
    console.log("Websocket connection error", event);
  }

  onMessage(callback) {
    this.onMessageHandler = callback;
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (this.onMessageHandler) {
      this.onMessageHandler(message, event);
    }
  }

  sendMessage(message) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket connection is not open");
      // Add your custom logic for handling a closed connection
    }
  }

  onClose(event) {
    console.log("WebSocket connection closed:", event);
    // Add your custom logic for handling a closed connection
  }

  close() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}
