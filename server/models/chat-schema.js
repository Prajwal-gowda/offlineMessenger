const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let chatSchema = new Schema(
  {
    sender: {
      type: String
    },
   message:{
       type:String
   },
   reciever:{
       type:String
   }
  },
  {
    collection: "chats"
  }
);

module.exports = mongoose.model("chats", chatSchema);
