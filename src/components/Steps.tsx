import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

type Item = {
    id: number, 
    label: string,
    name: string
}

const stepsData: Item[] = [
    { id: 1, label: 'Step 1', name: 'Your Info' },
    { id: 2, label: 'Step 2', name: 'Select Plan' },
    { id: 3, label: 'Step 3', name: 'Add-Ons' },
    { id: 4, label: 'Step 4', name: 'Summary' },
];

export default function Steps() {
        const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { activeStep } = context;

    return (
        <div className={`flex flex-row md:flex-col items-center md:items-start 
        justify-between md:justify-start p-8 bg-[url('/bg-sidebar-mobile.svg')] 
        md:bg-[url('/bg-sidebar-desktop.svg')] bg-no-repeat bg-cover
        h-full md:w-1/3`}>
            {stepsData.map((step, index) => {
                return (
                    <div key={index} className="flex flex-row text-white
                    uppercase md:mb-8">
                        <span className={ step.id === activeStep ? 
                            `flex items-center justify-center 
                            w-9 h-9 rounded-full border-2 border-[#BEE2FF] 
                            bg-[#BEE2FF] text-[#022959] mr-4 text-[16px] 
                            font-medium` 
                            : 
                            `flex items-center justify-center 
                            w-9 h-9 rounded-full border-2 border-white mr-4 
                            text-[16px] font-medium`}>
                            {step.id}
                        </span>
                        <div className="hidden md:flex flex-col">
                            <span className="text-xs font-thin opacity-60">
                                {step.label}
                            </span>
                            <span className="text-sm font-semibold tracking-widest">
                                {step.name}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
