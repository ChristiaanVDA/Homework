

```python
# Import dependencies
import pandas as pd
import matplotlib.pyplot as plt
import datetime

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
```


```python
engine = create_engine("sqlite:///hawaii.sqlite", echo=False)
```


```python
inspector = inspect(engine)
inspector.get_table_names()
```




    ['measurements', 'measurementsX', 'stations']




```python
# Get a list of column names and types for MEASUREMENTS table
columns = inspector.get_columns('measurementsX')
for c in columns:
    print(c['name'], c["type"])
```

    station VARCHAR(50)
    date VARCHAR(50)
    precip FLOAT
    tobs INTEGER
    record_id VARCHAR(50)
    


```python
# Get a list of column names and types for STATIONS table
columns = inspector.get_columns('stations')
for c in columns:
    print(c['name'], c["type"])
```

    station VARCHAR(50)
    name VARCHAR(255)
    latitude FLOAT
    longitude FLOAT
    elevation FLOAT
    


```python
engine.execute('SELECT * FROM measurementsX LIMIT 5').fetchall()
```




    [('USC00519397', '2010-01-01', 0.08, 65, 'USC005193972010-01-01'),
     ('USC00519397', '2010-01-02', 0.0, 63, 'USC005193972010-01-02'),
     ('USC00519397', '2010-01-03', 0.0, 74, 'USC005193972010-01-03'),
     ('USC00519397', '2010-01-04', 0.0, 76, 'USC005193972010-01-04'),
     ('USC00519397', '2010-01-06', None, 73, 'USC005193972010-01-06')]




```python
# Reflect Database into ORM class
Base = automap_base()
Base.prepare(engine, reflect=True)
Measurements = Base.classes.measurementsX
Stations = Base.classes.stations
```


```python
session = Session(engine)
```


```python
# Select start date and end date for trip
trip_start_date = datetime.date(2018,8,11)
trip_end_date = datetime.date(2018,8,21)
```


```python
# PRECIPITATION ANALYSIS
```


```python
# Find date starting date for 12 months of data
start_date = session.query(Measurements.date).order_by(Measurements.date.desc()).first()
```


```python

date_precip = session.query(Measurements.date, Measurements.precip).\
   filter(Measurements.date > '2016-08-23').\
   order_by(Measurements.date).all()
```


```python
date_precip_df = pd.DataFrame(date_precip, columns=['dates', 'precip'])
date_precip_df.head(3)
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
      <th>dates</th>
      <th>precip</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2016-08-24</td>
      <td>0.08</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2016-08-24</td>
      <td>2.15</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2016-08-24</td>
      <td>2.28</td>
    </tr>
  </tbody>
</table>
</div>




```python
x_axis = date_precip_df['dates']
y_axis = date_precip_df['precip']
```


```python
plt.scatter(x_axis, y_axis, marker="o", facecolors="blue", edgecolors="black",
            s=x_axis, alpha=0.75)
```


    ---------------------------------------------------------------------------

    AttributeError                            Traceback (most recent call last)

    <ipython-input-125-f6e2c072c37b> in <module>()
          1 plt.scatter(x_axis, y_axis, marker="o", facecolors="blue", edgecolors="black",
    ----> 2             s=x_axis, alpha=0.75)
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\matplotlib\pyplot.py in scatter(x, y, s, c, marker, cmap, norm, vmin, vmax, alpha, linewidths, verts, edgecolors, hold, data, **kwargs)
       3432                          vmin=vmin, vmax=vmax, alpha=alpha,
       3433                          linewidths=linewidths, verts=verts,
    -> 3434                          edgecolors=edgecolors, data=data, **kwargs)
       3435     finally:
       3436         ax._hold = washold
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\matplotlib\__init__.py in inner(ax, *args, **kwargs)
       1895                     warnings.warn(msg % (label_namer, func.__name__),
       1896                                   RuntimeWarning, stacklevel=2)
    -> 1897             return func(ax, *args, **kwargs)
       1898         pre_doc = inner.__doc__
       1899         if pre_doc is None:
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\matplotlib\axes\_axes.py in scatter(self, x, y, s, c, marker, cmap, norm, vmin, vmax, alpha, linewidths, verts, edgecolors, **kwargs)
       4032                 offsets=offsets,
       4033                 transOffset=kwargs.pop('transform', self.transData),
    -> 4034                 alpha=alpha
       4035                 )
       4036         collection.set_transform(mtransforms.IdentityTransform())
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\matplotlib\collections.py in __init__(self, paths, sizes, **kwargs)
        902         Collection.__init__(self, **kwargs)
        903         self.set_paths(paths)
    --> 904         self.set_sizes(sizes)
        905         self.stale = True
        906 
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\matplotlib\collections.py in set_sizes(self, sizes, dpi)
        875             self._sizes = np.asarray(sizes)
        876             self._transforms = np.zeros((len(self._sizes), 3, 3))
    --> 877             scale = np.sqrt(self._sizes) * dpi / 72.0 * self._factor
        878             self._transforms[:, 0, 0] = scale
        879             self._transforms[:, 1, 1] = scale
    

    AttributeError: 'str' object has no attribute 'sqrt'



```python

```
