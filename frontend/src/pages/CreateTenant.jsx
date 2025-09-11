import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import exploreImg from "../assets/explore.svg";

export default function CreateTenant() {
  const navigate = useNavigate();
  const [name, setName] = useState("Hutchinsons");
  const [type, setType] = useState("Enterprise");
  const [description, setDescription] = useState(
    "Hutchinsons is a leading UK agronomy services and crop production specialist, providing farmers with tailored advice, products, and data-driven solutions to optimise crop performance and sustainability."
  );
  const descriptionRef = useRef(null);

  return (
    <div className="flex flex-col h-full bg-spectrum-white2 px-6 py-4 relative">{/* compact page padding */}
      {/* Header actions (absolute to avoid pushing content down) */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-spectrum-gray2 rounded"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-6 gap-6 items-start">
        {/* Content pane (2 columns) with fixed height optimized to avoid scroll */}
        <div className="col-span-6 md:col-span-2">
          <div className="h-[calc(100vh-140px)] overflow-hidden border border-spectrum-gray2 rounded bg-white p-6 relative w-[360px] mx-auto md:mx-0">{/* responsive height */}
            <div className="mb-6">
              <label className="block text-sm mb-2">Name*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-spectrum-gray2 rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Type*</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-spectrum-gray2 rounded px-3 py-2 text-sm"
              >
                <option>Enterprise</option>
                <option>Farming</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Description*</label>
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full border border-spectrum-gray2 rounded px-3 py-2 text-sm resize-none overflow-hidden h-28"
              />
            </div>
            {/* Actions moved to page footer */}
          </div>
        </div>

        {/* Illustration area (remaining width) */}
        <div className="col-span-6 md:col-span-4">
          <div className="h-[calc(100vh-140px)] w-full border border-dashed border-spectrum-gray2 rounded flex items-center justify-center overflow-hidden bg-spectrum-white2">
            <img src={exploreImg} alt="Illustration" className="max-h-[75%] w-auto object-contain pointer-events-none select-none" />
          </div>
        </div>
      </div>

      {/* Page footer actions */}
      <div className="flex justify-end mt-3">
        <button onClick={() => navigate('/userandteams/assignfarmsandfields')} className="bg-primary-main text-spectrum-white px-6 py-2 rounded">Next Step</button>
      </div>
    </div>
  );
}


