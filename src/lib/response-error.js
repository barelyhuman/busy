export default function ResponseError ({ code, message, err }) {
  this.code = code
  this.message = message
  this.stack = new Error(err)
}
