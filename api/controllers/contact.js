const Contact = require('../models/contact')

exports.sendMessage = async(req,res)=>{
    try {
        const message = req.body
        const contact = new Contact({...message})
        await contact.save()
        res.status(200).send({
            status: "message sent successful",
            message:{
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                message: contact.message
            }
        })
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}
//read message
exports.getMessages = async(req,res)=>{
 
        const messages = await Contact.find({})
        res.send(messages)
 }