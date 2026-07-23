/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from 'react';
import { validateStep } from "../utils/validation";
import type { MultiStepFormData, StepAction, StepContextType, FormErrors } from '../utils/types';

const initialFormData: MultiStepFormData = {
    name: '',
    email: '',
    phone: '',
    plan: 'arcade',
    onlineService: false,
    largerStorage: false,
    customizableProfile: false,
};

type State = {
    activeStep: number,
    formData: MultiStepFormData,
    errors: FormErrors
}

const initialState: State = {
    activeStep: 2,
    formData: initialFormData,
    errors: {},
}

function stepReducer(state: State, action: StepAction) {
    switch (action.type) {
        case "NEXT_STEP": {
            const { isValid, errors } = validateStep(state.activeStep, state.formData);
            
            if (!isValid) {
                return {
                    ...state,
                    errors: errors,
                }
            }
            
            return {
                ...state, 
                activeStep: Math.min(state.activeStep + 1, 4),
                errors: {},
            }
        }
        
        case "PREV_STEP":
            return {
                ...state, 
                activeStep: Math.max(state.activeStep - 1, 1),
                errors: {}
            }

        case "SET_STEP":
            return {
                ...state, 
                activeState: action.payload,
                errors: {}
            }
        
        case "UPDATE_FORM_DATA":
            return {
                ...state,
                formData: {...state.formData, ...action.payload}
            }
        
        case "SET_ERRORS":
            return {
                ...state,
                errors: action.payload
            }

        default:
            return state;
    }
}

export const StepContext = createContext<StepContextType | undefined>(undefined);

export default function StepProvider({ children } : { children : React.ReactNode }) {
    const [state, dispatch] = useReducer(stepReducer, initialState);
    
    return (
        <StepContext.Provider value={{
            activeStep: state.activeStep,
            formData: state.formData,
            errors: state.errors,
            dispatch,
        }}>
            {children}
        </StepContext.Provider>
    )
}
