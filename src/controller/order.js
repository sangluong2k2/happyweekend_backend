import Order from '../models/order'
import Room from '../models/room'
// import Basic from '../models/basic'
import Status from '../models/statusroom'
export const getall = async (req,res) =>{
    const list = await Order.find().exec()
    res.json(list)
}
export const orderroom = async (req,res) =>{
    const add = await new Order(req.body).save()
    res.json(add)
}
export const detailorder = async (req,res) =>{
    const order = await Order.findOne({ _id: req.params.id }).exec()
    const room = await Room.find({_id: order.room}).exec()
    // const basic = await Basic.find({_id: room.basic}).exec()
    // const status = await Status.find({_id: order.status}).exec()
    res.json({
        order:{
            name:order.name,
            phone:order.phone,
            email:order.email,
            total:order.total
        },
        room,
        // status,
        // basic
    }
    )
}

export const update = async (req,res) =>{
    const edit = await Order.findOneAndUpdate({ _id: req.params.id },req.body,{new:true})
    res.json(edit)
}

export const listUser = async (req,res) =>{
    const list = await Order.find({user: req.params.user}).exec()
    res.json(list)
}

export const sendMail = async (req,res) =>{
    const { email } =req.body
    const {name} = req.body
    const {room} = req.body
    const {checkins} = req.body
    const nodemailer = require('nodemailer');
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
   service:"Gmail",
    auth: {
      user: "ngankien1111@gmail.com", // generated ethereal user
      pass: "wlwfgvzqrekfpqwj", // generated ethereal password
    },
  });
  await transporter.sendMail({
    from: "ngankien1111@gmail.com", // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${name} đã đặt phòng ${room} thành công trong khoảng thời gian ${checkins} !`, // plain text body
    html: `<b>${name} đã đặt phòng ${room} thành công trong khoảng thời gian ${checkins} !</b>`, // html body
  },
  (err)=>{
    if(err){
        return res.json({
            message:"lỗi",
            err,
        });
    }
    return res.json({
        message:`đã gửi mail thành công cho tài khoản ${email}`,
    });
  }
  );
}