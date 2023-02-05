import { ZodError } from "zod"

const zodErrorFormatter = (zodErr: ZodError): string => {
    let res = ""
    const errors = zodErr.errors
    errors.map(err => res += "[" + err.message + "]")
    return res
}

export default zodErrorFormatter