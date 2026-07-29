import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

// Components
import Steps from "./Steps";
import YourInfo from "./YourInfo";
import SelectPlan from "./SelectPlan";
import AddOns from "./AddOns";
import Summary from "./Summary";
import Thanks from "./Thanks";

export default function Form() {
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { activeStep, isPopupOpen } = context;

    const renderStepComponent = () => {
        if (activeStep === 4 && isPopupOpen) {
            return <Thanks />;
        }

        switch (activeStep) {
            case 1:
                return <YourInfo />;
            case 2:
                return <SelectPlan />;
            case 3:
                return <AddOns />;
            case 4:
                return <Summary />;
            default:
                return <div>404 - Page not Found</div>;
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full md:w-220 lg:w-248 
        md:h-154 lg:h-174 bg-white p-0 md:p-4 rounded-lg shadow-xl">
            <Steps />
            {renderStepComponent()}
        </div>
    );
}