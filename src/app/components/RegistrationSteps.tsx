import { RegistrationData } from "../types/registration";
import type { RegistrationFormData } from "@/lib/registration/registration-form.types";
import { BrandLogo } from "./BrandLogo";

interface StepProps {
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
}

// Step 1: Personal Information
export function PersonalInfoStep({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-slate-400">Let's start with the basics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Last Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Age Range <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["11-17", "18-24", "25-34", "35+"].map((range) => (
            <label
              key={range}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.ageRange === range
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="ageRange"
                value={range}
                checked={data.ageRange === range}
                onChange={(e) => updateData({ ageRange: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{range}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Sex <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Male", "Female"].map((sex) => (
            <label
              key={sex}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.sex === sex
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="sex"
                value={sex}
                checked={data.sex === sex}
                onChange={(e) => updateData({ sex: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{sex}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          City <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={data.city}
          onChange={(e) => updateData({ city: e.target.value })}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="Enter your city"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="+265..."
            required
          />
        </div>
      </div>
    </div>
  );
}

// Step 2: Current Status
export function CurrentStatusStep({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Current Status</h2>
        <p className="text-slate-400">Tell us about your current situation</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          What is your current status? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Student", "Employed", "Self-Employed", "Unemployed"].map((status) => (
            <label
              key={status}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.status === status
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="status"
                value={status}
                checked={data.status === status}
                onChange={(e) => updateData({ status: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {data.status === "Student" && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Education Level <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Primary", "Secondary", "Tertiary Undergrad", "Tertiary Postgrad"].map((level) => (
              <label
                key={level}
                className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  data.educationLevel === level
                    ? "border-purple-500 bg-purple-500/10 text-white"
                    : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="educationLevel"
                  value={level}
                  checked={data.educationLevel === level}
                  onChange={(e) => updateData({ educationLevel: e.target.value })}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{level}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Step 3: Digital Art Experience
export function ExperienceStep({ data, updateData }: StepProps) {
  const softwareOptions = [
    "Blender",
    "Maya",
    "3ds Max",
    "Cinema 4D",
    "ZBrush",
    "Substance Painter",
    "None",
  ];

  const toggleSoftware = (software: string) => {
    const current = data.softwareUsed || [];
    if (current.includes(software)) {
      updateData({ softwareUsed: current.filter((s) => s !== software) });
    } else {
      updateData({ softwareUsed: [...current, software] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Digital Art Experience</h2>
        <p className="text-slate-400">Help us understand your skill level</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Are you familiar with 3D software? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Yes", "No", "Learning"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.familiarWith3D === option
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="familiarWith3D"
                value={option}
                checked={data.familiarWith3D === option}
                onChange={(e) => updateData({ familiarWith3D: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Which software have you used? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {softwareOptions.map((software) => (
            <label
              key={software}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.softwareUsed?.includes(software)
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="checkbox"
                checked={data.softwareUsed?.includes(software)}
                onChange={() => toggleSoftware(software)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{software}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Are you familiar with Photoshop? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["Yes", "No", "Learning"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.familiarWithPhotoshop === option
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="familiarWithPhotoshop"
                value={option}
                checked={data.familiarWithPhotoshop === option}
                onChange={(e) => updateData({ familiarWithPhotoshop: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 4: Equipment
export function EquipmentStep({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Equipment</h2>
        <p className="text-slate-400">Let us know what tools you have</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Do you have a graphics tablet? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.hasGraphicsTablet === option
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="hasGraphicsTablet"
                value={option}
                checked={data.hasGraphicsTablet === option}
                onChange={(e) =>
                  updateData({
                    hasGraphicsTablet: e.target.value as RegistrationFormData["hasGraphicsTablet"],
                  })
                }
                className="sr-only"
              />
              <span className="text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {data.hasGraphicsTablet === "Yes" && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What brand is your graphics tablet?
          </label>
          <input
            type="text"
            value={data.tabletBrand}
            onChange={(e) => updateData({ tabletBrand: e.target.value })}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="e.g., Wacom, Huion, XP-Pen"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          What device will you use for the course? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["Desktop", "Laptop", "Tablet"].map((device) => (
            <label
              key={device}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.deviceUsed === device
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="deviceUsed"
                value={device}
                checked={data.deviceUsed === device}
                onChange={(e) => updateData({ deviceUsed: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{device}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Do you have reliable internet access? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.hasInternet === option
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="hasInternet"
                value={option}
                checked={data.hasInternet === option}
                onChange={(e) =>
                  updateData({ hasInternet: e.target.value as RegistrationFormData["hasInternet"] })
                }
                className="sr-only"
              />
              <span className="text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Shown when the full Equipment step is skipped (e.g. dynamic sketching). Device + internet only. */
export function ConnectivityStep({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Device and connectivity</h2>
        <p className="text-slate-400">Tell us how you will join sessions</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          What device will you use for the course? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["Desktop", "Laptop", "Tablet"].map((device) => (
            <label
              key={device}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.deviceUsed === device
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="deviceUsedConnectivity"
                value={device}
                checked={data.deviceUsed === device}
                onChange={(e) => updateData({ deviceUsed: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{device}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Do you have reliable internet access? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.hasInternet === option
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="hasInternetConnectivity"
                value={option}
                checked={data.hasInternet === option}
                onChange={(e) =>
                  updateData({ hasInternet: e.target.value as RegistrationFormData["hasInternet"] })
                }
                className="sr-only"
              />
              <span className="text-sm font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 6: Marketing Info
export function MarketingStep({ data, updateData }: StepProps) {
  const sources = [
    "Social Media",
    "Friend Referral",
    "Online Search",
    "Poster/Flyer",
    "Radio/TV",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">How Did You Find Us?</h2>
        <p className="text-slate-400">Help us understand how you heard about us</p>
      </div>

      <div>
        <label className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300 mb-3">
          <span>How did you hear about</span>
          <BrandLogo className="h-6 w-auto shrink-0" />
          <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sources.map((source) => (
            <label
              key={source}
              className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                data.howHeardAbout === source
                  ? "border-purple-500 bg-purple-500/10 text-white"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                name="howHeardAbout"
                value={source}
                checked={data.howHeardAbout === source}
                onChange={(e) => updateData({ howHeardAbout: e.target.value })}
                className="sr-only"
              />
              <span className="text-sm font-medium">{source}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.optInForUpdates}
            onChange={(e) => updateData({ optInForUpdates: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-2 focus:ring-purple-500"
          />
          <div>
            <span className="text-white font-medium group-hover:text-purple-400 transition-colors">
              Keep me updated
            </span>
            <p className="text-sm text-slate-400 mt-1">
              {"I'd like to receive updates about new courses, workshops, and special offers from the academy."}
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
