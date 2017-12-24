

```python
# Dependencies
from citipy import citipy
import json
import random
import openweathermapy.core as ow
import requests as req
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
# Save config information for data
api_key = "cc52e602067835f1da199f1fa74772ef"
url = "http://api.openweathermap.org/data/2.5/weather?"
forecast_url = "http://api.openweathermap.org/data/2.5/forecast?"
units = "metric"
```


```python
# initiate a variable to track count
city_count = 0
```


```python
# Set empty list variables
city_latitude = []
city_longitude = []
city_name = []
city_country = []
city_temperature = []
city_humidity = []
city_cloudiness = []
city_windspeed = []

```


```python
while city_count < 1:
    try:
        # Generate set of random coordinates
        x = random.randint(-9000,9001)/100
        y = random.randint(-18000,18001)/100
        # print(x,y)

        # Get nearest city name and country code with citipy
        city = citipy.nearest_city(x, y)
        cityname = city.city_name
        countrycode = city.country_code

        # Build query URL for forecast weather data
        query_url =forecast_url + "appid=" + api_key + "&units" + units + "&q="

        # Perform a request for data
        weather_response = req.get(query_url + cityname + "," + countrycode)
        print(query_url + cityname + "," + countrycode)

        # Update count
        city_count = city_count + 1

        # Get data from JSON reponse
        response_json = weather_response.json()
        print(response_json)
        
        # Extract items from forecast api and append to list
        city_latitude.append(response_json['coord']['lat'])
        city_longitude.append(response_json['coord']['lon'])
        city_name.append(response_json['city']['name'])
        city_country.append(response_json['city']['country'])
        city_temperature.append(response_json['list'][0]['main']['temp'])
        city_humidity.append(response_json['list'][0]['main']['humidity'])
        city_cloudiness.append(response_json['list'][0]['clouds']['all'])
        city_windspeed.append(response_json['list'][0]['wind']['speed'])
        
    except KeyError:
        print("Key Error")
```

    http://api.openweathermap.org/data/2.5/forecast?appid=cc52e602067835f1da199f1fa74772ef&unitsmetric&q=port alfred,za
    {'cod': 429, 'message': 'Your account is temporary blocked due to exceeding of requests limitation of your subscription type. Please choose the proper subscription http://openweathermap.org/price'}
    Key Error
    


```python
# Structure the data as a DataFrame
weather_data = [("City Name",city_name),
                ("Country Code",city_country),
                ("Latitude",city_latitude),
                ("Longitude",city_longitude),
                ("Temperature(K)",city_temperature),
                ("Humidity(%)",city_humidity),
                ("Cloudiness(%)",city_cloudiness),
                ("Wind Speed (mph)",city_windspeed),
                ]

weather_df = pd.DataFrame.from_items(weather_data)
```


```python
weather_df.head(5)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>City Name</th>
      <th>Country Code</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Temperature(K)</th>
      <th>Humidity(%)</th>
      <th>Cloudiness(%)</th>
      <th>Wind Speed (mph)</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>




```python

```


```python

```


```python

```
