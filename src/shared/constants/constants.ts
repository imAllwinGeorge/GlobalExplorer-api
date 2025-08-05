export enum HttpStatusCode {
  // ✅ Success responses
  OK = 200, // Request was successful (e.g., fetching data, updating without response body)
  CREATED = 201, // Resource successfully created (e.g., user registration, new booking)
  ACCEPTED = 202, // Request accepted for processing but not completed yet (e.g., background job)
  NO_CONTENT = 204, // Request successful but no content returned (e.g., deleting a resource)

  // ❌ Client errors
  BAD_REQUEST = 400, // Invalid request (e.g., missing fields, invalid data format)
  UNAUTHORIZED = 401, // Authentication required (e.g., user not logged in, invalid token)
  FORBIDDEN = 403, // Access denied (e.g., trying to access admin-only routes)
  NOT_FOUND = 404, // Requested resource not found (e.g., wrong ID, missing endpoint)
  METHOD_NOT_ALLOWED = 405, // HTTP method not supported (e.g., using GET instead of POST)
  CONFLICT = 409, // Conflict in request (e.g., duplicate email, already registered)
  PAYLOAD_TOO_LARGE = 413, // Request payload is too large (e.g., file upload exceeds limit)
  UNSUPPORTED_MEDIA_TYPE = 415, // Unsupported content type (e.g., sending XML instead of JSON)
  TOO_MANY_REQUESTS = 429, // Rate limiting (e.g., too many login attempts, API abuse)

  // ⚠️ Server errors
  INTERNAL_SERVER_ERROR = 500, // Generic server error (e.g., database failure, unhandled exception)
  NOT_IMPLEMENTED = 501, // Feature not implemented yet (e.g., unbuilt endpoint)
  BAD_GATEWAY = 502, // Server received invalid response from upstream (e.g., microservices failure)
  SERVICE_UNAVAILABLE = 503, // Server is down or overloaded (e.g., maintenance mode)
  GATEWAY_TIMEOUT = 504, // Upstream server timed out (e.g., long API response time)
}

export const DIRECT_CHAT_EVENTS = {
  SEND_MESSAGE: "direct-chat:send-message",
  RECEIVE_MESSAGE: "direct-chat:receive-message",
  READ_MESSAGE: "direct-chat:read-message",
  MARK_AS_READ: "direct-chat:mark-as-read",
};

export const NOTIFICATION_EVENT = {
  SEND_NOTIFICATION: "send:notification",
  READ_NOTIFICATION: "read:notification",
};

export const NOTIFICATION_TYPE = {
  BOOKING: "Booking",
  CACELLING: "Cancelling",
};
