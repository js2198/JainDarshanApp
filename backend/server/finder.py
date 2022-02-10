import time
from geopy.geocoders import ArcGIS
import folium
import pandas as pd
import os
import json

# print(os.listdir())
# print(os.path.dirname(__file__))

tilesDiff = ["Stamen Terrain","CartoDB positron"]

locFile = 'DerasarDetails.xlsx'

if locFile in os.listdir():

    dfLocation = pd.read_excel(locFile)

    nom = ArcGIS()

    dfLocation['GEOCODE'] = dfLocation['Address'].apply(nom.geocode)

    dfLocation['Lat'] = dfLocation['GEOCODE'].apply(lambda x: x.latitude if x != None else None)
    dfLocation['Lon'] = dfLocation['GEOCODE'].apply(lambda x: x.longitude if x != None else None)

    # print(dfLocation)

    dfLocation.to_excel(r'result.xlsx', sheet_name='LatLong')
    print('\n     -----------------------------------------------------')
    print('                 Program executed successfully            ')
    print('     -----------------------------------------------------')
else:
    print('\n-----------------------------------------------------')
    print('                 Program Failure                    ')
    print('-----------------------------------------------------')
    print('REASON:')
    print('\nFile "DeraserDetails.xlsx" is not in the same directory as this program')
    print('')
    print('Make sure the file is in the directory....   '+os.path.dirname(__file__))


print('\nLatitude and Longitude are already available in "result.xlsx" ')

prompt = input('\nWould you like to plot the data on the map?(y/n)\n').lower()

if prompt == 'y':

    # Get the path to this file
    thisFile = os.path.dirname(__file__)

    #Reading excel file that was expelled from findGPS .exe
    df_info = pd.read_excel('result.xlsx')
    isNull = list(df_info["Lat"].isnull())
    qtNull = df_info["Lat"].isnull().sum()
    lat = list(df_info["Lat"])
    lon = list(df_info["Lon"])
    loc = list(df_info["Location"])

    #created map object
    map = folium.Map([(df_info['Lat'].max()+df_info['Lat'].min())/2, (df_info['Lon'].max()+df_info['Lon'].min())/2],
                     zoom_start=5, tiles=tilesDiff[1])

    #cretaed Feature Group
    fg1 = folium.FeatureGroup(name='Points')

    for latitude, longitude, check, local in zip(lat, lon, isNull, loc):
        if not check:
            fg1.add_child(folium.Marker(location=[latitude, longitude],popup=str(local),
                                    icon=folium.Icon(color='green',prefix='fa',icon='circle')))


    map.add_child(fg1)

    map.add_child(folium.LayerControl())

    map.save('Plot.html')

    # diferentTiles = ["Stamen Terrain","CartoDB positron"]
    print('\nYour choice was "y" so the file "plot.html" is now available..')
    if qtNull != 0:
        print('\n------------------------------- OBSERVATION -------------------------------------')
        print('Please check the "Lat" and "Lon" column of the "Result.xlsx" file".')
        print('You have '+str(qtNull)+' locations that were not found by Geolocator')
        print('GeoLocator leaves the columns blank and consequently the location was not plotted.')
        print('You can correct this location in the "DeraserDetails.xlsx" file and run the program again.')
    print('\nyou can close the program.')
    time.sleep(60 * 2)
else:
    print('\nYour choice was "n" so you can close the program..')
    time.sleep(60*2)