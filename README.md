# 🔗 Credit Card UPI Generator

Simplify your credit card bill payments with our smart UPI ID generator. Built using **Streamlit**.

## 🚀 Features

- Generate UPI IDs based on card type and selected bank
- Supports Visa, MasterCard, AMEX, RuPay, Diners (read-only)
- Validates card number using Luhn algorithm
- Validates Indian mobile numbers
- QR code generation with popup preview
- SBI-specific UPI ID resolution note
- Mobile-friendly UI with dark/light compatibility
- ⚠️ Disclaimer, privacy note & GitHub open-source link
- VPA Validator(In Progress)

## ⚠️ Disclaimer

This tool is for **educational/demo purposes only**. The UPI IDs are generated using predefined logic and may not always be valid. Please verify before using. **We are not responsible for any losses due to invalid IDs.**

## 🔐 Privacy First

We do not store any user input like phone numbers or card details. Everything runs locally during your session.

## 🧪 Dummy Cards to Test
Visa:       4111111111111111  
MasterCard: 5555555555554444  
RuPay:      6069851234567890  
AMEX:       371449635398431  


## 🐍 Stack
Streamlit   
Python  
qrcode  
phonenumbers

## 💬 Who's This For?
🧍‍♂️ Everyday Users
Tired of logging into net banking just to pay your card bill? Instantly generate a UPI ID and pay from any UPI app. No hassle.

💳 Credit Card Holders
Simplify your credit card payments with smart UPI ID generation — just enter your number and go 💨

⚙️ Fintech Tinkerers
Curious how different banks format UPI IDs for credit cards? Dive into the logic and learn by doing 💡

🛡️ Blue Teamers & Cybersec Folks
Simulate UPI logic, model threats, or run phishing tests — all in a safe, sandboxed way 🔐

🧪 Real-World Scenarios:
    🎯 Phishing Awareness Training
    Generate realistic UPI IDs + QR codes to create mock phishing messages.
    → Helps train employees to detect fake payment requests safely.

    🧠 Threat Modeling for Fintech Apps
    Use fake card/UPI data to simulate real user flows.
    → Test edge cases like spoofed UPI IDs, Luhn validation bypass, and data exposure — all without touching production systems.

    🔒 Security Testing Without Risk
    Perform red/blue team exercises without relying on real UPI infrastructure or leaking sensitive data.

## 🎯 Roadmap

- ✅ **UPI ID logic based on banks**  
  Custom logic for different banks like SBI, ICICI, AMEX, AXIS, etc.

- ✅ **QR Code popup with tooltips**  
  One-click QR generation in a smooth popup, with context-aware info.

- [ ] 🌓 **Dark/Light Theme Toggle (coming soon)**  
  Choose your vibe – light for day, dark for hacking nights.

- [ ] 📦 **Docker Support (planned)**  
  Run anywhere with a single command – no setup headaches.

- [ ] 🧪 **UPI ID Validation API (Mocked) (planned)**  
  Simulate real-world UPI validations for testing and demo purposes.


## 📸 Preview

Here’s a sneak peek of the app in action:

![Credit Card UPI Generator Preview](assets/Credit_Card_UPI_Generator_Demo.jpg)


## 🛠️ Installation

```bash
git clone https://github.com/DivyeshPatro/cc-upi-generator.git
cd cc-upi-generator
pip install -r requirements.txt
streamlit run app.py
```

## 🧪 Try It Out
Enter your 10-digit mobile number   
Add a valid credit card number   
Select your bank  
Hit "Generate UPI ID"  
💥 Boom! You'll get a custom UPI ID + QR code instantly  
📱 Mobile Support
Fully responsive. Try it on your phone or tablet.

## 🙌 Acknowledgments
Built with ❤️ by a tester who’s transitioning into cybersecurity
Inspired by everyday fintech puzzles & hacker curiosity.

## 🤝 Contribute  
Open-source project. PRs and issues are welcome!  
👉 [GitHub Repo](https://github.com/DivyeshPatro/creditcard-upi-generator.git)

## 🔚 Conclusion
This project is more than just a fun utility — it's a fusion of QA mindset, security awareness, and creative engineering. Whether you're validating UPI ID formats, learning card structures, or exploring how fintech works under the hood — this open-source tool has something for everyone.

Feel free to fork, star ⭐, or contribute 🤝 — let’s build cool stuff together!

