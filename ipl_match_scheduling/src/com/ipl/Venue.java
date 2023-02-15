package com.ipl;

public class Venue {
    private String venueName;
    private Boolean isOccupied;

    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

    public Boolean getOccupied() {
        return isOccupied;
    }

    public void setOccupied(Boolean occupied) {
        isOccupied = occupied;
    }

    @Override
    public String toString() {
        return "Venue{" +
                "venueName='" + venueName + '\'' +
                ", isOccupied=" + isOccupied +
                '}';
    }
}
