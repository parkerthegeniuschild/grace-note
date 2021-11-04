import { object, string, number } from "yup";

const searchLineUpsSchema = object({
    api_key: string().required(),
    postalCode: string().length(5).required(),
    country: string().length(3).uppercase().required(),
    lineupsAmount: string().oneOf(["1"]),
})
    .strict()
    .noUnknown();

const getAiringsSchema = object({
    currentPage: number().positive(),
    limit: number().positive(),
    sort: string().oneOf(["asc", "desc"]),
}).noUnknown();

const updateAiringSchema = object({
    uri: string().required(),
})
    .strict()
    .noUnknown();

export { searchLineUpsSchema, getAiringsSchema, updateAiringSchema };
