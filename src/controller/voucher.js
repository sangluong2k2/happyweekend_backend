import Voucher from "../models/voucher"
import nodemailer from "nodemailer"
import User from "../models/users"

export const create = async (req,res) => {
    try{
        const add = await Voucher(req.body).save()
        res.json(add) 
    }catch(error){

    }
}

export const remove = async (req,res) => {
    try {
        const deleteVoucher = await Voucher.findOneAndDelete({_id:req.params.id}).exec()
        res.json(deleteVoucher)
    } catch (error) {
        
    }
}

export const update = async (req,res) => {
    try {
        const updateVoucher = await Voucher.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(updateVoucher)
    } catch (error) {
        
    }
}

export const getAll = async (req, res)=> {
    try {
        const getVoucher = await Voucher.find().sort({_id:-1}).exec()
        res.json(getVoucher)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        const voucher = await Voucher.find({ _id: req.params.id }).exec()
        res.json(voucher[0])
    } catch (error) {
        
    }
}

export const getByCode = async (req,res) => {
    try {
        const voucher = await Voucher.find({code: req.params.code }).exec()
        res.json(voucher[0])
    } catch (error) {
        
    }
}

const formatCurrency = (currency) => {
    const tempCurrency = +currency;
    return tempCurrency.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const formatDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  
    return `${hours}:${minutes}:${seconds} ${formatDate}/${month}/${date.getFullYear()}`;
  };

export const sendMail = async (req, res) => {
    const { user } = req.body;

    try {
        const userInfo = await User.findById(user).exec();
        const vouchers = await Voucher.find().exec();

        const voucherData = [];
        vouchers.forEach(item => {
            const { quantity, expriedTime, users, usersSendMail } = item;
            const today = new Date().getTime();
            const expriedTimeGetTime = new Date(expriedTime).getTime();

            if (
                quantity > 0 &&
                today < expriedTimeGetTime &&
                !users.includes(user) &&
                !usersSendMail.includes(user)
            ) {
                voucherData.push(item);
            }
        });

        if (voucherData.length) {
            const htmlVoucher = voucherData.map((item, index) => {
                return `
                <tr>
                    <td style="text-align: center;">${index + 1}</td>
                    <td style="padding: 8px 12px;">${item.code} (Giảm ${formatCurrency(item.discount)})</td>
                    <td style="padding: 8px 12px;">${formatDate(item.activeTime)} - ${formatDate(item.expriedTime)}</td>
                </tr>`;
            }).join("");
    
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "ngankien1111@gmail.com", // generated ethereal user
                    pass: "wlwfgvzqrekfpqwj", // generated ethereal password
                },
            });
    
            await transporter.sendMail({
                from: '"HappyWeekendHotel" <ngankien1111@gmail.com>',  // sender address
                to: `${userInfo.email}`, // list of receivers
                subject: "[HappyWeekendHotel] Chúc mừng bạn đã nhận được Voucher khuyến mãi", // Subject line
                html: `
                <div class="wrapper" style="background-color: #EFEFEF; padding: 0 15px;">
                    <div class="container" style="width: 700px; max-width: 100%; margin: 0 auto;">
                        <header style="text-align: center; padding: 12px 0;">
                            <h2>
                                <strong>Xin chào ${userInfo.name}</strong>
                                <p style="font-size: 16px; font-weight: normal;">Cảm ơn bạn đã tin tưởng và ủng hộ HappyWeekendHotel. Chúng tôi xin gửi tặng bạn mã Voucher cho những lần sử dụng dịch vụ tiếp theo!</p>
                            </h2>
                        </header>
                        <div class="content" style="padding-bottom: 32px;">
                            <h3 style="text-align: center;">
                                <strong>Thông tin Voucher</strong>
                            </h3>
                            <table table border="1" cellpadding="0" cellspacing="0" style="width:100%;">
                                <thead>
                                    <tr>
                                        <th style="font-weight: bold; padding: 8px; text-align: center;">STT</th>
                                        <th style="font-weight: bold; padding: 8px 12px; text-align: left;">Code</th>
                                        <th style="font-weight: bold; padding: 8px 12px; text-align: left;">Thời hạn sử dụng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${htmlVoucher}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `, // html body
            }, async (err) => {
                if (err) {
                    return res.json({
                        message: "lỗi",
                        err,
                    });
                }

                // lưu lại id user đã gửi mail thông báo.
                voucherData.forEach(async item => {
                    await Voucher.findByIdAndUpdate(item._id, {
                        ...item,
                        usersSendMail: item.usersSendMail.push(userInfo._id.toString())
                    }).exec();
                });
                return res.json({
                    message: `Đã gửi mail thành công cho tài khoản ${userInfo.email}`,
                });
            });
        } else {
            res.json({
                message: "Không tồn tại Voucher nào phù hợp!"
            })
        }
    } catch (error) {
        res.status(400).json(error);
    }
}