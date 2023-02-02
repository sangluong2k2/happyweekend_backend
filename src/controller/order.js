import Order from '../models/order'
import Room from '../models/room'
import DateBooked from "../models/dateBooked";

// import Basic from '../models/basic'
export const getall = async (req, res) => {
    const list = await Order.find().populate('room').select().exec()
    res.json(list)
}
export const orderroom = async (req, res) => {

    // const add = await new Order(req.body).save()
    // res.json(add)
    try {
        const payload = { ...req.body };
        payload.month = new Date(payload.checkouts).getMonth() + 1;
        payload.year = new Date(payload.checkouts).getFullYear();
        let duration = (((new Date(payload.checkouts).getTime() - new Date(payload.checkins)) / 1000) / 60) / 60;
        payload.duration = duration;
        const add = await new Order(payload).save()
        res.json(add)
    } catch (error) {
        res.status(400).json([])
    }
}
export const detailorder = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id }).populate("voucher").exec();
    const room = await Room.find({ _id: order.room }).exec()
    // const basic = await Basic.find({_id: room.basic}).exec()
    // const status = await Status.find({_id: order.status}).exec()

    let resultOrder = {
        name: order.name,
        phone: order.phone,
        email: order.email,
        total: order.total,
        checkins: order.checkins,
        checkouts: order.checkouts,
        statusorder: order.statusorder,
        methodpay:order.methodpay,
        voucher: order.voucher
    };
    if (order.user) resultOrder = {...resultOrder, user: order.user.toString()};

    res.json({
        order: resultOrder,
        room,
        // status,
        // basic
    }
    )
}

export const update = async (req, res) => {
    const edit = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(edit)
}

export const listUser = async (req, res) => {
    const list = await Order.find({ user: req.params.user }).populate('room').select().exec()
    // const room = await Room.findOne({_id: list._id})
    res.json(
        list,
        // list.order.ckeckins
        // ,room
    )
}
export const sendMail = async (req, res) => {
    const { email } = req.body
    const { name } = req.body
    const { room } = req.body
    const { phone } = req.body
    const { checkins } = req.body
    const { checkouts } = req.body
    const { total } = req.body
    const nodemailer = require('nodemailer');
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ngankien1111@gmail.com", // generated ethereal user
            pass: "wlwfgvzqrekfpqwj", // generated ethereal password
        },
    });
    await transporter.sendMail({
        from: "HappyWeekendHotel", // sender address
        to: `${email}`, // list of receivers
        subject: "HappyWeekendHootel", // Subject line
        text: `${name} đã đặt phòng ${room} thành công trong khoảng thời gian ${checkins} tới ngày ${checkouts} với giá tiền ${total}VNĐ!`, // plain text body
        html: `
    <div class="col-md-12">   
        <div class="row">
		
        <div class="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
            <div class="row">
    			<div class="receipt-header">
					<div class="col-xs-6 col-sm-6 col-md-6">
						<div class="receipt-left">
							<img class="img-responsive" alt="iamgurdeeposahan" src="https://bootdey.com/img/Content/avatar/avatar6.png" style="width: 71px; border-radius: 43px;">
						</div>
					</div>
					<div class="col-xs-6 col-sm-6 col-md-6 text-right">
						<div class="receipt-right">
							<h5>${name}</h5>
							<p>${phone} <i class="fa fa-phone"></i></p>
							<p>${email} <i class="fa fa-envelope-o"></i></p>
							<p>Việt Nam <i class="fa fa-location-arrow"></i></p>
						</div>
					</div>
				</div>
            </div>
			
			<div class="row">
				<div class="receipt-header receipt-header-mid">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-right">
							<h5>${name} </h5>
							<p><b>Mobile :</b> ${phone}</p>
							<p><b>Email :</b> ${email}</p>
							<p><b>Address :</b> Việt Nam</p>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-left">
							<h3>HÓA ĐƠN ĐẶT PHÒNG NHÀ NGHỈ HAPPYWEENKEND</h3>
						</div>
					</div>
				</div>
            </div>
			
            <div>
                <table class="table table-bordered">
                    <thead style="background: #414143 none repeat scroll 0 0">
                        <tr>
                            <th style="padding :13px 20px !important">Description</th>
                            <th style="padding :13px 20px !important" >Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-md-9">Tên phòng</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> ${room}</td>
                        </tr>
                        <tr>
                           
                        </tr>
                        <tr>
                            <td style="padding: 9px 20px !important" class="text-right">
                            <p>
                                <strong>Checkins </strong>
                            </p>
                            <p>
                                <strong>Checkout </strong>
                            </p>
							
							
							</td>
                            <td>
                            <p>
                                <strong><i class="fa fa-inr"></i> ${checkins}</strong>
                            </p>
                            <p>
                                <strong><i class="fa fa-inr"></i> ${checkouts}</strong>
                            </p>
							
							
							</td>
                        </tr>
                        <tr>
                           
                            <td class="text-right"><h2><strong>Total: </strong></h2></td>
                            <td class="text-left text-danger"  ><h2 style="color:#9f181c"><strong><i class="fa fa-inr"></i> ${total}</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div class="row">
				<div class="receipt-header receipt-header-mid receipt-footer">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-right">
							
							<h5 style="color: rgb(140, 140, 140);">Thanks for shopping.!</h5>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-left">
							<h1>HAPPYWEENKEND</h1>
						</div>
					</div>
				</div>
            </div>
			
        </div>    
	</div>
</div>
        `, // html body
    },
        (err) => {
            if (err) {
                return res.json({
                    message: "lỗi",
                    err,
                });
            }
            return res.json({
                message: `đã gửi mail thành công cho tài khoản ${email}`,
            });
        }
    );
}

export const checkUserBookRoom = async (req, res) => {
    const { user, room } = req.body;
    const condition = { statusorder: 3, user };
    if (room) {
        condition.room = room;
    }

    try {
        const isOrderExits = await Order.findOne(condition).exec();

        res.json({
            isBooked: isOrderExits ? true : false
        })
    } catch (error) {
        res.status(404).json(error);
    }
}

// thống kê doanh thu theo năm hoặc tháng 
export const getRevenue = async (req, res) => {
    const year = req.body.year || new Date().getFullYear();
    const month = req.body.month || new Date().getMonth() + 1;
    try {
        const order = await Order.find({
            month: month,
            year: year,
            statusorder: 3
        }).exec();
        res.status(200).json(order)
    } catch (error) {
        res.status(404).json(error);
    }
    // const _order = [];
    // order.map((item) => {
    //     if (new Date(item.checkins).getMonth() == month && new Date(item.checkins).getFullYear() == year) {
    //         _order.push(item)
    //     }
    // })
}

// thống kê doanh thu theo tháng
export const getRevenueByMonth = async (req, res) => {
    const year = req.body.year || new Date().getFullYear();
    try {
        const order = await Order.find({
            year: year,
            statusorder: 3
        }).exec();
        const data = {
            jan: [],
            feb: [],
            mar: [],
            apr: [],
            may: [],
            jun: [],
            jul: [],
            aug: [],
            sep: [],
            oct: [],
            nov: [],
            dec: [],
        };
        order.map((item) => {
            if (item.month === "1") {
                data.jan.push(item);
            }
            if (item.month === "2") {
                data.feb.push(item);
            }
            if (item.month === "3") {
                data.mar.push(item);
            }
            if (item.month === "4") {
                data.apr.push(item);
            }
            if (item.month === "5") {
                data.may.push(item);
            }
            if (item.month === "6") {
                data.jun.push(item);
            }
            if (item.month === "7") {
                data.jul.push(item);
            }
            if (item.month === "8") {
                data.aug.push(item);
            }
            if (item.month === "9") {
                data.sep.push(item);
            }
            if (item.month === "10") {
                data.oct.push(item);
            }
            if (item.month === "11") {
                data.nov.push(item);
            }
            if (item.month === "12") {
                data.dec.push(item);
            }
        });
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error);
    }
    // const _order = [];
    // order.map((item) => {
    //     if (new Date(item.checkins).getMonth() == month && new Date(item.checkins).getFullYear() == year) {
    //         _order.push(item)
    //     }
    // })

}

//công suất sử dụng phòng
export const getRoomOccupancy = async (req, res) => {
    try {
        let result = await Order.aggregate([
            { $match: { statusorder: "3" } },
            { $group: { _id: "$room", total: { $sum: "$duration" } } }
        ])
        let topRoom = [];
        const getDatarevenueByRoom = async (count, index) => {
            let i = index;
            if (i <= count) {
                const payload = (result[i]._id)
                // console.log(payload);
                await Room.find({ _id: payload })
                    .then((res) => {
                        if (res[0]) {
                            if ("name" in res[0]) {
                                result[i].name = res[0].name;
                            }
                        }
                        else {
                            result[i].name = "Phòng đã xóa";
                        }
                        topRoom.push(result[i]);
                    })
                    .then(async () => {
                        if (i === count) {
                            res.status(200).json(topRoom);
                        }
                    })
                    .then(() => {
                        if (i < count) {
                            i++;
                            getDatarevenueByRoom(count, i);
                        }
                    })
            }
        }
        getDatarevenueByRoom(result.length - 1, 0);
        // res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

// check trùng lặp thời gian
function areTwoDateTimeRangesOverlapping(incommingDateTimeRange, existingDateTimeRange) {
    return incommingDateTimeRange.start < existingDateTimeRange.end && incommingDateTimeRange.end > existingDateTimeRange.start
}

function areManyDateTimeRangesOverlapping(incommingDateTimeRange, existingDateTimeRanges) {
    return existingDateTimeRanges.some((existingDateTimeRange) => areTwoDateTimeRangesOverlapping(incommingDateTimeRange, existingDateTimeRange))
}

// kiểm tra phòng có khách hay không.
export const checkStatusRoom = async (req, res) => {
    const { checkin, checkout, room } = req.body;
    if (!checkin || !checkout || !room) {
        res.status(400).json("Vui lòng nhập đủ các trường!");
        return;
    }

    try {
        let isRoomEmpty;
        const dateBooks = await DateBooked.find().exec();
        const dateBookByRoom = dateBooks.filter(item => item.room.toString() === room);

        if (!dateBookByRoom.length) {
            isRoomEmpty = true;
        } else {
            const listDateByRoom = dateBookByRoom.map(item => {
                return {
                    start: new Date(item.dateFrom).getTime(),
                    end: new Date(item.dateTo).getTime()
                };
            });

            // trạng thái phòng trống.
            const status = areManyDateTimeRangesOverlapping({
                start: new Date(checkin).getTime(),
                end: new Date(checkout).getTime()
            }, listDateByRoom);

            isRoomEmpty = !status;
        }

        res.json({ isRoomEmpty });
    } catch (error) {
        res.status(404).json("Có mỗi xảy ra, vui lòng thử lại!");
    }
}