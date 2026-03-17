import React from "react";

const EducationSection = () => {
    // Static for now, can be linked to a store later
    const education = [
        {
            degree: "Bachelor of Technology in Computer Science",
            college: "Lovely Professional University",
            year: "2022 - 2026",
            grade: "8.5 CGPA",
        },
    ];

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-white mb-12">
                    Education
                </h2>
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-8 rounded-3xl border border-gray-700"
                    >
                        <h3 className="text-2xl font-bold text-blue-400">
                            {edu.degree}
                        </h3>
                        <p className="text-xl text-white mt-2">{edu.college}</p>
                        <p className="text-gray-400 mt-1 font-mono">
                            {edu.year} | {edu.grade}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationSection;
