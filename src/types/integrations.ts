import z from "zod";

export const integrationEnum = z.enum(["google", "slack", "linear"]);
