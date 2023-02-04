import mongoose,{Schema, ObjectId} from "mongoose";



const RomSchema = Schema({
    name:{
        type:String,
        // required:true,
        minLength: 5
    },
    slug:{
        type:String,
        // required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    image:{
        type: [],
    },
    price: [{
        brand:Number,
        title:String,
        value:Number
    }],
    description:{
        type: String,
        // required: true,
        minLength:5
    },
    status:{
        type:Boolean,
        default: true
    },
    category:{
        type: ObjectId,
        ref:"Category"
    },
    date: {
        type: ObjectId,
        ref: "dateBooked"
    },
    facilities:{
        type: ObjectId,
        ref: "Facilities"
    }
}, {timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }})

// list rating.
RomSchema.virtual("ratings", {
    ref: "Comment",
    foreignField: "room",
    localField: "_id"
});

RomSchema.pre(/^find/, function(next) {
    this.populate(["ratings", "listFacility"]);

    next();
});

RomSchema.virtual("ratingAvg").get(function() {
    let totalStar = 0;
    this.ratings.forEach(item => totalStar += +item.star);

    return ((totalStar / this.ratings.length) || 0).toFixed(1);
})

RomSchema.virtual("listFacility", {
    ref: "Facilities",
    foreignField: "room",
    localField: "_id"
})

export default mongoose.model("Room",RomSchema)