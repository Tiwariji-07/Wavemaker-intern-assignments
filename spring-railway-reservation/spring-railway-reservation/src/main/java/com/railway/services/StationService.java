package com.railway.services;

import com.railway.model.Station;


import java.util.List;

public interface StationService {

    List<Station> getAllStations();

    Station createStation(Station station);

    Station updateStation(Station station);

    Station deleteStation(int id);

    Station getStationById(int id);
}
