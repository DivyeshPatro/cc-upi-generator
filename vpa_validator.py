import requests

# VPA value (replace with the actual value you want to check)
vpa = "dummyupi@axisb"  # Example VPA

# Headers to send in the request
headers = {
    "sec-ch-ua": 'Not A;Brand";v="99", "Chromium";v="130", "Google Chrome";v="130.0.6723.71"',
    "Accept": "application/json, text/plain, */*",
    "sec-ch-ua-mobile": "?0",
    "channel-id": "WEB_UNAUTH",
    "sec-ch-ua-platform": "Windows",
    "Origin": "https://www.airtel.in",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://www.airtel.in/",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
}

# Make the GET request
url = f'https://paydigi.airtel.in/web/pg-service/v1/validate/vpa/{vpa}'
response = requests.get(url, headers=headers)

# Check the response status
if response.status_code == 200:
    # Parse and return the JSON response
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)
