import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import OtpInput from "../components/OtpInput";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setMsg("");
    setLoading(true);
    try {
      await api.post("/auth/send-otp", { email });
      setOtpSent(true);
      setMsg("OTP sent to your email!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setMsg("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      login(res.data.token);
      setMsg("Login successful! Redirecting...");
      setTimeout(() => nav("/"), 400);
    } catch (err) {
      setMsg(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-flower-gradient p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-rosePink mb-4">Login</h2>

        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full py-2 rounded bg-gold-gradient text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <p className="mt-4 text-center text-m text-red-950">
              New user?{" "}
              <span
                onClick={() => nav("/register")}
                className="font-semibold cursor-pointer underline"
              >
                Register here
              </span>
            </p>
          </>
        ) : (
          <>
            <OtpInput length={6} onChange={setOtp} />
            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full mt-4 py-2 rounded bg-gold-gradient text-white font-semibold disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {msg && <p className="mt-4 text-center font-semibold text-pink-900">{msg}</p>}
      </div>
    </div>
  );
}
