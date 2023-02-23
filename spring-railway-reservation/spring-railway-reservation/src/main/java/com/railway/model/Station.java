package com.railway.model;

import javax.persistence.*;

@Entity
@Table(name="station")
public class Station {

    @Id
    @Column(name = "station_id")
    private int stationId;

    @Column(name = "station_name")
    private String stationName;

    public int getStationId() {
        return stationId;
    }

    public void setStationId(int stationId) {
        this.stationId = stationId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    @Override
    public String toString() {
        return "Station{" +
                "stationId=" + stationId +
                ", stationName='" + stationName + '\'' +
                '}';
    }
}
