
const FormFields = ({ reference, hf, labelText, type, ph, df }) => {

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={hf}
                className="text-lg text-gray-400"
            >
                {labelText}
            </label>
            <input
                ref={reference}
                type={type}
                placeholder={ph}
                required
                id={hf}
                defaultValue={df}
                className="w-60 bg-[#242424] text-lg rounded-md py-1 px-2 outline-none"
            />
        </div>
    );
};

export default FormFields;