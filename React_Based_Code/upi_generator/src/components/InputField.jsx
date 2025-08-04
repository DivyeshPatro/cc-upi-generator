export default function InputField({ label, value, onChange, placeholder, maxLength, error, type = 'text' }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm">{label}</label>
            <input
                className={`p-2 rounded-md bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-pink-500`}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                inputMode={type === 'tel' ? 'numeric' : undefined}
                pattern={type === 'tel' ? '[0-9]*' : undefined}
            />
            {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
        </div>
    );
}
