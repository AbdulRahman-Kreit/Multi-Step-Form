import { useContext } from "react";
import { StepContext } from "../contexts/StepProvider";

// Style Variables
import { stepContainer } from "../utils/styles";
import { headingContainer } from "../utils/styles";
import { heading } from "../utils/styles";
import { description } from "../utils/styles";

export default function YourInfo() {
    const context = useContext(StepContext);

    if (!context) {
        return null;
    }

    const { formData, errors, dispatch } = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: "UPDATE_FORM_DATA",
            payload: { [name]: value }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "NEXT_STEP" });
    };

    return (
        <form onSubmit={handleSubmit} className={stepContainer}>
            
            <div>
                <div className={headingContainer}>
                    <h1 className={heading}>
                        Personal Info
                    </h1>

                    <p className={description}>
                        Please provide your name, email address, & phone number
                    </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                    
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1 md:mb-1.5">
                            <label htmlFor="name" className="text-[#022959] text-xs md:text-sm font-medium">
                                Name
                            </label>
                            {errors?.name && (
                                <span className="text-red-500 font-bold text-xs md:text-sm">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Stephen King" 
                            className={`border rounded-lg px-4 py-2.5 md:py-3 text-[#022959] font-medium text-sm md:text-base placeholder:text-[#9699ab] focus:outline-none transition-colors ${
                                errors?.name ? 'border-red-500' : 'border-[#d6d9e6] focus:border-[#473dff]'
                            }`}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1 md:mb-1.5">
                            <label htmlFor="email" className="text-[#022959] text-xs md:text-sm font-medium">
                                Email Address
                            </label>
                            {errors?.email && (
                                <span className="text-red-500 font-bold text-xs md:text-sm">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. stephenking@mail.com" 
                            className={`border rounded-lg px-4 py-2.5 md:py-3 text-[#022959] font-medium text-sm md:text-base placeholder:text-[#9699ab] focus:outline-none transition-colors ${
                                errors?.email ? 'border-red-500' : 'border-[#d6d9e6] focus:border-[#473dff]'
                            }`}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1 md:mb-1.5">
                            <label htmlFor="phone" className="text-[#022959] text-xs md:text-sm font-medium">
                                Phone Number
                            </label>
                            {errors?.phone && (
                                <span className="text-red-500 font-bold text-xs md:text-sm">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                        <input 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. + 1 234 567 890" 
                            className={`border rounded-lg px-4 py-2.5 md:py-3 text-[#022959] font-medium text-sm md:text-base placeholder:text-[#9699ab] focus:outline-none transition-colors ${
                                errors?.phone ? 'border-red-500' : 'border-[#d6d9e6] focus:border-[#473dff]'
                            }`}
                        />
                    </div>

                </div>
            </div>

            <div className="flex justify-end mt-8 md:mt-auto pt-4">
                <button 
                    type="submit" 
                    className="bg-[#022959] hover:bg-[#16425b] text-white font-medium text-sm md:text-base py-3 px-6 md:px-7 rounded-lg transition-colors cursor-pointer"
                >
                    Next Step
                </button>
            </div>

        </form>
    );
}