// Multi-step Form Data
export type MultiStepFormData = {
    name : string;
    email: string; 
    phone: string;

    plan: 'arcade' | 'advanced' | 'pro';

    onlineService: boolean;
    largerStorage: boolean;
    customizableProfile: boolean; 
}

// Validation Errors
export type FormErrors = Partial<Record<keyof MultiStepFormData, string>>;

// useReducer's Valid Actions
export type StepAction = 
    | { type: 'NEXT_STEP' }
    | { type: 'PREV_STEP' }
    | { type: 'SET_STEP'; payload: number }
    | { type: 'UPDATE_FORM_DATA'; payload: Partial<MultiStepFormData> }
    | { type: 'SET_ERRORS', payload: FormErrors };

// export type StepContextType = {
//     activeStep: number;
//     formData: MultiStepFormData;
//     isYearly: boolean,
//     errors: FormErrors;
//     dispatch: React.Dispatch<StepAction>;
// }