import mongoose, { Schema } from "mongoose";
// Importing mongoose and its Schema class to define the structure of documents in MongoDB collections.

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// Importing a plugin for MongoDB aggregation that supports pagination of aggregation results. This is useful when dealing with large datasets.

const videoSchema = new Schema({
    // Schema for video data, defining structure, types, and constraints for each field.

    videoFile: {
        type: String,    // The URL of the video file, likely stored on a cloud service like Cloudinary.
        required: true,  // This field is mandatory.
    },
    thumbnail: {
        type: String,    // The URL for the video's thumbnail image, also stored on a cloud service.
        required: true,  // This field is mandatory.
    },
    title: {
        type: String,    // The title of the video.
        required: true,  // This field is mandatory.
    },
    description: {
        type: String,    // The description of the video.
        required: true,  // This field is mandatory.
    },
    duration: {
        type: Number,    // Duration of the video, stored as a number (in seconds).
        required: true,  // This field is mandatory.
    },
    views: {
        type: Number,    // The number of views the video has received.
        default: 0,      // Default value is set to 0, representing no views initially.
    },
    isPublished: {
        type: Boolean,   // A flag to indicate if the video is published or not.
        default: true,   // By default, videos are published when created.
    },
    owner: {
        type: Schema.Types.ObjectId,    // A reference to the User document who uploaded the video.
        ref: "User"                    // The reference points to the "User" collection in MongoDB.
    }
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields to the schema.
});

// Adding the `mongooseAggregatePaginate` plugin to enable pagination on aggregation queries.
videoSchema.plugin(mongooseAggregatePaginate);

// Exporting the Video model, which can be used to interact with the 'videos' collection in MongoDB.
export const Video = mongoose.model("Video", videoSchema);
