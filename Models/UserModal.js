import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        profilePicture:String,
        coverPicture:String,
        about:String,
        livesIn:String,
        worksAt:String,
        relationShip:String,
        followers:[],
        following:[]
    },
    {timestamps:true}
)

const userModal = mongoose.model("Users",UserSchema)
export default userModal;