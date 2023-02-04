import crypto  from 'crypto';
import querystring  from 'qs';
import dateFormat from 'dateformat';
const { detailorder} = require('../controller/order')
function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
 
  export const CreatePayment = async (req, res) => {
    // try {
    var ipAddr = '127.0.0.1';
    const {total}=req.body;
    const {name}=req.body;
    const {phone}=req.body;
    const {email}=req.body;
    const {checkins}=req.body;
    const {checkouts}=req.body;
    const {statusorder}=req.body;
    const {id_order} = req.body
    // var total = req.body.amount;
    
  
    

    // const {_id} = detailorder
    // console.log(_id)
    const vnp_TmnCode = 'J17L9NNN';
    const vnp_HashSecret = 'VAMHNWPTSMHQARDWIKAWVMTOLXQHCCGO';
    const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const vnp_ReturnUrl = `http://localhost:3000/profile/order/bill/${id_order}`;
    var tmnCode = vnp_TmnCode;
    var secretKey = vnp_HashSecret;
    var vnpUrl = vnp_Url;
    var returnUrl = vnp_ReturnUrl;
  
    var date = new Date();
    
    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
   
    var amount = req.body.amount;
    var bankCode = "NCB";
  
    var orderInfo = req.body.name;
    var orderType = "billpayment";
    var locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_OrderInfo'] = "Thanh toan hoa don";
    // vnp_Params['vnp_checkins']=checkins;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    // vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = total * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    // if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode ;
    // }
  
    vnp_Params = sortObject(vnp_Params);
    
    
    var signData = querystring.stringify(vnp_Params, { encode: false });
    
    var hmac = crypto.createHmac('sha512', secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
  
    console.log('vnpUrl', vnpUrl);
    return res.status(200).json({
      redirect: vnpUrl,
    });
    // } catch (error) {
    //   return res.status(400).json({
    //     message: 'Tạo giao dịch không thành công!',
    //   });
    // }
  };

    export const RertunPayment = async (req, res) => {
      const {order}=req.body;
      const {room}=req.body;
    
    // logic dùng window.location.search để lấy full param +&idUser=...
    //Fe truyền xuống đầy đủ thông tin trên URL dc trả về và idUser lấy các thông tin để lưu bill
    var vnp_Params = req.query;
    console.log(vnp_Params);
    var secureHash = vnp_Params["vnp_SecureHash"];
  
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
  
    vnp_Params = sortObject(vnp_Params);
    console.log("vnp_Params", vnp_Params);
  
    //   var config = require("config");
    //   var tmnCode = "71JUNFKK";
    var secretKey = "VAMHNWPTSMHQARDWIKAWVMTOLXQHCCGO";
  
    //   var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    //   var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    console.log(123, signed);
    console.log("secureHash", secureHash);
    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      console.log(1, vnp_Params["vnp_ResponseCode"]);
      // Order.findOneAndUpdate({_id: id_order}, {methodpay:"2"}, {new:true}).exec
      return res.status(200).json({
        message: vnp_Params
        

      });
    
    } else {
      console.log(2);
      res.render("success", { code: "97" });
    }
  };