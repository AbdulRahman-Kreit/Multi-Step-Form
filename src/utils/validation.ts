import type { MultiStepFormData, FormErrors } from "./types";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,15}$/;

export function validateStep(
    step: number,
    formData: MultiStepFormData,
) : { isValid: boolean; errors: FormErrors } {
    const errors: FormErrors = {};

    switch (step) {
        case 1:
            if (!formData.name.trim()) {
                errors.name = 'Name is required!';
            }

            if (!formData.email.trim()) {
                errors.email = 'Email address is required!';
            } else if (!EMAIL_REGEX.test(formData.email)) {
                errors.email = 'Invalid email address!';
            }

            if (!formData.phone.trim()) {
                errors.phone = 'Phone number is required!';
            } else if (!PHONE_REGEX.test(formData.phone)) {
                errors.phone = 'Invalid phone number!';
            }
            break;
        case 2:
            if (!formData.plan) {
                errors.plan = 'Please select a plan!';
            }
            break;
        default:
            break;
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}