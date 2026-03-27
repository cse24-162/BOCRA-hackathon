import { useState } from "react";

export default function ReportDevice() {
  const [step, setStep] = useState(1);
  const [trackingId, setTrackingId] = useState("");

  const [formData, setFormData] = useState<any>({
    date: "",
    location: "",
    description: "",
    caseNumber: "",
    file: null,
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const id = "TRK-" + Math.floor(Math.random() * 1000000);
    setTrackingId(id);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Report Stolen Device
        </h1>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded ${
                step >= s ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Theft Details</h2>

            <input
              type="date"
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Location of theft"
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            <textarea
              placeholder="Describe the incident..."
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Police Report</h2>

            <input
              type="file"
              className="w-full border p-2 rounded-lg"
              onChange={(e: any) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
            />

            <input
              type="text"
              placeholder="Case / Reference Number"
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, caseNumber: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 border rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Review & Submit</h2>

            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Description:</strong> {formData.description}</p>
              <p><strong>Case Number:</strong> {formData.caseNumber}</p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 border rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Submit Report
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-green-600">
              Report Submitted
            </h2>

            <p>Your Tracking ID:</p>
            <div className="text-2xl font-mono bg-gray-100 p-3 rounded-lg">
              {trackingId}
            </div>

            <p className="text-sm text-gray-600">
              Use this ID to track your report status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}