package com.railway.controllers;

import com.railway.model.Station;
import com.railway.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "station")
public class StationController {

    @Autowired
    StationService stationService;

    @GetMapping
    public List<Station> getStation(){
        return stationService.getAllStations();
    }

    @PostMapping("/create")
    public Station createStation(@RequestBody Station user){
        return stationService.createStation(user);
    }

    @PutMapping("/update")
    public Station updateStation(@RequestBody Station user){
        return stationService.updateStation(user);
    }

    @DeleteMapping("/{id}")
    public Station deleteStation(@PathVariable("id") int id){
        return stationService.deleteStation(id);
    }

    @GetMapping("/{id}")
    public Station getStationById(@PathVariable("id") int id){
        return stationService.getStationById(id);
    }
}
