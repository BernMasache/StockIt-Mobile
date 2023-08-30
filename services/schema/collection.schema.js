import * as yup from 'yup';

export function CollectionSchema() {
    return (() => yup.object().shape({
        collection: yup
            .number()
            .required("Collection is required"),
        numberOfDays: yup
            .number()
            .required("Number of days is required"),
        shareShop: yup
            .number()
            .required("Share for the shop is required"),
        expenses: yup
            .number(),
        comment: yup
            .string(),
        rentalFare: yup
            .number()
            .required("Monthly rent is required"),
        dateCollected: yup.date().required("Date is required"),
    }))
}

export function RemoveCollectionSchema() {
    return (() => yup.object().shape({
        code: yup.string().required(),
        confirmCode: yup
            .string()
            .required("confirmation code is required")
            .oneOf([yup.ref("code")], "confirmation code mismatch"),
    }))
}

export function UpdateCollectionSchema() {
    return (() => yup.object().shape({
        id: yup.string().required("Required field"),
        collection: yup.string().matches(/^[A-Za-z ]+$/, "Invalid input format").required("Required field"),
        dateCollected: yup.string().matches(/^[A-Za-z ]+$/, "Invalid input format").required("Required field"),
        rentalFare: yup.string().required("Required field"),
        numberOfDays: yup.string().required("Required field"),
        shareShop: yup.bool().default(false).required("Required field"),
        expenses: yup.number(),
        comment: yup.string(),
    }))
}