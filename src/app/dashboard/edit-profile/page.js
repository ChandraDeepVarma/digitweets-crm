"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [alternateMobileNumber, setAlternateMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [resume, setResume] = useState("");

  // saved profile
  const [savedProfile, setSavedProfile] = useState(null);

  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("mobileNumber", mobileNumber);
      formData.append("alternateMobileNumber", alternateMobileNumber);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("pincode", pincode);
      formData.append("gender", gender);
      formData.append("language", language);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      if (resume) {
        formData.append("resume", resume);
      }

      const response = await fetch("/api/edit-profile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully ✅");
        console.log("Saved:", data);

        // router.push("/dashboard");
      } else {
        alert(data.error || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Server error. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/edit-profile");
      const data = await res.json();

      if (res.ok && data.profile) {
        const p = data.profile;

        // store snapshot
        setSavedProfile(p);

        // fill form
        setFullName(p.fullName || "");
        setEmail(p.email || "");
        setMobileNumber(p.mobileNumber || "");
        setAlternateMobileNumber(p.alternateMobileNumber || "");
        setCountry(p.country || "");
        setState(p.state || "");
        setCity(p.city || "");
        setPincode(p.pincode || "");
        setGender(p.gender || "");
        setLanguage(p.language || []);
      }
    };

    fetchProfile();
  }, []);

  const handleReset = () => {
    if (!savedProfile) return;

    setFullName(savedProfile.fullName || "");
    setEmail(savedProfile.email || "");
    setMobileNumber(savedProfile.mobileNumber || "");
    setAlternateMobileNumber(savedProfile.alternateMobileNumber || "");
    setCountry(savedProfile.country || "");
    setState(savedProfile.state || "");
    setCity(savedProfile.city || "");
    setPincode(savedProfile.pincode || "");
    setGender(savedProfile.gender || "");
    setLanguage(savedProfile.language || []);

    setProfilePicture("");
    setResume("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleBack}
        className="
          absolute top-4 right-4
          flex items-center gap-2
          text-red-600
          hover:text-red-700
          font-semibold
        "
        required
      >
        Back
      </button>

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
        <form className="flex flex-col gap-4">
          {/* Names */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2
                          border border-gray-300
                          rounded-lg
                          outline-none
                          transition
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-200
                          hover:border-gray-400"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2
                        border border-gray-300
                        rounded-lg
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        hover:border-gray-400"
          />

          {/* Phone Numbers */}
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-4 py-2
                        border border-gray-300
                        rounded-lg
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        hover:border-gray-400"
            minLength={10}
            maxLength={10}
          />
          <input
            type="tel"
            placeholder="Alternate Mobile Number"
            value={alternateMobileNumber}
            onChange={(e) => setAlternateMobileNumber(e.target.value)}
            className="w-full px-4 py-2
                      border border-gray-300
                      rounded-lg
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-200
                      hover:border-gray-400"
            minLength={10}
            maxLength={10}
          />

          {/* Country Dropdown */}
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
              setCity("");
            }}
            className="w-full px-4 py-2
                       border border-gray-300
                       rounded-lg
                       outline-none
                       transition
                       focus:border-blue-500
                       focus:ring-2
                       focus:ring-blue-200
                       hover:border-gray-400"
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State + City */}
          <div className="flex gap-4">
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity("");
              }}
              disabled={!country}
              className="w-full px-4 py-2
                         border border-gray-300
                         rounded-lg
                         outline-none
                         transition
                         focus:border-blue-500
                         focus:ring-2
                         focus:ring-blue-200
                         hover:border-gray-400"
            >
              <option value="">Select State</option>
              {country &&
                State.getStatesOfCountry(
                  Country.getAllCountries().find((c) => c.name === country)
                    ?.isoCode
                ).map((s) => (
                  <option key={s.isoCode} value={s.name}>
                    {s.name}
                  </option>
                ))}
            </select>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
              className="w-full px-4 py-2
                         border border-gray-300
                         rounded-lg
                         outline-none
                         transition
                         focus:border-blue-500
                         focus:ring-2
                         focus:ring-blue-200
                         hover:border-gray-400"
            >
              <option value="">Select City</option>
              {state &&
                City.getCitiesOfState(
                  Country.getAllCountries().find((c) => c.name === country)
                    ?.isoCode,
                  State.getStatesOfCountry(
                    Country.getAllCountries().find((c) => c.name === country)
                      ?.isoCode
                  ).find((s) => s.name === state)?.isoCode
                ).map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <input
            type="number"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-4 py-2
                        border border-gray-300
                        rounded-lg
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        hover:border-gray-400"
          />

          {/* Gender */}
          <div className="flex gap-6 items-center">
            <span className="font-medium">Gender:</span>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="others"
                checked={gender === "others"}
                onChange={(e) => setGender(e.target.value)}
              />
              Others
            </label>
          </div>

          {/* Language */}
          <div className="flex gap-6 items-center">
            <span className="font-medium">Language:</span>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="language"
                value="english"
                checked={language.includes("english")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "english"]);
                  } else {
                    setLanguage(language.filter((l) => l !== "english"));
                  }
                }}
              />
              English
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="language"
                value="hindi"
                checked={language.includes("hindi")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "hindi"]);
                  } else {
                    setLanguage(language.filter((l) => l !== "hindi"));
                  }
                }}
              />
              Hindi
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="language"
                value="telugu"
                checked={language.includes("telugu")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "telugu"]);
                  } else {
                    setLanguage(language.filter((l) => l !== "telugu"));
                  }
                }}
              />
              Telugu
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="language"
                value="others"
                checked={language.includes("others")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setLanguage([...language, "others"]);
                  } else {
                    setLanguage(language.filter((l) => l !== "others"));
                  }
                }}
              />
              Others
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer border border-gray-200 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleEditProfile}
          >
            Save Profile
          </button>
          <button
            type="reset"
            className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
