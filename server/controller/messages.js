const Messages = require("../model/messages");
const cloudinary = require("cloudinary");

const createMessage = async (req, res) => {
    try {
        const messageData = req.body;

      if (req.body.images) {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
          folder: "messages",
        });
        messageData.images = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      messageData.conversationId = req.body.conversationId;
      messageData.senderId = req.body.senderId;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        senderId: messageData.senderId,
        images: messageData.images ? messageData.images : undefined,
      });

        await message.save();

        return res.status(201).json({
            success: true,
            message,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}

const getMessages = async (req, res) => {
    try {
        const messages = await Messages.find({
            conversationId: req.params.conversationId,
        });

        res.status(201).json({
            success: true,
            messages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}

module.exports = { createMessage, getMessages};