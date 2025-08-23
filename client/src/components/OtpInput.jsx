import { useState } from "react";

export default function OtpInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));
    if (value && index < length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((digit, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          value={digit}
          maxLength={1}
          className="w-12 h-12 border rounded text-center text-lg dark:bg-gray-800 dark:text-white"
          onChange={(e) => handleChange(e.target.value, i)}
        />
      ))}
    </div>
  );
}
