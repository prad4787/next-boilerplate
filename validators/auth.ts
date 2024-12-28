import { z } from "zod"
const loginFormSchema =  z.object({
    email: z.string().email(),
    // password: z.string().min(8),
})
export {
    loginFormSchema
}