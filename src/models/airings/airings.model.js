import { Schema, model } from "mongoose";

const airings_schema = new Schema(
    {
        startTime: Date,
        endTime: Date,
        duration: Number,
        qualifiers: [String],
        channels: [String],
        stationId: String,
        ratings: [
            {
                body: String,
                code: { type: String, uppercase: true },
            },
        ],
        program: {
            tmsId: String,
            rootId: String,
            seriesId: String,
            subType: String,
            title: String,
            releaseYear: Number,
            releaseDate: String,
            origAirDate: String,
            titleLang: String,
            descriptionLang: String,
            entityType: String,
            genres: [String],
            longDescription: String,
            shortDescription: String,
            topCast: [String],
            ratings: [
                {
                    body: String,
                    code: String,
                },
            ],
            preferredImage: {
                width: String,
                height: String,
                uri: String,
                category: String,
                text: String,
                primary: String,
                tier: String,
            },
        },
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() },
    },
    { versionKey: false }
);

airings_schema.index({ "program.tsmId": 1 });

const Airings = model("Airings", airings_schema);

export default Airings;
