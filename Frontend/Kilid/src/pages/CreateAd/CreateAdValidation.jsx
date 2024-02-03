import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
function CreateAdValidation() {

    const { t } = useTranslation();

    const schema = z.object({
        city: z.string()
            .min(2, { message: t("You should enter at list 2 characters") }),
        usage: z.string(),
        type: z.string(),
        title: z.string()
            .min(2, { message: t("You should enter at list 2 characters") }),
        // details: z.string()
        //     .min(2, { message: t("You should enter at list 2 characters") }),
        zone: z.string()
            .min(2, { message: t("You should enter at list 2 characters") }),
        mortgage: z.string().min(0).default("0"),
        rentCost: z.string().min(0).default("0"),
        preCost: z.string().min(0).default("0"),
        sellCost: z.string().min(0).default("0"),
        area: z.string().regex(/^\d+$/i, {message: "تنها عدد مجاز است"}),
        age: z.string().regex(/^\d+$/i, {message: "تنها عدد مجاز است"}),
        photo: z.string().default(""),
        numOfRooms: z.string().default("1"),
        description: z.string().default(""),
        // parking: z.boolean().default(false),
        // lobby: z.boolean().default(false),
        // elevator: z.boolean().default(false),
        // pool: z.boolean().default(false),
        // sauna: z.boolean().default(false),
        // gym: z.boolean().default(false),
        // balcony: z.boolean().default(false),
        // jacuzzi: z.boolean().default(false),
        // buildingGuard: z.boolean().default(false),
        // rooftopGarden: z.boolean().default(false),
        // airCondition: z.boolean().default(false),
        // conferenceHall: z.boolean().default(false),
        // centralAntenna: z.boolean().default(false),
        // remoteControlledDoor: z.boolean().default(false),
    })

    return zodResolver(schema);
}

export default CreateAdValidation;