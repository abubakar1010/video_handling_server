import mongoose, {Schema} from "mongoose";

const playlistSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        description:{
            type: String,
            required: true,
            
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        videos:[
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ]


    },
    {
        timestamps: true
    }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)