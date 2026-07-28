import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

// Style Variables
import { stepContainer } from "../utils/styles";
import { headingContainer } from "../utils/styles";
import { heading } from "../utils/styles";
import { description } from "../utils/styles";
import { nextStepButton } from "../utils/styles";
import { goBackButton } from "../utils/styles";

export default function Summary() {
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { formData, dispatch } = context;

    const handleGoingBack = () => {
        dispatch({ type: "PREV_STEP" });
    };
    
    return (
        <div className={stepContainer}>
            <div className={headingContainer}>
                <h1 className={heading}>Finishing up</h1>
                <p className={description}>
                    Double-check everything looks OK before confirming.
                </p>
            </div>

            {/* Summary Card */}
            <div className="mt-8 rounded-xl bg-blue-50/60 p-6">
                {/* Plan */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-[#02295a] font-bold text-base">
                            Arcade (Yearly)
                        </h2>

                        <button
                            type="button"
                            className="mt-1 text-sm text-[#9699ab] underline hover:text-[#473dff] transition-colors"
                        >
                            Change
                        </button>
                    </div>

                    <span className="font-bold text-[#02295a] text-base">
                        $90/yr
                    </span>
                </div>

                <div className="my-6 h-px bg-[#d6d9e6]" />

                {/* Add-ons */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-[#9699ab] text-sm">
                            Online service
                        </span>

                        <span className="text-[#02295a] text-sm">
                            +$10/yr
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-[#9699ab] text-sm">
                            Larger storage
                        </span>

                        <span className="text-[#02295a] text-sm">
                            +$20/yr
                        </span>
                    </div>
                </div>
            </div>

            {/* Total */}
            <div className="mt-8 flex items-center justify-between px-6">
                <span className="text-sm text-[#9699ab]">
                    Total (per year)
                </span>

                <span className="text-2xl font-bold text-[#473dff]">
                    $120/yr
                </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between w-full mt-10 md:mt-auto pt-4">
                <button
                    type="button"
                    onClick={handleGoingBack}
                    className={goBackButton}
                >
                    Go Back
                </button>

                <button
                    type="submit"
                    className={`${nextStepButton} bg-[#6d3dff] hover:bg-[#6259ff]`}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}
