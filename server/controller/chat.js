
const openChat = async ( ctx ) => {
  console.log( ctx )
  ctx.body = {
    success: true
  }
}

export default {
  openChat
}