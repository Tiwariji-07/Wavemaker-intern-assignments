package com.railway.services;

import com.railway.model.Station;
import com.railway.model.Train;

import java.util.List;

public interface TrainService {
    List<Train> getAllTrains();

    Train createTrain(Train train);

    Train updateTrain(Train train);


    Train getTrainById(int id);

//    Train getTrainByName(String trainName);

    Station getSourceStation(int id);

    Station getDestinationStation(int id);


}
