import React, { useState } from "react";

const ComplianceVerification: React.FC = () => {
  const [fccId, setFccId] = useState<string>("");
  const [ceFile, setCeFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fccId && !ceFile) {
      alert("Please enter an FCC ID or upload a CE marking image.");
      return;
    }

    // Temporary: replace with backend integration
    console.log({
      fccId,
      ceFile,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 max-w-2xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#000000]">
        Compliance Verification
      </h2>
      <p className="text-gray-600 mt-2">
        The system verifies whether your device meets regulatory standards.
        Provide <strong>either</strong> an FCC ID or an image showing the CE mark.
      </p>

      <div className="mt-4 w-24 h-1 bg-gradient-to-r from-[#003366] to-[#0095DA] rounded-full"></div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* FCC ID Input */}
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">
            FCC ID (Optional)
          </label>
          <input
            type="text"
            value={fccId}
            onChange={(e) => setFccId(e.target.value)}
            placeholder="Enter FCC ID (e.g., XYZ12345)"
            className="w-full border-gray-300 rounded-md p-2 shadow-sm focus:border-[#0095DA] focus:ring-[#0095DA]"
          />
          <p className="text-xs text-gray-500 mt-1">
            The FCC ID is a unique identifier issued by the U.S. Federal
            Communications Commission.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-sm font-medium text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* CE Mark Upload */}
        <div>
          <label className="block text-sm font-medium text-[#003366] mb-2">
            Upload CE Mark Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCeFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 
              file:bg-[#0095DA] file:text-white 
              hover:file:bg-[#0077B3] file:font-semibold cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload an image where the CE marking is clearly visible.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#0095DA] text-white py-3 rounded-md font-semibold hover:bg-[#0077B3] transition-colors shadow-md"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ComplianceVerification;