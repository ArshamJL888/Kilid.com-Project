import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

function EditValidation() {

    const { t } = useTranslation();

    const schema = z.object({
        name: z.string()
            .min(1, { message: t("First Name Must be at least 1 character") }),
        fname: z.string()
            .min(1, { message: t("Last Name Must be at least 1 character") })
    })

    return zodResolver(schema);
}

export default EditValidation;