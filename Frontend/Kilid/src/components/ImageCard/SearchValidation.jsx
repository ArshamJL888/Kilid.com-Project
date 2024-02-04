import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

function SearchValidation() {

    const { t } = useTranslation();

    const schema = z.object({
        searchParam: z.string()
            .min(1, { message: t("Search Parameter Cannot be empty") }),
    })

    return zodResolver(schema);
}

export default SearchValidation;