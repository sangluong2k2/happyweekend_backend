import Voucher from "../models/voucher"


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
        const getVoucher = await Voucher.find().exec()
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