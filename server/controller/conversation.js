const Conversation = require("../model/conversation");

const createCoversation = async (req, res) => {
    try {
        const { groupTitle,senderId, receiverId } = req.body;

        const isConversationExist = await Conversation.findOne({ groupTitle });

        if (isConversationExist) {
            const conversation = isConversationExist;
            return res.status(201).json({
                success: true,
                conversation,
            });
        } else {
            const conversation = await Conversation.create({
                members: [senderId, receiverId],
                groupTitle: groupTitle,
            });

            return res.status(201).json({
                success: true,
                conversation,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: {
                $in: [req.params.userId],
            },
        }).sort({ updatedAt: -1, createdAt: -1 });

        return res.status(201).json({
            success: true,
            conversations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    };
}

const findConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: {
                $all: [req.params.firstId,req.params.secondId],
            },
        });

        return res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    };
}

const updateLastMessage = async (req, res) => {
    try {
        const { lastMessage, lastMessageId } = req.body;

        const conversation = await Conversation.findByIdAndUpdate(req.params.conversationId, {
            lastMessage,
            lastMessageId,
        });

        return res.status(201).json({
            success: true,
            conversation,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}

module.exports = { getConversations, createCoversation, findConversation, updateLastMessage};