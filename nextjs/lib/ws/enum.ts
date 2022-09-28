enum EWSError {
  NO_TOPIC = "NO_TOPIC",
  NO_CONTACT = "NO_CONTACT"
}

enum EWSNotiType {
  POST = "post",                // update post metadata if user on this page
  NOTIFICATION = "notification" // owner notification
}


export {
  EWSError,
  EWSNotiType
}