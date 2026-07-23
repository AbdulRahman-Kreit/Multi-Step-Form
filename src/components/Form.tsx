import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

import Steps from "./Steps";
import YourInfo from "./YourInfo";
import SelectPlan from "./SelectPlan";
import AddOns from "./AddOns";
import Summary from "./Summary";

export default function Form() {
    const { activeStep } = useContext(StepContext);

    return (
        <div className="flex flex-col md:flex-row w-full md:w-220 lg:w-248 md:h-154
        lg:h-174 bg-white p-4 rounded-lg shadow-xl">
            <Steps />
            { activeStep === 1 ? 
                <YourInfo /> : 
                activeStep === 2 ?
                <SelectPlan /> : 
                activeStep === 3 ?
                <AddOns /> : 
                activeStep === 4 ?
                <Summary /> :
                <div className="">404 - Page not Found</div>
            }
            
        </div>
    )
}
