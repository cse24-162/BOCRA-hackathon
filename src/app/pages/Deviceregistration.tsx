import React, { useState, useEffect } from "react";

interface Brand { id: string; name: string; deviceType: string; }
interface Model { id: string; name: string; brandId: string; }

const DeviceRegistration = () => {
  const [formData, setFormData] = useState({
    deviceType: "",
    brandId: "",
    modelId: "",
    imei: "",
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);

  // Fetch brands by Device Type
  useEffect(() => {
    if (formData.deviceType) {
      console.log(`Fetching brands for: ${formData.deviceType}`);
      // TODO: Supabase call
    }
  }, [formData.deviceType]);

  // Fetch models by Brand
  useEffect(() => {
    if (formData.brandId) {
      console.log(`Fetching models for brand: ${formData.brandId}`);
      // TODO: Supabase call
    }
  }, [formData.brandId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#000000]">Device Registration</h1>
          <p className="text-gray-600 mt-2">
            Register and verify your device with the BOCRA Unified Digital Portal.
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-[#003366] to-[#0095DA] rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Device Type */}
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-1">
              Device Type
            </label>
            <select
              value={formData.deviceType}
              onChange={(e) =>
                setFormData({ ...formData, deviceType: e.target.value, brandId: "", modelId: "" })
              }
              className="w-full border-gray-300 rounded-md p-2 shadow-sm focus:border-[#0095DA] focus:ring-[#0095DA]"
            >
              <option value="">Select Type</option>
              <option value="mobile">Mobile Phone</option>
              <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
                <option value="other">Other</option>
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-1">
              Brand
            </label>
            <select
              disabled={!formData.deviceType}
              value={formData.brandId}
              onChange={(e) =>
                setFormData({ ...formData, brandId: e.target.value, modelId: "" })
              }
              className="w-full border-gray-300 rounded-md p-2 shadow-sm disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 focus:border-[#0095DA] focus:ring-[#0095DA]"
            >
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="Google">Google</option>
              <option value="Huawei">Huawei</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

         {/* Model */}
       <div>
  <label className="block text-sm font-medium text-black/70 mb-1">
    Model
  </label>

  <input
    type="text"
    placeholder="Enter Model"
    disabled={!formData.brandId}
    value={formData.modelId}
    onChange={(e) =>
      setFormData({ ...formData, modelId: e.target.value })
    }
    className="w-full bg-transparent border-b border-gray-300 
    py-2 text-gray-800 focus:outline-none focus:border-[#0095DA] 
    placeholder-gray-400 disabled:text-gray-400 disabled:border-gray-200"
  />
</div>

          {/* IMEI */}
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-1">
              IMEI Number (15 digits)
            </label>
            <input
              type="text"
              maxLength={15}
              pattern="\d{15}"
              required
              value={formData.imei}
              onChange={(e) =>
                setFormData({ ...formData, imei: e.target.value })
              }
              placeholder="Enter IMEI"
              className="w-full border-gray-300 rounded-md p-2 shadow-sm focus:border-[#0095DA] focus:ring-[#0095DA]"
            />
            <p className="text-xs text-gray-500 mt-1">
              The IMEI identifies your device and is required for verification.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0095DA] text-white py-3 rounded-md font-semibold hover:bg-[#0077B3] transition-colors shadow-md"
          >
            Register Device
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeviceRegistration;