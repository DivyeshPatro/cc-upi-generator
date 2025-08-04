export default function BankSelector({ selected, onChange, banks }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm">🏦 Select your bank</label>
            <select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="p-2 rounded-md bg-gray-800 border border-gray-600"
            >
                {banks.map((b) => (
                    <option key={b} value={b}>
                        {b}
                    </option>
                ))}
            </select>
        </div>
    );
}
