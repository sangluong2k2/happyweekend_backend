import crypto  from 'crypto';
import querystring  from 'qs';
import dateFormat from 'dateformat';
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
  
    
  
    const vnp_TmnCode = 'NWEMBZUX';
    const vnp_HashSecret = 'VCRGNIKYILGNQDELWDUTKHRVWZWQMZEO';
    const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const vnp_ReturnUrl = 'http://localhost:4000/order/vnpay_return';
    var tmnCode = vnp_TmnCode;
    var secretKey = vnp_HashSecret;
    var vnpUrl = vnp_Url;
    var returnUrl = vnp_ReturnUrl;
  
    var date = new Date();
  
    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
  
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }
  
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