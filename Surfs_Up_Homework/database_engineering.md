

```python
# Import pandas
import pandas as pd

# Import sqlalchemy and modules
import sqlalchemy
from sqlalchemy import create_engine, MetaData
from sqlalchemy import Column, Integer, String, Float

# Import and establish Base for which classes will be constructed 
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
```


```python
# Create our database engine
engine = create_engine('sqlite:///hawaii.sqlite')
```


```python
# Create a connection to the engine called `conn`
conn = engine.connect()
```


```python
# Create the Measurements class
class Measurements(Base):
    __tablename__ = 'measurementsX'
    station = Column(String(50))
    date = Column(String(50))
    precip = Column(Float)
    tobs = Column(Integer)
    record_id = Column(String(50), primary_key=True)

    def __repr__(self):
        return f"id={self.id}, name={self.name}"
```


```python
# Create the Stations class
class Stations(Base):
    __tablename__ = 'stations'
    station = Column(String(50), primary_key=True)
    name = Column(String(255))
    latitude = Column(Float)
    longitude = Column(Float)
    elevation = Column(Float)

    def __repr__(self):
        return f"id={self.id}, name={self.name}"
```

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\ext\declarative\clsregistry.py:120: SAWarning: This declarative base already contains a class with the same class name and module name as __main__.Stations, and will be replaced in the string-lookup table.
      item.__name__
    


    ---------------------------------------------------------------------------

    InvalidRequestError                       Traceback (most recent call last)

    <ipython-input-84-fa6b38a8ff35> in <module>()
          1 # Create the Stations class
    ----> 2 class Stations(Base):
          3     __tablename__ = 'stations'
          4     station = Column(String(50), primary_key=True)
          5     name = Column(String(255))
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\ext\declarative\api.py in __init__(cls, classname, bases, dict_)
         62     def __init__(cls, classname, bases, dict_):
         63         if '_decl_class_registry' not in cls.__dict__:
    ---> 64             _as_declarative(cls, classname, cls.__dict__)
         65         type.__init__(cls, classname, bases, dict_)
         66 
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\ext\declarative\base.py in _as_declarative(cls, classname, dict_)
         86         return
         87 
    ---> 88     _MapperConfig.setup_mapping(cls, classname, dict_)
         89 
         90 
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\ext\declarative\base.py in setup_mapping(cls, cls_, classname, dict_)
        114         else:
        115             cfg_cls = _MapperConfig
    --> 116         cfg_cls(cls_, classname, dict_)
        117 
        118     def __init__(self, cls_, classname, dict_):
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\ext\declarative\base.py in __init__(self, cls_, classname, dict_)
        142         self._extract_declared_columns()
        143 
    --> 144         self._setup_table()
        145 
        146         self._setup_inheritance()
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\ext\declarative\base.py in _setup_table(self)
        435                     tablename, cls.metadata,
        436                     *(tuple(declared_columns) + tuple(args)),
    --> 437                     **table_kw)
        438         else:
        439             table = cls.__table__
    

    C:\Users\chris\Anaconda3\envs\PythonData\lib\site-packages\sqlalchemy\sql\schema.py in __new__(cls, *args, **kw)
        436                     "to redefine "
        437                     "options and columns on an "
    --> 438                     "existing Table object." % key)
        439             table = metadata.tables[key]
        440             if extend_existing:
    

    InvalidRequestError: Table 'stations' is already defined for this MetaData instance.  Specify 'extend_existing=True' to redefine options and columns on an existing Table object.



```python
# Create the tables in the database
Base.metadata.create_all(engine)
```


```python
# Define paths for csvs
csv_path_1 = "clean_hawaii_measurements.csv"
csv_path_2 = "clean_hawaii_stations.csv"
```


```python
# Read csvs
measurements_df = pd.read_csv(csv_path_1)
stations_df = pd.read_csv(csv_path_2)
```


```python
# test data integrity of measurements table
measurements_df.head(3)
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
      <th>station</th>
      <th>date</th>
      <th>precip</th>
      <th>tobs</th>
      <th>record_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>USC00519397</td>
      <td>2010-01-01</td>
      <td>0.08</td>
      <td>65</td>
      <td>USC005193972010-01-01</td>
    </tr>
    <tr>
      <th>1</th>
      <td>USC00519397</td>
      <td>2010-01-02</td>
      <td>0.00</td>
      <td>63</td>
      <td>USC005193972010-01-02</td>
    </tr>
    <tr>
      <th>2</th>
      <td>USC00519397</td>
      <td>2010-01-03</td>
      <td>0.00</td>
      <td>74</td>
      <td>USC005193972010-01-03</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Use Orient='records' to create a list of data to write
measurements_data = measurements_df.to_dict(orient='records')
stations_data = stations_df.to_dict(orient='records')
```


```python
# Use MetaData from SQLAlchemy to reflect the tables
metadata = MetaData(bind=engine)
metadata.reflect()
```


```python
# Save the reference to the two tables as variables called `measurements_table` and 'stations_table'
measurements_table = sqlalchemy.Table('measurementsX', metadata, autoload=True)
stations_table = sqlalchemy.Table('stations', metadata, autoload=True)
```


```python
# Use `table.delete()` to remove any pre-existing data
conn.execute(measurements_table.delete())
conn.execute(stations_table.delete())
```




    <sqlalchemy.engine.result.ResultProxy at 0x26df9d09c50>




```python
# Use `table.insert()` to insert the data into the table
conn.execute(measurements_table.insert(), measurements_data)
conn.execute(stations_table.insert(), stations_data)
```




    <sqlalchemy.engine.result.ResultProxy at 0x26df4ca5da0>




```python
# Test that the insert works by fetching the first 5 rows of the measurements table 
conn.execute("select * from measurementsX limit 5").fetchall()
```




    [('USC00519397', '2010-01-01', 0.08, 65, 'USC005193972010-01-01'),
     ('USC00519397', '2010-01-02', 0.0, 63, 'USC005193972010-01-02'),
     ('USC00519397', '2010-01-03', 0.0, 74, 'USC005193972010-01-03'),
     ('USC00519397', '2010-01-04', 0.0, 76, 'USC005193972010-01-04'),
     ('USC00519397', '2010-01-06', None, 73, 'USC005193972010-01-06')]




```python
# Test that the insert works by fetching the first 5 rows of the stations table
conn.execute("select * from stations limit 5").fetchall()
```




    [('USC00519397', 'WAIKIKI 717.2, HI US', 21.2716, -157.8168, 3.0),
     ('USC00513117', 'KANEOHE 838.1, HI US', 21.4234, -157.8015, 14.6),
     ('USC00514830', 'KUALOA RANCH HEADQUARTERS 886.9, HI US', 21.5213, -157.8374, 7.0),
     ('USC00517948', 'PEARL CITY, HI US', 21.3934, -157.9751, 11.9),
     ('USC00518838', 'UPPER WAHIAWA 874.3, HI US', 21.4992, -158.0111, 306.6)]


