import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

function AgencyValidation() {

    const { t } = useTranslation();

    const schema = z.object({
        password: z.string()    
            .min(3, { message: t("Password must be more than 3 characters") }),
        repeatPassword: z.string()
            .refine(data => data.repeatPassword === data.password, { message: t("Repeat Password is not match to Password") }),
        mphone: z.string()
            .min(11, { message: t("Mobile Number Must be 11 Digits") })
            .max(11, { message: t("Mobile Number Must be 11 Digits") })
            .regex(/^09[0-9]{9}$/i, { message: t("Mobile Number Format Must be 09XXXXXXXXX") }),
        aphone: z.string().default("0"),
        aname: z.string()
            .min(3, { message: t("Name must be more than 3 characters") }),
        mfamily: z.string()
            .min(3, { message: t("Family must be more than 3 characters") }),
        acity: z.string()
            .min(2, { message: t("City must be more than 2 characters") }),
        mname: z.string()
            .min(3, { message: t("Name must be more than 3 characters") }),
        empCount: z.string().default("0"),

    })

    return zodResolver(schema);
}

export default AgencyValidation;