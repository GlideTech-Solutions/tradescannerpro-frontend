"use client";
import { useTheme } from "../../context/ThemeContext";
import "./../Login/login.scss";
import PageLogo from "../PageLogo/PageLogo";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import apiClient from "../../lib/api-client";

export default function ChangePassword() {
	const { isDarkMode } = useTheme();
	const router = useRouter();

	// visibility toggles
	const [visOld, setVisOld] = useState(false);
	const [visNew, setVisNew] = useState(false);
	const [visConf, setVisConf] = useState(false);

	// values
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [touched, setTouched] = useState({
		old: false,
		nw: false,
		conf: false,
	});

	// Icons (kept from your style)
	const LockIcon = () => (
		<svg
			width="14"
			height="16"
			viewBox="0 0 14 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.6663 5.616V4.66667C11.6663 3.42899 11.1747 2.242 10.2995 1.36684C9.42434 0.491665 8.23735 0 6.99967 0C5.762 0 4.57501 0.491665 3.69984 1.36684C2.82467 2.242 2.33301 3.42899 2.33301 4.66667V5.616C1.73925 5.87514 1.23387 6.30168 0.878674 6.84347C0.523478 7.38527 0.33386 8.01882 0.333008 8.66667V12.6667C0.334066 13.5504 0.685596 14.3976 1.31049 15.0225C1.93538 15.6474 2.78261 15.9989 3.66634 16H10.333C11.2167 15.9989 12.064 15.6474 12.6889 15.0225C13.3138 14.3976 13.6653 13.5504 13.6663 12.6667V8.66667C13.6655 8.01882 13.4759 7.38527 13.1207 6.84347C12.7655 6.30168 12.2601 5.87514 11.6663 5.616ZM3.66634 4.66667C3.66634 3.78261 4.01753 2.93477 4.64265 2.30964C5.26777 1.68452 6.11562 1.33333 6.99967 1.33333C7.88373 1.33333 8.73158 1.68452 9.3567 2.30964C9.98182 2.93477 10.333 3.78261 10.333 4.66667V5.33333H3.66634V4.66667ZM12.333 12.6667C12.333 13.1971 12.1223 13.7058 11.7472 14.0809C11.3721 14.456 10.8634 14.6667 10.333 14.6667H3.66634C3.13591 14.6667 2.6272 14.456 2.25213 14.0809C1.87705 13.7058 1.66634 13.1971 1.66634 12.6667V8.66667C1.66634 8.13623 1.87705 7.62753 2.25213 7.25245C2.6272 6.87738 3.13591 6.66667 3.66634 6.66667H10.333C10.8634 6.66667 11.3721 6.87738 11.7472 7.25245C12.1223 7.62753 12.333 8.13623 12.333 8.66667V12.6667Z"
				fill="#001D34"
			/>
		</svg>
	);

	const EyeIcon = ({ off = false }) =>
		off ? (
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g opacity="0.5" clipPath="url(#clip0_203_1737)">
					<path
						d="M15.514 6.27935C14.48 4.59535 12.128 1.77002 8.00003 1.77002C3.87203 1.77002 1.52003 4.59535 0.486034 6.27935C0.166386 6.79636 -0.00292969 7.39218 -0.00292969 8.00002C-0.00292969 8.60786 0.166386 9.20368 0.486034 9.72069C1.52003 11.4047 3.87203 14.23 8.00003 14.23C12.128 14.23 14.48 11.4047 15.514 9.72069C15.8337 9.20368 16.003 8.60786 16.003 8.00002C16.003 7.39218 15.8337 6.79636 15.514 6.27935ZM14.3774 9.02269C13.4894 10.4667 11.4794 12.8967 8.00003 12.8967C4.5207 12.8967 2.5107 10.4667 1.6227 9.02269C1.43279 8.71538 1.3322 8.36127 1.3322 8.00002C1.3322 7.63877 1.43279 7.28466 1.6227 6.97735C2.5107 5.53335 4.5207 3.10335 8.00003 3.10335C11.4794 3.10335 13.4894 5.53069 14.3774 6.97735C14.5673 7.28466 14.6679 7.63877 14.6679 8.00002C14.6679 8.36127 14.5673 8.71538 14.3774 9.02269Z"
						fill="#001D34"
					/>
					<path
						d="M8.00033 4.66669C7.34106 4.66669 6.69659 4.86218 6.14843 5.22845C5.60026 5.59473 5.17302 6.11532 4.92073 6.72441C4.66844 7.3335 4.60243 8.00372 4.73104 8.65032C4.85966 9.29692 5.17713 9.89087 5.6433 10.357C6.10948 10.8232 6.70342 11.1407 7.35003 11.2693C7.99663 11.3979 8.66685 11.3319 9.27594 11.0796C9.88503 10.8273 10.4056 10.4001 10.7719 9.85192C11.1382 9.30376 11.3337 8.65929 11.3337 8.00002C11.3326 7.11629 10.9811 6.26906 10.3562 5.64417C9.73129 5.01928 8.88406 4.66775 8.00033 4.66669ZM8.00033 10C7.60476 10 7.21808 9.88272 6.88919 9.66296C6.56029 9.4432 6.30394 9.13084 6.15257 8.76539C6.00119 8.39994 5.96159 7.9978 6.03876 7.60984C6.11593 7.22188 6.30641 6.86551 6.58611 6.58581C6.86582 6.3061 7.22218 6.11562 7.61015 6.03845C7.99811 5.96128 8.40024 6.00089 8.76569 6.15226C9.13115 6.30364 9.4435 6.55998 9.66327 6.88888C9.88303 7.21778 10.0003 7.60446 10.0003 8.00002C10.0003 8.53045 9.78961 9.03916 9.41454 9.41423C9.03947 9.78931 8.53076 10 8.00033 10Z"
						fill="#001D34"
					/>
				</g>
				<defs>
					<clipPath id="clip0_203_1737">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		) : (
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g opacity="0.5" clipPath="url(#clip0_203_2327)">
					<path
						d="M15.514 6.27923C14.9122 5.29372 14.153 4.4134 13.2667 3.67323L15.1334 1.80657C15.2548 1.68083 15.322 1.51243 15.3205 1.33763C15.319 1.16283 15.2489 0.995625 15.1252 0.87202C15.0016 0.748415 14.8344 0.678302 14.6596 0.676783C14.4848 0.675264 14.3164 0.74246 14.1907 0.863899L12.1607 2.89657C10.9023 2.14911 9.46365 1.75954 8.00003 1.7699C3.8727 1.7699 1.5207 4.59523 0.486034 6.27923C0.166386 6.79624 -0.00292969 7.39206 -0.00292969 7.9999C-0.00292969 8.60774 0.166386 9.20356 0.486034 9.72057C1.08787 10.7061 1.84703 11.5864 2.73337 12.3266L0.866701 14.1932C0.803027 14.2547 0.752239 14.3283 0.7173 14.4096C0.682361 14.491 0.66397 14.5784 0.663201 14.667C0.662431 14.7555 0.679299 14.8433 0.71282 14.9252C0.74634 15.0071 0.795842 15.0816 0.858438 15.1442C0.921033 15.2068 0.995467 15.2563 1.0774 15.2898C1.15933 15.3233 1.24712 15.3402 1.33564 15.3394C1.42415 15.3386 1.51163 15.3202 1.59297 15.2853C1.67431 15.2504 1.74787 15.1996 1.80937 15.1359L3.84403 13.1012C5.10088 13.8486 6.53782 14.2388 8.00003 14.2299C12.1274 14.2299 14.4794 11.4046 15.514 9.72057C15.8337 9.20356 16.003 8.60774 16.003 7.9999C16.003 7.39206 15.8337 6.79624 15.514 6.27923ZM1.62203 9.02257C1.43212 8.71526 1.33153 8.36115 1.33153 7.9999C1.33153 7.63865 1.43212 7.28454 1.62203 6.97723C2.51137 5.53323 4.52137 3.10323 8.00003 3.10323C9.10688 3.09703 10.1982 3.36379 11.1774 3.8799L9.83537 5.2219C9.19532 4.79697 8.42797 4.60656 7.66352 4.683C6.89907 4.75943 6.18461 5.09799 5.64137 5.64123C5.09813 6.18448 4.75956 6.89894 4.68313 7.66339C4.6067 8.42784 4.7971 9.19519 5.22203 9.83523L3.68203 11.3752C2.86544 10.715 2.16859 9.9192 1.62203 9.02257ZM10 7.9999C10 8.53033 9.78932 9.03904 9.41425 9.41411C9.03918 9.78919 8.53047 9.9999 8.00003 9.9999C7.70304 9.99875 7.41017 9.93037 7.14337 9.7999L9.80003 7.14323C9.93051 7.41003 9.99889 7.70291 10 7.9999ZM6.00003 7.9999C6.00003 7.46947 6.21075 6.96076 6.58582 6.58569C6.96089 6.21061 7.4696 5.9999 8.00003 5.9999C8.29703 6.00105 8.5899 6.06943 8.8567 6.1999L6.20003 8.85657C6.06956 8.58977 6.00118 8.29689 6.00003 7.9999ZM14.378 9.02257C13.4887 10.4666 11.4787 12.8966 8.00003 12.8966C6.89319 12.9028 5.80188 12.636 4.8227 12.1199L6.1647 10.7779C6.80475 11.2028 7.5721 11.3932 8.33655 11.3168C9.101 11.2404 9.81546 10.9018 10.3587 10.3586C10.9019 9.81532 11.2405 9.10086 11.3169 8.33641C11.3934 7.57196 11.203 6.80461 10.778 6.16457L12.318 4.62457C13.1346 5.28475 13.8315 6.0806 14.378 6.97723C14.5679 7.28454 14.6685 7.63865 14.6685 7.9999C14.6685 8.36115 14.5679 8.71526 14.378 9.02257Z"
						fill="#001D34"
					/>
				</g>
				<defs>
					<clipPath id="clip0_203_2327">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);

	const confirmOK = newPassword.length > 0 && newPassword === confirmPassword;

	const fieldErrors = {
		old:
			touched.old && oldPassword.length === 0 ? "Old password is required" : "",
		nw: touched.nw,
		conf: touched.conf && !confirmOK ? "Passwords do not match" : "",
	};

	const canSubmit = !loading && oldPassword && confirmOK;

	// Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		setTouched({ old: true, nw: true, conf: true });
		if (!canSubmit) return;

		setLoading(true);
		try {
			// Adjust API to your backend contract
			await apiClient.changePassword({
				old_password: oldPassword,
				new_password: newPassword,
			});

			toast.success("Password updated. Please log in again.");
			// security: force re-auth
			try {
				localStorage.clear();
			} catch {}
			router.push("/login");
		} catch (err) {
			let msg = "Unable to update password.";
			const txt = `${err?.message || ""}`.toUpperCase();
			if (txt.includes("INVALID_OLD_PASSWORD"))
				msg = "Old password is incorrect.";
			else if (txt.includes("WEAK_PASSWORD")) msg = "New password is too weak.";
			else if (txt.includes("NETWORK"))
				msg = "Network error. Please try again.";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="login-page">
			<div className="login-box">
				<PageLogo />
				<h1 className={`${isDarkMode ? "dark" : ""}`}>Set Your Password</h1>

				<form onSubmit={handleSubmit} noValidate>
					{/* Old password */}
					<div className={`field ${fieldErrors.old ? "has-error" : ""}`}>
						<div className="iconLeft">
							<LockIcon />
						</div>
						<input
							className="input"
							type={visOld ? "text" : "password"}
							name="oldPassword"
							placeholder="Old password"
							aria-label="Old password"
							autoComplete="current-password"
							required
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							onBlur={() => setTouched((s) => ({ ...s, old: true }))}
							disabled={loading}
							aria-invalid={!!fieldErrors.old}
						/>
						<button
							type="button"
							className="eyeBtn"
							onClick={() => setVisOld((v) => !v)}
							aria-label={visOld ? "Hide password" : "Show password"}
							title={visOld ? "Hide password" : "Show password"}
							tabIndex={-1}
						>
							<EyeIcon off={visOld} />
						</button>
					</div>
					{fieldErrors.old && (
						<div className={`error-msg ${isDarkMode ? "dark" : ""}`}>
							{fieldErrors.old}
						</div>
					)}

					{/* New password */}
					<div className={`field ${fieldErrors.nw ? "has-error" : ""}`}>
						<div className="iconLeft">
							<LockIcon />
						</div>
						<input
							className="input"
							type={visNew ? "text" : "password"}
							name="newPassword"
							placeholder="New password"
							aria-label="New password"
							autoComplete="new-password"
							required
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							onBlur={() => setTouched((s) => ({ ...s, nw: true }))}
							disabled={loading}
							aria-invalid={!!fieldErrors.nw}
						/>
						<button
							type="button"
							className="eyeBtn"
							onClick={() => setVisNew((v) => !v)}
							aria-label={visNew ? "Hide password" : "Show password"}
							title={visNew ? "Hide password" : "Show password"}
							tabIndex={-1}
						>
							<EyeIcon off={visNew} />
						</button>
					</div>
					{/* Live rules */}

					{/* Confirm password */}
					<div className={`field ${fieldErrors.conf ? "has-error" : ""}`}>
						<div className="iconLeft">
							<LockIcon />
						</div>
						<input
							className="input"
							type={visConf ? "text" : "password"}
							name="confirmPassword"
							placeholder="Confirm new password"
							aria-label="Confirm new password"
							autoComplete="new-password"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							onBlur={() => setTouched((s) => ({ ...s, conf: true }))}
							disabled={loading}
							aria-invalid={!!fieldErrors.conf}
						/>
						<button
							type="button"
							className="eyeBtn"
							onClick={() => setVisConf((v) => !v)}
							aria-label={visConf ? "Hide password" : "Show password"}
							title={visConf ? "Hide password" : "Show password"}
							tabIndex={-1}
						>
							<EyeIcon off={visConf} />
						</button>
					</div>
					{fieldErrors.conf && (
						<div className={`error-msg ${isDarkMode ? "dark" : ""}`}>
							{fieldErrors.conf}
						</div>
					)}

					{/* Submit */}
					<div className="run-button-alignment">
						<button type="submit" disabled={!canSubmit}>
							<img src="/assets/icons/check.svg" alt="check" />
							{loading ? "Updating..." : "Update Password"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
