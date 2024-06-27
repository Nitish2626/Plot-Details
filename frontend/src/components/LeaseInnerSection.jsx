
const LeaseInnerSection = ({ icon, value }) => {
    return (
        <section
            className="flex flex-col items-center justify-center"
        >
            {icon}

            <h1
                className="text-lg font-semibold"
            >
                {value}
            </h1>
        </section>
    );
};

export default LeaseInnerSection;