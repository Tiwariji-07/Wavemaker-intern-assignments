package com.railway.controllers;

import com.railway.model.Station;
import com.railway.model.Train;
import com.railway.services.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "train")
public class TrainController {
    @Autowired
    TrainService trainService;

    @GetMapping
    public List<Train> getTrain() {
        return trainService.getAllTrains();
    }

    @PostMapping("/create")
    public Train createTrain(@RequestBody Train train) {
        return trainService.createTrain(train);
    }

    @PutMapping("/update")
    public Train updateTrain(@RequestBody Train train) {
        return trainService.updateTrain(train);
    }

//    @DeleteMapping("/{id}")
//    public Train deleteTrain(@PathVariable("id") int id) {
//        return trainService.deleteTrain(id);
//    }

    @GetMapping("/{id}")
    public Train getTrainById(@PathVariable("id") int id) {
        return trainService.getTrainById(id);
    }

    @GetMapping("{id}/source")
    public Station getSourceStation(@PathVariable("id") int id) {
        return trainService.getSourceStation(id);
    }

    @GetMapping("{id}/destination")
    public Station getDestinationStation(@PathVariable("id") int id) {
        return trainService.getDestinationStation(id);
    }
}
