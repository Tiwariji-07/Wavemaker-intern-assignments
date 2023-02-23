package com.railway.model;

import javax.persistence.*;

@Entity
@Table(name="train")
public class Train {

    @Id
    @Column(name = "train_id")
    private int trainId;

    @Column(name = "train_name")
    private String trainName;

    @Column(name = "no_of_seats")
    private int noOfSeats;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "source_id", referencedColumnName = "station_id")
    private Station sourceStation;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "destination_id", referencedColumnName = "station_id")
    private Station destinationStation;

    public int getTrainId() {
        return trainId;
    }

    public void setTrainId(int trainId) {
        this.trainId = trainId;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public int getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(int noOfSeats) {
        this.noOfSeats = noOfSeats;
    }

    public Station getSourceStation() {
        return sourceStation;
    }

    public void setSourceStation(Station sourceStation) {
        this.sourceStation = sourceStation;
    }

    public Station getDestinationStation() {
        return destinationStation;
    }

    public void setDestinationStation(Station destinationStation) {
        this.destinationStation = destinationStation;
    }

    @Override
    public String toString() {
        return "Train{" +
                "trainId=" + trainId +
                ", trainName='" + trainName + '\'' +
                ", noOfSeats=" + noOfSeats +
                ", sourceStation=" + sourceStation +
                ", destinationStation=" + destinationStation +
                '}';
    }
}
