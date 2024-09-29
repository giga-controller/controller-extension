import z from "zod";

export const detailsSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const defaultDetailsState = {
    email: "",
    password: "",
}
