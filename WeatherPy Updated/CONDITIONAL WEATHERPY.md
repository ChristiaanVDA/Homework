

```python
# Dependencies
from citipy import citipy
import json
import pprint
import random
import openweathermapy.core as ow
import requests as req
import pandas as pd
import time
import matplotlib.pyplot as plt
import seaborn as sns
```


```python
# Save config information for data
api_key = "cc52e602067835f1da199f1fa74772ef"
url = "http://api.openweathermap.org/data/2.5/weather?"
forecast_url = "http://api.openweathermap.org/data/2.5/forecast?"
units = "imperial"
```


```python
# initiate a variable to track counts of cities with weather data
city_count = 0
```


```python
# Create an empty array to capture weather data
weather_data = []

# Create an empty array to capture responses with missing data
missing_data = []
```


```python
while city_count < 1200:
    
    # Generate set of random coordinates
    x = random.randint(-9000,9001)/100
    y = random.randint(-18000,18001)/100
    # print(x,y)

    # Get nearest city name and country code with citipy
    city = citipy.nearest_city(x, y)
    cityname = city.city_name
    countrycode = city.country_code

    # Build query URL for forecast weather data
    query_url = url + "appid=" + api_key + "&q="

    # Perform a request for data
    weather_req = req.get(query_url + cityname + "," + countrycode + "&units=" + units, stream=True).json()

    # Check the response - if data is missing, append the "missing_data" list
    if weather_req['cod'] == '404':
        missing_data.append(weather_req)
    
    # Othewise, append the weather_data list and increment the city_count
    else:
        weather_data.append(weather_req),
        city_count = city_count + 1
        if city_count % 300 == 1:
            time.sleep(60)
        
        # Create a print log for the cities with weather data as requested
        print_log =((str(city_count) + " " + query_url + " " + str(weather_req['id']) + " "\
                     + cityname + ", " + countrycode))
        print(print_log)
```

    1 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    2 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1852357 shimoda, jp
    3 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    4 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6096551 pangnirtung, ca
    5 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    6 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    7 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    8 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3460087 jardim, br
    9 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934649 cap malheureux, mu
    10 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2374583 bubaque, gw
    11 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    12 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2729907 longyearbyen, sj
    13 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1804169 lengshuijiang, cn
    14 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2017155 saskylakh, ru
    15 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 124193 meybod, ir
    16 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2347209 bida, ng
    17 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    18 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6170031 tuktoyaktuk, ca
    19 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 49747 xuddur, so
    20 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3418910 upernavik, gl
    21 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075720 broome, au
    22 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1495626 pangody, ru
    23 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    24 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2411397 georgetown, sh
    25 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3355672 luderitz, na
    26 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2636744 lifford, ie
    27 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    28 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1252919 warud, in
    29 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    30 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3662761 porto walter, br
    31 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126123 chokurdakh, ru
    32 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    33 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    34 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6089245 norman wells, ca
    35 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    36 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    37 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2127202 anadyr, ru
    38 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3687975 calamar, co
    39 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5367788 lompoc, us
    40 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    41 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    42 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    43 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    44 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3386213 touros, br
    45 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    46 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    47 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 986717 kruisfontein, za
    48 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    49 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2630299 hofn, is
    50 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 893697 chinhoyi, zw
    51 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    52 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1504382 kargasok, ru
    53 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    54 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3932145 pisco, pe
    55 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    56 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    57 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2449893 tessalit, ml
    58 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 287832 ibra, om
    59 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6167817 torbay, ca
    60 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    61 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3382160 cayenne, gf
    62 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2450173 taoudenni, ml
    63 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1058080 nosy varika, mg
    64 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3572627 cockburn town, bs
    65 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    66 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    67 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2090021 namatanai, pg
    68 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    69 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2299233 kpandu, gh
    70 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5312476 safford, us
    71 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015306 tiksi, ru
    72 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2304548 anloga, gh
    73 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2508813 adrar, dz
    74 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    75 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1496100 ordynskoye, ru
    76 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022773 khandyga, ru
    77 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2155415 new norfolk, au
    78 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    79 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    80 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2037069 hailun, cn
    81 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    82 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    83 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    84 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022572 khatanga, ru
    85 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1630662 praya, id
    86 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3843123 neuquen, ar
    87 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5359864 isla vista, us
    88 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1282256 hithadhoo, mv
    89 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2090021 namatanai, pg
    90 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3589865 san lorenzo, gt
    91 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3939761 hualmay, pe
    92 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2156825 morwell, au
    93 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    94 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022572 khatanga, ru
    95 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1282256 hithadhoo, mv
    96 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    97 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    98 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    99 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    100 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    101 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3373652 oistins, bb
    102 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3838859 rio gallegos, ar
    103 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    104 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3868633 vallenar, cl
    105 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    106 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    107 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2023469 markova, ru
    108 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    109 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4034551 faanui, pf
    110 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3388456 sao jose da coroa grande, br
    111 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2013465 verkhoyansk, ru
    112 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    113 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1254709 tezu, in
    114 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2173911 broken hill, au
    115 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    116 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2038087 chengde, cn
    117 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3839307 rawson, ar
    118 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    119 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5850554 makakilo city, us
    120 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2289983 dimbokro, ci
    121 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2168943 devonport, au
    122 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2070998 geraldton, au
    123 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    124 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    125 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 933726 lehututu, bw
    126 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    127 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    128 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3692020 nauta, pe
    129 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    130 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3980627 valle de allende, mx
    131 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    132 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2729907 longyearbyen, sj
    133 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3896218 castro, cl
    134 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2027596 anuchino, ru
    135 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    136 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    137 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    138 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 608872 makat, kz
    139 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    140 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    141 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    142 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    143 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3495137 pedernales, do
    144 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1529484 hami, cn
    145 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3662489 santa isabel do rio negro, br
    146 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    147 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5563839 fortuna, us
    148 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    149 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3361934 saldanha, za
    150 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1059051 miandrivazo, mg
    151 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    152 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2128975 nemuro, jp
    153 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2188874 russell, nz
    154 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2155415 new norfolk, au
    155 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5880568 bethel, us
    156 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    157 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2112802 hasaki, jp
    158 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6096551 pangnirtung, ca
    159 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2167426 emerald, au
    160 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 778707 mehamn, no
    161 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 262629 eresos, gr
    162 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    163 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1056899 sambava, mg
    164 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4407665 kodiak, us
    165 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1689750 san isidro, ph
    166 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075720 broome, au
    167 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    168 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3418910 upernavik, gl
    169 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    170 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2387495 carnot, cf
    171 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3863379 mar del plata, ar
    172 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466165 cidreira, br
    173 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6170031 tuktoyaktuk, ca
    174 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 557140 ilinskiy, ru
    175 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3453014 porangatu, br
    176 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2264557 ponta do sol, pt
    177 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6111862 port hardy, ca
    178 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    179 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    180 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    181 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374346 ponta do sol, cv
    182 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    183 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    184 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 578732 batetskiy, ru
    185 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    186 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    187 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3421765 nanortalik, gl
    188 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3359736 vredendal, za
    189 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 104515 mecca, sa
    190 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    191 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    192 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    193 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1852357 shimoda, jp
    194 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    195 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    196 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 286621 salalah, om
    197 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1106677 bambous virieux, mu
    198 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1640660 gondanglegi, id
    199 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1214488 meulaboh, id
    200 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    201 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1848373 fukue, jp
    202 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    203 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    204 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    205 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    206 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1785961 heihe, cn
    207 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2729907 longyearbyen, sj
    208 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    209 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 933995 souillac, mu
    210 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5129780 olean, us
    211 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4414001 wentzville, us
    212 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4267710 sitka, us
    213 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3421719 narsaq, gl
    214 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3359638 walvis bay, na
    215 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4035715 avarua, ck
    216 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2343784 ejigbo, ng
    217 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3577430 road town, vg
    218 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2137690 we, nc
    219 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4036284 alofi, nu
    220 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    221 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5785243 aberdeen, us
    222 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 216404 gbadolite, cd
    223 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3465713 conde, br
    224 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    225 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    226 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2411397 georgetown, sh
    227 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1788852 xining, cn
    228 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5972291 havre-saint-pierre, ca
    229 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015306 tiksi, ru
    230 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    231 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2017155 saskylakh, ru
    232 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3355672 luderitz, na
    233 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2157698 mildura, au
    234 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    235 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2155415 new norfolk, au
    236 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2454530 koulikoro, ml
    237 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    238 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5905393 bonavista, ca
    239 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 370481 marawi, sd
    240 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1179515 duki, pk
    241 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 546105 nikolskoye, ru
    242 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    243 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2139521 noumea, nc
    244 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3131500 visnes, no
    245 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3435038 dolores, ar
    246 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    247 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1160571 khash, ir
    248 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3839307 rawson, ar
    249 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    250 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374210 sao filipe, cv
    251 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3424607 tasiilaq, gl
    252 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    253 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    254 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2411397 georgetown, sh
    255 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2649169 kinlochleven, gb
    256 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 187725 maralal, ke
    257 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6089245 norman wells, ca
    258 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    259 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3842882 nueve de julio, ar
    260 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015913 suntar, ru
    261 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6089245 norman wells, ca
    262 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    263 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3384937 miracema do tocantins, br
    264 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372707 ribeira grande, pt
    265 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    266 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3883457 lebu, cl
    267 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    268 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    269 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    270 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    271 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    272 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466902 carmo do paranaiba, br
    273 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466993 caarapo, br
    274 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2132606 samarai, pg
    275 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    276 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    277 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    278 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126123 chokurdakh, ru
    279 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3792394 mapiripan, co
    280 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466980 caravelas, br
    281 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    282 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374083 bathsheba, bb
    283 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    284 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    285 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777019 vardo, no
    286 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    287 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964712 plettenberg bay, za
    288 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2276492 harper, lr
    289 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2071860 esperance, au
    290 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4021858 guerrero negro, mx
    291 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    292 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    293 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1540356 raduzhnyy, ru
    294 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 878054 masuguru, tz
    295 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4004293 ixtapa, mx
    296 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3661756 uarini, br
    297 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5919850 chapais, ca
    298 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3863379 mar del plata, ar
    299 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5983720 iqaluit, ca
    300 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    301 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 241131 victoria, sc
    302 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2180815 tuatapere, nz
    303 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    304 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5506956 las vegas, us
    305 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 154097 mgandu, tz
    306 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 935215 saint-philippe, re
    307 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    308 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6170031 tuktoyaktuk, ca
    309 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4342816 sulphur, us
    310 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    311 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3146125 melhus, no
    312 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    313 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    314 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1529376 korla, cn
    315 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3839307 rawson, ar
    316 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    317 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6162949 terrace, ca
    318 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3665098 barcelos, br
    319 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    320 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6170031 tuktoyaktuk, ca
    321 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2094342 kavieng, pg
    322 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3423146 ilulissat, gl
    323 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3883457 lebu, cl
    324 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    325 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3456160 olinda, br
    326 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2014833 tura, ru
    327 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    328 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2063036 port lincoln, au
    329 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    330 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3863379 mar del plata, ar
    331 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2018735 nyurba, ru
    332 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5880568 bethel, us
    333 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    334 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374336 porto novo, cv
    335 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126682 bilibino, ru
    336 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    337 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372707 ribeira grande, pt
    338 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1106677 bambous virieux, mu
    339 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    340 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    341 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2514651 los llanos de aridane, es
    342 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2123814 leningradskiy, ru
    343 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6165406 thompson, ca
    344 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    345 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4034551 faanui, pf
    346 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2030065 mandalgovi, mn
    347 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2074865 carnarvon, au
    348 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2514651 los llanos de aridane, es
    349 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    350 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    351 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    352 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    353 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2192362 christchurch, nz
    354 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3387258 soledade, br
    355 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    356 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    357 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3439781 treinta y tres, uy
    358 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2208248 kaitangata, nz
    359 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4407665 kodiak, us
    360 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    361 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5655959 hamilton, us
    362 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    363 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2511150 santa lucia, es
    364 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    365 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    366 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    367 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    368 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    369 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    370 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 155274 mahenge, tz
    371 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    372 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    373 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3573197 hamilton, bm
    374 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4267710 sitka, us
    375 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    376 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    377 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1160939 iranshahr, ir
    378 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466165 cidreira, br
    379 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3662616 cruzeiro do sul, br
    380 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2287790 issia, ci
    381 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372707 ribeira grande, pt
    382 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3533462 acapulco, mx
    383 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3883457 lebu, cl
    384 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6165406 thompson, ca
    385 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121025 srednekolymsk, ru
    386 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5847411 kahului, us
    387 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    388 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3382160 cayenne, gf
    389 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466980 caravelas, br
    390 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022083 alekseyevsk, ru
    391 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 7288345 kaupanger, no
    392 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 986717 kruisfontein, za
    393 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6324729 halifax, ca
    394 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1817993 anqing, cn
    395 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3423146 ilulissat, gl
    396 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6165406 thompson, ca
    397 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6170031 tuktoyaktuk, ca
    398 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    399 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3863379 mar del plata, ar
    400 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    401 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5367788 lompoc, us
    402 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    403 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    404 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6149374 slave lake, ca
    405 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1526041 atasu, kz
    406 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2137748 voh, nc
    407 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    408 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2155415 new norfolk, au
    409 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5983720 iqaluit, ca
    410 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1215502 banda aceh, id
    411 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    412 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2090021 namatanai, pg
    413 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 866062 iskateley, ru
    414 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1485528 zalesovo, ru
    415 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5895424 bay roberts, ca
    416 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 241131 victoria, sc
    417 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    418 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3832899 viedma, ar
    419 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5563839 fortuna, us
    420 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 320392 burdur, tr
    421 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4760232 front royal, us
    422 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    423 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2962943 limerick, ie
    424 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2411397 georgetown, sh
    425 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    426 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2172880 byron bay, au
    427 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 86049 jalu, ly
    428 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777019 vardo, no
    429 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372707 ribeira grande, pt
    430 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    431 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3354247 ondangwa, na
    432 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    433 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    434 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2017155 saskylakh, ru
    435 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    436 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075720 broome, au
    437 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466165 cidreira, br
    438 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    439 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    440 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    441 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1623197 tual, id
    442 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    443 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6165406 thompson, ca
    444 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3424607 tasiilaq, gl
    445 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    446 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    447 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    448 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1788852 xining, cn
    449 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    450 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    451 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6089245 norman wells, ca
    452 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    453 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    454 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    455 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    456 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    457 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    458 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3424607 tasiilaq, gl
    459 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777019 vardo, no
    460 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    461 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 546105 nikolskoye, ru
    462 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    463 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    464 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    465 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    466 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    467 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    468 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    469 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    470 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    471 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126199 cherskiy, ru
    472 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    473 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    474 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    475 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4035715 avarua, ck
    476 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    477 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    478 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6138501 saint-augustin, ca
    479 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    480 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3355672 luderitz, na
    481 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1651531 ambon, id
    482 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    483 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3893656 copiapo, cl
    484 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    485 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    486 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    487 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6071421 meadow lake, ca
    488 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 546105 nikolskoye, ru
    489 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126199 cherskiy, ru
    490 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1519928 qostanay, kz
    491 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    492 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1255619 srivardhan, in
    493 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652567 san cristobal, ec
    494 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    495 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 324496 aksaray, tr
    496 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 107304 buraydah, sa
    497 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3424607 tasiilaq, gl
    498 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    499 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3996234 lazaro cardenas, mx
    500 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6160806 sylvan lake, ca
    501 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    502 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022572 khatanga, ru
    503 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1244926 hambantota, lk
    504 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    505 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1242110 kalmunai, lk
    506 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    507 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    508 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    509 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374120 vila do maio, cv
    510 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    511 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    512 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    513 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    514 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    515 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    516 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2629833 husavik, is
    517 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6111862 port hardy, ca
    518 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    519 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    520 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    521 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3404558 cabedelo, br
    522 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    523 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1047660 cuamba, mz
    524 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777019 vardo, no
    525 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4034551 faanui, pf
    526 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    527 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    528 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466980 caravelas, br
    529 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121385 severo-kurilsk, ru
    530 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3896218 castro, cl
    531 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    532 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    533 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3115824 muros, es
    534 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1278149 aurangabad, in
    535 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121385 severo-kurilsk, ru
    536 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1626542 sorong, id
    537 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    538 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    539 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    540 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 484670 taman, ru
    541 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    542 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 933995 souillac, mu
    543 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3148138 larkollen, no
    544 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 361058 alexandria, eg
    545 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    546 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    547 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    548 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3353934 otavi, na
    549 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 769274 ketrzyn, pl
    550 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    551 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1587923 bien hoa, vn
    552 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    553 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 100926 umm lajj, sa
    554 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2074865 carnarvon, au
    555 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    556 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    557 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3932145 pisco, pe
    558 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372472 vila franca do campo, pt
    559 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6690296 saint-joseph, re
    560 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    561 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    562 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3486270 anaco, ve
    563 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2514651 los llanos de aridane, es
    564 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374218 santa maria, cv
    565 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    566 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6100799 pemberton, ca
    567 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    568 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    569 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6355222 yulara, au
    570 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3412093 vestmannaeyjar, is
    571 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    572 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    573 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 779554 honningsvag, no
    574 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    575 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 556268 ostrovnoy, ru
    576 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    577 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3361934 saldanha, za
    578 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2074865 carnarvon, au
    579 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6951112 somerset west, za
    580 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    581 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    582 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    583 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1580240 hue, vn
    584 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2274895 monrovia, lr
    585 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    586 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    587 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1282256 hithadhoo, mv
    588 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3981460 coahuayana, mx
    589 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3430443 necochea, ar
    590 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    591 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2074865 carnarvon, au
    592 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1272444 doiwala, in
    593 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3489657 lucea, jm
    594 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    595 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777019 vardo, no
    596 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2394560 djougou, bj
    597 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015306 tiksi, ru
    598 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2112802 hasaki, jp
    599 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2092164 lorengau, pg
    600 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3948613 acari, pe
    601 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    602 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    603 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2450173 taoudenni, ml
    604 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4407665 kodiak, us
    605 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    606 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374346 ponta do sol, cv
    607 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2282827 oume, ci
    608 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2137773 vao, nc
    609 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6171633 ucluelet, ca
    610 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2094342 kavieng, pg
    611 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 370481 marawi, sd
    612 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3430443 necochea, ar
    613 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1627877 sembakung, id
    614 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2435124 bitkine, td
    615 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 546105 nikolskoye, ru
    616 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2652513 colwyn bay, gb
    617 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3377301 mabaruma, gy
    618 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3843123 neuquen, ar
    619 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2037391 fengzhen, cn
    620 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2399371 makokou, ga
    621 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    622 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    623 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3347019 namibe, ao
    624 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6320062 vila velha, br
    625 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    626 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 342711 barentu, er
    627 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    628 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3863379 mar del plata, ar
    629 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    630 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    631 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    632 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    633 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    634 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2155415 new norfolk, au
    635 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2399001 mayumba, ga
    636 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2396853 omboue, ga
    637 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    638 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    639 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3441684 mercedes, uy
    640 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    641 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6111862 port hardy, ca
    642 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5884260 altona, ca
    643 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    644 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    645 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1809879 guangshui, cn
    646 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    647 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3424607 tasiilaq, gl
    648 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    649 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3448903 sao joao da barra, br
    650 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    651 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    652 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    653 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 610298 beyneu, kz
    654 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3095795 kolobrzeg, pl
    655 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    656 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2629833 husavik, is
    657 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5871146 palmer, us
    658 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    659 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3651694 san lorenzo, ec
    660 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1280849 kashi, cn
    661 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    662 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    663 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    664 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    665 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    666 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    667 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    668 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2267254 lagoa, pt
    669 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3915350 san miguel, bo
    670 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3691954 sechura, pe
    671 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2112802 hasaki, jp
    672 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2192362 christchurch, nz
    673 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    674 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    675 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2030065 mandalgovi, mn
    676 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    677 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2112802 hasaki, jp
    678 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    679 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2137773 vao, nc
    680 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2017155 saskylakh, ru
    681 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2400547 gamba, ga
    682 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1611197 chiang khong, th
    683 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    684 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2180815 tuatapere, nz
    685 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3355672 luderitz, na
    686 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    687 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6165406 thompson, ca
    688 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    689 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1503153 klyuchi, ru
    690 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2235194 bafia, cm
    691 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2094342 kavieng, pg
    692 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4407665 kodiak, us
    693 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    694 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    695 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126199 cherskiy, ru
    696 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1282256 hithadhoo, mv
    697 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3673690 nuqui, co
    698 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    699 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    700 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    701 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2136825 isangel, vu
    702 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    703 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    704 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    705 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    706 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    707 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2018116 orel, ru
    708 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    709 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372707 ribeira grande, pt
    710 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    711 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2191562 dunedin, nz
    712 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2618795 klaksvik, fo
    713 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3860443 comodoro rivadavia, ar
    714 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 762850 ostrow mazowiecka, pl
    715 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2142316 yeppoon, au
    716 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2347266 uga, ng
    717 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1185148 patiya, bd
    718 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    719 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2644605 lerwick, gb
    720 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 515873 oktyabrskiy, ru
    721 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    722 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3443061 chuy, uy
    723 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022572 khatanga, ru
    724 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2294768 tarkwa, gh
    725 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4036284 alofi, nu
    726 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    727 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    728 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2303611 axim, gh
    729 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5861897 fairbanks, us
    730 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3421982 maniitsoq, gl
    731 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3896218 castro, cl
    732 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2090021 namatanai, pg
    733 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    734 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    735 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    736 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3388618 sao joao do piaui, br
    737 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1214488 meulaboh, id
    738 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1498920 mezhdurechensk, ru
    739 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    740 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    741 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2662689 visby, se
    742 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5367788 lompoc, us
    743 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    744 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    745 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1511381 aromashevo, ru
    746 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    747 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    748 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1244926 hambantota, lk
    749 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2396518 port-gentil, ga
    750 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    751 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964432 port alfred, za
    752 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 935215 saint-philippe, re
    753 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2074865 carnarvon, au
    754 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1233369 negombo, lk
    755 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    756 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2629833 husavik, is
    757 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    758 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2331005 malumfashi, ng
    759 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 779683 hammerfest, no
    760 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 546105 nikolskoye, ru
    761 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 217745 bumba, cd
    762 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3421719 narsaq, gl
    763 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    764 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2629833 husavik, is
    765 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    766 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    767 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    768 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    769 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    770 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    771 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    772 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206890 masterton, nz
    773 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3361934 saldanha, za
    774 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    775 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 935215 saint-philippe, re
    776 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5836068 rawlins, us
    777 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1805733 jinchang, cn
    778 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1293625 dawei, mm
    779 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    780 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5468773 gallup, us
    781 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 292223 dubai, ae
    782 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3928993 san vicente de canete, pe
    783 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    784 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1529484 hami, cn
    785 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2383119 sibut, cf
    786 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    787 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    788 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    789 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4021858 guerrero negro, mx
    790 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1253807 umred, in
    791 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    792 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372745 rabo de peixe, pt
    793 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2209055 waddan, ly
    794 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    795 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    796 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    797 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2068655 katherine, au
    798 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    799 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    800 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3033881 begles, fr
    801 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    802 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031637 lavrentiya, ru
    803 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1090415 chirongui, yt
    804 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5039421 sunrise, us
    805 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    806 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3863379 mar del plata, ar
    807 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3374210 sao filipe, cv
    808 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6071618 medicine hat, ca
    809 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4267710 sitka, us
    810 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4407665 kodiak, us
    811 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    812 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    813 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2160735 lakes entrance, au
    814 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3577430 road town, vg
    815 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 556268 ostrovnoy, ru
    816 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5640350 billings, us
    817 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2867431 murrhardt, de
    818 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 978895 margate, za
    819 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2400547 gamba, ga
    820 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2028164 deputatskiy, ru
    821 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2013216 vysokogornyy, ru
    822 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2270385 camacha, pt
    823 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    824 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    825 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    826 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    827 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    828 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015306 tiksi, ru
    829 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    830 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    831 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3438102 fuerte olimpo, py
    832 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    833 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1859964 kaseda, jp
    834 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    835 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4035715 avarua, ck
    836 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3836669 san rafael, ar
    837 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1264976 leh, in
    838 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    839 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1505429 iskitim, ru
    840 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4078964 muscle shoals, us
    841 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2074865 carnarvon, au
    842 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    843 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777019 vardo, no
    844 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2411397 georgetown, sh
    845 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 609919 kuryk, kz
    846 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1488903 turukhansk, ru
    847 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1244926 hambantota, lk
    848 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2244991 tambacounda, sn
    849 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3526756 isla mujeres, mx
    850 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    851 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2128815 makubetsu, jp
    852 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2208248 kaitangata, nz
    853 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    854 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    855 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    856 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    857 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 712041 blyznyuky, ua
    858 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2094342 kavieng, pg
    859 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3454005 piacabucu, br
    860 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    861 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    862 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6089245 norman wells, ca
    863 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5367788 lompoc, us
    864 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1059051 miandrivazo, mg
    865 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3423146 ilulissat, gl
    866 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2112802 hasaki, jp
    867 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    868 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    869 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3515690 progreso, mx
    870 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    871 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    872 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466165 cidreira, br
    873 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5880568 bethel, us
    874 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3924908 pimenta bueno, br
    875 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1337607 kudahuvadhoo, mv
    876 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3158668 eidfjord, no
    877 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4036284 alofi, nu
    878 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    879 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    880 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022572 khatanga, ru
    881 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    882 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3459126 lagoa vermelha, br
    883 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3837675 san francisco, ar
    884 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    885 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2152668 portland, au
    886 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    887 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    888 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3899695 ancud, cl
    889 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1028434 quelimane, mz
    890 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126682 bilibino, ru
    891 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3347019 namibe, ao
    892 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 605155 kiruna, se
    893 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2172880 byron bay, au
    894 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    895 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    896 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1282256 hithadhoo, mv
    897 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122104 petropavlovsk-kamchatskiy, ru
    898 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    899 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3423146 ilulissat, gl
    900 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    901 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    902 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    903 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3671450 inirida, co
    904 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    905 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3924908 pimenta bueno, br
    906 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    907 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121385 severo-kurilsk, ru
    908 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3449747 santa vitoria do palmar, br
    909 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5924351 clyde river, ca
    910 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3418910 upernavik, gl
    911 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    912 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1272983 dhanaura, in
    913 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1282256 hithadhoo, mv
    914 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4035715 avarua, ck
    915 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2032614 baruun-urt, mn
    916 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2161515 kiama, au
    917 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    918 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015306 tiksi, ru
    919 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5983720 iqaluit, ca
    920 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 8010683 porto santo, pt
    921 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2017155 saskylakh, ru
    922 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4252975 barrow, us
    923 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    924 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1495385 pelym, ru
    925 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1793700 taicheng, cn
    926 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5880568 bethel, us
    927 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2037485 erenhot, cn
    928 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3389822 salinopolis, br
    929 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    930 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1314759 lashio, mm
    931 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5848280 kapaa, us
    932 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1861280 itoman, jp
    933 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    934 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 726307 tran, bg
    935 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1861450 ise, jp
    936 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121385 severo-kurilsk, ru
    937 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    938 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    939 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    940 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1254709 tezu, in
    941 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    942 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4011743 constitucion, mx
    943 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    944 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    945 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1853140 yuza, jp
    946 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    947 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    948 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    949 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5909514 brooks, ca
    950 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    951 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372707 ribeira grande, pt
    952 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    953 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    954 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2094342 kavieng, pg
    955 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    956 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    957 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    958 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3418910 upernavik, gl
    959 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1106677 bambous virieux, mu
    960 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6050066 la ronge, ca
    961 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    962 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1861280 itoman, jp
    963 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3461733 guiratinga, br
    964 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    965 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 471799 vasilsursk, ru
    966 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    967 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    968 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2274275 robertsport, lr
    969 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2177091 ballarat, au
    970 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5882953 aklavik, ca
    971 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    972 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3361934 saldanha, za
    973 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    974 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122090 pevek, ru
    975 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5000947 marquette, us
    976 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    977 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    978 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3405924 beberibe, br
    979 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122493 omsukchan, ru
    980 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2177069 ballina, au
    981 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3493081 san juan de la maguana, do
    982 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1185095 teknaf, bd
    983 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1133310 mirabad, af
    984 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6165406 thompson, ca
    985 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3416888 grindavik, is
    986 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121385 severo-kurilsk, ru
    987 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3397893 sao sebastiao, br
    988 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2108502 honiara, sb
    989 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3038266 albertville, fr
    990 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2021992 klichka, ru
    991 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2122414 orotukan, ru
    992 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 541631 krasnyy luch, ru
    993 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 217695 bunia, cd
    994 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1498919 lugovoy, ru
    995 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2015179 tommot, ru
    996 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4034551 faanui, pf
    997 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3838859 rio gallegos, ar
    998 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    999 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5983720 iqaluit, ca
    1000 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5889745 hauterive, ca
    1001 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    1002 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2082539 merauke, id
    1003 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3456160 olinda, br
    1004 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2112802 hasaki, jp
    1005 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4285268 bowling green, us
    1006 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466165 cidreira, br
    1007 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5380437 pacific grove, us
    1008 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2027042 batagay-alyta, ru
    1009 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    1010 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    1011 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2092164 lorengau, pg
    1012 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1013 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3423146 ilulissat, gl
    1014 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    1015 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1299237 pyapon, mm
    1016 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1734240 labuan, my
    1017 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2163355 hobart, au
    1018 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    1019 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3168075 san marco in lamis, it
    1020 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1490256 talnakh, ru
    1021 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2134814 sola, vu
    1022 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3424934 saint-pierre, pm
    1023 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3440777 rocha, uy
    1024 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2208248 kaitangata, nz
    1025 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3421765 nanortalik, gl
    1026 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1027 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    1028 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1788852 xining, cn
    1029 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 779622 havoysund, no
    1030 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 900056 nyimba, zm
    1031 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2180815 tuatapere, nz
    1032 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1033 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3533462 acapulco, mx
    1034 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5670128 orchard homes, us
    1035 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3366880 hermanus, za
    1036 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2025630 chara, ru
    1037 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    1038 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1039 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    1040 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    1041 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2110227 butaritari, ki
    1042 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    1043 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934322 mahebourg, mu
    1044 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    1045 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2729907 longyearbyen, sj
    1046 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4034551 faanui, pf
    1047 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1516905 taraz, kz
    1048 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3359638 walvis bay, na
    1049 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    1050 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3423146 ilulissat, gl
    1051 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    1052 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3361934 saldanha, za
    1053 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1058381 morondava, mg
    1054 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3359736 vredendal, za
    1055 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 933383 mathathane, bw
    1056 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    1057 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1058 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6138501 saint-augustin, ca
    1059 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    1060 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2208248 kaitangata, nz
    1061 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4011743 constitucion, mx
    1062 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3985710 cabo san lucas, mx
    1063 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2022773 khandyga, ru
    1064 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6144312 sept-iles, ca
    1065 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3382160 cayenne, gf
    1066 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 546105 nikolskoye, ru
    1067 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    1068 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1006984 east london, za
    1069 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3842882 nueve de julio, ar
    1070 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3661980 tamandare, br
    1071 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2267226 lagos, pt
    1072 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032369 pangai, to
    1073 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    1074 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 88533 awjilah, ly
    1075 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    1076 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2630299 hofn, is
    1077 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1516438 zyryanovsk, kz
    1078 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1015776 bredasdorp, za
    1079 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 935215 saint-philippe, re
    1080 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2037391 fengzhen, cn
    1081 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1082 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 541704 krasnyy kholm, ru
    1083 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2034615 tahe, cn
    1084 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1085 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    1086 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    1087 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 331259 mega, et
    1088 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4035715 avarua, ck
    1089 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2031405 erdenet, mn
    1090 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1337610 thinadhoo, mv
    1091 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5847411 kahului, us
    1092 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2139521 noumea, nc
    1093 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2126199 cherskiy, ru
    1094 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934479 grand gaube, mu
    1095 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1096 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3471451 arraial do cabo, br
    1097 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3445304 vera cruz, br
    1098 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3430443 necochea, ar
    1099 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6185377 yellowknife, ca
    1100 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    1101 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    1102 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 934649 cap malheureux, mu
    1103 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3603157 puerto lempira, hn
    1104 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3827693 la macarena, co
    1105 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    1106 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5554428 ketchikan, us
    1107 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5367788 lompoc, us
    1108 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4035715 avarua, ck
    1109 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3896218 castro, cl
    1110 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2444995 filingue, ne
    1111 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    1112 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    1113 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3355672 luderitz, na
    1114 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1631393 kemang, id
    1115 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 777682 skjervoy, no
    1116 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3893629 coquimbo, cl
    1117 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3573197 hamilton, bm
    1118 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3869716 tocopilla, cl
    1119 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5813747 toppenish, us
    1120 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3573374 the valley, ai
    1121 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    1122 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2121385 severo-kurilsk, ru
    1123 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 556268 ostrovnoy, ru
    1124 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1125 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1126 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4032243 vaini, to
    1127 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1128 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1507390 dikson, ru
    1129 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    1130 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3347019 namibe, ao
    1131 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2077963 albany, au
    1132 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3652764 puerto ayora, ec
    1133 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2181625 te anau, nz
    1134 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1135 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    1136 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    1137 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3893629 coquimbo, cl
    1138 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1139 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 504341 pskov, ru
    1140 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3372760 praia da vitoria, pt
    1141 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1142 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1143 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    1144 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    1145 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2012956 yerbogachen, ru
    1146 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1491519 goryachegorsk, ru
    1147 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2028164 deputatskiy, ru
    1148 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1337607 kudahuvadhoo, mv
    1149 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3831208 qaanaaq, gl
    1150 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    1151 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    1152 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1153 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4020109 atuona, pf
    1154 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    1155 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    1156 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1157 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2961459 skibbereen, ie
    1158 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3466980 caravelas, br
    1159 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3573061 saint george, bm
    1160 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 962367 richards bay, za
    1161 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    1162 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    1163 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2017155 saskylakh, ru
    1164 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1165 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3569907 saint-pierre, mq
    1166 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1486321 yar-sale, ru
    1167 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1168 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4409896 springfield, us
    1169 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3874787 punta arenas, cl
    1170 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3370903 jamestown, sh
    1171 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1106677 bambous virieux, mu
    1172 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1173 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2685750 ostersund, se
    1174 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3418910 upernavik, gl
    1175 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2160413 leeton, au
    1176 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 964420 port elizabeth, za
    1177 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    1178 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3604518 naco, hn
    1179 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5886182 antigonish, ca
    1180 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3833367 ushuaia, ar
    1181 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1182 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3369157 cape town, za
    1183 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 6255012 flinders, au
    1184 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1865309 katsuura, jp
    1185 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1256047 sirsi, in
    1186 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5711847 astoria, us
    1187 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2514651 los llanos de aridane, es
    1188 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2409215 mattru, sl
    1189 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1865309 katsuura, jp
    1190 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2038087 chengde, cn
    1191 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2075265 busselton, au
    1192 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4030556 rikitea, pf
    1193 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 5855927 hilo, us
    1194 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 4031574 provideniya, ru
    1195 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 7671223 kloulklubed, pw
    1196 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2206939 bluff, nz
    1197 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 1490256 talnakh, ru
    1198 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3393922 nisia floresta, br
    1199 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 3877918 ovalle, cl
    1200 http://api.openweathermap.org/data/2.5/weather?appid=cc52e602067835f1da199f1fa74772ef&q= 2094027 kieta, pg
    


```python
# Extract desired data and insert into lists

city_id = [data.get('id') for data in weather_data]
city_name = [data.get('name') for data in weather_data]
city_country = [data.get('sys').get('country') for data in weather_data]
city_latitude = [data.get('coord').get('lat') for data in weather_data]
city_longitude = [data.get('coord').get('lon') for data in weather_data]
city_temperature = [data.get('main').get('temp') for data in weather_data]
city_humidity = [data.get('main').get('humidity') for data in weather_data]
city_cloudiness = [data.get('clouds').get('all') for data in weather_data]
city_windspeed = [data.get('wind').get('speed') for data in weather_data]
```


```python
# Structure the data as a DataFrame
weather_data = [("City ID", city_id),
                ("City Name",city_name),
                ("Country Code",city_country),
                ("Latitude",city_latitude),
                ("Longitude",city_longitude),
                ("Temperature(°F)",city_temperature),
                ("Humidity(%)",city_humidity),
                ("Cloudiness(%)",city_cloudiness),
                ("Wind Speed (mph)",city_windspeed),
                ]

weather_df = pd.DataFrame.from_items(weather_data)
weather_df.shape
```




    (1200, 9)




```python
# Drop duplicate cities and re-index the DataFrame
weather_city_df = weather_df.drop_duplicates()
final_city_df = weather_city_df.reset_index(drop=True)
final_city_df.shape
```




    (511, 9)




```python
final_city_df.head()
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
      <th>City ID</th>
      <th>City Name</th>
      <th>Country Code</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Temperature(°F)</th>
      <th>Humidity(%)</th>
      <th>Cloudiness(%)</th>
      <th>Wind Speed (mph)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2206939</td>
      <td>Bluff</td>
      <td>NZ</td>
      <td>-46.60</td>
      <td>168.33</td>
      <td>59.26</td>
      <td>100</td>
      <td>80</td>
      <td>24.07</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1852357</td>
      <td>Shimoda</td>
      <td>JP</td>
      <td>34.70</td>
      <td>138.93</td>
      <td>42.52</td>
      <td>100</td>
      <td>88</td>
      <td>9.08</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3471451</td>
      <td>Arraial do Cabo</td>
      <td>BR</td>
      <td>-22.97</td>
      <td>-42.02</td>
      <td>85.12</td>
      <td>79</td>
      <td>40</td>
      <td>11.41</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6096551</td>
      <td>Pangnirtung</td>
      <td>CA</td>
      <td>66.15</td>
      <td>-65.72</td>
      <td>-13.01</td>
      <td>51</td>
      <td>90</td>
      <td>10.29</td>
    </tr>
    <tr>
      <th>4</th>
      <td>4030556</td>
      <td>Rikitea</td>
      <td>PF</td>
      <td>-23.12</td>
      <td>-134.97</td>
      <td>80.64</td>
      <td>100</td>
      <td>76</td>
      <td>4.72</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Export DataFrame as csv without the index but with the header
final_city_df.to_csv("Output/cityweather.csv", index=False, header=True)
```


```python
# Grab the data needed for x and y axes
x_lat = final_city_df["Latitude"]
y_temp = final_city_df["Temperature(°F)"]
y_humid = final_city_df["Humidity(%)"]
y_cloud = final_city_df["Cloudiness(%)"]
y_wind = final_city_df["Wind Speed (mph)"]
```


```python
# Create the color palette
color_choice = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"]
sns.palplot(sns.color_palette(color_choice))

# Create a "marker palette"
marker_choice = ["o", "s", "o", "s"]
```


```python
# Plot the temperature vs latitude comparison
temp_lat_plot = plt.scatter(x_lat, y_temp, marker = marker_choice[0], c = color_choice[0], edgecolors = "black")

# Add the labels, title, and legend
plt.xlabel("Latitude")
plt.ylabel("Temperature(°F)")
plt.title("Temperature by Latitude, Feb 22, 2018")

# Set limits for the displayed axis start and end points
sns.plt.xlim(- 60, 100)

# Show the plot
plt.show()
```


![png](output_12_0.png)



```python
# Plot the humidity vs latitude comparison
humid_lat_plot = plt.scatter(x_lat, y_humid, marker =marker_choice[1], c = color_choice[1], edgecolors = "black")

# Add the labels, title, and legend
plt.xlabel("Latitude")
plt.ylabel("Humidity(%)")
plt.title("Humidity by Latitude, Feb 22, 2018")

# Set limits for the displayed axis start and end points
sns.plt.xlim(- 60, 100)

# Show the plot
plt.show()
```


![png](output_13_0.png)



```python
# Plot the cloudiness vs latitude comparison
cloud_lat_plot = plt.scatter(x_lat, y_cloud, marker =marker_choice[2], c = color_choice[2], edgecolors = "black")

# Add the labels, title, and legend
plt.xlabel("Latitude")
plt.ylabel("Cloudiness (%)")
plt.title("Cloudiness by Latitude, Feb 22, 2018")

# Set limits for the displayed axis start and end points
sns.plt.xlim(- 60, 100)

# Show the plot
plt.show()
```


![png](output_14_0.png)



```python
# Plot the wind speed vs latitude comparison
wind_lat_plot = plt.scatter(x_lat, y_wind, marker =marker_choice[3], c = color_choice[3], edgecolors = "black")

# Add the labels, title, and legend
plt.xlabel("Latitude")
plt.ylabel("Wind Speed (mph)")
plt.title("Wind Speed by Latitude, Feb 22, 2018")

# Set limits for the displayed axis start and end points
sns.plt.xlim(- 60, 100)

# Show the plot
plt.show()
```


![png](output_15_0.png)



```python

```
